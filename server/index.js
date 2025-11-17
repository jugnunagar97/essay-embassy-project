import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import path from 'path';
dotenv.config();

const app = express();

// Initialize Razorpay
let razorpay;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  console.log('Razorpay initialized successfully');
} else {
  console.log('Razorpay credentials not found in environment variables');
}

// Configure CORS to allow multiple origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://essay-embassy.web.app',
  'https://essayembassy.com',
  'https://www.essayembassy.com'
];

app.use(cors({ 
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));
app.use(express.json());

// --- Force HTTPS and canonical host (no www) ---
app.use((req, res, next) => {
  const host = req.headers.host || '';
  const isHttps = req.headers['x-forwarded-proto'] === 'https' || req.secure;

  // Force https
  if (!isHttps) {
    return res.redirect(301, `https://essayembassy.com${req.originalUrl}`);
  }

  // Force apex domain (no www)
  if (host.startsWith('www.')) {
    return res.redirect(301, `https://essayembassy.com${req.originalUrl}`);
  }
  next();
});

// Geo-blocking middleware to block ONLY India (IN) and Pakistan (PK)
// ALL OTHER COUNTRIES (including France) should be allowed
const BLOCKED_COUNTRIES = ['IN', 'PK'];

async function getCountryFromIP(ip) {
  try {
    // Try multiple free IP geolocation services
    const services = [
      `https://ipapi.co/${ip}/json/`,
      `https://ip-api.com/json/${ip}?fields=countryCode`,
      `https://api.country.is/${ip}`,
    ];

    for (const service of services) {
      try {
        // Create timeout controller for fetch
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(service, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          // Try different possible fields for country code
          const countryCode = data.country_code || data.countryCode || data.country;
          if (countryCode && typeof countryCode === 'string') {
            const upperCode = countryCode.toUpperCase().trim();
            console.log(`[Geo-Block] Detected country: ${upperCode} for IP: ${ip}`);
            return upperCode;
          }
        }
      } catch (e) {
        // Try next service
        console.log(`[Geo-Block] Service failed: ${service}, trying next...`);
        continue;
      }
    }
    console.log(`[Geo-Block] Could not determine country for IP: ${ip}`);
    return null;
  } catch (error) {
    console.error('[Geo-Block] Error getting country from IP:', error);
    return null;
  }
}

function getClientIP(req) {
  // Check various headers for the real client IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
         req.headers['x-real-ip'] ||
         req.headers['cf-connecting-ip'] ||
         req.connection?.remoteAddress ||
         req.socket?.remoteAddress ||
         req.ip ||
         'unknown';
  return ip;
}

// Geo-blocking middleware
app.use(async (req, res, next) => {
  // Skip geo-blocking for health check endpoint and static assets
  if (req.path === '/' && req.method === 'GET') {
    return next();
  }

  // Skip geo-blocking for API routes that don't need it (like webhooks)
  if (req.path.startsWith('/api/razorpay-webhook')) {
    return next();
  }

  const clientIP = getClientIP(req);
  
  // Skip localhost/private IPs in development (allow all local development)
  if (clientIP === '::1' || 
      clientIP === '127.0.0.1' || 
      clientIP === 'localhost' ||
      clientIP === 'unknown' ||
      clientIP.startsWith('192.168.') || 
      clientIP.startsWith('10.') || 
      clientIP.startsWith('172.') ||
      clientIP.startsWith('::ffff:127.') ||
      clientIP.startsWith('::ffff:192.168.') ||
      clientIP.startsWith('::ffff:10.')) {
    console.log(`[Geo-Block] Skipping geo-check for local/private IP: ${clientIP}`);
    return next();
  }

  try {
    const countryCode = await getCountryFromIP(clientIP);
    
    // Only block if country is explicitly IN or PK
    // ALL other countries (including null/unknown) are allowed
    if (countryCode && BLOCKED_COUNTRIES.includes(countryCode)) {
      console.log(`[Geo-Block] BLOCKED request from ${countryCode} (IP: ${clientIP})`);
      return res.status(503).json({ 
        error: 'Service unavailable',
        message: 'This service is temporarily unavailable in your region.'
      });
    } else {
      // Allow all other countries (including France, US, UK, etc.)
      if (countryCode) {
        console.log(`[Geo-Block] ALLOWED request from ${countryCode} (IP: ${clientIP})`);
      } else {
        console.log(`[Geo-Block] ALLOWED request (country unknown) from IP: ${clientIP}`);
      }
    }
  } catch (error) {
    // If geo-check fails, ALLOW the request (fail open for security)
    // This ensures we don't accidentally block legitimate users
    console.error('[Geo-Block] Geo-check failed, allowing request:', error.message);
  }

  next();
});

// Initialize Firebase Admin SDK (if not already initialized)
let firestore;
try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  }
  firestore = admin.firestore();
} catch (error) {
  console.log('Firebase Admin SDK not configured:', error.message);
  // Continue without Firebase for now
}

const FieldValue = admin.firestore ? admin.firestore.FieldValue : null;

async function fetchUserRole(uid) {
  if (!firestore) return 'client';
  try {
    const snap = await firestore.collection('users').doc(uid).get();
    if (!snap.exists) return 'client';
    return snap.data().role || 'client';
  } catch (error) {
    console.error('Failed to fetch user role', error);
    return 'client';
  }
}

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null;
  if (!token) {
    return res.status(401).json({ error: 'Missing authorization token' });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const role = await fetchUserRole(decoded.uid);
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      role
    };
    next();
  } catch (error) {
    console.error('Auth verification failed', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

function requireRole(roles = []) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

function ensureFirestore(res) {
  if (!firestore) {
    res.status(503).json({ error: 'Firestore is not configured' });
    return false;
  }
  return true;
}

// --- Central 301 redirect map (fixes 404s & duplicates) ---
const redirects = {
  '/home': '/',
  '/contact-us/': '/contact',          // or '/#contact' if you have an anchor
  '/my-account-2/': '/my-account',
  '/shop-2/': '/shop',                 // or '/' if shop removed
  '/checkout-2/': '/checkout',
  '/cart-2/': '/cart',
  '/cart-2-2/': '/cart',
  '/author/20628/wpadmin/': '/',
  '/2024/10/21/how-to-drive-conversions-with-data-driven-digital-campaigns/': '/blog/'
};

app.use((req, res, next) => {
  const dst = redirects[req.path];
  if (dst) return res.redirect(301, dst);
  next();
});

// --- Feed URL redirects: /post-slug/feed/ → /post-slug/ ---
app.use((req, res, next) => {
  const path = req.path;
  // Match URLs ending with /feed/ or /feed (e.g., /blog/post-slug/feed/ → /blog/post-slug/)
  if (path.endsWith('/feed/') || path.endsWith('/feed')) {
    // Remove /feed/ or /feed from the end to get canonical URL
    const canonicalPath = path.replace(/\/feed\/?$/, '');
    // Redirect to canonical URL (without trailing /feed/)
    return res.redirect(301, canonicalPath || '/');
  }
  next();
});

// --- Optional: 410 Gone for URLs you removed completely ---
const gone = new Set([
  // '/shop', '/checkout', '/cart'  // uncomment if you retired ecommerce fully
]);
app.use((req, res, next) => {
  if (gone.has(req.path)) return res.status(410).send('Gone');
  next();
});

// ==========================================================
// =================== YOUR FIX IS HERE =====================
// ==========================================================
// Health check / Root route
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Welcome to the Essay Embassy API!',
    status: 'ok' 
  });
});
// ==========================================================
// ==========================================================

// Nodemailer transporter setup for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Use App Password, not regular password
  },
});

// Create Razorpay Order
app.post('/api/create-order', async (req, res) => {
  if (!razorpay) {
    return res.status(503).json({ error: 'Payment service unavailable.' });
  }
  
  const { amount, currency = 'INR', receipt, notes = {} } = req.body;
  
  if (!amount) {
    return res.status(400).json({ error: 'Amount is required.' });
  }
  
  // Validate amount
  if (typeof amount !== 'number' || amount <= 0 || isNaN(amount)) {
    return res.status(400).json({ error: 'Invalid amount. Amount must be a positive number.' });
  }
  
  // Razorpay primarily supports INR, validate currency
  const supportedCurrencies = ['INR', 'USD', 'EUR', 'GBP'];
  if (!supportedCurrencies.includes(currency)) {
    console.warn(`Unsupported currency requested: ${currency}, defaulting to INR`);
    // Don't fail, just log and continue with INR
  }
  
  try {
    // Convert amount to smallest currency unit (paise for INR, cents for USD, etc.)
    // Razorpay expects amount in the smallest unit of the currency
    const amountInSmallestUnit = Math.round(amount * 100);
    
    // Validate minimum amount based on currency
    const minAmounts = {
      'INR': 100,  // 1 INR = 100 paise
      'USD': 100,  // 1 USD = 100 cents
      'EUR': 100,  // 1 EUR = 100 cents
      'GBP': 100   // 1 GBP = 100 pence
    };
    
    const minAmount = minAmounts[currency] || 100;
    if (amountInSmallestUnit < minAmount) {
      return res.status(400).json({ 
        error: `Amount must be at least ${(minAmount / 100).toFixed(2)} ${currency}.` 
      });
    }
    
    const options = {
      amount: amountInSmallestUnit,
      currency: currency.toUpperCase(),
      receipt: receipt || `order_${Date.now()}`,
      notes: notes,
    };
    
    console.log('Creating Razorpay order with options:', {
      originalAmount: amount,
      amountInSmallestUnit: options.amount,
      currency: options.currency,
      receipt: options.receipt,
      notes: options.notes
    });
    
    const order = await razorpay.orders.create(options);
    console.log('Razorpay order created successfully:', order.id);
    
    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt
      }
    });
  } catch (err) {
    console.error('Razorpay API error:', {
      message: err.message,
      error: err.error,
      statusCode: err.statusCode,
      description: err.description,
      field: err.field,
      source: err.source,
      step: err.step,
      reason: err.reason,
      metadata: err.metadata
    });
    
    // Extract detailed error message from Razorpay error
    let errorMessage = 'Failed to create Razorpay order.';
    if (err.error) {
      // Razorpay error object structure
      if (err.error.description) {
        errorMessage = err.error.description;
      } else if (err.error.message) {
        errorMessage = err.error.message;
      } else if (typeof err.error === 'string') {
        errorMessage = err.error;
      }
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    // Provide more context based on error type
    if (err.statusCode === 401 || err.statusCode === 403) {
      errorMessage = 'Invalid Razorpay API credentials. Please check your API keys.';
    } else if (err.statusCode === 400) {
      errorMessage = `Invalid payment request: ${errorMessage}`;
    }
    
    res.status(500).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? {
        razorpayError: err.error,
        statusCode: err.statusCode
      } : undefined
    });
  }
});

// Razorpay Webhook Endpoint
app.post('/api/razorpay-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers['x-razorpay-signature'];
  const body = req.body;

  console.log('Webhook received:', { signature: signature ? 'present' : 'missing', bodyLength: body.length });

  // Verify signature
  if (secret) {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.log('Invalid webhook signature');
      return res.status(400).send('Invalid signature');
    }
  } else {
    console.log('Webhook secret not configured, skipping signature verification');
  }

  try {
    const event = JSON.parse(body);
    console.log('Webhook event:', event.event);

    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      console.log('Payment captured:', payment.id, payment.amount);
      
      // Store payment in Firestore
      if (firestore && payment.notes) {
        const { userId, orderId, serviceType } = payment.notes;
        
        if (userId) {
          const paymentDoc = {
            paymentId: payment.id,
            orderId: orderId || payment.notes.orderId,
            userId: userId,
            amount: payment.amount,
            currency: payment.currency,
            status: 'captured',
            capturedAt: new Date().toISOString(),
            serviceType: serviceType || 'essay',
            method: payment.method,
            bank: payment.bank,
            wallet: payment.wallet,
            vpa: payment.vpa,
            email: payment.email,
            contact: payment.contact,
            notes: payment.notes
          };

          await firestore.collection('payments').doc(payment.id).set(paymentDoc);
          console.log('Payment stored in Firestore:', payment.id);
        }
      }
    } else if (event.event === 'payment.failed') {
      const payment = event.payload.payment.entity;
      console.log('Payment failed:', payment.id);
      
      // Store failed payment
      if (firestore) {
        await firestore.collection('payments').doc(payment.id).set({
          paymentId: payment.id,
          status: 'failed',
          failedAt: new Date().toISOString(),
          errorCode: payment.error_code,
          errorDescription: payment.error_description,
          amount: payment.amount,
          currency: payment.currency
        });
      }
    }

    res.status(200).send('Webhook received');
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).send('Webhook processing failed');
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  
  try {
    // Check if SMTP is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('SMTP not configured, skipping email send');
      return res.json({ success: true, message: 'Contact form received (email not configured)' });
    }

    // 1. Send message to support
    await transporter.sendMail({
      from: `Contact Form <${process.env.SMTP_USER}>`,
      to: process.env.SUPPORT_EMAIL || process.env.SMTP_USER,
      subject: `New Contact Form Submission: ${subject}`,
      html: `<b>Name:</b> ${name}<br/><b>Email:</b> ${email}<br/><b>Subject:</b> ${subject}<br/><b>Message:</b><br/>${message.replace(/\n/g, '<br/>')}`,
    });

    // 2. Send confirmation to user
    await transporter.sendMail({
      from: `Essay Embassy <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'We have received your message! | Essay Embassy',
      html: `
        <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 30px;">
          <table width="100%" style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #eee;">
            <tr>
              <td style="padding: 24px; text-align: center;">
                <img src="${process.env.FRONTEND_URL || 'http://localhost:5173'}/images/logo.png" alt="Essay Embassy" style="height: 48px; margin-bottom: 16px;" />
                <h2 style="color: #2d3748;">Thank you for contacting Essay Embassy!</h2>
                <p style="color: #4a5568;">Hi ${name},</p>
                <p style="color: #4a5568;">
                  We have received your message and our team will get back to you as soon as possible.<br/>
                  Here is a copy of your message:
                </p>
                <blockquote style="background: #f1f5f9; border-left: 4px solid #3182ce; margin: 16px 0; padding: 12px 16px; color: #2d3748;">
                  <strong>Subject:</strong> ${subject}<br/>
                  <strong>Message:</strong><br/>
                  ${message.replace(/\n/g, '<br/>')}
                </blockquote>
                <p style="color: #4a5568;">We appreciate your patience.<br/>Best regards,<br/>Essay Embassy Team</p>
                <hr style="margin: 32px 0 16px 0; border: none; border-top: 1px solid #e2e8f0;">
                <div style="font-size: 14px; color: #718096; text-align: center;">
                  <strong>Essay Embassy</strong><br>
                  1309 Beacon Street, Suite 300, Brookline, MA, 02446<br>
                  <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" style="color: #3182ce; text-decoration: none;">www.essayembassy.com</a>
                  <div style="margin-top: 12px;">
                    <span style="display: inline-block; background: #e6fffa; color: #319795; border-radius: 4px; padding: 2px 8px; margin: 0 4px;">Verified Business</span>
                    <span style="display: inline-block; background: #ebf8ff; color: #3182ce; border-radius: 4px; padding: 2px 8px; margin: 0 4px;">SSL Secured</span>
                    <span style="display: inline-block; background: #f0fff4; color: #38a169; border-radius: 4px; padding: 2px 8px; margin: 0 4px;">24/7 Support</span>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

function slugifyServer(text = '') {
  return text
    .toString()
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function buildQaRecord(base, overrides = {}) {
  return {
    title: base.title || '',
    question: base.question || '',
    answer: base.answer || '',
    subject: base.subject || '',
    paperType: base.paperType || '',
    price: typeof base.price === 'number' ? base.price : Number(base.price ?? 0),
    status: base.status === 'published' ? 'published' : 'draft',
    assignedEditorId: overrides.assignedEditorId ?? base.assignedEditorId ?? null,
    assignedEditorEmail: overrides.assignedEditorEmail ?? base.assignedEditorEmail ?? null,
  };
}

const qaCollectionRef = () => firestore.collection('qaEntries');
const qaCounterRef = () => firestore.collection('counters').doc('qaEntries');

async function withQaTransaction(callback) {
  return firestore.runTransaction(async (transaction) => {
    const result = await callback(transaction);
    return result;
  });
}

async function getNextQaNumber(transaction) {
  const counterSnap = await transaction.get(qaCounterRef());
  const next = counterSnap.exists ? (counterSnap.data().nextQuestionNumber || 1) : 1;
  transaction.set(
    qaCounterRef(),
    {
      nextQuestionNumber: next + 1,
    },
    { merge: true }
  );
  return next;
}

// Role-restricted Editor APIs
const editorRouter = express.Router();

editorRouter.use(authenticate);

editorRouter.get('/reviews', requireRole(['admin', 'editor']), async (req, res) => {
  if (!ensureFirestore(res)) return;
  try {
    let query = firestore.collection('reviews');
    if (req.user.role === 'editor') {
      query = query.where('assignedEditorId', '==', req.user.uid);
    }
    const snapshot = await query.get();
    res.json({ reviews: snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() })) });
  } catch (error) {
    console.error('Failed to list reviews', error);
    res.status(500).json({ error: 'Failed to list reviews' });
  }
});

editorRouter.post('/reviews', requireRole(['admin', 'editor']), async (req, res) => {
  if (!ensureFirestore(res)) return;
  const payload = req.body || {};
  try {
    const docRef = await firestore.collection('reviews').add({
      userName: payload.userName,
      userId: payload.userId || null,
      rating: payload.rating,
      comment: payload.comment,
      platform: payload.platform || 'website',
      isApproved: req.user.role === 'admin' ? Boolean(payload.isApproved) : false,
      isPending: req.user.role === 'admin' ? Boolean(payload.isPending) : true,
      assignedEditorId: req.user.role === 'editor' ? req.user.uid : payload.assignedEditorId || null,
      assignedEditorEmail: req.user.role === 'editor' ? req.user.email : payload.assignedEditorEmail || null,
      createdAt: FieldValue ? FieldValue.serverTimestamp() : new Date().toISOString(),
      updatedAt: FieldValue ? FieldValue.serverTimestamp() : new Date().toISOString()
    });
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    console.error('Failed to create review', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

editorRouter.put('/reviews/:id', requireRole(['admin', 'editor']), async (req, res) => {
  if (!ensureFirestore(res)) return;
  const { id } = req.params;
  try {
    const docRef = firestore.collection('reviews').doc(id);
    const snapshot = await docRef.get();
    if (!snapshot.exists) {
      return res.status(404).json({ error: 'Review not found' });
    }
    if (req.user.role === 'editor') {
      const assigned = snapshot.data().assignedEditorId;
      if (assigned && assigned !== req.user.uid) {
        return res.status(403).json({ error: 'Not allowed to modify this review' });
      }
    }
    await docRef.update({
      ...req.body,
      assignedEditorId: req.user.role === 'editor' ? req.user.uid : (req.body.assignedEditorId || snapshot.data().assignedEditorId),
      updatedAt: FieldValue ? FieldValue.serverTimestamp() : new Date().toISOString()
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Failed to update review', error);
    res.status(500).json({ error: 'Failed to update review' });
  }
});

editorRouter.delete('/reviews/:id', requireRole(['admin', 'editor']), async (req, res) => {
  if (!ensureFirestore(res)) return;
  const { id } = req.params;
  try {
    const docRef = firestore.collection('reviews').doc(id);
    const snapshot = await docRef.get();
    if (!snapshot.exists) {
      return res.status(404).json({ error: 'Review not found' });
    }
    if (req.user.role === 'editor') {
      const assigned = snapshot.data().assignedEditorId;
      if (assigned && assigned !== req.user.uid) {
        return res.status(403).json({ error: 'Not allowed to delete this review' });
      }
    }
    await docRef.delete();
    res.json({ success: true });
  } catch (error) {
    console.error('Failed to delete review', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

editorRouter.get('/blog', requireRole(['admin', 'editor']), async (req, res) => {
  if (!ensureFirestore(res)) return;
  try {
    let query = firestore.collection('blogPosts');
    if (req.user.role === 'editor') {
      query = query.where('authorId', '==', req.user.uid);
    }
    const snapshot = await query.get();
    res.json({ posts: snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() })) });
  } catch (error) {
    console.error('Failed to list blog posts', error);
    res.status(500).json({ error: 'Failed to list blog posts' });
  }
});

editorRouter.post('/blog', requireRole(['admin', 'editor']), async (req, res) => {
  if (!ensureFirestore(res)) return;
  try {
    const payload = req.body || {};
    const shouldPublish = Boolean(payload.published);
    const createdAtValue = FieldValue ? FieldValue.serverTimestamp() : new Date().toISOString();
    const updatedAtValue = FieldValue ? FieldValue.serverTimestamp() : new Date().toISOString();
    const publishedAtValue = shouldPublish
      ? (payload.publishedAt || (FieldValue ? FieldValue.serverTimestamp() : new Date().toISOString()))
      : null;

    const docRef = await firestore.collection('blogPosts').add({
      ...payload,
      published: shouldPublish,
      publishedAt: publishedAtValue,
      authorId: req.user.role === 'editor' ? req.user.uid : payload.authorId || null,
      authorEmail: req.user.role === 'editor' ? req.user.email : payload.authorEmail || null,
      createdAt: createdAtValue,
      updatedAt: updatedAtValue
    });
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    console.error('Failed to create blog post', error);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

editorRouter.put('/blog/:id', requireRole(['admin', 'editor']), async (req, res) => {
  if (!ensureFirestore(res)) return;
  try {
    const docRef = firestore.collection('blogPosts').doc(req.params.id);
    const snapshot = await docRef.get();
    if (!snapshot.exists) return res.status(404).json({ error: 'Post not found' });
    const currentData = snapshot.data();
    if (req.user.role === 'editor') {
      const assigned = currentData.authorId;
      if (assigned && assigned !== req.user.uid) {
        return res.status(403).json({ error: 'Not allowed to update this post' });
      }
    }
    const payload = req.body || {};
    const shouldPublish = Boolean(payload.published);
    let publishedAtValue = null;
    if (shouldPublish) {
      publishedAtValue =
        payload.publishedAt ||
        currentData.publishedAt ||
        (FieldValue ? FieldValue.serverTimestamp() : new Date().toISOString());
    }
    await docRef.update({
      ...payload,
      published: shouldPublish,
      publishedAt: publishedAtValue,
      authorId: req.user.role === 'editor' ? req.user.uid : (payload.authorId || currentData.authorId),
      authorEmail: req.user.role === 'editor' ? req.user.email : (payload.authorEmail || currentData.authorEmail),
      updatedAt: FieldValue ? FieldValue.serverTimestamp() : new Date().toISOString()
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Failed to update blog post', error);
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

editorRouter.delete('/blog/:id', requireRole(['admin', 'editor']), async (req, res) => {
  if (!ensureFirestore(res)) return;
  try {
    const docRef = firestore.collection('blogPosts').doc(req.params.id);
    const snapshot = await docRef.get();
    if (!snapshot.exists) return res.status(404).json({ error: 'Post not found' });
    if (req.user.role === 'editor') {
      const assigned = snapshot.data().authorId;
      if (assigned && assigned !== req.user.uid) {
        return res.status(403).json({ error: 'Not allowed to delete this post' });
      }
    }
    await docRef.delete();
    res.json({ success: true });
  } catch (error) {
    console.error('Failed to delete blog post', error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

editorRouter.get('/qna', requireRole(['admin', 'editor']), async (req, res) => {
  if (!ensureFirestore(res)) return;
  try {
    let query = firestore.collection('qaEntries');
    if (req.user.role === 'editor') {
      query = query.where('assignedEditorId', '==', req.user.uid);
    }
    const snapshot = await query.get();
    res.json({ entries: snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() })) });
  } catch (error) {
    console.error('Failed to list Q&A entries', error);
    res.status(500).json({ error: 'Failed to list Q&A entries' });
  }
});

editorRouter.post('/qna', requireRole(['admin', 'editor']), async (req, res) => {
  if (!ensureFirestore(res)) return;
  try {
    const payload = req.body || {};
    const assignedEditorId = req.user.role === 'editor' ? req.user.uid : payload.assignedEditorId || null;
    const assignedEditorEmail = req.user.role === 'editor' ? req.user.email : payload.assignedEditorEmail || null;
    const now = Date.now();

    const record = await withQaTransaction(async (transaction) => {
      const docRef = qaCollectionRef().doc();
      const questionNumber = payload.questionNumber ?? await getNextQaNumber(transaction);
      const qaData = {
        ...buildQaRecord(payload, { assignedEditorId, assignedEditorEmail }),
        createdAt: now,
        updatedAt: now,
        questionNumber,
        slug: payload.slug || slugifyServer(payload.title || `question-${questionNumber}`),
      };
      transaction.set(docRef, qaData);
      return { id: docRef.id, ...qaData };
    });

    res.status(201).json({ id: record.id, entry: record });
  } catch (error) {
    console.error('Failed to create Q&A entry', error);
    res.status(500).json({ error: 'Failed to create Q&A entry' });
  }
});

editorRouter.put('/qna/:id', requireRole(['admin', 'editor']), async (req, res) => {
  if (!ensureFirestore(res)) return;
  try {
    const payload = req.body || {};
    const now = Date.now();
    const updated = await withQaTransaction(async (transaction) => {
      const docRef = qaCollectionRef().doc(req.params.id);
      const snapshot = await transaction.get(docRef);
      if (!snapshot.exists) throw new Error('not-found');
      const existing = snapshot.data();
      if (req.user.role === 'editor') {
        const assigned = existing.assignedEditorId;
        if (assigned && assigned !== req.user.uid) {
          throw new Error('forbidden');
        }
      }
      const assignedEditorId = req.user.role === 'editor' ? req.user.uid : payload.assignedEditorId ?? existing.assignedEditorId ?? null;
      const assignedEditorEmail = req.user.role === 'editor' ? req.user.email : payload.assignedEditorEmail ?? existing.assignedEditorEmail ?? null;
      const record = {
        ...existing,
        ...buildQaRecord(payload, { assignedEditorId, assignedEditorEmail }),
        createdAt: existing.createdAt || now,
        updatedAt: now,
        questionNumber: existing.questionNumber,
        slug: payload.slug || existing.slug || slugifyServer(payload.title || existing.title || `question-${existing.questionNumber}`),
      };
      transaction.set(docRef, record);
      return { id: docRef.id, ...record };
    });
    res.json({ success: true, entry: updated });
  } catch (error) {
    if (error.message === 'not-found') {
      return res.status(404).json({ error: 'Entry not found' });
    }
    if (error.message === 'forbidden') {
      return res.status(403).json({ error: 'Not allowed to update this entry' });
    }
    console.error('Failed to update Q&A entry', error);
    res.status(500).json({ error: 'Failed to update Q&A entry' });
  }
});

editorRouter.delete('/qna/:id', requireRole(['admin', 'editor']), async (req, res) => {
  if (!ensureFirestore(res)) return;
  try {
    const docRef = firestore.collection('qaEntries').doc(req.params.id);
    const snapshot = await docRef.get();
    if (!snapshot.exists) return res.status(404).json({ error: 'Entry not found' });
    if (req.user.role === 'editor') {
      const assigned = snapshot.data().assignedEditorId;
      if (assigned && assigned !== req.user.uid) {
        return res.status(403).json({ error: 'Not allowed to delete this entry' });
      }
    }
    await docRef.delete();
    res.json({ success: true });
  } catch (error) {
    console.error('Failed to delete Q&A entry', error);
    res.status(500).json({ error: 'Failed to delete Q&A entry' });
  }
});

app.use('/api/editor', editorRouter);

// --- Serve Vite build ---
const dist = path.join(process.cwd(), 'dist');
app.use(express.static(dist));
app.get('*', (_, res) => res.sendFile(path.join(dist, 'index.html')));

// --- Start ---
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Razorpay backend listening on port ${PORT}`);
}); 
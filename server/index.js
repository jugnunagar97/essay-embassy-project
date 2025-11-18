import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
dotenv.config();

const app = express();
const FRONTEND_SITE_URL = (process.env.FRONTEND_URL || 'https://essay-embassy-project.onrender.com').replace(/\/$/, '');
const staticSitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
let cachedStaticSitemap = '';
const DEFAULT_SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
const QA_SITEMAP_LIMIT = 500;

try {
  cachedStaticSitemap = fs.readFileSync(staticSitemapPath, 'utf8');
} catch (error) {
  console.warn('Could not preload static sitemap.xml:', error.message);
}

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
  'http://localhost:5173',   // dev
  'http://localhost:4173',   // Vite preview (prod build locally)
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

// Add X-Robots-Tag header for protected paths
const protectedPaths = [
  '/admin',
  '/editor',
  '/client',
  '/dashboard',
  '/profile',
  '/settings',
  '/orders'
];

app.use((req, res, next) => {
  const isProtectedPath = protectedPaths.some((path) => req.path === path || req.path.startsWith(`${path}/`));
  if (isProtectedPath) {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  }
  next();
});

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
const ACCESS_COLLECTION = 'qaUnlocks';
const GUEST_COLLECTION = 'guestPurchases';

function generateAccessToken() {
  return crypto.randomBytes(24).toString('hex');
}

async function findAccessRecord(questionNumber, accessToken) {
  if (!firestore) return null;
  const collections = [ACCESS_COLLECTION, GUEST_COLLECTION];
  for (const collectionName of collections) {
    const snapshot = await firestore
      .collection(collectionName)
      .where('questionNumber', '==', questionNumber)
      .where('accessToken', '==', accessToken)
      .limit(1)
      .get();
    if (!snapshot.empty) {
      return {
        ref: snapshot.docs[0].ref,
        data: snapshot.docs[0].data(),
        collection: collectionName,
      };
    }
  }
  return null;
}

async function buildQaSitemapEntries(limit = QA_SITEMAP_LIMIT) {
  if (!firestore) return [];
  try {
    const snapshot = await firestore
      .collection('qaEntries')
      .where('status', '==', 'published')
      .limit(limit)
      .get();
    return snapshot.docs
      .map((docSnap) => {
        const data = docSnap.data() || {};
        const questionNumber = data.questionNumber;
        const slug = data.slug;
        if (!questionNumber || !slug) return null;
        const timestamp =
          typeof data.updatedAt === 'number'
            ? data.updatedAt
            : typeof data.createdAt === 'number'
            ? data.createdAt
            : Date.now();
        return {
          questionNumber,
          slug,
          lastmod: new Date(timestamp).toISOString(),
        };
      })
      .filter(Boolean);
  } catch (error) {
    console.error('Failed to fetch QA entries for sitemap:', error.message);
    return [];
  }
}

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

// Verify Razorpay payment signature
app.post('/api/verify-payment', async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(503).json({
        success: false,
        error: 'Payment service unavailable.'
      });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: 'Missing required payment parameters.'
      });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(body)
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    if (isValid) {
      console.log('✅ Payment verified successfully:', {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
      });

      return res.json({
        success: true,
        message: 'Payment verified successfully'
      });
    }

    console.log('❌ Payment verification failed:', {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id
    });

    return res.status(400).json({
      success: false,
      error: 'Invalid payment signature.'
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return res.status(500).json({
      success: false,
      error: 'Payment verification failed.'
    });
  }
});

app.post('/api/register-access', async (req, res) => {
  if (!firestore) {
    return res.status(503).json({ error: 'Firestore is not configured' });
  }

  const {
    questionNumber,
    questionId,
    questionTitle,
    questionSlug,
    paymentId,
    orderId,
    paymentSignature,
    userId,
    email,
  } = req.body || {};

  if (!questionNumber || !paymentId || !orderId || !paymentSignature) {
    return res.status(400).json({ error: 'Missing payment details' });
  }

  if (!process.env.RAZORPAY_KEY_SECRET) {
    return res.status(500).json({ error: 'Payment configuration missing' });
  }

  try {
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (expectedSignature !== paymentSignature) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    const accessToken = generateAccessToken();
    const timestamp = FieldValue ? FieldValue.serverTimestamp() : new Date().toISOString();
    const baseRecord = {
      questionNumber,
      questionId: questionId || null,
      questionTitle: questionTitle || '',
      questionSlug: questionSlug || '',
      accessToken,
      email: email || null,
      hasEmail: Boolean(email),
      razorpayPaymentId: paymentId,
      razorpayOrderId: orderId,
      status: 'completed',
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    if (userId) {
      await firestore.collection(ACCESS_COLLECTION).add({
        ...baseRecord,
        userId,
      });
    } else {
      await firestore.collection(GUEST_COLLECTION).add({
        ...baseRecord,
        purchaseDate: timestamp,
      });
    }

    return res.json({ success: true, accessToken, hasEmail: Boolean(email) });
  } catch (error) {
    console.error('Register access error:', error);
    return res.status(500).json({ error: 'Failed to register access' });
  }
});

app.post('/api/verify-access', async (req, res) => {
  if (!firestore) {
    return res.status(503).json({ error: 'Firestore is not configured' });
  }

  const { questionNumber, accessToken } = req.body || {};
  if (!questionNumber || !accessToken) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const record = await findAccessRecord(questionNumber, accessToken);
    if (!record) {
      return res.json({ valid: false });
    }
    return res.json({ valid: true, hasEmail: Boolean(record.data?.email) });
  } catch (error) {
    console.error('Verify access error:', error);
    return res.status(500).json({ error: 'Failed to verify access' });
  }
});

app.post('/api/send-magic-link', async (req, res) => {
  if (!firestore) {
    return res.status(503).json({ error: 'Firestore is not configured' });
  }
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return res.status(503).json({ error: 'Email service not configured' });
  }

  const { email, questionNumber, slug, accessToken } = req.body || {};
  if (!email || !questionNumber || !slug || !accessToken) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const record = await findAccessRecord(questionNumber, accessToken);
    if (!record) {
      return res.status(404).json({ error: 'Access token not found' });
    }

    const magicLink = `${FRONTEND_SITE_URL}/question/${encodeURIComponent(questionNumber)}/${encodeURIComponent(slug)}?access=${encodeURIComponent(accessToken)}`;
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background: #f4f6fb; }
          .container { max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff; }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background: #2563eb;
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
            font-weight: bold;
          }
          .footer { margin-top: 30px; color: #666; font-size: 12px; }
          code { background: #f1f5f9; padding: 6px; border-radius: 4px; display: inline-block; margin-top: 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>🎉 Your Answer is Ready!</h2>
          <p>Click the button below to access your unlocked answer anytime, from any device:</p>
          <a href="${magicLink}" class="button">View Answer →</a>
          <p>Or copy this link:</p>
          <code>${magicLink}</code>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
          <p><strong>💡 Pro Tip:</strong> Bookmark this link for instant access.</p>
          <p>No login required. No expiration. Access anytime.</p>
          <div class="footer">
            <p>Essay Embassy - Expert Q&A Solutions</p>
            <p>This link is personal and should not be shared.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `Essay Embassy <${process.env.SMTP_USER}>`,
      to: email,
      subject: '🎉 Your Answer is Ready - Essay Embassy',
      html: emailContent,
    });

    await record.ref.update({
      email,
      hasEmail: true,
      magicLinkSentAt: FieldValue ? FieldValue.serverTimestamp() : new Date().toISOString(),
    });

    return res.json({ success: true });
  } catch (error) {
    console.error('Send magic link error:', error);
    return res.status(500).json({ error: 'Failed to send magic link' });
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

app.get('/sitemap.xml', async (req, res) => {
  try {
    if (!cachedStaticSitemap) {
      try {
        cachedStaticSitemap = fs.readFileSync(staticSitemapPath, 'utf8');
      } catch (error) {
        console.warn('Unable to read static sitemap on demand:', error.message);
      }
    }

    const qaEntries = await buildQaSitemapEntries();
    const qaXml = qaEntries
      .map(
        (entry) => `  <url>
    <loc>${FRONTEND_SITE_URL}/question/${encodeURIComponent(entry.questionNumber)}/${encodeURIComponent(entry.slug)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
      )
      .join('\n');

    let baseXml =
      cachedStaticSitemap && cachedStaticSitemap.includes('</urlset>')
        ? cachedStaticSitemap
        : DEFAULT_SITEMAP_XML;

    if (qaXml) {
      const closingTag = '</urlset>';
      if (baseXml.includes(closingTag)) {
        const idx = baseXml.lastIndexOf(closingTag);
        baseXml = `${baseXml.slice(0, idx)}${qaXml}\n${closingTag}`;
      } else {
        baseXml = DEFAULT_SITEMAP_XML.replace(
          '</urlset>',
          `${qaXml}\n</urlset>`
        );
      }
    }

    res.type('application/xml').send(baseXml);
  } catch (error) {
    console.error('Failed to serve sitemap.xml:', error);
    res.status(500).type('text/plain').send('Unable to generate sitemap.');
  }
});

// --- Serve Vite build ---
const dist = path.join(process.cwd(), 'dist');
app.use(express.static(dist));
app.get('*', (_, res) => res.sendFile(path.join(dist, 'index.html')));

// --- Start ---
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Razorpay backend listening on port ${PORT}`);
}); 
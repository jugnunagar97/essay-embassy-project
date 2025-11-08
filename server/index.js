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

// Geo-blocking middleware to block India (IN) and Pakistan (PK)
const BLOCKED_COUNTRIES = ['IN', 'PK'];

async function getCountryFromIP(ip) {
  try {
    // Try multiple free IP geolocation services
    const services = [
      `https://ipapi.co/${ip}/json/`,
      `https://ip-api.com/json/${ip}?fields=countryCode`,
    ];

    for (const service of services) {
      try {
        // Create timeout controller for fetch
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch(service, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          const countryCode = data.country_code || data.countryCode;
          if (countryCode) {
            return countryCode.toUpperCase();
          }
        }
      } catch (e) {
        // Try next service
        continue;
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting country from IP:', error);
    return null;
  }
}

function getClientIP(req) {
  // Check various headers for the real client IP
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
         req.headers['x-real-ip'] ||
         req.headers['cf-connecting-ip'] ||
         req.connection?.remoteAddress ||
         req.socket?.remoteAddress ||
         req.ip ||
         'unknown';
}

// Geo-blocking middleware
app.use(async (req, res, next) => {
  // Skip geo-blocking for health check endpoint
  if (req.path === '/' && req.method === 'GET') {
    return next();
  }

  const clientIP = getClientIP(req);
  
  // Skip localhost/private IPs in development
  if (clientIP === '::1' || clientIP === '127.0.0.1' || clientIP.startsWith('192.168.') || clientIP.startsWith('10.') || clientIP.startsWith('172.')) {
    return next();
  }

  try {
    const countryCode = await getCountryFromIP(clientIP);
    
    if (countryCode && BLOCKED_COUNTRIES.includes(countryCode)) {
      console.log(`Blocked request from ${countryCode} (IP: ${clientIP})`);
      // Return a generic error that looks like a network failure
      return res.status(503).json({ 
        error: 'Service unavailable',
        message: 'This service is temporarily unavailable in your region.'
      });
    }
  } catch (error) {
    // If geo-check fails, allow the request (fail open)
    // Change to 'return res.status(503)...' if you want to block on error
    console.error('Geo-blocking check failed:', error);
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
  
  try {
    const options = {
      amount: Math.round(amount * 100), // amount in paise/cents
      currency: currency,
      receipt: receipt || `order_${Date.now()}`,
      notes: notes,
    };
    
    const order = await razorpay.orders.create(options);
    console.log('Razorpay order created:', order.id);
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
    console.error('Razorpay error:', err);
    res.status(500).json({ error: 'Failed to create Razorpay order.' });
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

// --- Serve Vite build ---
const dist = path.join(process.cwd(), 'dist');
app.use(express.static(dist));
app.get('*', (_, res) => res.sendFile(path.join(dist, 'index.html')));

// --- Start ---
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Razorpay backend listening on port ${PORT}`);
}); 
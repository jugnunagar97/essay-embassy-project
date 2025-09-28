import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
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
      amount: Math.round(amount * 100), // amount in paise
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

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Razorpay backend listening on port ${PORT}`);
}); 
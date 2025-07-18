import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import crypto from 'crypto';
dotenv.config();

const app = express();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Initialize Firebase Admin SDK (if not already initialized)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}
const firestore = admin.firestore();

// Create Razorpay Order
app.post('/create-order', async (req, res) => {
  const { price, qaId, userId } = req.body;
  if (!price || !qaId || !userId) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  try {
    const options = {
      amount: Math.round(price * 100), // amount in paise
      currency: 'INR',
      receipt: `qa_${qaId}_${Date.now()}`,
      notes: { qaId, userId },
    };
    const order = await razorpay.orders.create(options);
    res.json({ order });
  } catch (err) {
    console.error('Razorpay error:', err);
    res.status(500).json({ error: 'Failed to create Razorpay order.' });
  }
});

// Razorpay Webhook Endpoint
app.post('/razorpay-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers['x-razorpay-signature'];
  const body = req.body;

  // Verify signature
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(req.body)
    .digest('hex');

  if (signature !== expectedSignature) {
    return res.status(400).send('Invalid signature');
  }

  const event = JSON.parse(body);

  if (event.event === 'payment.captured') {
    const payment = event.payload.payment.entity;
    const qaId = payment.notes.qaId;
    const userId = payment.notes.userId;
    if (qaId && userId) {
      const purchaseDocId = `${userId}_${qaId}`;
      await firestore.collection('purchases').doc(purchaseDocId).set({
        userId,
        qaId,
        purchasedAt: new Date().toISOString(),
        paymentId: payment.id,
        amount: payment.amount,
      });
    }
  }
  res.status(200).send('Webhook received');
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Razorpay backend listening on port ${PORT}`);
}); 
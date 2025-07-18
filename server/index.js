import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

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

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Razorpay backend listening on port ${PORT}`);
}); 
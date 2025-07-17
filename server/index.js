import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Create Stripe Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  const { price, qaId, userId } = req.body;
  if (!price || !qaId || !userId) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Q&A Solution #${qaId}`,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      metadata: { qaId, userId },
      success_url: 'http://localhost:5173/qa-library/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/qa-library/cancel',
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: 'Failed to create checkout session.' });
  }
});

// Stripe webhook endpoint (to be implemented)
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  // TODO: Handle Stripe webhook events
  res.status(200).send('ok');
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Stripe backend listening on port ${PORT}`);
}); 
import express from "express";
import Stripe from "stripe";
import { config } from "dotenv";
config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Medical Appointment",
              description: "Appointment Booking Fee",
            },
            unit_amount: 2000,  
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL_ONE}/payment-success`,
      cancel_url: `${process.env.FRONTEND_URL_ONE}/payment-cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

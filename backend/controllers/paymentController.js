// backend/controllers/paymentController.js
import Stripe from "stripe";

export const createCheckoutSession = async (req, res) => {
  try {
    // Initialize Stripe AFTER dotenv has been loaded in server.js
    const apiKey = process.env.STRIPE_SECRET_KEY || "";
    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "Stripe secret key not configured" });
    }
    const stripe = new Stripe(apiKey, { apiVersion: "2024-06-20" });

    const { items = [], customerEmail } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

    // Expect each item to have: name, size (optional), price (in LKR), quantity
    const line_items = items.map((it) => ({
      price_data: {
        currency: "lkr", // ✅ change to Sri Lankan Rupees
        product_data: {
          name: it.size ? `${it.name} (${it.size})` : it.name,
        },
        // Stripe requires smallest unit → cents (but LKR has no decimals, so multiply by 100 anyway)
        unit_amount: Math.round(Number(it.price) * 100),
      },
      quantity: Number(it.quantity || 1),
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_email: customerEmail,
      success_url:
        "http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/checkout/cancel",
      metadata: { source: "belmio-demo" },
    });

    return res.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err);
    return res
      .status(500)
      .json({ error: "Failed to create checkout session" });
  }
};

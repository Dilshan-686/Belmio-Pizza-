// backend/controllers/webhookController.js
import Stripe from "stripe";
import { sendReceiptEmail } from "../utils/mailer.js";

export async function handleStripeWebhook(req, res) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: "2024-06-20",
    });

    const signature = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

    if (!endpointSecret) {
      console.error("Missing STRIPE_WEBHOOK_SECRET");
      return res.status(500).send("Webhook secret not configured");
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const sessionId = event.data.object.id;
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items"],
      });

      const email =
        session.customer_details?.email || session.customer_email || null;

      const items = (session.line_items?.data || []).map((li) => ({
        description: li.description,
        quantity: li.quantity,
        amount: (li.amount_subtotal ?? 0) / 100, 
      }));

      const total = (session.amount_total ?? 0) / 100; 

      if (email) {
        await sendReceiptEmail({
          to: email,
          items,
          total,
          sessionId,
        });
        console.log(`📧 Sent receipt to ${email} for LKR ${total}`);
      } else {
        console.warn("No email on session; skipping receipt.");
      }
    }

    res.json({ received: true });
  } catch (e) {
    console.error("Webhook handler error:", e);
    res.status(500).send("Internal webhook error");
  }
}

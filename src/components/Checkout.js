// src/components/Checkout.js
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const { cartItems, totalPrice } = useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    try {
      if (!cartItems?.length) {
        toast.error("Your cart is empty.");
        return;
      }
      if (!email) {
        toast.error("Please enter your email.");
        return;
      }

      setLoading(true);

      const body = {
        customerEmail: email,
        items: cartItems.map((ci) => ({
          name: ci.name,
          size: ci.size,
          price: ci.price,
          quantity: ci.quantity,
        })),
      };

      const res = await fetch("http://localhost:4000/api/payments/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (data.id) {
        // Preferred: redirect by sessionId via Stripe.js
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
        if (error) {
          toast.error(error.message || "Stripe redirection failed.");
        }
      } else if (data.url) {
        // Fallback: open the hosted checkout URL
        window.location.href = data.url;
      } else {
        toast.error("Failed to create checkout session.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong starting checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        {cartItems?.map((ci) => (
          <div key={`${ci._id}-${ci.size}`} className="flex justify-between py-2 border-b">
            <div>
              <div className="font-medium">{ci.name} {ci.size ? `(${ci.size})` : ""}</div>
              <div className="text-sm text-gray-500">Qty: {ci.quantity}</div>
            </div>
            <div className="font-medium">RS. {(ci.price * ci.quantity).toFixed(2)}</div>
          </div>
        ))}
        <div className="flex justify-between mt-4 text-lg font-bold">
          <span>Total</span>
          <span>RS. {Number(totalPrice || 0).toFixed(2)}</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Demo note: We charge in <strong>USD</strong> on Stripe test mode to avoid currency issues.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <label className="block text-sm font-medium mb-1">Email for receipt</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handlePay}
          disabled={loading}
          className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded"
        >
          {loading ? "Redirecting…" : "Pay with Stripe (Demo)"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;

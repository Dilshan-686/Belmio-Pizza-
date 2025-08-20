// src/components/CheckoutCancel.js
import React from "react";
import { Link } from "react-router-dom";

const CheckoutCancel = () => (
  <div className="max-w-xl mx-auto p-6 text-center">
    <h1 className="text-3xl font-bold text-red-600">Payment Canceled</h1>
    <p className="mt-2">You can try again whenever you’re ready.</p>
    <Link to="/cart" className="inline-block mt-6 text-orange-600 underline">Back to Cart</Link>
  </div>
);

export default CheckoutCancel;

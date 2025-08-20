// src/components/CheckoutSuccess.js
import React from "react";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => (
  <div className="max-w-xl mx-auto p-6 text-center">
    <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
    <p className="mt-2">Thanks for your order. (Demo mode)</p>
    <Link to="/" className="inline-block mt-6 text-orange-600 underline">Back to Home</Link>
  </div>
);

export default CheckoutSuccess;

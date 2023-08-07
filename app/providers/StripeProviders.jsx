"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const StripeProviders = ({ children }) => {
  return (
    <Elements
      stripe={loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)}
    >
      {children}
    </Elements>
  );
};

export default StripeProviders;

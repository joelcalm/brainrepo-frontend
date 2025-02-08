// src/pages/Plan.tsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useAuth } from "@/contexts/AuthContext";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Plan() {
  const { user } = useAuth();
  const currentPlan = "Free";
  const remainingCredits = 10;

  // Define your plan tiers
  const tiers = [
    {
      name: "Pro",
      id: "pro",
      priceMonthly: "9€",
      description: "Get 30 summaries per month",
      features: ["30 summaries per month"],
      featured: true, // Pro is the featured (main) plan
    },
    {
      name: "Legend",
      id: "legend",
      priceMonthly: "19€",
      features: ["Unlimited summaries"],
      featured: false,
    },
  ];

  // Handle checkout with Stripe: call your backend API to create a checkout session.
  const handleCheckout = async (planId: string) => {
    if (!user) {
      alert("Please log in first!");
      return;
    }

    try {
      const response = await fetch("https://api.brainrepo.es/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          planId: planId,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }
      const data = await response.json();
      // Redirect the user to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert("Something went wrong creating the checkout session.");
    }
  };

  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      {/* Return to Home Button */}
      <Link
        to="/"
        className="absolute top-4 left-4 text-indigo-600 font-semibold hover:text-indigo-800"
      >
        &larr; Home
      </Link>

      {/* Background Effect */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>

      {/* Header: Current Plan and Credits Remaining */}
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-lg font-semibold text-indigo-600">
          Current Plan: <span className="text-gray-900">{currentPlan}</span>
        </h2>
        <p className="mt-2 text-xl font-medium text-gray-900">
          Credits Remaining: <span className="font-bold">{remainingCredits}</span>
        </p>
        <p className="mt-6 text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
          Upgrade Your Plan
        </p>
      </div>
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg font-medium text-gray-600">
        Choose a plan that fits your needs and unlock more features.
      </p>

      {/* Plan Options */}
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? "relative bg-gray-900 shadow-2xl transform scale-105"
                : "bg-white/60",
              tier.featured
                ? ""
                : tierIdx === 0
                ? "rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl"
                : "sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none",
              "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10"
            )}
          >
            <h3
              id={tier.id}
              className={classNames(
                tier.featured ? "text-indigo-400" : "text-indigo-600",
                "text-base font-semibold"
              )}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? "text-white" : "text-gray-900",
                  "text-5xl font-semibold tracking-tight"
                )}
              >
                {tier.priceMonthly}
              </span>
              <span
                className={classNames(
                  tier.featured ? "text-gray-400" : "text-gray-500",
                  "text-base"
                )}
              >
                /month
              </span>
            </p>
            {tier.description && (
              <p
                className={classNames(
                  tier.featured ? "text-gray-300" : "text-gray-600",
                  "mt-6 text-base"
                )}
              >
                {tier.description}
              </p>
            )}
            <ul
              role="list"
              className={classNames(
                tier.featured ? "text-gray-300" : "text-gray-600",
                "mt-8 space-y-3 text-sm"
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={classNames(
                      tier.featured ? "text-indigo-400" : "text-indigo-600",
                      "h-6 w-5 flex-none"
                    )}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleCheckout(tier.id)}
              className="mt-8 block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Upgrade to {tier.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

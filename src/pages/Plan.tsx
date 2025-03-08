// src/pages/Plan.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useAuth } from "@/contexts/AuthContext";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Plan() {
  const { user } = useAuth();
  const [currentPlan, setCurrentPlan] = useState("Free");
  const [remainingCredits, setRemainingCredits] = useState(5);

  // Define your plan tiers
  const tiers = [
    {
      name: "Pro",
      id: "pro",
      priceMonthly: "9€",
      description: "Get 30 summaries per month",
      features: ["30 summaries per month"],
      featured: true, // Pro is featured, container remains black
      paymentLink: "https://buy.stripe.com/eVaaIafyhckogeY3cc",
    },
    {
      name: "Legend",
      id: "legend",
      priceMonthly: "19€",
      features: ["Unlimited summaries"],
      featured: false,
      paymentLink: "https://buy.stripe.com/28o17Aeud98ce6QaEF",
    },
  ];

  useEffect(() => {
    if (user && user.email) {
      fetch(`https://api.brainrepo.es/user-info?email=${user.email}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch user info");
          }
          return res.json();
        })
        .then((data) => {
          const planName = data.plan
            ? data.plan.charAt(0).toUpperCase() + data.plan.slice(1)
            : "Free";
          setCurrentPlan(planName);
          setRemainingCredits(data.credits);
        })
        .catch((err) => console.error("Error fetching user info:", err));
    }
  }, [user]);

  // Instead of calling your backend, redirect directly to the Payment Link.
  const handlePaymentLinkRedirect = (paymentLink: string) => {
    if (!user) {
      alert("Please log in first!");
      return;
    }
    window.location.href = paymentLink;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 animate-gradient bg-[length:200%_200%] relative isolate px-6 py-24 sm:py-32 lg:px-8">
      {/* Return to Home Button */}
      <Link
        to="/"
        className="absolute top-4 left-4 text-indigo-600 font-semibold hover:text-indigo-800"
      >
        &larr; Home
      </Link>

      {/* Header: Current Plan & Credits */}
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-lg font-semibold text-indigo-600">
          Current Plan: <span className="text-gray-900">{currentPlan}</span>
        </h2>
        <p className="mt-2 text-xl font-medium text-gray-900">
          Credits Remaining: <span className="font-bold">{remainingCredits}</span>
        </p>
        <h1 className="mt-6 title">Upgrade Your Plan</h1>
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
            {/* Only show description for non-Pro plans */}
            {tier.description && tier.id !== "pro" && (
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
              onClick={() => handlePaymentLinkRedirect(tier.paymentLink)}
              className="mt-8 block w-full rounded-md button-primary whitespace-nowrap text-center text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Upgrade to {tier.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Explore ideas and understand how IdeaCoach works",
    icon: Zap,
    features: [
      "Limited idea exploration",
      "Basic personalization",
      "High-level project ideas",
      "Generic difficulty matching",
      "Community-based learning",
    ],
    cta: "Try IdeaCoach",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹99",
    period: "/month",
    description: "Focused idea generation with clarity and direction",
    icon: Crown,
    features: [
      "30 idea generation credits per month",
      "Strong personalization to your skills & goals",
      "Difficulty matched to your real experience",
      "Problem-first idea selection",
      "Clear, build-ready project direction",
      "Tech stack–aware suggestions",
    ],
    cta: "Get 30 Credits",
    popular: true,
  },
];


export default function Pricing() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      {/* Header - matching hero style */}
      <div className="space-y-6 text-center mb-16">
        {/* Badge with animation */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-secondary/50 border border-border backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
          </span>
          <span className="text-sm font-medium text-foreground/90">
            Simple pricing
          </span>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight text-balance">
            Choose your plan
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-muted-foreground leading-[1.1] tracking-tight">
            Start free. Upgrade when you need more.
          </p>
        </div>

        {/* Description */}
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Whether you&apos;re just exploring or building seriously, we have a plan
          that fits your needs.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl border backdrop-blur-sm p-8 flex flex-col transition-all duration-300 hover:shadow-lg ${
              plan.popular
                ? "border-primary/50 bg-primary/5 hover:border-primary"
                : "border-border/50 bg-secondary/20 hover:bg-secondary/30"
            }`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              </div>
            )}

            {/* Plan Header */}
            <div className="flex items-start gap-4 mb-6">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  plan.popular
                    ? "bg-primary/20 text-primary"
                    : "bg-secondary text-foreground"
                }`}
              >
                <plan.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8 flex-grow">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                      plan.popular ? "bg-primary/20" : "bg-chart-2/20"
                    }`}
                  >
                    <Check
                      className={`w-3 h-3 ${
                        plan.popular ? "text-primary" : "text-chart-2"
                      }`}
                    />
                  </div>
                  <span className="text-foreground/80 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Button
              size="lg"
              className={`w-full h-12 font-semibold transition-all duration-300 ${
                plan.popular
                  ? "shadow-lg shadow-primary/20 hover:shadow-primary/30"
                  : "bg-transparent"
              }`}
              variant={plan.popular ? "default" : "outline"}
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>

      {/* Closing Statement */}
      <div className="mt-16 text-center space-y-4">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-secondary/50 border border-border backdrop-blur-sm">
          <span className="text-lg font-semibold text-foreground">
            No credit card required for free plan
          </span>
        </div>
        <p className="text-muted-foreground">
          Cancel anytime. No questions asked.
        </p>
      </div>
    </section>
  );
}

import type { Meta, StoryObj } from "@storybook/react";
import { PricingSection } from "@/components/sections/pricing-section";

const meta: Meta<typeof PricingSection> = {
  title: "Sections/PricingSection",
  component: PricingSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof PricingSection>;

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    description: "Perfect for individuals and small projects.",
    features: ["5,000 requests/month", "1 user", "Community support", "REST API"],
    cta: "Get started",
    ctaHref: "/login",
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For growing teams with more usage.",
    features: ["100,000 requests/month", "10 users", "Priority support", "REST API + Webhooks", "Advanced analytics"],
    cta: "Start 14-day trial",
    ctaHref: "/login",
    featured: true,
    badge: "Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organisations with specific needs.",
    features: ["Unlimited requests", "Unlimited users", "Guaranteed SLA", "24/7 dedicated support", "SSO + SAML", "Audit logs"],
    cta: "Contact us",
    ctaHref: "/contact",
  },
];

export const Default: Story = {
  args: {
    eyebrow: "Pricing",
    title: "Simple and transparent.",
    description: "No hidden fees. Cancel anytime.",
    plans,
  },
};

export const TwoPlans: Story = {
  args: {
    eyebrow: "Pricing",
    title: "Choose your plan.",
    plans: [plans[0], { ...plans[1], featured: false }],
  },
};

export const NoHeader: Story = {
  args: {
    plans,
  },
};

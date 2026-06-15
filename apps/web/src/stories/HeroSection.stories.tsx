import type { Meta, StoryObj } from "@storybook/react";
import { HeroSection } from "@/components/sections/hero-section";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof HeroSection> = {
  title: "Sections/HeroSection",
  component: HeroSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["centered", "split", "dark", "minimal"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

const DefaultActions = () => (
  <>
    <Button size="lg">Get started</Button>
    <Button size="lg" variant="outline">Learn more</Button>
  </>
);

export const Centered: Story = {
  args: {
    variant: "centered",
    eyebrow: "New — Version 2.0",
    title: "The platform that simplifies your workflow.",
    description: "Save 10 hours per week. Integrate in 5 minutes. No credit card required.",
    actions: <DefaultActions />,
  },
};

export const Split: Story = {
  args: {
    variant: "split",
    eyebrow: "Professional services",
    title: "Take care of yourself. We handle the rest.",
    description: "Book appointments, manage your schedule, accept payments — all in one place.",
    actions: <DefaultActions />,
    media: (
      <div className="border bg-card rounded-lg p-6">
        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide font-medium">Dashboard preview</p>
        <div className="grid grid-cols-2 gap-3">
          {[{ label: "Revenue", value: "$24,890" }, { label: "Clients", value: "1,247" }, { label: "Bookings", value: "342" }, { label: "Rating", value: "4.9/5" }].map((m) => (
            <div key={m.label} className="bg-muted rounded p-3">
              <p className="text-lg font-semibold">{m.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

export const Dark: Story = {
  args: {
    variant: "dark",
    eyebrow: "Premium collection",
    title: "Invest in the right place.",
    description: "Curated properties, neighbourhood scores, yields calculated. Real estate made simple.",
    actions: (
      <>
        <Button size="lg" className="bg-background text-foreground hover:bg-background/90">Search properties</Button>
        <Button size="lg" variant="glass">Estimate my property</Button>
      </>
    ),
  },
};

export const Minimal: Story = {
  args: {
    variant: "minimal",
    title: "A focused, minimal hero.",
    description: "Great for landing pages that want to let content breathe.",
    actions: <DefaultActions />,
  },
};

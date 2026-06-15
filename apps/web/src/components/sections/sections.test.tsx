import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CTASection } from "./cta-section";
import { FAQSection } from "./faq-section";
import { FeatureGrid } from "./feature-grid";
import { HeroSection } from "./hero-section";
import { PricingSection } from "./pricing-section";
import { StatsSection } from "./stats-section";
import { TestimonialSection } from "./testimonial-section";

// ---------------------------------------------------------------------------
// HeroSection
// ---------------------------------------------------------------------------
describe("HeroSection", () => {
  it("renders title and description (centered default)", () => {
    render(<HeroSection title="Hero title" description="Hero description" />);
    expect(screen.getByRole("heading", { name: "Hero title" })).toBeTruthy();
    expect(screen.getByText("Hero description")).toBeTruthy();
  });

  it("renders eyebrow when provided", () => {
    render(<HeroSection title="Title" eyebrow="New release" />);
    expect(screen.getByText("New release")).toBeTruthy();
  });

  it("renders actions slot", () => {
    render(<HeroSection title="Title" actions={<button>Get started</button>} />);
    expect(screen.getByRole("button", { name: "Get started" })).toBeTruthy();
  });

  it("split variant renders media slot", () => {
    render(
      <HeroSection title="Split hero" variant="split" media={<div>Media content</div>} />,
    );
    expect(screen.getByRole("heading", { name: "Split hero" })).toBeTruthy();
    expect(screen.getByText("Media content")).toBeTruthy();
  });

  it("dark variant renders title", () => {
    render(<HeroSection title="Dark hero" variant="dark" description="Dark desc" />);
    expect(screen.getByRole("heading", { name: "Dark hero" })).toBeTruthy();
    expect(screen.getByText("Dark desc")).toBeTruthy();
  });

  it("minimal variant renders title and hides unset optional fields", () => {
    render(<HeroSection title="Minimal hero" variant="minimal" />);
    expect(screen.getByRole("heading", { name: "Minimal hero" })).toBeTruthy();
  });

  it("does not render eyebrow when omitted", () => {
    render(<HeroSection title="No eyebrow" />);
    expect(screen.queryByText("New release")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// FeatureGrid
// ---------------------------------------------------------------------------
describe("FeatureGrid", () => {
  const features = [
    { title: "Speed", description: "Processes in under 200ms." },
    { title: "Security", description: "AES-256 encryption." },
    { title: "Analytics", description: "Real-time dashboards." },
  ];

  it("renders all feature titles and descriptions", () => {
    render(<FeatureGrid features={features} />);
    expect(screen.getByText("Speed")).toBeTruthy();
    expect(screen.getByText("Processes in under 200ms.")).toBeTruthy();
    expect(screen.getByText("Security")).toBeTruthy();
    expect(screen.getByText("Analytics")).toBeTruthy();
  });

  it("renders optional eyebrow and title", () => {
    render(<FeatureGrid features={features} eyebrow="Features" title="What we offer" />);
    expect(screen.getByText("Features")).toBeTruthy();
    expect(screen.getByText("What we offer")).toBeTruthy();
  });

  it("renders icon-left variant", () => {
    render(<FeatureGrid features={features} variant="icon-left" />);
    expect(screen.getByText("Speed")).toBeTruthy();
  });

  it("renders list variant", () => {
    render(<FeatureGrid features={features} variant="list" />);
    expect(screen.getByText("Security")).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// PricingSection
// ---------------------------------------------------------------------------
describe("PricingSection", () => {
  const plans = [
    {
      name: "Free",
      price: "0€",
      description: "For individuals.",
      features: ["5k requests", "1 user"],
      cta: "Start free",
    },
    {
      name: "Pro",
      price: "49€",
      period: "/mo",
      description: "For teams.",
      features: ["100k requests", "10 users", "Webhooks"],
      cta: "Try Pro",
      featured: true,
      badge: "Popular",
    },
  ];

  it("renders plan names and prices", () => {
    render(<PricingSection plans={plans} />);
    expect(screen.getByText("Free")).toBeTruthy();
    expect(screen.getByText("0€")).toBeTruthy();
    expect(screen.getByText("Pro")).toBeTruthy();
    expect(screen.getByText("49€")).toBeTruthy();
  });

  it("renders all feature list items", () => {
    render(<PricingSection plans={plans} />);
    expect(screen.getByText("Webhooks")).toBeTruthy();
  });

  it("renders badge on featured plan", () => {
    render(<PricingSection plans={plans} />);
    expect(screen.getByText("Popular")).toBeTruthy();
  });

  it("renders section header when provided", () => {
    render(<PricingSection plans={plans} eyebrow="Pricing" title="Simple and transparent" />);
    expect(screen.getByText("Pricing")).toBeTruthy();
    expect(screen.getByText("Simple and transparent")).toBeTruthy();
  });

  it("renders CTA buttons", () => {
    render(<PricingSection plans={plans} />);
    expect(screen.getByRole("button", { name: "Start free" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Try Pro" })).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// StatsSection
// ---------------------------------------------------------------------------
describe("StatsSection", () => {
  const stats = [
    { value: "12k+", label: "Active users" },
    { value: "99.9%", label: "Uptime" },
    { value: "180ms", label: "Avg latency" },
  ];

  it("renders values and labels (grid default)", () => {
    render(<StatsSection stats={stats} />);
    expect(screen.getByText("12k+")).toBeTruthy();
    expect(screen.getByText("Active users")).toBeTruthy();
    expect(screen.getByText("99.9%")).toBeTruthy();
  });

  it("renders strip variant", () => {
    render(<StatsSection stats={stats} variant="strip" />);
    expect(screen.getByText("180ms")).toBeTruthy();
    expect(screen.getByText("Avg latency")).toBeTruthy();
  });

  it("renders dark variant", () => {
    render(<StatsSection stats={stats} variant="dark" />);
    expect(screen.getByText("12k+")).toBeTruthy();
  });

  it("renders optional description per stat", () => {
    render(
      <StatsSection
        stats={[{ value: "4.9", label: "Rating", description: "Out of 5 stars" }]}
      />,
    );
    expect(screen.getByText("Out of 5 stars")).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// CTASection
// ---------------------------------------------------------------------------
describe("CTASection", () => {
  it("renders title and description", () => {
    render(<CTASection title="Ready to start?" description="Join thousands of teams." />);
    expect(screen.getByRole("heading", { name: "Ready to start?" })).toBeTruthy();
    expect(screen.getByText("Join thousands of teams.")).toBeTruthy();
  });

  it("renders actions slot", () => {
    render(<CTASection title="CTA" actions={<button>Sign up</button>} />);
    expect(screen.getByRole("button", { name: "Sign up" })).toBeTruthy();
  });

  it.each(["default", "dark", "muted", "border"] as const)(
    "%s variant renders without error",
    (variant) => {
      render(<CTASection title={`${variant} title`} variant={variant} />);
      expect(screen.getByRole("heading", { name: `${variant} title` })).toBeTruthy();
    },
  );
});

// ---------------------------------------------------------------------------
// TestimonialSection
// ---------------------------------------------------------------------------
describe("TestimonialSection", () => {
  const testimonials = [
    { quote: "Shipped in 3 days.", author: "Alice", role: "CTO" },
    { quote: "Best boilerplate.", author: "Bob", role: "Developer" },
  ];

  it("renders all quotes and authors (grid default)", () => {
    render(<TestimonialSection testimonials={testimonials} />);
    expect(screen.getByText(/Shipped in 3 days/)).toBeTruthy();
    expect(screen.getByText("Alice")).toBeTruthy();
    expect(screen.getByText("CTO")).toBeTruthy();
    expect(screen.getByText(/Best boilerplate/)).toBeTruthy();
    expect(screen.getByText("Bob")).toBeTruthy();
  });

  it("renders optional eyebrow and title", () => {
    render(
      <TestimonialSection
        testimonials={testimonials}
        eyebrow="Reviews"
        title="What teams say"
      />,
    );
    expect(screen.getByText("Reviews")).toBeTruthy();
    expect(screen.getByText("What teams say")).toBeTruthy();
  });

  it("centered variant shows only first testimonial", () => {
    render(<TestimonialSection testimonials={testimonials} variant="centered" />);
    expect(screen.getByText(/Shipped in 3 days/)).toBeTruthy();
    expect(screen.getByText("Alice")).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// FAQSection
// ---------------------------------------------------------------------------
describe("FAQSection", () => {
  const items = [
    { question: "How does it work?", answer: "Clone, configure, deploy." },
    { question: "Is there a free tier?", answer: "Yes, always free up to 5k requests." },
  ];

  it("renders all questions and answers", () => {
    render(<FAQSection items={items} />);
    expect(screen.getByText("How does it work?")).toBeTruthy();
    expect(screen.getByText("Clone, configure, deploy.")).toBeTruthy();
    expect(screen.getByText("Is there a free tier?")).toBeTruthy();
    expect(screen.getByText("Yes, always free up to 5k requests.")).toBeTruthy();
  });

  it("renders optional eyebrow and title", () => {
    render(<FAQSection items={items} eyebrow="FAQ" title="Common questions" />);
    expect(screen.getByText("FAQ")).toBeTruthy();
    expect(screen.getByText("Common questions")).toBeTruthy();
  });

  it("renders without header fields", () => {
    render(<FAQSection items={items} />);
    expect(screen.queryByRole("heading")).toBeNull();
  });
});

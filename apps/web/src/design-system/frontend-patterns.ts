/**
 * Frontend Pattern Library
 *
 * A pattern is higher-level than a component.
 * It describes a combination of components, a UX intention and a client context.
 * Agents use patterns to avoid assembling pages without direction.
 */

import { DESIGN_PROFILES } from "./design-profiles";
import { DESIGN_RECIPES } from "./design-recipes";
import { UI_QUALITY_LEVELS, type UiQualityLevelId } from "./ui-quality-levels";

export interface FrontendPattern {
  id: string;
  label: string;
  description: string;
  userIntent: string;
  businessGoal: string;
  recommendedProfiles: string[];
  recommendedRecipes: string[];
  qualityLevel: UiQualityLevelId;
  components: string[];
  requiredStates: string[];
  accessibilityNotes: string[];
  responsiveNotes: string[];
  conversionNotes: string[];
  avoidWhen: string[];
  testChecklist: string[];
}

export const FRONTEND_PATTERNS: Record<string, FrontendPattern> = {
  "hero-trust-bar": {
    id: "hero-trust-bar",
    label: "Hero + Trust Bar",
    description: "Full-width hero with headline, sub-copy and CTA, followed immediately by a logo cloud or trust signal row.",
    userIntent: "Understand what the product does and feel confident enough to proceed",
    businessGoal: "Reduce bounce, establish credibility, capture first click",
    recommendedProfiles: ["premium-saas", "commerce-clean"],
    recommendedRecipes: ["premium-saas", "ecommerce-clean"],
    qualityLevel: "premium",
    components: ["HeroSection", "LogoCloud", "ShimmerBadge", "Button"],
    requiredStates: ["default"],
    accessibilityNotes: [
      "Hero heading must be h1",
      "CTA must have descriptive text (not just 'Click here')",
      "Logo cloud logos must have title or aria-label",
    ],
    responsiveNotes: [
      "Hero stacks vertically on mobile",
      "Trust bar wraps logos on mobile",
      "CTA is full-width on mobile",
    ],
    conversionNotes: [
      "Primary CTA above the fold",
      "Trust signal immediately after hero",
      "No competing CTAs in the hero",
    ],
    avoidWhen: ["dashboard inner pages", "legal or documentation pages"],
    testChecklist: [
      "h1 is present and descriptive",
      "CTA is visible without scrolling on 1024px",
      "Mobile no overflow",
      "Logo images have accessible names",
    ],
  },

  "hero-proof-cta": {
    id: "hero-proof-cta",
    label: "Hero + Social Proof + CTA",
    description: "Hero with embedded testimonial, rating or stat to reduce friction before the primary CTA.",
    userIntent: "Validate that others have succeeded before committing",
    businessGoal: "Increase trial/signup conversion by reducing doubt",
    recommendedProfiles: ["premium-saas", "warm-local"],
    recommendedRecipes: ["premium-saas", "warm-booking"],
    qualityLevel: "conversion",
    components: ["HeroSection", "StatsSection", "Button", "ShimmerBadge"],
    requiredStates: ["default"],
    accessibilityNotes: [
      "Statistics must be readable as text, not image",
      "Testimonial author must be identified",
    ],
    responsiveNotes: [
      "Stats stack in a 2-col grid on mobile",
      "Testimonial truncates gracefully on small screens",
    ],
    conversionNotes: [
      "Show a concrete number (users, rating, revenue saved)",
      "CTA must be visible below the proof element",
    ],
    avoidWhen: ["developer-tool pages where proof is code examples, not social"],
    testChecklist: [
      "Stat values are real numbers",
      "CTA is keyboard reachable",
      "Mobile 390px no overflow",
    ],
  },

  "feature-bento-metrics": {
    id: "feature-bento-metrics",
    label: "Feature Bento + Metrics",
    description: "Asymmetric feature grid (bento layout) with key metric stats below or aside.",
    userIntent: "Understand what the product does and how well it performs",
    businessGoal: "Educate and build desire before the pricing section",
    recommendedProfiles: ["premium-saas", "dark-technical"],
    recommendedRecipes: ["premium-saas", "dark-api"],
    qualityLevel: "premium",
    components: ["FeatureGrid", "StatsSection", "SpotlightCard"],
    requiredStates: ["default", "hover"],
    accessibilityNotes: [
      "Each feature card must have a heading",
      "Icons must have aria-hidden if decorative",
    ],
    responsiveNotes: [
      "Bento grid collapses to single column on mobile",
      "Metrics reflow to 2-col on mobile",
    ],
    conversionNotes: [
      "Lead with the most compelling feature",
      "Metrics should be verifiable or cited",
    ],
    avoidWhen: ["simple landing pages with fewer than 3 features", "booking-first pages"],
    testChecklist: [
      "Each feature has a heading",
      "Spotlight hover works",
      "Stats are readable",
      "Mobile no overflow",
    ],
  },

  "pricing-faq-guarantee": {
    id: "pricing-faq-guarantee",
    label: "Pricing + FAQ + Guarantee",
    description: "Pricing table followed by FAQ accordion and a money-back or satisfaction guarantee.",
    userIntent: "Compare plans, resolve objections, and reduce purchase risk",
    businessGoal: "Maximize plan selection and reduce drop-off at pricing",
    recommendedProfiles: ["premium-saas", "commerce-clean"],
    recommendedRecipes: ["premium-saas", "ecommerce-clean"],
    qualityLevel: "conversion",
    components: ["PlanComparisonTable", "Accordion", "CTASection", "Badge"],
    requiredStates: ["default", "hover", "focus-visible"],
    accessibilityNotes: [
      "Pricing table must have aria-label or caption",
      "FAQ accordion must be keyboard navigable",
      "Recommended plan must be indicated in text, not only color",
    ],
    responsiveNotes: [
      "Pricing table scrolls horizontally on mobile with sticky first column",
      "FAQ items stack vertically",
    ],
    conversionNotes: [
      "Highlight the recommended plan visually",
      "CTA per plan must be distinct",
      "Guarantee must be in plain language",
    ],
    avoidWhen: ["free-only products", "pages where pricing is not the goal"],
    testChecklist: [
      "Pricing table has accessible name",
      "FAQ keyboard navigation works",
      "CTA per plan is reachable",
      "Mobile horizontal scroll works",
    ],
  },

  "product-grid-filter-drawer": {
    id: "product-grid-filter-drawer",
    label: "Product Grid + Filter Drawer",
    description: "Product card grid with filter bar (desktop) or collapsible filter drawer (mobile).",
    userIntent: "Find and compare products quickly",
    businessGoal: "Increase product discovery and add-to-cart conversion",
    recommendedProfiles: ["commerce-clean"],
    recommendedRecipes: ["ecommerce-clean"],
    qualityLevel: "conversion",
    components: ["ProductCard", "ConfigurableFilterBar", "CartDrawer", "EmptyState", "DataTable"],
    requiredStates: ["loading", "empty", "error", "default"],
    accessibilityNotes: [
      "Filters must be keyboard accessible",
      "Active filters must be visible as text, not only color",
      "Product images must have alt text",
    ],
    responsiveNotes: [
      "Desktop uses inline filter bar",
      "Mobile uses collapsible filter surface or drawer",
      "Product grid is 2-col on mobile, 3-4 col on desktop",
    ],
    conversionNotes: [
      "Show price, rating, stock and primary CTA clearly",
      "Filter active count must be visible",
      "Reset filters path must be clear",
    ],
    avoidWhen: ["catalogs with fewer than 4 products", "service-only pages with no product grid"],
    testChecklist: [
      "Mobile no overflow",
      "Reset filters is visible when active",
      "Product CTA is reachable",
      "Empty state explains next action",
      "Loading state is skeleton, not blank",
    ],
  },

  "real-estate-search-results": {
    id: "real-estate-search-results",
    label: "Real Estate Search Results",
    description: "Property card grid with location filter, price range slider and map toggle.",
    userIntent: "Browse and shortlist properties matching my criteria",
    businessGoal: "Increase inquiry submissions and agent contact",
    recommendedProfiles: ["real-estate-luxe"],
    recommendedRecipes: ["real-estate-premium"],
    qualityLevel: "conversion",
    components: ["PropertyCard", "MortgageCalculator", "ConfigurableFilterBar", "MapEmbed"],
    requiredStates: ["loading", "empty", "default"],
    accessibilityNotes: [
      "Price slider must have aria-valuenow/min/max",
      "Property images must have descriptive alt",
      "Map must have a non-map fallback list",
    ],
    responsiveNotes: [
      "Single column on mobile",
      "Filters collapse on mobile",
      "Map hidden by default on mobile",
    ],
    conversionNotes: [
      "Price and location must be above the fold in each card",
      "Contact agent CTA must be prominent",
      "Mortgage estimate increases commitment perception",
    ],
    avoidWhen: ["non-real-estate pages", "pages with fewer than 3 properties"],
    testChecklist: [
      "Slider aria attributes present",
      "Empty state with suggestion",
      "Contact CTA keyboard reachable",
      "Mobile no overflow",
    ],
  },

  "booking-flow-confirmation": {
    id: "booking-flow-confirmation",
    label: "Booking Flow + Confirmation",
    description: "Multi-step booking form leading to a clear confirmation screen with booking details.",
    userIntent: "Book a service confidently and know what happens next",
    businessGoal: "Complete bookings with minimal abandonment",
    recommendedProfiles: ["warm-local"],
    recommendedRecipes: ["warm-booking"],
    qualityLevel: "conversion",
    components: ["ServicePicker", "BookingForm", "BookingSummaryCard", "BookingStatusTimeline", "BookingReminderPreview"],
    requiredStates: ["default", "loading", "success", "error"],
    accessibilityNotes: [
      "Form fields must have associated labels",
      "Step progress must be announced to screen readers",
      "Error messages must be associated with their fields",
    ],
    responsiveNotes: [
      "Form is single column on mobile",
      "Summary card appears below form on mobile",
      "Confirmation is centered on all sizes",
    ],
    conversionNotes: [
      "Show what the user gets at each step",
      "Confirmation must answer: what, when, where, next step",
      "Allow easy cancellation path",
    ],
    avoidWhen: ["non-booking pages", "pages requiring account creation before booking"],
    testChecklist: [
      "Form labels are associated",
      "Error message is visible and helpful",
      "Success state is clear",
      "Mobile single-column layout",
    ],
  },

  "dashboard-metrics-activity": {
    id: "dashboard-metrics-activity",
    label: "Dashboard Metrics + Activity",
    description: "Top row of metric cards followed by a data table and activity feed.",
    userIntent: "Monitor key numbers and recent changes at a glance",
    businessGoal: "Keep users engaged and returning to the dashboard",
    recommendedProfiles: ["minimal-dashboard"],
    recommendedRecipes: ["minimal-dashboard"],
    qualityLevel: "dashboard",
    components: ["MetricCard", "DataTable", "ActivityFeed", "FilterBar", "DashboardShell"],
    requiredStates: ["loading", "empty", "default"],
    accessibilityNotes: [
      "Metrics must be readable as text (not image or canvas)",
      "Table must have proper headers (scope=col)",
      "Activity feed must be a list (ol or ul)",
    ],
    responsiveNotes: [
      "Metric cards reflow to 2-col on tablet, 1-col on mobile",
      "Table scrolls horizontally on mobile",
      "Activity feed is full width on all sizes",
    ],
    conversionNotes: [
      "Surface most actionable metric first",
      "Trending indicators increase engagement",
    ],
    avoidWhen: ["marketing pages", "landing pages"],
    testChecklist: [
      "Metrics have aria-label",
      "Table aria-sort on sortable columns",
      "Empty states for table and feed",
      "Mobile no overflow",
    ],
  },

  "api-docs-endpoint-grid": {
    id: "api-docs-endpoint-grid",
    label: "API Docs Endpoint Grid",
    description: "Structured documentation page with endpoint cards, code examples and auth instructions.",
    userIntent: "Understand how to integrate the API quickly",
    businessGoal: "Reduce time-to-first-call and support tickets",
    recommendedProfiles: ["dark-technical"],
    recommendedRecipes: ["dark-api"],
    qualityLevel: "technical",
    components: ["EndpointCard", "CodeBlock", "Badge", "ApiStatus", "CopyButton"],
    requiredStates: ["default", "hover"],
    accessibilityNotes: [
      "Code blocks must be keyboard accessible and copyable",
      "HTTP method badges must have text labels",
      "Navigation must support keyboard jump-to-section",
    ],
    responsiveNotes: [
      "Single column on mobile",
      "Code blocks scroll horizontally (no wrap)",
      "Navigation collapses to select on mobile",
    ],
    conversionNotes: [
      "First example must be runnable in under 60 seconds",
      "Auth instructions must be at the top",
    ],
    avoidWhen: ["consumer-facing pages", "non-developer audiences"],
    testChecklist: [
      "Code is syntax highlighted",
      "Copy button works",
      "HTTP method badge is visible",
      "Mobile code blocks scrollable",
    ],
  },

  "local-business-services-reviews": {
    id: "local-business-services-reviews",
    label: "Local Business Services + Reviews",
    description: "Service list with pricing, followed by client reviews and a contact/booking CTA.",
    userIntent: "Evaluate the business and decide to contact or book",
    businessGoal: "Drive phone calls, form submissions or bookings",
    recommendedProfiles: ["warm-local"],
    recommendedRecipes: ["warm-booking"],
    qualityLevel: "conversion",
    components: ["ServiceCard", "TestimonialSection", "CTASection", "ContactForm", "BusinessHours"],
    requiredStates: ["default"],
    accessibilityNotes: [
      "Phone number must be a tel: link",
      "Review stars must have text equivalent",
      "Business address must be in an address element",
    ],
    responsiveNotes: [
      "Services stack vertically on mobile",
      "Contact form is full width on mobile",
      "CTA is sticky on mobile if space permits",
    ],
    conversionNotes: [
      "Show price or price range early",
      "Reviews must include author name and rating",
      "CTA must be above the fold or pinned",
    ],
    avoidWhen: ["ecommerce pages", "SaaS pages", "pages without a physical location"],
    testChecklist: [
      "Phone link works on mobile",
      "Star rating has text",
      "CTA keyboard reachable",
      "Mobile single column",
    ],
  },

  "portfolio-case-study-grid": {
    id: "portfolio-case-study-grid",
    label: "Portfolio Case Study Grid",
    description: "Grid of case study cards with category filters and a featured hero project.",
    userIntent: "Browse past work and assess fit for my project",
    businessGoal: "Build credibility and generate contact inquiries",
    recommendedProfiles: ["creative-portfolio"],
    recommendedRecipes: ["editorial-portfolio"],
    qualityLevel: "editorial",
    components: ["ProcessSteps", "SkillsGrid", "TechStackCloud", "CTASection", "Badge"],
    requiredStates: ["default", "hover"],
    accessibilityNotes: [
      "Project images must have descriptive alt text",
      "Case study links must be keyboard focusable",
      "Category filters must indicate active state in text",
    ],
    responsiveNotes: [
      "2-col on tablet, 1-col on mobile",
      "Featured case study is full width on all sizes",
      "Filters scroll horizontally on mobile",
    ],
    conversionNotes: [
      "Feature the most impressive project first",
      "Show client name or industry if allowed",
      "Contact CTA must appear after browsing, not before",
    ],
    avoidWhen: ["product pages", "SaaS pages", "new professionals with no work to show"],
    testChecklist: [
      "Images have alt text",
      "Active filter is visually distinct",
      "CTA is keyboard reachable",
      "Mobile no overflow",
    ],
  },

  "lead-capture-contact-card": {
    id: "lead-capture-contact-card",
    label: "Lead Capture + Contact Card",
    description: "Short form to capture name, email and message, alongside contact details and social links.",
    userIntent: "Reach out easily and know it will be received",
    businessGoal: "Generate qualified leads and reduce email friction",
    recommendedProfiles: ["warm-local", "premium-saas"],
    recommendedRecipes: ["warm-booking", "premium-saas"],
    qualityLevel: "conversion",
    components: ["ContactForm", "CTASection", "Badge"],
    requiredStates: ["default", "loading", "success", "error"],
    accessibilityNotes: [
      "Form fields must have visible labels",
      "Required fields must be marked",
      "Error messages must reference their field",
    ],
    responsiveNotes: [
      "Form is single column on mobile",
      "Contact details stack below form on mobile",
    ],
    conversionNotes: [
      "Fewer than 5 fields whenever possible",
      "Show expected response time",
      "Success message must confirm receipt",
    ],
    avoidWhen: ["pages with existing booking flow", "pages where chat is the primary contact method"],
    testChecklist: [
      "Form submits with keyboard only",
      "Error state is visible and helpful",
      "Success state confirms submission",
      "Mobile layout correct",
    ],
  },

  "empty-state-recovery": {
    id: "empty-state-recovery",
    label: "Empty State Recovery",
    description: "Well-designed empty state with illustration, human message and a clear recovery action.",
    userIntent: "Understand why nothing is here and know what to do next",
    businessGoal: "Reduce abandonment at empty states by guiding the user",
    recommendedProfiles: ["minimal-dashboard", "premium-saas"],
    recommendedRecipes: ["minimal-dashboard", "premium-saas"],
    qualityLevel: "polished",
    components: ["ActivityFeed", "DataTable", "Button"],
    requiredStates: ["empty"],
    accessibilityNotes: [
      "Empty state icon must be aria-hidden or have alt",
      "Recovery CTA must be keyboard focusable",
    ],
    responsiveNotes: [
      "Centered vertically and horizontally on all sizes",
      "Recovery button is full-width on mobile",
    ],
    conversionNotes: [
      "Explain WHY it is empty (no results, first use, filtered out)",
      "Provide the most likely next action as a button",
    ],
    avoidWhen: ["states where empty is expected and acceptable (blank canvas)"],
    testChecklist: [
      "Icon is accessible",
      "Recovery CTA is visible and clickable",
      "Message is human-readable",
    ],
  },

  "error-state-recovery": {
    id: "error-state-recovery",
    label: "Error State Recovery",
    description: "Clear error display with human message, optional technical details (collapsed) and retry or back action.",
    userIntent: "Understand what went wrong and recover easily",
    businessGoal: "Reduce user frustration and abandoned sessions after errors",
    recommendedProfiles: ["minimal-dashboard", "premium-saas"],
    recommendedRecipes: ["minimal-dashboard", "premium-saas"],
    qualityLevel: "polished",
    components: ["Alert", "Button"],
    requiredStates: ["error"],
    accessibilityNotes: [
      "Error message must use role=alert or aria-live=assertive",
      "Retry button must be keyboard focusable",
    ],
    responsiveNotes: [
      "Error card is full-width on mobile",
      "Technical details expand below on all sizes",
    ],
    conversionNotes: [
      "Human message first, technical details optional and collapsed",
      "Retry action must be one click",
    ],
    avoidWhen: ["404 pages (use a dedicated not-found pattern instead)"],
    testChecklist: [
      "aria-live region announces the error",
      "Retry button works",
      "Message does not expose internal errors",
    ],
  },

  "loading-skeleton-page": {
    id: "loading-skeleton-page",
    label: "Loading Skeleton Page",
    description: "Full-page skeleton that mirrors the layout of the target content to minimize perceived load time.",
    userIntent: "See that content is loading without uncertainty",
    businessGoal: "Reduce perceived load time and bounce from blank pages",
    recommendedProfiles: ["minimal-dashboard", "premium-saas"],
    recommendedRecipes: ["minimal-dashboard", "premium-saas"],
    qualityLevel: "polished",
    components: ["SkeletonCard", "SkeletonTable", "SkeletonMetric", "LoadingState"],
    requiredStates: ["loading"],
    accessibilityNotes: [
      "Skeleton container should have aria-busy=true",
      "Screen reader should announce loading state",
    ],
    responsiveNotes: [
      "Skeleton layout must match the target layout at each breakpoint",
    ],
    conversionNotes: [
      "Skeleton shape should match actual content shape to avoid layout shift",
    ],
    avoidWhen: ["instant data (< 100ms)", "static pages with no async data"],
    testChecklist: [
      "Skeleton matches content layout",
      "aria-busy is present",
      "No layout shift on data load",
      "Reduced-motion: skeleton animates minimally or not at all",
    ],
  },
};

export const FRONTEND_PATTERN_IDS = Object.keys(FRONTEND_PATTERNS);

export function getFrontendPattern(id: string): FrontendPattern | undefined {
  return FRONTEND_PATTERNS[id];
}

export function getPatternsForProfile(profileId: string): FrontendPattern[] {
  return Object.values(FRONTEND_PATTERNS).filter((p) =>
    p.recommendedProfiles.includes(profileId),
  );
}

export function getPatternsForQualityLevel(level: UiQualityLevelId): FrontendPattern[] {
  return Object.values(FRONTEND_PATTERNS).filter((p) => p.qualityLevel === level);
}

// Validate at module load that references are coherent (dev-time guard only)
if (process.env.NODE_ENV === "test") {
  for (const pattern of Object.values(FRONTEND_PATTERNS)) {
    for (const profileId of pattern.recommendedProfiles) {
      if (!DESIGN_PROFILES[profileId]) {
        console.warn(`[frontend-patterns] Pattern "${pattern.id}" references unknown profile "${profileId}"`);
      }
    }
    for (const recipeId of pattern.recommendedRecipes) {
      if (!DESIGN_RECIPES[recipeId]) {
        console.warn(`[frontend-patterns] Pattern "${pattern.id}" references unknown recipe "${recipeId}"`);
      }
    }
    if (!UI_QUALITY_LEVELS[pattern.qualityLevel]) {
      console.warn(`[frontend-patterns] Pattern "${pattern.id}" references unknown quality level "${pattern.qualityLevel}"`);
    }
  }
}

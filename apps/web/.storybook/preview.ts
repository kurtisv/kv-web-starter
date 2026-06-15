import type { Preview, Decorator } from "@storybook/react";
import React from "react";
import "../src/app/globals.css";

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme as string | undefined;
  return React.createElement(
    "div",
    {
      "data-theme": theme && theme !== "none" ? theme : undefined,
      className: "bg-background text-foreground p-6 min-h-screen",
    },
    React.createElement(Story)
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  globalTypes: {
    theme: {
      description: "Global theme",
      defaultValue: "none",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "none", title: "Default" },
          { value: "corporate-classic", title: "Corporate" },
          { value: "premium-saas", title: "Premium SaaS" },
          { value: "luxury-auto", title: "Luxury Auto" },
          { value: "local-business", title: "Local Business" },
          { value: "real-estate", title: "Real Estate" },
          { value: "ecommerce-clean", title: "Ecommerce" },
          { value: "dark-tech-api", title: "Dark Tech" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;

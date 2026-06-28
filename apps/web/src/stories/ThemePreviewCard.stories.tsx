import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { ThemePreviewCard } from "@/components/ui/theme-preview-card";
import { THEMES, type ThemeId } from "@/design-system/tokens";

const meta: Meta<typeof ThemePreviewCard> = {
  title: "UI/ThemePreviewCard",
  component: ThemePreviewCard,
  tags: ["autodocs"],
  argTypes: {
    themeId: {
      control: "select",
      options: THEMES,
    },
    active: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ThemePreviewCard>;

export const Default: Story = {
  args: {
    themeId: "premium-saas",
    active: false,
  },
};

export const Active: Story = {
  args: {
    themeId: "premium-saas",
    active: true,
  },
};

function AllThemesRender() {
  const [selected, setSelected] = useState<ThemeId>("premium-saas");
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-2xl">
      {THEMES.map((themeId) => (
        <ThemePreviewCard
          key={themeId}
          themeId={themeId}
          active={selected === themeId}
          onClick={() => setSelected(themeId)}
        />
      ))}
    </div>
  );
}

export const AllThemes: Story = {
  render: () => <AllThemesRender />,
};

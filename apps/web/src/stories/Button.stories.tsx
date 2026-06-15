import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "ghost", "link", "destructive", "success", "premium", "gradient", "soft", "glass", "icon"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg", "xl", "icon"],
    },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Click me" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      {(["default", "secondary", "outline", "ghost", "destructive", "success", "premium", "gradient", "soft", "glass"] as const).map((v) => (
        <Button key={v} variant={v}>{v}</Button>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      {(["xs", "sm", "default", "lg", "xl"] as const).map((s) => (
        <Button key={s} size={s}>Size {s}</Button>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: { children: "Disabled", disabled: true },
};

export const Gradient: Story = {
  args: { variant: "gradient", children: "Gradient button", size: "lg" },
};

export const Soft: Story = {
  args: { variant: "soft", children: "Soft button" },
};

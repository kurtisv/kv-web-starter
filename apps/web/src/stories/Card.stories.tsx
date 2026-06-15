import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "elevated", "flat", "outline", "muted", "premium"],
    },
    radius: {
      control: "select",
      options: ["none", "sm", "default", "md", "lg", "xl"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const SampleContent = () => (
  <>
    <CardHeader>
      <CardTitle>Card title</CardTitle>
      <CardDescription>Supporting description text goes here.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">Card body content. Place any content here.</p>
    </CardContent>
    <CardFooter className="gap-2">
      <Button size="sm">Action</Button>
      <Button size="sm" variant="outline">Cancel</Button>
    </CardFooter>
  </>
);

export const Default: Story = {
  render: (args: React.ComponentProps<typeof Card>) => (
    <div className="max-w-sm">
      <Card {...args}><SampleContent /></Card>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {(["default", "elevated", "flat", "outline", "muted", "premium"] as const).map((v) => (
        <Card key={v} variant={v}>
          <CardHeader>
            <CardTitle className="text-base">{v}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Card variant: {v}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

export const Premium: Story = {
  render: () => (
    <div className="max-w-sm">
      <Card variant="premium" radius="xl">
        <CardHeader>
          <CardTitle>Premium Card</CardTitle>
          <CardDescription>Shadow and ring highlight for featured content.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">This card has extra visual weight.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

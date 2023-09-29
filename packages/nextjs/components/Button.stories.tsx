import type { Meta, StoryObj } from ".storybook/types";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    children: <>Button</>,
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Variants: Story = {
  render() {
    return (
      <div className="flex flex-col items-start p-2 gap-2 bg-gray">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="text">Text</Button>
      </div>
    );
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
  },
};

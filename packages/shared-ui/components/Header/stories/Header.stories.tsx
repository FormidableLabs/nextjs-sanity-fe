import type { Meta, StoryObj } from "../../../.storybook/types";
import { Header } from "../Header";

const meta: Meta<typeof Header> = {
  component: Header,
  title: "Header",
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};

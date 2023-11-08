import { Meta, StoryObj } from "../../.storybook/types";
import { ProductSort } from "./ProductSort";

const meta: Meta<typeof ProductSort> = {
  component: ProductSort,
  args: {
    query: {},
  },
};
export default meta;

type Story = StoryObj<typeof ProductSort>;

export const Default: Story = {};

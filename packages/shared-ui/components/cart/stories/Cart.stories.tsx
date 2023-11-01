import type { Meta, StoryObj } from "../../../.storybook/types";
import { Cart } from "../Cart";
import { CartContent } from "../CartContent";
import { CartProvider } from "../CartContext";

const main: Meta<typeof Cart> = {
  component: Cart,
  title: "Cart",
  decorators: [
    (Story) => (
      <CartProvider>
        <div className="flex justify-end">
          <Story />
        </div>
      </CartProvider>
    ),
  ],
  tags: ["autodocs"],
};

export default main;

export const Default: StoryObj<typeof Cart> = {
  args: {
    children: <CartContent ProductListLink={<a href="#">See Product List</a>} />,
  },
};

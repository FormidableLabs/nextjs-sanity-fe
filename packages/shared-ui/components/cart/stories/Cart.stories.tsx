import type { Meta, StoryObj } from "../../../.storybook/types";
import { Cart } from "../Cart";
import { CartContent } from "../CartContent";
import { CartItem, CartProvider, useCart } from "../CartContext";
import { action } from "@storybook/addon-actions";

import { userEvent, within, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta: Meta<typeof Cart> = {
  component: Cart,
  title: "Cart",
  tags: ["autodocs"],
};

export default meta;

const AddToCartButtons = () => {
  const { updateCart, cartItems, clearCart } = useCart();

  const onAddToCart = ({
    _id,
    name,
    price,
    quantity,
  }: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
  }) => {
    const existingCartItem = cartItems.find((item) => item._id === _id);

    updateCart({
      _id: _id,
      name: name,
      price: price,
      quantity: existingCartItem ? existingCartItem.quantity + Number(quantity) : Number(quantity),
    });
  };

  return (
    <div className="w-full">
      <button
        type="button"
        className="bg-primary text-white hover:bg-primary/90 mr-2 p-2"
        onClick={() => onAddToCart({ _id: "product 1", name: "product 1", price: 2, quantity: 1 })}
      >
        Add product1
      </button>
      <button
        type="button"
        className="bg-primary text-white hover:bg-primary/90 mr-2 p-2"
        onClick={() => onAddToCart({ _id: "product 2", name: "product 2", price: 2, quantity: 1 })}
      >
        Add product2
      </button>
      <button type="button" className="border-black border hover:bg-red/90 mr-2 p-2" onClick={clearCart}>
        Clear Cart
      </button>
    </div>
  );
};

export const State: StoryObj<typeof Cart> = {
  args: {
    children: <CartContent ProductListLink={<a href="#">See Product List</a>} />,
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <AddToCartButtons />
      </>
    ),
    (Story) => (
      <CartProvider>
        <div className="flex flex-row-reverse">
          <Story />
        </div>
      </CartProvider>
    ),
  ],
};

export const API: StoryObj<typeof Cart> = {
  args: {
    children: <CartContent ProductListLink={<a href="#">See Product List</a>} />,
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <AddToCartButtons />
      </>
    ),
    (Story) => {
      const onCartFetch = () => {
        const items: CartItem[] = [
          {
            _id: "product 1",
            name: "product 1",
            quantity: 1,
            price: 2,
          },
        ];
        return Promise.resolve({ results: items, errors: [] });
      };

      return (
        <CartProvider
          onCartClear={action("cart cleared")}
          errorLines={[]}
          onCartFetch={onCartFetch}
          onCartUpdate={action("cart updated")}
        >
          <div className="flex flex-row-reverse">
            <Story />
          </div>
        </CartProvider>
      );
    },
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("add to cart", async () => {
      await userEvent.click(canvas.getByRole("button", { name: /product1/i }));
      await userEvent.click(canvas.getByRole("button", { name: /product2/i }));
      expect(canvas.getByTestId("cart")).toHaveTextContent("Cart3");
    });

    await step("open cart and modify quantity", async () => {
      await userEvent.click(canvas.getByTestId("cart"));
      await userEvent.type(canvas.getByLabelText("product 1 quantity"), "{backspace}9");
      await waitFor(() => expect(canvas.getByTestId("total")).toHaveTextContent("$20.00"));
    });

    await step("clear cart", async () => {
      await userEvent.click(canvas.getByRole("button", { name: /close/i }));
      expect(canvas.getByTestId("cart")).toHaveTextContent("Cart10");
      await userEvent.click(canvas.getByRole("button", { name: /clear/i }));
      expect(canvas.getByTestId("cart")).toHaveTextContent("Cart0");
    });
  },
};

import * as React from "react";
import { q } from "groqd";
import { CartUpdate, CartProvider as SharedCartProvider } from "shared-ui";
import { runQuery } from "utils/sanityClient";

export type CartItem = {
  _id: string;
  qty: number;
  variantInfo: CartItemVariant;
};

export const CartProvider = ({ children }: React.PropsWithChildren) => {
  const retrieveCartItems = React.useCallback(async (cart: Record<string, number>) => {
    const cartEntries = Object.entries(cart);

    if (cartEntries.length > 0) {
      // Fetch all products with a variant with the same ID
      const variantIdFilters = cartEntries.map(([id, _]) => `(_id == "${id}")`);
      const groqFilters = variantIdFilters.length ? `&& (${variantIdFilters.join(" || ")})` : "";

      const getResults = () =>
        runQuery(
          q("*").filter(`_type == "variant" ${groqFilters}`).grab$({
            _id: q.string(),
            name: q.string(),
            price: q.number(),
            msrp: q.number(),
          })
        );

      const res = await throttle(getResults, 1000);
      const errorRetrievingIds: string[] = [];

      const results = cartEntries.reduce<CartItem[]>((acc, [variantId, quantity]) => {
        const productInfo = res.find((variant) => variant._id === variantId);
        if (productInfo) {
          return [...acc, { _id: variantId, qty: quantity, variantInfo: productInfo }];
        }

        errorRetrievingIds.push(variantId);
        return acc;
      }, []);

      return { results, errors: errorRetrievingIds };
    }

    return { results: [], errors: [] };
  }, []);

  const updateCartFromApi = React.useCallback(async () => {
    const data = await fetch("/api/cart", {
      credentials: "same-origin",
    }).then((res) => res.json());

    return retrieveCartItems(data);
  }, [retrieveCartItems]);

  const updateCart = React.useCallback(
    async ({ id: variantId, quantity }: CartUpdate) => {
      if (!variantId) {
        return;
      }

      try {
        const data = await fetch("/api/cart", {
          method: "PUT",
          body: JSON.stringify({
            _id: variantId,
            quantity,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());

        retrieveCartItems(data);
      } catch (error) {
        console.error(error);
      }
    },
    [retrieveCartItems]
  );

  // Clear the whole cart
  const clearCart = async () => {
    try {
      await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SharedCartProvider onCartClear={clearCart} onCartFetch={updateCartFromApi} onCartUpdate={updateCart}>
      {children}
    </SharedCartProvider>
  );
};

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

const throttle = <T,>(action: () => Promise<T>, ms: number): Promise<T> =>
  Promise.all([action(), wait(ms)]).then((res) => res[0]);

type CartItemVariant = {
  _id: string;
  name: string;
  msrp: number;
  price: number;
};

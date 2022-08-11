import { useEffect, useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import groq from "groq";

import { useCart } from "components/CartContext";
import { CartItem } from "components/CartItem";
import { sanityClient } from "utils/sanityClient";
import { CategoryPageProduct } from "utils/groqTypes";

interface Props {
  cartItems: Record<string, any>;
}

type FormattedCartItem = {
  id: string;
  qty: number;
  item: CategoryPageProduct;
};

const CartPage: NextPage<Props> = (props) => {
  const { cart, clearCart } = useCart();
  const [formattedCart, setFormattedCart] = useState<FormattedCartItem[]>([]);

  // Format cart items with product info
  useEffect(() => {
    const variantIds: string[] = Object.keys(cart);
    const variantIdFilters = variantIds.map((id) => `("${id}" in variants[]->id)`);
    const constructedFilters = variantIdFilters.length ? `&& (${variantIdFilters.join(" || ")})` : "";

    // Get all products with a variant with the same ID
    sanityClient
      .fetch(
        groq`{
      'products': *[_type == "product" ${constructedFilters}] {
        ...,
        'imageAlt': images[0]->name,
        'images': images[0]->images,
        'msrp': variants | order(price asc)[0]->msrp,
        'price': variants | order(price asc)[0]->price,
        'variants': variants[]->{
          ...,
          'size': size->name
        }
      }
    }`
      )
      .then((res) => {
        const formattedItems = variantIds.reduce((acc: FormattedCartItem[], variantId) => {
          const productInfo = (res.products as CategoryPageProduct[]).find(({ variants }) => {
            const productVariantIds = variants.map(({ id }) => id);
            return productVariantIds.includes(variantId);
          });

          if (productInfo) {
            return [...acc, { id: variantId, qty: cart[variantId], item: productInfo }];
          }

          console.error("No product info for ID", variantId);
          return acc;
        }, []);

        setFormattedCart(formattedItems);
      });
  }, [cart]);

  return (
    <div className="h-full mb-4">
      <h1 className="text-2xl font-bold my-4">Cart</h1>
      <ul className="flex flex-col gap-4">
        {formattedCart.map(({ id, qty, item }) => (
          <li key={id}>
            <CartItem id={id} qty={qty} item={item} />
          </li>
        ))}
      </ul>

      {formattedCart.length > 0 ? (
        <div className="flex justify-between gap-4 mt-6">
          <button
            type="button"
            onClick={clearCart}
            className="block px-6 py-2 border-solid border-2 border-slate-500 rounded"
          >
            Clear Cart
          </button>

          <Link href="/checkout">
            <a className="w-fit block px-6 py-2 border-solid border-2 border-slate-500 rounded">Checkout</a>
          </Link>
        </div>
      ) : (
        <div>
          <div className="text-xl">You have nothing in your cart</div>
          <Link href="/">
            <a className="w-fit block mt-4 px-6 py-2 border-solid border-2 border-slate-500 rounded">View Products</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;

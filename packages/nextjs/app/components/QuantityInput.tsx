"use client";

import { useState } from "react";
import { QuantityInput as BaseQuantityInput, useCart } from "shared-ui";
import { ProductDetailVariants } from "utils/groqTypes/ProductDetail";

type Props = {
  variant?: ProductDetailVariants[number];
};

const QuantityInput = ({ variant }: Props) => {
  const [quantity, setQuantity] = useState("1");
  const { updateCart, cartItems } = useCart();

  const onAddToCart = () => {
    if (variant?._id) {
      // If the item is already in the cart allow user to click add to cart multiple times
      const existingCartItem = cartItems.find((item) => item._id === variant._id);

      updateCart({
        _id: variant._id,
        name: variant.name,
        price: variant.price,
        quantity: existingCartItem ? existingCartItem.quantity + Number(quantity) : Number(quantity),
      });
    }
  };

  return <BaseQuantityInput onAddToCart={onAddToCart} quantity={quantity} onQuantityChange={setQuantity} />;
};

export default QuantityInput;

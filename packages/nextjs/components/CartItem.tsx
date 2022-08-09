import { HiMinusSm, HiPlusSm, HiOutlineTrash } from "react-icons/hi";
import { useCart } from "./CartContext";
import { Image } from "./Image";

type CartItemProps = {
  id: string;
  qty: number;
};

export const CartItem: React.FC<CartItemProps> = ({ id, qty }) => {
  const { updateCart } = useCart();

  const updateQty = (value: number) => {
    updateCart(id, value);
  };

  // TODO: query actual data from id
  const item = {
    slug: { current: "blank-t-shirt" },
    images: [
      {
        images: {
          asset: {
            _id: "image-f7d23d0907c178c204e8fded03b8781ba581638c-3000x3000-jpg",
            __typename: "SanityImageAsset",
          },
          __typename: "Image",
        },
        name: "Plain white blank T-Shirt",
        __typename: "ProductImage",
      },
      {
        images: {
          asset: {
            _id: "image-71a1ad84e14f2a7e440c3f813798ea8aac8ef15d-2392x2392-jpg",
            __typename: "SanityImageAsset",
          },
          __typename: "Image",
        },
        name: "Plain white blank T-shirt (side)",
        __typename: "ProductImage",
      },
      {
        images: {
          asset: {
            _id: "image-6693427ebf4148318be477e644349f74e08d8999-1302x1302-jpg",
            __typename: "SanityImageAsset",
          },
          __typename: "Image",
        },
        name: "Plain white blank T-shirt (product)",
        __typename: "ProductImage",
      },
    ],
    name: "Blank T-shirt",
    msrp: 30,
    price: 15,
  };

  return (
    <div className="flex gap-8 py-4">
      <div className="w-24 aspect-square bg-slate-100">
        <Image width={96} height={96} src={item?.images?.[0]?.images ?? ""} alt={item?.images?.[0]?.name ?? ""} />
      </div>
      <div className="flex-auto">
        <div>{item.name}</div>
        {/* Quantity */}
        <div className="flex gap-2 mt-2">
          <div className="flex border-solid border-2 border-slate-500 divide-x rounded">
            <button
              type="button"
              onClick={() => {
                updateQty(-1);
              }}
              disabled={qty <= 1}
              aria-label="Decrease quantity"
              className="px-1 disabled:opacity-50"
            >
              <HiMinusSm />
            </button>
            <div className="w-8 px-1 text-center">{qty}</div>
            <button
              type="button"
              onClick={() => {
                updateQty(1);
              }}
              aria-label="Increase quantity"
              className="px-1"
            >
              <HiPlusSm />
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              updateQty(0);
            }}
            aria-label="Delete item"
            className="px-1 border-solid border-2 border-slate-500 rounded"
          >
            <HiOutlineTrash />
          </button>
        </div>
      </div>
      <div>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.price * qty)}</div>
    </div>
  );
};

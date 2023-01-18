import { MdShoppingCart } from "react-icons/md";

export default {
  name: "product",
  title: "Product",
  description: "Product of the store",
  type: "document",
  icon: MdShoppingCart,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "description",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (rule) => rule.required(),
      options: {
        source: "name",
      },
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }],
        },
      ],
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          name: "productImage",
          title: "Product Image",
          type: "productImage",
        },
      ],
    },
    {
      name: "productVariants",
      title: "Product Variants",
      type: "array",
      of: [
        {
          name: "productVariant",
          title: "Product Variant",
          type: "productVariant",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "slug.current",
      media: "images.0.asset",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle,
        media,
      };
    },
  },
};

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
          type: "reference",
          to: [{ type: "productImage" }],
        },
      ],
    },
    {
      name: "variants",
      title: "Variants",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "variant" }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "slug.current",
      media: "images.0.images",
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

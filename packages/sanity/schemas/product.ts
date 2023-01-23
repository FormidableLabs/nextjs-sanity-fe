import { MdShoppingCart } from "react-icons/md";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  description: "Product of the store",
  type: "document",
  icon: MdShoppingCart,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "description",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (rule) => rule.required(),
      options: {
        source: "name",
      },
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }],
        },
      ],
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        defineField({
          name: "productImage",
          title: "Product Image",
          type: "productImage",
        }),
      ],
    }),
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
});

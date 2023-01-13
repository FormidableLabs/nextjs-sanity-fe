import { GrMultiple } from "react-icons/gr";
import groq from "groq";
import { defineField, defineType } from "sanity";
import { sanityClient } from "../utils/sanityClient";

const isUniqueId = (value, context) => {
  const { document } = context;

  const id = document._id.replace(/^drafts\./, "");

  const params = {
    draft: `drafts.${id}`,
    published: id,
    id: value,
  };

  const query = groq`!defined(*[
    _type == 'variant' &&
    !(_id in [$draft, $published]) &&
    id == $id
  ][0]._id)`;

  return sanityClient.fetch(query, params);
};

export default {
  name: "productVariant",
  title: "Product Variant",
  description: "Variant of the product",
  type: "object",
  icon: GrMultiple,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (rule) => rule.required(),
      options: {
        source: "name",
        maxLength: 200,
        slugify: (input: string) => input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "description",
    }),
    defineField({
      name: "id",
      title: "ID",
      type: "string",
      validation: (rule) =>
        rule.custom(async (value, context) => {
          if (!value) return "ID is required";
          const isUnique = await isUniqueId(value, context);
          if (!isUnique) return "ID is not unique";
          return true;
        }),
    }),
    defineField({
      name: "msrp",
      title: "MSRP",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
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
    }),
    defineField({
      name: "flavour",
      title: "Flavour",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "flavour" }],
        },
      ],
    }),
    defineField({
      name: "style",
      title: "Style (options)",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "style" }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "images.0.asset",
      subtitle: "style.name",
    },
  },
});

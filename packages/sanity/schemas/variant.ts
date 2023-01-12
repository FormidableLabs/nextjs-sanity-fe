import { GrMultiple } from "react-icons/gr";
import groq from "groq";
import client from "part:@sanity/base/client";
import { BsFillImageFill } from "react-icons/bs";

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

  return client.fetch(query, params);
};

export default {
  name: "variant",
  title: "Variant",
  description: "Variant of the product",
  type: "document",
  icon: GrMultiple,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (rule) => rule.required(),
      options: {
        source: "name",
        maxLength: 200,
        slugify: (input: string) => input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
    {
      name: "description",
      title: "Description",
      type: "description",
    },
    {
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
    },
    {
      name: "msrp",
      title: "MSRP",
      type: "number",
      validation: (rule) => rule.required().positive(),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required().positive(),
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          name: "productImage",
          title: "Product Image",
          description: "Images of Products",
          type: "image",
          icon: BsFillImageFill,
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
              type: "text",
            },
          ],
          preview: {
            select: {
              title: "name",
              media: "asset",
            },
          },
        },
      ],
    },
    {
      name: "flavour",
      title: "Flavour",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "flavour" }],
        },
      ],
    },
    {
      name: "style",
      title: "Style (options)",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "style" }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "images.0.images",
      subtitle: "style.name",
    },
  },
};

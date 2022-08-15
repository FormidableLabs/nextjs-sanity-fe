import { MdCategory } from "react-icons/md";

export default {
  name: "category",
  title: "Category",
  description: "Category of the product",
  type: "document",
  icon: MdCategory,
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
      type: "string",
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
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "categoryImage" }],
        },
      ],
    },
    {
      name: "variantFilters",
      title: "Variant Filters",
      type: "array",
      of: [
        {
          name: "filterGroup",
          title: "Filter Group",
          type: "object",
          initialValue: {
            type: "natural",
          },
          fields: [
            {
              name: "value",
              title: "Value",
              type: "string",
              description: "Equal to query param",
              validation: (Rule) => Rule.regex(/[a-zA-Z]/g, { name: "camelCase" }),
            },
            {
              name: "label",
              title: "Label",
              type: "string",
            },
            {
              title: "variants[] Map",
              name: "variantsMap",
              type: "string",
              description:
                'Should map "variants[]" to array of values (i.e. "size->name" yields the filter "\'{value}\' in variants[]->size->name"',
            },
            {
              title: "Type",
              name: "type",
              type: "string",
              description: "Handles filter sorting",
              options: {
                list: [
                  { title: "Natural (alphanumerical)", value: "natural" },
                  { title: "Sizes (XS, SM, etc.)", value: "sizes" },
                ],
              },
            },
          ],
        },
      ],
      preview: {
        select: {
          title: "label",
        },
      },
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
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

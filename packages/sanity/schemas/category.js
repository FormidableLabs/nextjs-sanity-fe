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

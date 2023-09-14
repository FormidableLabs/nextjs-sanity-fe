import { MdCategory } from "react-icons/md";
import { defineArrayMember, defineField, defineType } from "@sanity-typed/types";

export default defineType({
  name: "category",
  title: "Category",
  description: "Category of the product",
  type: "document",
  icon: MdCategory,
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
      type: "string",
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
      name: "images",
      title: "Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "categoryImage" } as const],
        }),
      ],
    }),
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
});

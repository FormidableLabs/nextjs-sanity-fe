import { BsFillImageFill } from "react-icons/bs";
import { defineType, defineField } from "@sanity-typed/types";

export default defineType({
  name: "categoryImage",
  title: "Category Image",
  description: "Images of Categories",
  type: "document",
  icon: BsFillImageFill,
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
      type: "text",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "image",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "images",
    },
  },
});

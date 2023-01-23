import { BsFillImageFill } from "react-icons/bs";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "productImage",
  title: "Product Image",
  description: "Images of Products",
  type: "image",
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
  ],
  preview: {
    select: {
      title: "name",
      media: "asset",
    },
  },
});

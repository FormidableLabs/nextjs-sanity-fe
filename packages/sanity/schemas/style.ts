import { RiKnifeLine } from "react-icons/ri";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "style",
  title: "Style",
  description: "Style of product",
  type: "document",
  icon: RiKnifeLine,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (rule) => rule.required(),
      options: {
        source: "name",
        maxLength: 120,
        slugify: (input: string) => input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    }),
  ],
});

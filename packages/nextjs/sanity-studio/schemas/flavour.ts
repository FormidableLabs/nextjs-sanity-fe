import { GiSaltShaker } from "react-icons/gi";
import { defineField, defineType } from "@sanity-typed/types";

export default defineType({
  name: "flavour",
  title: "Flavour",
  description: "Flavour of product",
  type: "document",
  icon: GiSaltShaker,
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

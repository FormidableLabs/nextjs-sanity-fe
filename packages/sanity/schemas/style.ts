import { RiKnifeLine } from "react-icons/ri";
import groq from "groq";
import client from "part:@sanity/base/client";

export default {
  name: "style",
  title: "Style",
  description: "Style of product",
  type: "document",
  icon: RiKnifeLine,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
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
  ],
};

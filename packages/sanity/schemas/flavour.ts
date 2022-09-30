import { GiSaltShaker } from "react-icons/gi";

export default {
  name: "flavour",
  title: "Flavour",
  description: "Flavour of product",
  type: "document",
  icon: GiSaltShaker,
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
      options: {
        source: "name",
        maxLength: 200,
        slugify: (input: string) => input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
  ],
};

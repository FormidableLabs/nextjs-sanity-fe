import { GrMultiple } from "react-icons/gr";

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
      name: "description",
      title: "Description",
      type: "description",
    },
    {
      name: "id",
      title: "ID",
      type: "string",
      validation: (rule) => rule.required(),
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
          type: "reference",
          to: [{ type: "productImage" }],
        },
      ],
    },
    {
      name: "size",
      title: "Size",
      type: "reference",
      to: [{ type: "size" }],
      validation: (rule) => rule.required(),
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "images.0.images",
      subtitle: "size.name",
    },
  },
};

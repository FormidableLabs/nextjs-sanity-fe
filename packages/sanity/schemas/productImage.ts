import { BsFillImageFill } from "react-icons/bs";

export default {
  name: "productImage",
  title: "Product Image",
  description: "Images of Products",
  type: "image",
  icon: BsFillImageFill,
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
      type: "text",
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "asset",
    },
  },
};

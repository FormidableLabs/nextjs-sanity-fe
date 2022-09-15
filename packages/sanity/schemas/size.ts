import { GiResize } from "react-icons/gi";
import client from "part:@sanity/base/client";
import groq from "groq";

const isUniqueSize = (size, context) => {
  const { document } = context;

  const id = document._id.replace(/^drafts\./, "");

  const params = {
    draft: `drafts.${id}`,
    published: id,
    size,
  };

  /* groq */
  const query = groq`!defined(*[
    _type == 'size' &&
    !(_id in [$draft, $published]) &&
    name == $size
  ][0]._id)`;

  return client.fetch(query, params);
};

export default {
  name: "size",
  title: "Size",
  description: "Size of the product",
  type: "document",
  icon: GiResize,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          const isUnique = await isUniqueSize(value, context);
          if (!isUnique) return "Size is not unique";
          return true;
        }),
    },
  ],
};

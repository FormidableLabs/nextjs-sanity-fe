import { defineType } from "sanity";

export default defineType({
  name: "description",
  title: "Description",
  type: "array",
  of: [
    {
      type: "block",
    },
  ],
});

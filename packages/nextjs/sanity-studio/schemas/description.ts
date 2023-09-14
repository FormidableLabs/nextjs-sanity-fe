import { defineArrayMember, defineType } from "@sanity-typed/types";

export default defineType({
  name: "description",
  title: "Description",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
    }),
  ],
});

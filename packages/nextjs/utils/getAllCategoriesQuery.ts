import groq from "groq";
import { sanityClient } from "./sanityClient";

export const getAllCategories = () =>
  sanityClient.fetch(groq`*[_type == "category"]{
  _id,
  _type,
  name,
  description,
  slug {
    current
  },
  images[]->{
    name,
    images
  },
  variants[]->{
    price,
    name,
    id,
    msrp,
    slug {
      current
    },
  }
}`);

import groq from "groq";
import { sanityClient } from "./sanityClient";

export const getAllCategories = () =>
  sanityClient.fetch(groq`*[_type == "category"]{
  _id,
  name,
  description,
  slug {
    current
  },
  images {
    name,
    images {
      asset {
        url
      }
    }
  }
}`);

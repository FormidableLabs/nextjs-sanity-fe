import groq from "groq";
import { sanityClient } from "./sanityClient";

export const getAllProducts = () =>
  sanityClient.fetch(groq`*[_type == "product"]{
  _id,
  name,
  categories {
    name
  },
  slug {
    current
  },
  images {
    name,
    asset {
      _id,
      url
    }
  },
  variants {
    price,
    name,
    id,
    msrp,
    slug {
      current
    },
    images {
      asset {
        _id,
        url
      }
    }
  }
}`);

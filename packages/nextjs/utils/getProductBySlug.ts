import groq from "groq";
import { sanityClient } from "./sanityClient";

export const getProductBySlug = (slug = "") =>
  sanityClient.fetch(groq`*[_type == "product" && slug.current == ${slug}]{
    _id,
    name,
    categories[]->{
      name
    },
    slug {
      current
    },
    variants[]->{
      _id,
      id,
      name,
      descriptionRaw,
      msrp,
      price,
      slug {
        current
      },
      images,
      style {
        _id,
        name
      }
    }
  }`);

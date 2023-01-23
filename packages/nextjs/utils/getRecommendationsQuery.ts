import groq from "groq";
import { sanityClient } from "./sanityClient";

export const getRecommendations = () =>
  sanityClient.fetch(groq`*[_type == "product"] | order(_updatedAt asc)[0..2]{
  _id,
  name,
  slug {
    current
  },
  images,
  variants[] {...,documentReference->}
}`);

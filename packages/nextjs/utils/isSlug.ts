export const isSlug = (slug: unknown): slug is string => {
  return typeof slug === "string";
};

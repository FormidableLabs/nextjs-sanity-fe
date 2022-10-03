export interface ProductSearch {
  _id: string;
  name: string;
  slug: Slug;
  image: Image;
  imageAlt: string;
  productSlug: string;
}

export interface Image {
  _key: string;
  _ref: string;
  _type: string;
}

export interface Slug {
  _type: string;
  current: string;
}

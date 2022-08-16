export interface ProductSearch {
  _id: string;
  image: Image;
  imageAlt: string;
  name: string;
  slug: Slug;
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

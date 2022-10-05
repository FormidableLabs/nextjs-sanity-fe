import faker from "faker";
import type {
  Category,
  CategoryImage,
  Image,
  Product,
  ProductImage,
  Slug,
  Style,
  Variant,
} from "utils/generated/graphql";

const forms = ["croissant", "roll", "loaf", "baguette", "breadstick", "cracker"];
const flavors = ["wheat", "rye", "sourdough", "white", "whole grain", "cracked wheat"];
const variants = ["sliced", "unsliced", "dozen"];

export class MockFactory {
  array<T>(length: number, factory: (index: number) => T): T[] {
    return new Array(length).fill(null).map((_, i) => factory(i));
  }

  slug(input: string): Slug {
    return {
      __typename: "Slug",
      current: input.replace(/\W+/g, "-"),
    };
  }

  productName() {
    return [faker.random.arrayElement(flavors), faker.random.arrayElement(forms)].join(" ");
  }

  product(data: Partial<Product>): Product {
    const name = data.name || this.productName();
    const slug = data.slug || this.slug(name);

    const result: Required<Omit<Product, IgnoredFields>> = {
      __typename: "Product",
      name,
      slug,
      categories: [this.category({}), this.category({})],
      descriptionRaw: {},
      images: [this.productImage({}, name, "small"), this.productImage({}, name, "large")],
      variants: variants.map((name) => this.variant({ name })),
      ...data,
    };
    return result;
  }

  productImage(data: Partial<ProductImage>, name: string, size: MockImageSize): ProductImage {
    const result: Required<Omit<ProductImage, IgnoredFields>> = {
      __typename: "ProductImage",
      images: this.image({}, name, size),
      name,
      description: "",
      ...data,
    };
    return result;
  }
  image(data: Partial<Image>, name: string, size: MockImageSize): Image {
    const { width, height } = {
      small: { width: 100, height: 100 },
      medium: { width: 600, height: 400 },
      large: { width: 1200, height: 800 },
    }[size];

    const url = faker.image.imageUrl(width, height, name, false, false);
    const result: Required<Omit<Image, IgnoredFields>> = {
      __typename: "Image",
      asset: { __typename: "SanityImageAsset", url },
      crop: { __typename: "SanityImageCrop", top: 0, bottom: 0, left: 0, right: 0 },
      hotspot: { __typename: "SanityImageHotspot", x: 0, y: 0, width, height },
      ...data,
    };
    return result;
  }
  variant(data: Partial<Variant>): Variant {
    const name = data.name || "";
    const msrp = data.msrp || faker.datatype.number({ min: 2, max: 10 });
    const price =
      data.price || faker.random.arrayElement([msrp, msrp, msrp, faker.datatype.number({ min: 2, max: msrp })]);

    const result: Required<Omit<Variant, IgnoredFields>> = {
      __typename: "Variant",
      name,
      slug: this.slug(name),
      images: [this.productImage({}, name, "small")],
      descriptionRaw: {},
      id: faker.datatype.uuid(),
      flavour: [{ name: "flavor", slug: this.slug("flavor") }],
      msrp,
      price,
      style: [this.style({})],
      ...data,
    };
    return result;
  }
  style(data: Partial<Style>): Style {
    const name = data.name || "";
    const result: Required<Omit<Style, IgnoredFields>> = {
      __typename: "Style",
      name,
      slug: this.slug(name),
      ...data,
    };
    return result;
  }

  categoryName() {
    return faker.random.arrayElement(flavors);
  }

  category(data: Partial<Category>): Category {
    const name = data.name || this.categoryName();
    const slug = data.slug || this.slug(name);

    const result: Required<Omit<Category, IgnoredFields>> = {
      __typename: "Category",
      name,
      slug,
      images: [this.categoryImage({}, name, "small"), this.categoryImage({}, name, "large")],
      description: faker.lorem.paragraph(),
      ...data,
    };
    return result;
  }
  categoryImage(data: Partial<CategoryImage>, name: string, size: MockImageSize): CategoryImage {
    const result: Required<Omit<CategoryImage, IgnoredFields>> = {
      __typename: "CategoryImage",
      name,
      description: "",
      images: this.image({}, name, size),
      ...data,
    };
    return result;
  }
}

type IgnoredFields = keyof Pick<Product, "_rev" | "_key" | "_id" | "_type" | "_createdAt" | "_updatedAt">;
type MockImageSize = "small" | "medium" | "large";

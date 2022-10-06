import faker from "faker";
import type {
  Category,
  CategoryImage,
  Flavour,
  Image,
  Product,
  ProductImage,
  SanityImageCrop,
  SanityImageHotspot,
  Slug,
  Style,
  Variant,
} from "utils/generated/graphql";

const forms = ["croissant", "roll", "loaf", "baguette", "breadstick", "cracker"];
const flavors = ["wheat", "rye", "sourdough", "white", "whole grain", "cracked wheat", "potato"];
const variants = ["sliced", "unsliced", "dozen"];

export class MockFactory {
  array<T>(length: number, factory: (index: number) => T): T[] {
    return new Array(length).fill(null).map((_, i) => factory(i));
  }
  idCount: Record<string, number> = {};
  id(type: string) {
    const count = (this.idCount[type] = (this.idCount[type] || 0) + 1);
    return `${type}-${count}`;
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

    const result: FullData<Product> = {
      __typename: "Product",
      _id: this.id("Product"),
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
    const result: FullData<ProductImage> = {
      __typename: "ProductImage",
      _id: this.id("ProductImage"),
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
    const result: FullData<Image> = {
      __typename: "Image",
      asset: {
        __typename: "SanityImageAsset",
        url,
        // TODO: assets have a lot more fields
      },
      crop: satisfies<FullData<SanityImageCrop>>()({
        __typename: "SanityImageCrop",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }),
      hotspot: satisfies<FullData<SanityImageHotspot>>()({
        __typename: "SanityImageHotspot",
        x: 0,
        y: 0,
        width,
        height,
      }),
      ...data,
    };
    return result;
  }
  variant(data: Partial<Variant>): Variant {
    const name = data.name || "";
    const msrp = data.msrp || faker.datatype.number({ min: 2, max: 10 });
    const price =
      data.price || faker.random.arrayElement([msrp, msrp, msrp, faker.datatype.number({ min: 2, max: msrp })]);

    const result: FullData<Variant> = {
      __typename: "Variant",
      _id: this.id("Variant"),
      name,
      slug: this.slug(name),
      images: [this.productImage({}, name, "small")],
      descriptionRaw: {},
      id: faker.datatype.uuid(),
      flavour: [
        satisfies<FullData<Flavour>>()({
          __typename: "Flavour",
          _id: this.id("Flavour"),
          name: "flavor",
          slug: this.slug("flavor"),
        }),
      ],
      msrp,
      price,
      style: [this.style({})],
      ...data,
    };
    return result;
  }
  style(data: Partial<Style>): Style {
    const name = data.name || "";
    const result: FullData<Style> = {
      __typename: "Style",
      _id: this.id("Style"),
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

    const result: FullData<Category> = {
      __typename: "Category",
      _id: this.id("Category"),
      name,
      slug,
      images: [this.categoryImage({}, name, "small"), this.categoryImage({}, name, "large")],
      description: faker.lorem.paragraph(),
      ...data,
    };
    return result;
  }
  categoryImage(data: Partial<CategoryImage>, name: string, size: MockImageSize): CategoryImage {
    const result: FullData<CategoryImage> = {
      __typename: "CategoryImage",
      _id: this.id("CategoryImage"),
      name,
      description: "",
      images: this.image({}, name, size),
      ...data,
    };
    return result;
  }
}

type IgnoredFields = keyof Pick<Product, "_rev" | "_key" | "_type" | "_createdAt" | "_updatedAt">;
type FullData<T> = Required<Omit<T, IgnoredFields>>;
type MockImageSize = "small" | "medium" | "large";

// Similar to TypeScript 4.8's "satisfies" operator
const satisfies =
  <TConstraint>() =>
  <TActual extends TConstraint>(value: TActual) =>
    value;

export const mock = new MockFactory();

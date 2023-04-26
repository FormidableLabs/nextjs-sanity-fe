import type {
  Category,
  CategoryImage,
  Flavour,
  Image,
  Product,
  ProductImage,
  Slug,
  Style,
  Variant,
  ProductContentBlock,
} from "utils/groqTypes/ProductList";
import type { SanityImageCrop, SanityImageHotspot } from "@sanity/image-url/lib/types/types";
import faker from "faker";

// seeding our random data helps our tests to be consistent
faker.seed(0);

const forms = ["Croissant", "Roll", "Loaf", "Baguette", "Breadstick", "Cracker", "Bagel", "Muffin"];
const flavours = ["Wheat", "Sourdough", "White", "Whole Grain", "Cracked Wheat", "Potato"];
const variants = ["Sliced", "Unsliced", "Dozen"];

export class MockFactory {
  /**
   * Returns an array filled with generated values.
   * Can also ensure items are unique.
   */
  array<T>(length: number, factory: (index: number) => T, uniqueKey?: (item: T) => unknown): T[] {
    const arr = new Array(length).fill(null);
    if (!uniqueKey) {
      return arr.map((_, i) => factory(i));
    }

    // Generate items, and ensure they have unique keys:
    const set = new Set();
    return arr.map((_, i) => {
      let item: T;
      let key: unknown;
      // Keep generating items until it's unique
      do {
        item = factory(i);
        key = uniqueKey(item);
      } while (set.has(key));
      set.add(key);
      return item;
    });
  }

  idCount: Record<string, number> = {};
  id(type: string) {
    const count = (this.idCount[type] = (this.idCount[type] || 0) + 1);
    return `${type}__${count}`;
  }

  slug(input: string): Slug {
    return {
      _type: "slug",
      current: input.replace(/\W+/g, "-"),
    };
  }

  productName() {
    return [faker.random.arrayElement(flavours), faker.random.arrayElement(forms)].join(" ");
  }

  product(data: Partial<Product>): Product {
    const name = data.name || this.productName();
    const slug = data.slug || this.slug(name);

    const result: Product = {
      _type: "product",
      _id: this.id("Product"),
      name,
      slug,
      categories: [],
      description: this.description({}),
      images: [this.productImage({}, name, "small"), this.productImage({}, name, "large")],
      variants: faker.random.arrayElements(variants).map((variant) => this.variant({ name: variant + " " + name })),
      ...data,
    };
    return result;
  }
  products(length: number, categories: Category[]): Product[] {
    return this.array(
      length,
      () =>
        this.product({
          categories: faker.random.arrayElements(categories),
        }),
      (product) => product.name
    );
  }

  productImage(data: Partial<ProductImage>, name: string, size: MockImageSize): ProductImage {
    const { width, height } = {
      small: { width: 100, height: 100 },
      medium: { width: 600, height: 400 },
      large: { width: 1200, height: 800 },
    }[size];

    const crop = {
      _type: "sanityimagecrop",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    } satisfies SanityImageCrop;

    const id = `image-${this.id("ProductImage")}-${width}x${height}-jpg`;

    const result: ProductImage = {
      _type: "image",
      _id: id,
      asset: {
        _type: "reference",
        _ref: id,
      },
      name,
      description: "",
      crop,
      hotspot: {
        // @ts-expect-error _type is a valid field
        _type: "sanityimagehotspot",
        x: 0,
        y: 0,
        width,
        height,
      } satisfies SanityImageHotspot,
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

    const crop = {
      _type: "sanityimagecrop",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    } satisfies SanityImageCrop;

    const url = faker.image.imageUrl(width, height, name, false, false);
    // Sanity expects this format:
    const id = `image-${this.id("Image")}-${width}x${height}-jpg`;
    const result: Image = {
      // @ts-expect-error _id is a valid field, I think
      _id: id,
      _key: "",
      url,
      // TODO: assets have a lot more fields
      crop,
      hotspot: {
        _type: "sanityimagehotspot",
        x: 0,
        y: 0,
        width,
        height,
      } satisfies SanityImageHotspot,
      ...data,
    };
    return result;
  }
  variant(data: Partial<Variant>): Variant {
    const name = data.name || "";
    const msrp = data.msrp || faker.datatype.number({ min: 2, max: 10 });
    const price =
      data.price || faker.random.arrayElement([msrp, msrp, msrp, faker.datatype.number({ min: 2, max: msrp })]);

    const result: Variant = {
      _id: this.id("Variant"),
      name,
      slug: this.slug(name),
      images: [this.productImage({}, name, "small")],
      description: this.description({}),
      flavour: [this.flavour({})],
      msrp,
      price,
      style: [this.style({})],
      ...data,
    };
    return result;
  }
  style(data: Partial<Style>): Style {
    const name = data.name || "";
    const result: Style = {
      _type: "style",
      _id: this.id("Style"),
      name,
      slug: this.slug(name),
      ...data,
    };
    return result;
  }
  description({ text = "nom nom nom " + faker.lorem.paragraphs() }: { text?: string }): ProductContentBlock[] {
    return [
      {
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: "",
            _type: "span",
            marks: [],
            text,
          },
        ],
      },
    ];
  }
  flavour(data: Partial<Flavour>): Flavour {
    const name = data.name || faker.random.arrayElement(flavours);
    const result: Flavour = {
      _type: "flavour",
      _id: this.id("Flavour"),
      name,
      slug: this.slug(name),
      ...data,
    };
    return result;
  }

  categoryName() {
    return faker.random.arrayElement(forms);
  }

  categories(length: number): Category[] {
    return faker.random.arrayElements(forms, length).map((form) =>
      this.category({
        name: form,
      })
    );
  }
  category(data: Partial<Category>): Category {
    const name = data.name || this.categoryName();
    const slug = data.slug || this.slug(name);

    const result: Category = {
      _type: "category",
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
    const result: CategoryImage = {
      _type: "categoryImage",
      _id: this.id("CategoryImage"),
      name,
      description: "",
      images: this.image({}, name, size),
      ...data,
    };
    return result;
  }
}

type MockImageSize = "small" | "medium" | "large";

export const mock = new MockFactory();

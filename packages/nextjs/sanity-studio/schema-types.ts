/// <reference types="@sanity-codegen/types" />

declare namespace Sanity {
  namespace Schema {
    /**
       * Category
Category of the product
       */
    interface Category extends Sanity.Document {
      _type: "category";

      /**
       * Name - `String`
       */
      name?: string;

      /**
       * Description - `String`
       */
      description?: string;

      /**
       * Slug - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Images - `Array`
       */
      images?: Array<Sanity.KeyedReference<CategoryImage>>;
    }

    /**
       * Category Image
Images of Categories
       */
    interface CategoryImage extends Sanity.Document {
      _type: "categoryImage";

      /**
       * Name - `String`
       */
      name?: string;

      /**
       * Description - `Text`
       */
      description?: string;

      /**
       * Images - `Image`
       */
      images?: {
        asset: Sanity.Asset;
        crop?: Sanity.ImageCrop;
        hotspot?: Sanity.ImageHotspot;
      };
    }

    /**
       * Flavour
Flavour of product
       */
    interface Flavour extends Sanity.Document {
      _type: "flavour";

      /**
       * Name - `String`
       */
      name?: string;

      /**
       * Slug - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };
    }

    /**
       * Product
Product of the store
       */
    interface Product extends Sanity.Document {
      _type: "product";

      /**
       * Name - `String`
       */
      name?: string;

      /**
       * Description - `RegistryReference`
       */
      description?: Description;

      /**
       * Slug - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Categories - `Array`
       */
      categories?: Array<Sanity.KeyedReference<Category>>;

      /**
       * Images - `Array`
       */
      images?: Array<Sanity.Keyed<ProductImage>>;

      /**
       * Variants - `Array`
       */
      variants?: Array<Sanity.KeyedReference<Variant>>;
    }

    /**
     * Site Settings
     */
    interface SiteSettings extends Sanity.Document {
      _type: "siteSettings";

      /**
       * Site Title - `String`
       */
      title?: string;

      /**
       * Site Description - `Text`
       */
      description?: string;
    }

    /**
       * Style
Style of product
       */
    interface Style extends Sanity.Document {
      _type: "style";

      /**
       * Name - `String`
       */
      name?: string;

      /**
       * Slug - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };
    }

    /**
       * Variant
Variant of the product
       */
    interface Variant extends Sanity.Document {
      _type: "variant";

      /**
       * Name - `String`
       */
      name?: string;

      /**
       * Slug - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Description - `RegistryReference`
       */
      description?: Description;

      /**
       * ID - `String`
       */
      id?: string;

      /**
       * MSRP - `Number`
       */
      msrp?: number;

      /**
       * Price - `Number`
       */
      price?: number;

      /**
       * Images - `Array`
       */
      images?: Array<Sanity.Keyed<ProductImage>>;

      /**
       * Flavour - `Array`
       */
      flavour?: Array<Sanity.KeyedReference<Flavour>>;

      /**
       * Style (options) - `Array`
       */
      style?: Array<Sanity.KeyedReference<Style>>;
    }

    type Description = Array<Sanity.Keyed<Sanity.Block>>;

    type ProductImage = {
      _type: "productImage";
      asset: Sanity.Asset;
      crop?: Sanity.ImageCrop;
      hotspot?: Sanity.ImageHotspot;

      /**
       * Name - `String`
       */
      name?: string;

      /**
       * Description - `Text`
       */
      description?: string;
    };

    type Document =
      | Category
      | CategoryImage
      | Flavour
      | Product
      | SiteSettings
      | Style
      | Variant;
  }
}

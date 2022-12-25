export type Dataset = Array<DatasetItem>;

export type DatasetItem = {
  _type?: string;
  _id?: string;
  [rest: string]: unknown;
};

type AnyObject = Record<string, unknown>;

export type DatasetOptions = {
  /**
   * This list overrides what gets treated as a document.
   * Documents are always referenced using reference types, instead of being inline.
   */
  documentTypes?: string[];
  /**
   * This list overrides what gets treated as an inline type.
   */
  inlineTypes?: string[];
};

/**
 * Builds a flattened dataset from any type of deeply-nested data.
 */
export function createDataset(data: Array<AnyObject>, options: DatasetOptions = {}) {
  const builder = new DatasetBuilder(options);
  data.forEach((object) => builder.addData(object));
  return builder.dataset;
}

class DatasetBuilder {
  constructor(private options: DatasetOptions) {}

  readonly dataset = [] as Dataset;

  readonly references = new Map<object, DatasetItem>();

  addData(object: unknown): unknown {
    if (!isObject(object)) {
      // We don't need to translate primitives
      return object;
    }

    if (Array.isArray(object)) {
      // We only need to translate the array's elements:
      return object.map((value) => this.addData(value));
    }

    // For circular references:
    if (this.references.has(object)) {
      return this.references.get(object);
    }

    // Let's map this object:
    const datasetItem: DatasetItem = {};
    this.dataset.push(datasetItem);

    // Map these values from common fields:
    const _id = object._id || object.id;
    if (_id) datasetItem._id = _id as string;
    const _type = object._type || object.__typename;
    if (_type) datasetItem._type = _type as string;

    const reference = this.needsReference(datasetItem) ? this.createReference(datasetItem) : datasetItem;
    this.references.set(object, reference);

    // Map all the object's values:
    Object.keys(object).forEach((key) => {
      const value = object[key];
      datasetItem[key] = this.addData(value);
    });

    return reference;
  }

  private lastId = 0;
  private nextId(type: string | undefined) {
    return `REF_ID-${type || "_"}-${++this.lastId}`;
  }

  private needsReference(value: DatasetItem) {
    // Determine if this is a document that needs a reference:
    const { documentTypes, inlineTypes } = this.options;
    if (documentTypes && documentTypes.includes(value._type as string)) {
      return true;
    }
    if (inlineTypes && inlineTypes.includes(value._type as string)) {
      return false;
    }

    // Normally in Sanity, anything with an _id is a document
    const hasId = !!value._id;
    return hasId;
  }
  private createReference(value: DatasetItem) {
    if (!value._id) {
      // Ensure we have an ID:
      value._id = this.nextId(value._type);
    }
    return {
      _type: "reference",
      _ref: value._id,
    };
  }
}

function isObject(obj: unknown): obj is AnyObject {
  return typeof obj === "object" && obj !== null;
}

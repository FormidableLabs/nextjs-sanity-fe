export type Dataset = Array<DatasetItem>;

export type DatasetItem = {
  _type?: string;
  _id?: string;
  [rest: string]: unknown;
};

type AnyObject = Record<string, unknown>;

/**
 * Builds a flattened dataset from any type of deeply-nested data.
 */
export function createDataset(data: Array<AnyObject>) {
  const builder = new DatasetBuilder();
  data.forEach((object) => builder.addData(object));
  return builder.dataset;
}

class DatasetBuilder {
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
    const datasetItem: DatasetItem = {
      // Map these values from common fields:
      _id: (object._id as string) || (object.id as string) || undefined,
      _type: (object._type as string) || (object.__typename as string) || undefined,
    };
    this.dataset.push(datasetItem);
    const reference = this.createReference(datasetItem);
    this.references.set(object, reference);

    // Map all the object's values:
    Object.keys(object).forEach((key) => {
      const value = object[key];
      datasetItem[key] = this.addData(value);
    });

    return reference;
  }

  private lastId = 0;
  private nextId() {
    return `REF_ID_${++this.lastId}`;
  }

  private createReference(value: DatasetItem) {
    if (!value._id) {
      value._id = this.nextId();
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

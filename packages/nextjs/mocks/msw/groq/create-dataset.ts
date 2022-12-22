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
  data.forEach((item) => builder.addDatasetItem(item));
  return builder.dataset;
}

class DatasetBuilder {
  readonly dataset = [] as Dataset;
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

  addDatasetItem(object: AnyObject): DatasetItem {
    const dataItem: DatasetItem = {
      // Map these values from common fields:
      _id: (object._id as string) || (object.id as string) || undefined,
      _type: (object._type as string) || (object.__typename as string) || undefined,
    };
    this.dataset.push(dataItem);

    Object.keys(object).forEach((key) => {
      const value = object[key];
      const isObject = typeof value === "object" && value !== null;
      if (!isObject) {
        dataItem[key] = value;
      } else if (Array.isArray(value)) {
        dataItem[key] = value.map((val) => {
          const item = this.addDatasetItem(val);
          return this.createReference(item);
        });
      } else {
        const item = this.addDatasetItem(value as AnyObject);
        dataItem[key] = this.createReference(item);
      }
    });

    return dataItem;
  }
}

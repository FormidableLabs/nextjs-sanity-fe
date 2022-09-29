const formatter = new Intl.ListFormat("en", { style: "long", type: "conjunction" });

export const pluralize = (list: string[]) => formatter.format(list);
export const isString = (el: unknown): el is string => typeof el === "string";

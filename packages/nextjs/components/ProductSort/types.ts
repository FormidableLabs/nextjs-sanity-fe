import { CategoryPageProduct } from "../../utils/groqTypes/CategoryPageProduct";

export enum SortType {
  Default = "DEFAULT", // no sort
  Natural = "NATURAL", // sorts alphanumerical
}

export type SortOption = {
  id: number | string;
  name: string;
  label: string;
  type: SortType;
};

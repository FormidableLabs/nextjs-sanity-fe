import { AliasValue } from "@sanity-typed/types";
import { Get, Primitive, TypeMismatchError, ValueOf } from "./type-utils";

export type RootConfig = { TSchema: any; referenced: symbol };
export type RefType<referencedSymbol extends symbol, TTypeName> = {
  [P in referencedSymbol]: TTypeName;
};
export type ExtractRefType<TScope, TRootConfig extends RootConfig> =
  //
  TScope extends RefType<TRootConfig["referenced"], infer TTypeName>
    ? Get<TRootConfig["TSchema"], TTypeName>
    : TypeMismatchError<{
        error: "Expected the object to be a reference type";
        expected: RefType<TRootConfig["referenced"], keyof TRootConfig["TSchema"]>;
        actual: TScope;
      }>;
export type ExtractDocumentTypes<TRootConfig extends RootConfig> = Array<ValueOf<TRootConfig["TSchema"]>>;
export type ExpandAliasValuesDeep<T, TRootConfig extends RootConfig> = T extends AliasValue<infer TDocType>
  ? Get<TRootConfig["TSchema"], TDocType>
  : T extends Primitive
  ? T
  : T extends Array<infer TItem>
  ? Array<ExpandAliasValuesDeep<TItem, TRootConfig>>
  : {
      [P in keyof T]: ExpandAliasValuesDeep<T[P], TRootConfig>;
    };

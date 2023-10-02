import { GroqBuilder } from "./groq-builder";
import { SimplifyDeep } from "./type-utils";

export type RootConfig = { TSchema: any; referenced: symbol };

/**
 * A generic "parser" which can take any input and output a parsed type.
 * This signature is compatible with Zod.
 */
export type Parser<TInput, TOutput> = { parse(input: TInput): TOutput };

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

export type Get<TObj, TKey> = TKey extends keyof TObj
  ? TObj[TKey]
  : TypeMismatchError<{
      error: "Invalid property";
      expected: keyof TObj;
      actual: TKey;
    }>;

export type StringKeys<T> = Exclude<T, symbol | number>;

export type ExtractScope<TGroqBuilder extends GroqBuilder<any, any>> = TGroqBuilder extends GroqBuilder<
  infer TScope,
  infer TRootConfig
>
  ? TScope
  : never;

export type TypeMismatchError<TError extends { error: string; expected: any; actual: any }> = TError;

export type ExtractRootScope<TSchema> = {
  "*": ExtractDocumentTypes<TSchema>;
};
export type ExtractDocumentTypes<TSchema> = Array<SimplifyDeep<TSchema[keyof TSchema]>>;

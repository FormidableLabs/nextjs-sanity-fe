import { GroqBuilder } from "./groq-builder";

export declare const _referenced: unique symbol;

/**
 * A generic "parser" which can take any input and output a parsed type.
 * This signature is compatible with Zod.
 */
export type Parser<TInput, TOutput> = { parse(input: TInput): TOutput };

export type RefType<TType> = {
  [_referenced]: TType;
};

export type ExtractRefType<TSchema, TScope> = TScope extends RefType<infer TType>
  ? Get<TSchema, TType>
  : ExpectError<{
      Error: "Expected the object to be a reference type";
      Expected: RefType<keyof TSchema>;
      Actual: TScope;
    }>;

export type Get<TObj, TKey> = TKey extends keyof TObj
  ? TObj[TKey]
  : ExpectError<{
      Error: "Invalid property";
      Expected: keyof TObj;
      Actual: TKey;
    }>;

export type ExpectError<TError extends { Error: string; Expected: any; Actual: any }> = TError;

export type StringKeys<T> = Exclude<T, symbol | number>;

export type ExtractScope<TGroqBuilder extends GroqBuilder<any, any>> = TGroqBuilder extends GroqBuilder<
  any,
  infer TScope
>
  ? TScope
  : never;

export type ExpectedTypeError<TError extends { error: string; expected: any; actual: any }> = TError;

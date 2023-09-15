import type * as groqd from "groqd";
import { q } from "groqd";
import { _referenced } from "@sanity-typed/types";

export function getTypedQ<TSchema>() {
  return q as unknown as TypedQ<TSchema>;

  type Q = typeof q;
  interface TypedQ<TScope> {
    string: Q["string"];
    contentBlocks: Q["contentBlocks"];
    number: Q["number"];
    slug: <TKey extends keyof TScope>(fieldName: TKey) => [TKey, groqd.z.ZodString];
    (filter: "*"): TypedPipe<TScope, { isArray: true }>;
    <TFilter extends keyof TScope>(filter: TFilter): NonNullable<TScope[TFilter]> extends Array<infer TItem>
      ? TypedPipe<TItem, { isArray: true }>
      : TypedPipe<NonNullable<TScope[TFilter]>, { isArray: false }>;
  }

  type PipeMeta = { isArray: boolean };

  interface TypedPipe<TScope, TMeta extends PipeMeta> extends TypedQ<TScope> {
    filterByType<TType extends keyof TScope>(type: TType): TypedPipe<TScope[TType], TMeta>;

    filter(): this;
    filter(customFilterString: string): this;

    deref(): //
    TScope extends MaybeArray<{ [_referenced]: infer TRefType }>
      ? TRefType extends keyof TSchema
        ? TypedPipe<NonNullable<TSchema[TRefType]>, { isArray: TScope extends Array<any> ? true : false }>
        : { "[deref error]": "⛔️ invalid [_referenced]:"; [_referenced]: TRefType }
      : { "[deref error]": "⛔️ missing [_referenced]:"; TScope: TScope };

    grab$$<S extends VerifySelection<S, TScope>>(selection: (q: TypedQ<TScope>) => S): groqd.TypeFromSelection<S>;
  }
  type VerifySelection<T, TScope> = SelectionByKey<TScope> & {
    [K in keyof T]: K extends keyof TScope
      ? unknown
      :
          | SelectionKeyError<TScope, Exclude<K, number | symbol>>
          | SelectionTuple<TScope, Exclude<keyof TScope, number | symbol>>
          | SelectionTupleError<TScope>
          | SelectionQuery<TScope>;
  };

  type SelectionByKey<TScope> = {
    [P in keyof TScope]?:
      | SelectionKey<TScope, P>
      | SelectionTuple<TScope, Exclude<keyof TScope, number | symbol>>
      | SelectionTupleError<TScope>
      | SelectionQuery<TScope>;
  };
  type SelectionKey<TScope, TKey extends keyof TScope> = groqd.z.ZodType<TScope[TKey]>;
  type SelectionKeyError<TScope, TKey extends string> =
    // Wrapping in ZodType brings this error to the front of the list
    groqd.z.ZodType<{
      "[grab error]": `⛔️The current scope does not have a field named '${TKey}' ⛔️`;
      "Potential Solutions": [
        `Fix a typo in '${TKey}'`,
        `Remove this '${TKey}' selector`,
        { "Use a tuple to select a valid field, eg": keyof TScope },
        "Use a nested query"
      ];
    }>;

  type SelectionTuple<TScope, TKey extends keyof TScope> = readonly [TKey, groqd.z.ZodType<TScope[TKey]>];
  type SelectionTupleError<TScope> =
    // Wrapping in Array ensures this error is shown in the correct context
    Array<string | { "[grab error]": "⛔️ If you use a tuple, be sure to include 'as const' ⛔️" }>;

  type SelectionQuery<TScope> = groqd.BaseQuery<any>;

  type MaybeArray<T> = Array<T> | T;
}

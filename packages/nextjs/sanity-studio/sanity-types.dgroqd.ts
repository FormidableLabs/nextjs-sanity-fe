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
    slug: Q["slug"];
    (filter: "*"): TypedPipe<TScope>;
    <TFilter extends keyof TScope>(filter: TFilter): TypedPipe<NonNullable<TScope[TFilter]>>;
  }

  interface TypedPipe<TScope> extends TypedQ<TScope> {
    filterByType<TType extends keyof TScope>(type: TType): TypedPipe<TScope[TType]>;

    filter(): this;
    filter(customFilterString: string): this;

    deref(): //
    TScope extends MaybeArray<{ [_referenced]: infer TRefType }>
      ? TRefType extends keyof TSchema
        ? TypedPipe<NonNullable<TSchema[TRefType]>>
        : { "[deref error]: invalid [_referenced]:": TRefType }
      : { "[deref error]: missing [_referenced]:": TScope };

    grab$$<S extends TypedSelection<TScope>>(
      //
      selection: (q: TypedQ<TScope>) => S
    ): unknown;
  }

  type TypedSelection<TScope> =
    //
    SelectionByKey<TScope> & SelectionByQuery<TScope> & SelectionByTuple<TSchema>;
  type SelectionByKey<TScope> = {
    [P in keyof TScope]?: groqd.z.ZodType<TScope[P]>;
  };
  type SelectionByQuery<TScope> = {
    [P in string]: groqd.BaseQuery<any>;
  };
  type SelectionByTuple<TScope> = {
    [P in string]: SelectionTuple<TScope, keyof TScope>;
  };
  type SelectionTuple<TScope, TKey extends keyof TScope> = readonly [TKey, groqd.z.ZodType<TScope[TKey]>];

  type MaybeArray<T> = Array<T> | T;
}

import { q } from "groqd";
import { _referenced } from "@sanity-typed/types";

export function getTypedQ<TSchema>() {
  return q as unknown as TypedQ<TSchema>;

  type Query<TValue> = (value: TValue) => boolean;
  interface TypedQ<TScope> {
    // string(): Query<string>;
    // number(): Query<number>;
    // contentBlocks(): Query<unknown>;
    // slug: <TKey extends keyof TScope>(fieldName: TKey) => [TKey, groqd.z.ZodString];
    slug<TKey extends keyof TScope>(fieldName: TKey): Query<string>;

    (filter: "*"): Builder<TScope, { isArray: true }>;
    <TFilter extends keyof TScope>(selector: TFilter): //
    NonNullable<TScope[TFilter]> extends Array<infer TItem>
      ? Builder<TItem, { isArray: true }>
      : Builder<NonNullable<TScope[TFilter]>, { isArray: false }>;
  }

  type PipeMeta = { isArray: boolean };

  interface Builder<TScope, TMeta extends PipeMeta> extends TypedQ<TScope> {
    filterByType<TType extends keyof TScope>(type: TType): Builder<TScope[TType], TMeta>;

    filter(): this;
    filter(customFilterString: string): this;

    deref(): //
    TScope extends MaybeArray<{ [_referenced]: infer TRefType }>
      ? TRefType extends keyof TSchema
        ? Builder<NonNullable<TSchema[TRefType]>, { isArray: TScope extends Array<any> ? true : false }>
        : { "[deref error]": "⛔️ invalid [_referenced]:"; [_referenced]: TRefType }
      : { "[deref error]": "⛔️ missing [_referenced]:"; TScope: TScope };

    grab<
      S extends Verify<
        S,
        {
          // Keys of TScope can be `true` to pass-through:
          [P in keyof TScope]?: StringQuery<keyof TScope> | Query<any> | true;
        },
        {
          [P in string]: StringQuery<keyof TScope> | Query<any>;
        }
      >
    >(
      //
      selection: (q: TypedQ<TScope>) => S
    ): TypeFromSelection<S, TScope>;
  }

  type StringQuery<TField> = TField;

  type Verify<T, TFields, TIndexType> = TFields & {
    [P in keyof T]: P extends keyof TFields
      ? unknown
      : //
      P extends keyof TIndexType
      ? TIndexType[P]
      : //
        never;
  };

  type TypeFromSelection<TSelection, TScope> = Query<{
    [P in keyof TSelection]: TSelection[P] extends true
      ? P extends keyof TScope
        ? TScope[P]
        : "invalid - 1"
      : TSelection[P] extends Query<infer TValue>
      ? TValue
      : //
      TSelection[P] extends StringQuery<infer TKey>
      ? TKey extends keyof TScope
        ? TScope[TKey]
        : "invalid - 2"
      : "invalid - 3";
  }>;

  type MaybeArray<T> = Array<T> | T;
}

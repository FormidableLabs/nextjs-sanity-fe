import { GroqBuilder } from "../groq-builder";

declare module "../groq-builder" {
  export interface GroqBuilder<TSchema, TScope> {
    filter<TScopeNew extends TScope = TScope>(filterString?: string): GroqBuilder<TSchema, TScopeNew>;
    filterByType<TType extends Extract<MaybeArrayItem<TScope>, { _type: any }>["_type"]>(
      type: TType
    ): GroqBuilder<TSchema, Extract<TScope, { type: TType }>>;
  }
}

type MaybeArrayItem<T> = T extends Array<infer TItem> ? TItem : T;

GroqBuilder.implement({
  filter(this: GroqBuilder<any, any>, filterString = "") {
    return this.extend(`[${filterString}]`, null);
  },

  filterByType(this: GroqBuilder<any, any>, type) {
    return this.extend(`[_type == '${type}']`, null);
  },
});

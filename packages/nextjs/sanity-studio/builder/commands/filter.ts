import { GroqBuilder } from "../groq-builder";
import { StringKeys } from "../common-types";

declare module "../groq-builder" {
  export interface GroqBuilder<TSchema, TScope> {
    filter<TScopeNew = TScope>(filterString?: string): GroqBuilder<TSchema, TScopeNew>;
    filterByType<TType extends StringKeys<keyof TSchema>>(type: TType): GroqBuilder<TSchema, TSchema[TType]>;
  }
}

GroqBuilder.implement({
  filter(this: GroqBuilder<any, any>, filterString = "") {
    return this.extend(`[${filterString}]`, null);
  },

  filterByType(this: GroqBuilder<any, any>, type) {
    return this.extend(`[_type == '${type}']`, null);
  },
});

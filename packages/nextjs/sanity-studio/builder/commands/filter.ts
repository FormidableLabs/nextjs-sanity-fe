import { GroqBuilder } from "../groq-builder";
import { ArrayItem } from "../type-utils";
import { RootConfig } from "../common-types";

declare module "../groq-builder" {
  export interface GroqBuilder<TScope, TRootConfig extends RootConfig> {
    filter<TScopeNew extends TScope = TScope>(filterString?: string): GroqBuilder<TScopeNew, TRootConfig>;
    filterByType<TType extends Extract<ArrayItem<TScope>, { _type: any }>["_type"]>(
      type: TType
    ): GroqBuilder<Array<Extract<ArrayItem<TScope>, { _type: TType }>>, TRootConfig>;
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

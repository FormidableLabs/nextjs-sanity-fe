import { GroqBuilder } from "../groq-builder";
import { ExtractRefType, RootConfig, StringKeys } from "../common-types";
import { MaybeArrayItem } from "../type-utils";

declare module "../groq-builder" {
  export interface GroqBuilder<TScope, TRootConfig extends RootConfig> {
    slug(
      fieldName: StringKeys<keyof MaybeArrayItem<TScope>>
    ): GroqBuilder<TScope extends Array<infer TScopeItem> ? Array<string> : string, TRootConfig>;
  }
}

GroqBuilder.implement({
  slug(this: GroqBuilder<any, RootConfig>, fieldName) {
    return this.extend(`${fieldName}.current`, null);
  },
});

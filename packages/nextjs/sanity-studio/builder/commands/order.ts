import { GroqBuilder } from "../groq-builder";
import { ArrayItem } from "../type-utils";
import { StringKeys } from "../common-types";

declare module "../groq-builder" {
  export interface GroqBuilder<TScope, TRootConfig extends RootConfig> {
    // order(field: keyof ArrayItem<TScope>, direction?: OrderDirection): GroqBuilder<TScope, TRootConfig>;
    // order(fields: { [P in keyof ArrayItem<TScope>]: OrderDirection }): GroqBuilder<TScope, TRootConfig>;

    order<TKeys extends StringKeys<keyof ArrayItem<TScope>>>(
      ...fields: Array<`${TKeys}${"" | " asc" | " desc"}`>
    ): GroqBuilder<TScope, TRootConfig>;
  }

  export type OrderDirection = "asc" | "desc";
}

GroqBuilder.implement({
  order(this: GroqBuilder<any, any>, ...fields) {
    return this.extend(`| order(${fields.join(", ")})`, null);
  },
});

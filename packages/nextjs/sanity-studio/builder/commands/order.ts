import { GroqBuilder } from "../groq-builder";
import { ArrayItem } from "../type-utils";
import { RootConfig, StringKeys } from "../common-types";

declare module "../groq-builder" {
  export interface GroqBuilder<TScope, TRootConfig extends RootConfig> {
    order<TKeys extends StringKeys<keyof ArrayItem<TScope>>>(
      ...fields: Array<`${TKeys}${"" | " asc" | " desc"}`>
    ): GroqBuilder<TScope, TRootConfig>;

    /** @deprecated Sorting is done via the 'order' method */
    sort: never;
  }
}

GroqBuilder.implement({
  order(this: GroqBuilder<any, any>, ...fields) {
    return this.extend(`| order(${fields.join(", ")})`, null);
  },
});

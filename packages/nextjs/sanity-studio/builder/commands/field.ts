import { GroqBuilder } from "../groq-builder";
import { RootConfig, StringKeys } from "../common-types";

declare module "../groq-builder" {
  export interface GroqBuilder<TScope, TRootConfig extends RootConfig> {
    field<TFieldName extends StringKeys<keyof TScope>>(
      fieldName: TFieldName
    ): GroqBuilder<TScope[TFieldName], TRootConfig>;
  }
}

GroqBuilder.implement({
  field(this: GroqBuilder<any, any>, fieldName: string) {
    return this.extend(fieldName, null);
  },
});

import { GroqBuilder } from "../groq-builder";
import { StringKeys } from "../common-types";

declare module "../groq-builder" {
  export interface GroqBuilder<TSchema, TScope> {
    field(all: "*"): GroqBuilder<TSchema, TScope>;
    field<TFieldName extends StringKeys<keyof TScope>>(fieldName: TFieldName): GroqBuilder<TSchema, TScope[TFieldName]>;
  }
}

GroqBuilder.implement({
  field(this: GroqBuilder<any, any>, fieldName: string) {
    return this.extend(fieldName, null);
  },
});

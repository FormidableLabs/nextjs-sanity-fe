import { GroqBuilder } from "../groq-builder";
import { ExtractRefType } from "../common-types";

declare module "../groq-builder" {
  export interface GroqBuilder<TSchema, TScope> {
    deref(): TScope extends Array<infer TScopeItem>
      ? Array<ExtractRefType<TSchema, TScopeItem>>
      : ExtractRefType<TSchema, TScope>;
  }
}

GroqBuilder.implement({
  deref(this: GroqBuilder<any, any>): any {
    return this.extend("->", null);
  },
});

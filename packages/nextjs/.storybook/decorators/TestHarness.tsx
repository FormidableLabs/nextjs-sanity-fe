import { Decorator } from "@storybook/react";
import { MotionConfig, MotionConfigProps } from "framer-motion";
import { TypedParameters } from "../types";

declare module "../types" {
  export interface TypedParameters {
    motionConfig: MotionConfigProps;
  }
}

export const TestHarnessDecorator: Decorator = (Story, ctx) => {
  const parameters = ctx.parameters as TypedParameters;
  return (
    <MotionConfig {...parameters.motionConfig}>
      <Story />
    </MotionConfig>
  );
};

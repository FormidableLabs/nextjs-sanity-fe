import * as React from "react";
import { FC, PropsWithChildren } from "react";
import { Decorator } from "@storybook/react";
import { MotionConfig, MotionConfigProps } from "framer-motion";
import { TypedParameters } from "../types";

declare module "../types" {
  export interface TypedParameters extends TestHarnessProps {}
}

export type TestHarnessProps = {
  motionConfig?: MotionConfigProps;
};

export const TestHarness: FC<PropsWithChildren<TestHarnessProps>> = ({ motionConfig, children }) => {
  return <MotionConfig {...motionConfig}>{children}</MotionConfig>;
};

export const TestHarnessDecorator: Decorator = (Story, ctx) => {
  const { motionConfig } = ctx.parameters as TypedParameters;
  return (
    <TestHarness motionConfig={motionConfig}>
      <Story />
    </TestHarness>
  );
};

import { StoryObj as _StoryObj, Meta as _Meta } from "@storybook/react";

/*
 Storybook does not give us strongly-typed parameters,
 so we're going to export our own overrides.
 */

export interface TypedParameters {
  /*
   This interface intentionally left blank,
   so that it can be extended by the decorators that use it.
   */
}

type Override<TOriginal, TOverrides> = TOverrides & Omit<TOriginal, keyof TOverrides>;

export type StoryObj<TComponent> = Override<
  _StoryObj<TComponent>,
  {
    parameters?: TypedParameters;
  }
>;

export type Meta<TComponent> = Override<
  _Meta<TComponent>,
  {
    parameters?: TypedParameters;
  }
>;

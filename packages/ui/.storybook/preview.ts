import type { Preview } from "@storybook/react";

import "../styles/global.css";
import { TestHarnessDecorator } from "./decorators/TestHarness";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    // List all global decorators:
    TestHarnessDecorator,
  ],
};

export default preview;

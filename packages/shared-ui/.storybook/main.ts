const config = {
  stories: ["../**/*.mdx", "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  docs: {
    autodocs: "tag",
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;

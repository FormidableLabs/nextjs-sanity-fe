import { SanityCodegenConfig } from "@sanity-codegen/cli";
const config: SanityCodegenConfig = {
  // const config = {
  /**
   * Optionally provide the path to your sanity schema entry point. If not
   * provided, the CLI will try to get this value from your `sanity.json` file.
   */
  // sanityConfigPath: "./sanity.config.ts",
  // schemaPath: "./sanity.config.ts",
  schemaPath: "./schemas/schema.ts",
  /**
   * Specify a glob (powered by
   * [`globby`](https://github.com/sindresorhus/globby)), a list of globs, or a
   * function that returns a list of paths to specify the source files you want
   * to generate types from.
   *
   * If `include` is provided as a function then `exclude`
   * will not be used.
   */
  // include: ['./src/**/*.{js,jsx,ts,tsx}'],
  /**
   * Specify a glob (powered by
   * [`globby`](https://github.com/sindresorhus/globby)) or a list of globs to
   * specify which source files you want to exclude from type generation.
   */
  // exclude: ['**/*.test.{js,ts,tsx}', '**/node_modules'],
  /**
   * Optionally provide a destination path to the resulting sanity groq types.
   * The default value is `sanity-codegen.d.ts`.
   */
  // output: './sanity-codegen.d.ts',
  /**
   * Optionally provide a path to a .babelrc file. This will be passed into the
   * babel options of the schema executor.
   *
   * If both `babelOptions` and `babelrcPath` are provided, the results will be
   * merged with `babel-merge`
   */
  // babelrcPath: './babelrc',
  /**
   * Optionally provide babel options inline. This will be passed into the babel
   * options of the schema executor.
   *
   * Note: these options get serialized to JSON so if you need to pass any
   * non-serializable babel options, you must use `babelrcPath` (can be
   * `.babelrc.js`).
   *
   * If both `babelOptions` and `babelrcPath` are provided, the results will be
   * merged with `babel-merge`
   */
  // babelOptions: {
  //   // ...
  // },
  /**
   * Determines from where files are relative to. Defaults to where your
   * sanity-codegen config was found.
   */
  // root: process.cwd(),
  /**
   * An array of extracted and normalized schema results from the
   * `normalizeSchema` function
   */
  // normalizedSchemas: undefined,
  /**
   * Ignores workspace schemas and excludes them from codegen. Useful if you
   * have a workspace that mirrors another one in schema (e.g. for staging env)
   */
  // ignoreSchemas: ['staging'],
  /**
   * Optionally provide a function that generates the typescript type identifer
   * from the sanity type name. Use this function to override the default and
   * prevent naming collisions.
   */
  // generateTypeName: undefined,
  /**
   * This option is fed directly to prettier `resolveConfig`
   *
   * https://prettier.io/docs/en/api.html#prettierresolveconfigfilepath--options
   */
  // prettierResolveConfigPath: undefined,
  /**
   * This options is also fed directly to prettier `resolveConfig`
   *
   * https://prettier.io/docs/en/api.html#prettierresolveconfigfilepath--options
   */
  // prettierResolveConfigOptions: undefined,
};

export default config;

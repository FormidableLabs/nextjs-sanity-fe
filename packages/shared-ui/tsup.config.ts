import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./index.ts"],
  sourcemap: true,
  clean: true,
  dts: true,
  format: ["cjs", "esm"],
  target: "es6",
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
  },
});

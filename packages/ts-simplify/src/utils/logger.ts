import debug from "debug";

export namespace logger {
  const base = debug("ts-simplify");
  export const info = base.extend("info");
  export const warn = base.extend("warn");
  export const error = base.extend("error");
}

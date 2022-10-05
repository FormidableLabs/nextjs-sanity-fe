export interface InterceptSSRConfig {
  url: string;
  staticResponse: unknown;
}
export type InterceptSSRResult = ReturnType<typeof interceptSSR>;

export function interceptSSR(config: InterceptSSRConfig) {
  console.log("interceptSSR", config);

  return null; // Required by cypress
}

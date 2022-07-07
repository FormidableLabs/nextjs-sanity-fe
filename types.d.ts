declare namespace NodeJS {
  export interface ProcessEnv {
    readonly SANITY_GRAPHQL_URL: string;
    readonly SANITY_READ_TOKEN: string;
  }
}

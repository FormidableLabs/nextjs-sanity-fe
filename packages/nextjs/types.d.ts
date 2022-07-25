declare namespace NodeJS {
  export interface ProcessEnv {
    readonly SANITY_GRAPHQL_URL: string;
    readonly SANITY_READ_TOKEN: string;
    readonly SANITY_PROJECT_ID: string;
    readonly NEXT_PUBLIC_SANITY_PROJECT_ID: string;
  }
}

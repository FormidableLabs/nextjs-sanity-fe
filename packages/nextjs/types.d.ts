declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_SANITY_READ_TOKEN: string;
    readonly NEXT_PUBLIC_SANITY_GRAPHQL_URL: string;
    readonly NEXT_PUBLIC_SANITY_PROJECT_ID: string;
  }
}

declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_SANITY_GRAPHQL_URL: string;
    readonly NEXT_PUBLIC_SANITY_PROJECT_ID: string;
    readonly NEXT_PUBLIC_CART_COOKIE_NAME: string;
    readonly NEXT_PUBLIC_PAGINATION_PAGE_SIZE: number;
  }
}

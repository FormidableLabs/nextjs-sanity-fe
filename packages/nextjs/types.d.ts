declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_SANITY_PROJECT_ID: string;
    readonly NEXT_PUBLIC_API_MOCKING: 'enabled' | undefined;
  }
}

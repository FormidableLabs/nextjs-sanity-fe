// env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SANITY_STUDIO_PROJECT_ID: string;
  readonly SANITY_STUDIO_DATASET: string;
  // more env variables...
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

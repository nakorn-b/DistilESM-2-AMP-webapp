/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INFERENCE_API_URL: string;
  // add more env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

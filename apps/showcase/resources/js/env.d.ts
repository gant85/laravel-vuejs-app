/// <reference types="vite/client" />

import type { AxiosInstance } from 'axios';

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    axios: AxiosInstance;
  }
}

export {};

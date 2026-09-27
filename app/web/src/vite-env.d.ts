/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Backend origin; empty string means same-origin (dev proxy). */
  readonly VITE_API_URL?: string
}

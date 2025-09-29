// Minimal JSX typings and Vite env shims to avoid requiring external @types

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  interface Element {}
}

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  // add other VITE_ keys as needed
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}



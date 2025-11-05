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

// Tawk.to widget type definitions
interface Tawk_API {
  hideWidget: () => void;
  showWidget: () => void;
  maximize: () => void;
  minimize: () => void;
  toggle: () => void;
  onLoad: () => void;
  onChatStarted: () => void;
  onChatEnded: () => void;
  onOfflineSubmit: () => void;
}

interface Window {
  Tawk_API?: Tawk_API;
  __IS_BLOCKED__?: boolean;
  __BLOCKED_CHECK_IN_PROGRESS__?: boolean;
}



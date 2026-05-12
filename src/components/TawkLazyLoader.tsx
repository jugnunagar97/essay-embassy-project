import { useEffect } from 'react';

const TAWK_EMBED_SRC = 'https://embed.tawk.to/69d635281d194b1c32e23030/1jlmbvaim';

/**
 * Injects the Tawk.to embed only when mounted. GeoBlock mounts this only for
 * allowed regions (never for IN/PK), so the widget never loads for blocked users.
 */
export default function TawkLazyLoader() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ((window as unknown as { __IS_BLOCKED__?: boolean }).__IS_BLOCKED__) return;
    if (document.querySelector('script[src*="embed.tawk.to"]')) return;

    const w = window as unknown as { Tawk_API?: Record<string, unknown>; Tawk_LoadStart?: Date };
    w.Tawk_API = w.Tawk_API || {};
    w.Tawk_LoadStart = new Date();

    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = TAWK_EMBED_SRC;
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    const first = document.getElementsByTagName('script')[0];
    if (first?.parentNode) {
      first.parentNode.insertBefore(s1, first);
    } else {
      document.body.appendChild(s1);
    }
  }, []);

  return null;
}

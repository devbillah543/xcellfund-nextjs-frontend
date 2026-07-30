"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        parameters: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark";
        }
      ) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
    __recaptchaOnLoad?: () => void;
  }
}

type Props = {
  siteKey: string;
  onChange: (token: string | null) => void;
};

let recaptchaScriptPromise: Promise<void> | null = null;

function loadRecaptchaScript() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha?.render) return Promise.resolve();

  if (!recaptchaScriptPromise) {
    recaptchaScriptPromise = new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[src^="https://www.google.com/recaptcha/api.js"]'
      );
      if (existing) {
        const check = () => {
          if (window.grecaptcha?.render) resolve();
          else setTimeout(check, 50);
        };
        check();
        return;
      }

      window.__recaptchaOnLoad = () => resolve();
      const script = document.createElement("script");
      script.src =
        "https://www.google.com/recaptcha/api.js?onload=__recaptchaOnLoad&render=explicit";
      script.async = true;
      script.defer = true;
      script.onerror = () => reject(new Error("Failed to load reCAPTCHA"));
      document.head.appendChild(script);
    });
  }

  return recaptchaScriptPromise;
}

export default function Recaptcha({ siteKey, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;

    let cancelled = false;

    loadRecaptchaScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.grecaptcha) return;
        if (widgetIdRef.current !== null) return;

        // Avoid double-render if React Strict Mode remounts
        containerRef.current.innerHTML = "";

        widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => onChangeRef.current(token),
          "expired-callback": () => onChangeRef.current(null),
          "error-callback": () => onChangeRef.current(null),
          theme: "light",
        });
      })
      .catch(() => {
        onChangeRef.current(null);
      });

    return () => {
      cancelled = true;
    };
  }, [siteKey]);

  return (
    <div className="w-full overflow-x-auto">
      <div ref={containerRef} className="g-recaptcha" />
    </div>
  );
}

export function resetRecaptcha(widgetId?: number | null) {
  if (typeof window === "undefined" || !window.grecaptcha) return;
  try {
    window.grecaptcha.reset(widgetId ?? undefined);
  } catch {
    // ignore
  }
}

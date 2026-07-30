// app.config.ts

interface AppConfig {
  appUrl: string;
  apiUrl: string;
  apiKey: string;
  assetUrl?: string;
  cacheTimeout: number; // in seconds
  recaptchaSiteKey: string;
}

const appConfig: AppConfig = {
  appUrl: process.env.NEXT_APP_URL || "http://localhost:3000",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337",
  apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
  cacheTimeout: process.env.NEXT_CACHE_TIMEOUT
    ? parseInt(process.env.NEXT_CACHE_TIMEOUT, 10)
    : 3600, // default 1 hour
  assetUrl: process.env.NEXT_PUBLIC_ASSET_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337",
  // Google test key used if unset — replace with your site key in production
  recaptchaSiteKey:
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
    "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
};

export default appConfig;

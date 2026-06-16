import type { CapacitorConfig } from "@capacitor/cli";
import { SITE_SHORT_NAME, SITE_URL } from "./app/lib/site";

const config: CapacitorConfig = {
  appId: "run.zentro.assistant",
  appName: SITE_SHORT_NAME,
  webDir: "www",
  server: {
    url: SITE_URL,
    cleartext: false,
  },
  plugins: {
    Keyboard: {
      resizeOnFullScreen: true,
    },
  },
};

export default config;

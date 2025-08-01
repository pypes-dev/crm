import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "dev.pypes.app",
  appName: "Pypes",
  webDir: "dist",
  plugins: {
    "CapacitorCookies": {
      enabled: true,
    },
    "CapacitorHttp": {
      enabled: true,
    },
  },
};

export default config;

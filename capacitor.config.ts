import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.shynvo.platform',
  appName: 'Shynvo',
  webDir: 'www',
  server: {
    url: 'https://shynvo.app',
    cleartext: false
  },
  plugins: {
    Keyboard: {
      resizeOnFullScreen: true
    }
  }
};

export default config;
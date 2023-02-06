import type { AutoUpdateMethod, CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nowiam.devfath',
  appName: 'now-i-am',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    LiveUpdates: {
      appId: process.env.APPFLOW_APP_ID ?? '',
      channel: process.env.APPFLOW_CHANNEL ?? '',
      autoUpdateMethod: (process.env.APPFLOW_AUTO_UPDATE_METHOD as AutoUpdateMethod) ?? 'none',
      maxVersions: Number(process.env.APPFLOW_MAX_VERSION) ?? 0,
      key: process.env.APPFLOW_KEY ?? '',
    },
  },
  android: { appendUserAgent: 'now-i-am 0.0.1' },
  ios: { appendUserAgent: 'now-i-am 0.0.1' },
};

export default config;

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nowiam.devfath',
  appName: 'now-i-am',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    LiveUpdates: {
      appId: '760b7584',
      channel: 'Production',
      autoUpdateMethod: 'background',
      maxVersions: 2,
      key: '',
    },
  },
  android: { appendUserAgent: 'now-i-am 0.0.1' },
  ios: { appendUserAgent: 'now-i-am 0.0.1' },
};

export default config;

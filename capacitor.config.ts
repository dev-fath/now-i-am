import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nowiam.devfath',
  appName: 'now-i-am',
  webDir: 'build',
  bundledWebRuntime: false,
  cordova: {
    preferences: {},
  },
  android: { appendUserAgent: 'now-i-am 0.0.1' },
  ios: { appendUserAgent: 'now-i-am 0.0.1' },
};

export default config;

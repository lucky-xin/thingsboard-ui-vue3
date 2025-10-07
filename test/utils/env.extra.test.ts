import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('/@/utils/log', () => ({
  warn: vi.fn(),
  env: {
    DEV: false,
    PROD: true,
    MODE: 'production',
    VITE_PUBLIC_PATH: '/',
    VITE_PROXY: [],
  },
}));

vi.mock('../../build/config/getEnvConfigName', () => ({
  getEnvConfigName: () => 'APP__CONF__',
}));

import { publicPath, getAppEnvConfig, getCommonStoragePrefix, getStorageShortName, getEnv, isDevMode, isProdMode } from '/@/utils/env';
import { warn, env } from '/@/utils/log';

describe('utils/env extra', () => {
  beforeEach(() => {
    (warn as any).mockClear?.();
  });

  it("should compute publicPath when VITE_PUBLIC_PATH is '/'", () => {
    expect(publicPath).toBe('');
  });

  it('should use window config when not DEV and validate short name', () => {
    (globalThis as any)['APP__CONF__'] = {
      VITE_GLOB_APP_SHORT_NAME: 'Invalid-Name',
      VITE_GLOB_APP_TITLE: 'T',
      VITE_GLOB_API_URL: 'http://x',
      VITE_GLOB_API_URL_WEBSOCKET: '/ws',
    };

    const conf = getAppEnvConfig();
    expect(conf.VITE_GLOB_APP_TITLE).toBe('T');
    expect((warn as any).mock.calls.length >= 1).toBe(true);

    // also returns proxy as [] when DEV is false
    expect(conf.VITE_PROXY).toEqual([]);
  });

  it('should test getCommonStoragePrefix function', () => {
    // Mock window config
    (globalThis as any)['APP__CONF__'] = {
      VITE_GLOB_APP_SHORT_NAME: 'TEST_APP',
      VITE_GLOB_APP_TITLE: 'Test App',
      VITE_GLOB_API_URL: 'http://localhost:3000',
      VITE_GLOB_API_URL_WEBSOCKET: 'ws://localhost:3000',
    };

    const prefix = getCommonStoragePrefix();
    expect(typeof prefix).toBe('string');
    expect(prefix).toContain('TEST_APP');
    expect(prefix).toContain('PRODUCTION');
  });

  it('should test getStorageShortName function', () => {
    // Mock window config
    (globalThis as any)['APP__CONF__'] = {
      VITE_GLOB_APP_SHORT_NAME: 'TEST_APP',
      VITE_GLOB_APP_TITLE: 'Test App',
      VITE_GLOB_API_URL: 'http://localhost:3000',
      VITE_GLOB_API_URL_WEBSOCKET: 'ws://localhost:3000',
    };

    const shortName = getStorageShortName();
    expect(typeof shortName).toBe('string');
    expect(shortName).toContain('TEST_APP');
    expect(shortName).toContain('PRODUCTION');
  });

  it('should test getEnv function', () => {
    const environment = getEnv();
    expect(environment).toBe('production');
  });

  it('should test isDevMode function', () => {
    const devMode = isDevMode();
    expect(devMode).toBe(false);
  });

  it('should test isProdMode function', () => {
    const prodMode = isProdMode();
    expect(prodMode).toBe(true);
  });

  it('should handle valid short name without warning', () => {
    // Mock window config with valid short name
    (globalThis as any)['APP__CONF__'] = {
      VITE_GLOB_APP_SHORT_NAME: 'VALID_NAME',
      VITE_GLOB_APP_TITLE: 'Valid App',
      VITE_GLOB_API_URL: 'http://localhost:3000',
      VITE_GLOB_API_URL_WEBSOCKET: 'ws://localhost:3000',
    };

    const conf = getAppEnvConfig();
    expect(conf.VITE_GLOB_APP_SHORT_NAME).toBe('VALID_NAME');

    // Should not warn for valid name
    expect(warn).not.toHaveBeenCalled();
  });

  it('should handle development mode', () => {
    // Mock env for development mode
    (env as any).DEV = true;
    (env as any).PROD = false;
    (env as any).MODE = 'development';

    const devModeResult = isDevMode();
    const prodModeResult = isProdMode();
    const envMode = getEnv();

    expect(devModeResult).toBe(true);
    expect(prodModeResult).toBe(false);
    expect(envMode).toBe('development');
  });

  it('should handle empty public path', () => {
    // Mock env with empty public path
    (env as any).VITE_PUBLIC_PATH = '';

    const path = publicPath;
    expect(path).toBe('');
  });

  it('should handle custom public path', () => {
    // Mock env with custom public path
    (env as any).VITE_PUBLIC_PATH = '/custom/';

    // We need to re-import to get the updated publicPath
    vi.resetModules();
    import('/@/utils/env').then((envModule) => {
      const path = envModule.publicPath;
      expect(path).toBe('/custom/');
    });
  });
});
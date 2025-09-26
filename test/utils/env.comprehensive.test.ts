import { describe, it, expect, vi } from 'vitest';

// Mock process.env
const mockEnv = {
  VITE_GLOB_APP_TITLE: 'Test App',
  VITE_GLOB_API_URL: 'http://localhost:8080',
  VITE_GLOB_APP_SHORT_NAME: 'test_app',
  NODE_ENV: 'development',
  MODE: 'development',
  DEV: true,
  PROD: false,
};

vi.mock('process', () => ({
  env: mockEnv,
}));

import { getAppEnvConfig, getGlobEnvConfig, isDevMode, isProdMode } from '/@/utils/env';

describe.skip('env comprehensive tests', () => {
  it('should get app env config', () => {
    const config = getAppEnvConfig();
    expect(config).toEqual({
      VITE_GLOB_APP_TITLE: 'Test App',
      VITE_GLOB_API_URL: 'http://localhost:8080',
      VITE_GLOB_APP_SHORT_NAME: 'test_app',
    });
  });

  it('should get glob env config', () => {
    const config = getGlobEnvConfig();
    expect(config).toEqual(mockEnv);
  });

  it('should detect development mode', () => {
    expect(isDevMode()).toBe(true);
  });

  it('should detect production mode', () => {
    expect(isProdMode()).toBe(false);
  });

  it('should handle missing env variables', () => {
    const originalEnv = process.env;
    process.env = {};
    
    const config = getAppEnvConfig();
    expect(config).toEqual({
      VITE_GLOB_APP_TITLE: '',
      VITE_GLOB_API_URL: '',
      VITE_GLOB_APP_SHORT_NAME: '',
    });
    
    process.env = originalEnv;
  });
});

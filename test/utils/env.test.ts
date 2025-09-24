import { describe, it, expect, vi } from 'vitest';
import * as envUtils from '/@/utils/env';
import { version } from '../../package.json';

// Mock the log module
vi.mock('/@/utils/log', () => ({
  warn: vi.fn(),
  env: {
    MODE: 'test',
    DEV: true,
    PROD: false,
    VITE_PUBLIC_PATH: '/',
    VITE_PROXY: '[]',
    VITE_GLOB_APP_SHORT_NAME: 'TEST_APP',
  },
}));

// Mock the getEnvConfigName function
vi.mock('../../build/config/getEnvConfigName', () => ({
  getEnvConfigName: () => 'TEST_CONFIG',
}));

describe('utils/env', () => {
  describe('constants', () => {
    it('should have correct mode constants', () => {
      expect(envUtils.devMode).toBe('development');
      expect(envUtils.prodMode).toBe('production');
    });
  });

  describe('getEnv', () => {
    it('should return environment mode', () => {
      expect(envUtils.getEnv()).toBe('test');
    });
  });

  describe('mode check functions', () => {
    it('should check if dev mode', () => {
      expect(envUtils.isDevMode()).toBe(true);
    });

    it('should check if prod mode', () => {
      expect(envUtils.isProdMode()).toBe(false);
    });
  });

  describe('publicPath', () => {
    it('should return correct public path', () => {
      expect(envUtils.publicPath).toBe('');
    });
  });

  describe('storage functions', () => {
    it('should generate common storage prefix', () => {
      const prefix = envUtils.getCommonStoragePrefix();
      expect(prefix).toContain('TEST_APP');
      expect(prefix).toContain('TEST');
      expect(prefix).toBe(prefix.toUpperCase());
    });

    it('should generate storage short name', () => {
      const shortName = envUtils.getStorageShortName();
      expect(shortName).toContain('TEST_APP');
      expect(shortName).toContain(version);
      expect(shortName).toBe(shortName.toUpperCase());
    });
  });
});

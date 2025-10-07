import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as envUtils from '/@/utils/env';
import { version } from '../../package.json';
import { warn } from '/@/utils/log';

// Mock the log module
vi.mock('/@/utils/log', () => ({
  warn: vi.fn(),
  env: {
    MODE: 'development',
    DEV: true,
    PROD: false,
    VITE_PUBLIC_PATH: '/',
    VITE_PROXY: '[]',
    VITE_GLOB_APP_SHORT_NAME: 'TEST_APP',
  },
}));

describe('utils/env', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('constants', () => {
    it('should have correct mode constants', () => {
      expect(envUtils.devMode).toBe('development');
      expect(envUtils.prodMode).toBe('production');
    });
  });

  describe('getEnv', () => {
    it('should return environment mode', () => {
      expect(envUtils.getEnv()).toBe('development');
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
      expect(prefix).toContain('DEVELOPMENT');
      expect(prefix).toBe(prefix.toUpperCase());
    });

    it('should generate storage short name', () => {
      const shortName = envUtils.getStorageShortName();
      expect(shortName).toContain('TEST_APP');
      expect(shortName).toContain(version);
      expect(shortName).toBe(shortName.toUpperCase());
    });
  });

  describe('getAppEnvConfig', () => {
    it('should return app environment configuration in development mode', () => {
      const config = envUtils.getAppEnvConfig();
      expect(config).toHaveProperty('VITE_GLOB_APP_SHORT_NAME', 'TEST_APP');
      expect(config).toHaveProperty('VITE_PROXY', '[]');
      expect(config).toHaveProperty('MODE', 'development');
    });

    it('should not warn when app short name is valid', () => {
      // Call the function with valid name (already mocked in setup)
      envUtils.getAppEnvConfig();

      // Check that warning was not called
      expect(warn).not.toHaveBeenCalled();
    });

    it('should handle valid app short name with numbers', () => {
      // Temporarily mock the env to return name with numbers (this should be valid)
      const originalEnv = (global as any).env;
      (global as any).env = {
        ...originalEnv,
        VITE_GLOB_APP_SHORT_NAME: 'TEST123', // Contains numbers (this is valid)
      };

      // Re-import to get updated function behavior
      vi.resetModules();
      return import('/@/utils/env').then((envModule) => {
        // Call the function
        envModule.getAppEnvConfig();

        // Check that warning was not called (numbers are allowed)
        expect(warn).not.toHaveBeenCalled();

        // Restore original env
        (global as any).env = originalEnv;
      });
    });

    it('should handle valid app short name with underscores', () => {
      // Temporarily mock the env to return name with underscores (this should be valid)
      const originalEnv = (global as any).env;
      (global as any).env = {
        ...originalEnv,
        VITE_GLOB_APP_SHORT_NAME: 'TEST_APP_NAME', // Contains underscores (this is valid)
      };

      // Re-import to get updated function behavior
      vi.resetModules();
      return import('/@/utils/env').then((envModule) => {
        // Call the function
        envModule.getAppEnvConfig();

        // Check that warning was not called (underscores are allowed)
        expect(warn).not.toHaveBeenCalled();

        // Restore original env
        (global as any).env = originalEnv;
      });
    });
  });
});
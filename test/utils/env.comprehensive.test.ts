import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock package.json version
vi.mock('../../package.json', () => ({
  version: '1.0.0-test'
}));

describe('env comprehensive tests', () => {
  // Clear all mocks before each test
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('should get app env config in development mode', async () => {
    // Mock the log utility for development mode
    vi.doMock('/@/utils/log', () => ({
      warn: vi.fn(),
      env: {
        VITE_GLOB_APP_TITLE: 'Test App',
        VITE_GLOB_API_URL: 'http://localhost:8080',
        VITE_GLOB_APP_SHORT_NAME: 'test_app',
        VITE_PUBLIC_PATH: '/test/',
        VITE_PROXY: [['/api', 'http://localhost:8080']],
        NODE_ENV: 'development',
        MODE: 'development',
        DEV: true,
        PROD: false,
      }
    }));

    // Mock the getEnvConfigName function
    vi.doMock('../../build/config/getEnvConfigName', () => ({
      getEnvConfigName: vi.fn().mockReturnValue('__PRODUCTION__TEST_APP__CONF__')
    }));

    // Dynamically import the module to get fresh values
    const { getAppEnvConfig } = await import('/@/utils/env');
    const config = getAppEnvConfig();
    
    // In DEV mode, should include VITE_PROXY
    expect(config.VITE_PROXY).toEqual([['/api', 'http://localhost:8080']]);
    expect(config.VITE_GLOB_APP_TITLE).toBe('Test App');
    expect(config.VITE_GLOB_API_URL).toBe('http://localhost:8080');
    expect(config.VITE_GLOB_APP_SHORT_NAME).toBe('test_app');
  });

  it('should detect development mode', async () => {
    // Mock the log utility for development mode
    vi.doMock('/@/utils/log', () => ({
      warn: vi.fn(),
      env: {
        VITE_GLOB_APP_TITLE: 'Test App',
        VITE_GLOB_API_URL: 'http://localhost:8080',
        VITE_GLOB_APP_SHORT_NAME: 'test_app',
        VITE_PUBLIC_PATH: '/test/',
        VITE_PROXY: [['/api', 'http://localhost:8080']],
        NODE_ENV: 'development',
        MODE: 'development',
        DEV: true,
        PROD: false,
      }
    }));

    const { isDevMode } = await import('/@/utils/env');
    expect(isDevMode()).toBe(true);
  });

  it('should detect production mode', async () => {
    // Mock the log utility for production mode
    vi.doMock('/@/utils/log', () => ({
      warn: vi.fn(),
      env: {
        VITE_GLOB_APP_TITLE: 'Test App',
        VITE_GLOB_API_URL: 'http://localhost:8080',
        VITE_GLOB_APP_SHORT_NAME: 'test_app',
        VITE_PUBLIC_PATH: '/test/',
        VITE_PROXY: [['/api', 'http://localhost:8080']],
        NODE_ENV: 'production',
        MODE: 'production',
        DEV: false,
        PROD: true,
      }
    }));

    const { isProdMode } = await import('/@/utils/env');
    expect(isProdMode()).toBe(true);
  });

  it('should get environment mode', async () => {
    // Mock the log utility
    vi.doMock('/@/utils/log', () => ({
      warn: vi.fn(),
      env: {
        VITE_GLOB_APP_TITLE: 'Test App',
        VITE_GLOB_API_URL: 'http://localhost:8080',
        VITE_GLOB_APP_SHORT_NAME: 'test_app',
        VITE_PUBLIC_PATH: '/test/',
        VITE_PROXY: [['/api', 'http://localhost:8080']],
        NODE_ENV: 'test',
        MODE: 'test',
        DEV: true,
        PROD: false,
      }
    }));

    const { getEnv } = await import('/@/utils/env');
    expect(getEnv()).toBe('test');
  });

  it('should get public path', async () => {
    // Mock the log utility
    vi.doMock('/@/utils/log', () => ({
      warn: vi.fn(),
      env: {
        VITE_GLOB_APP_TITLE: 'Test App',
        VITE_GLOB_API_URL: 'http://localhost:8080',
        VITE_GLOB_APP_SHORT_NAME: 'test_app',
        VITE_PUBLIC_PATH: '/test/',
        VITE_PROXY: [['/api', 'http://localhost:8080']],
        NODE_ENV: 'test',
        MODE: 'test',
        DEV: true,
        PROD: false,
      }
    }));

    const { publicPath } = await import('/@/utils/env');
    expect(publicPath).toBe('/test/');
  });

  it('should get common storage prefix', async () => {
    // Mock the log utility
    vi.doMock('/@/utils/log', () => ({
      warn: vi.fn(),
      env: {
        VITE_GLOB_APP_TITLE: 'Test App',
        VITE_GLOB_API_URL: 'http://localhost:8080',
        VITE_GLOB_APP_SHORT_NAME: 'test_app',
        VITE_PUBLIC_PATH: '/test/',
        VITE_PROXY: [['/api', 'http://localhost:8080']],
        NODE_ENV: 'test',
        MODE: 'test',
        DEV: true,
        PROD: false,
      }
    }));

    // Mock the getEnvConfigName function
    vi.doMock('../../build/config/getEnvConfigName', () => ({
      getEnvConfigName: vi.fn().mockReturnValue('__PRODUCTION__TEST_APP__CONF__')
    }));

    const { getCommonStoragePrefix } = await import('/@/utils/env');
    const prefix = getCommonStoragePrefix();
    expect(prefix).toBe('TEST_APP__TEST');
  });

  it('should get storage short name', async () => {
    // Mock the log utility
    vi.doMock('/@/utils/log', () => ({
      warn: vi.fn(),
      env: {
        VITE_GLOB_APP_TITLE: 'Test App',
        VITE_GLOB_API_URL: 'http://localhost:8080',
        VITE_GLOB_APP_SHORT_NAME: 'test_app',
        VITE_PUBLIC_PATH: '/test/',
        VITE_PROXY: [['/api', 'http://localhost:8080']],
        NODE_ENV: 'test',
        MODE: 'test',
        DEV: true,
        PROD: false,
      }
    }));

    // Mock the getEnvConfigName function
    vi.doMock('../../build/config/getEnvConfigName', () => ({
      getEnvConfigName: vi.fn().mockReturnValue('__PRODUCTION__TEST_APP__CONF__')
    }));

    const { getStorageShortName } = await import('/@/utils/env');
    const shortName = getStorageShortName();
    expect(shortName).toBe('TEST_APP__TEST__1.0.0-TEST__');
  });

  it('should warn when app short name contains invalid characters', async () => {
    // Mock the log utility with invalid app short name
    const warnMock = vi.fn();
    vi.doMock('/@/utils/log', () => ({
      warn: warnMock,
      env: {
        VITE_GLOB_APP_TITLE: 'Test App',
        VITE_GLOB_API_URL: 'http://localhost:8080',
        VITE_GLOB_APP_SHORT_NAME: 'test-app!', // Invalid characters
        VITE_PUBLIC_PATH: '/test/',
        VITE_PROXY: [['/api', 'http://localhost:8080']],
        NODE_ENV: 'test',
        MODE: 'test',
        DEV: true,
        PROD: false,
      }
    }));

    // Mock the getEnvConfigName function
    vi.doMock('../../build/config/getEnvConfigName', () => ({
      getEnvConfigName: vi.fn().mockReturnValue('__PRODUCTION__TEST_APP__CONF__')
    }));

    const { getAppEnvConfig } = await import('/@/utils/env');
    getAppEnvConfig();
    expect(warnMock).toHaveBeenCalled();
  });

  it('should handle production mode correctly', async () => {
    // Mock the log utility for production mode
    vi.doMock('/@/utils/log', () => ({
      warn: vi.fn(),
      env: {
        VITE_GLOB_APP_TITLE: 'Test App',
        VITE_GLOB_API_URL: 'http://localhost:8080',
        VITE_GLOB_APP_SHORT_NAME: 'test_app',
        VITE_PUBLIC_PATH: '/test/',
        VITE_PROXY: [['/api', 'http://localhost:8080']],
        NODE_ENV: 'production',
        MODE: 'production',
        DEV: false,
        PROD: true,
      }
    }));

    // Mock the getEnvConfigName function
    vi.doMock('../../build/config/getEnvConfigName', () => ({
      getEnvConfigName: vi.fn().mockReturnValue('__PRODUCTION__TEST_APP__CONF__')
    }));

    // Mock window object for production mode
    const mockWindow = {
      __PRODUCTION__TEST_APP__CONF__: {
        VITE_GLOB_APP_TITLE: 'Production App',
        VITE_GLOB_API_URL: 'http://prod.example.com',
        VITE_GLOB_APP_SHORT_NAME: 'prod_app',
      }
    };
    vi.stubGlobal('window', mockWindow);

    const { getAppEnvConfig } = await import('/@/utils/env');
    const config = getAppEnvConfig();
    
    // In PROD mode, VITE_PROXY should be empty array
    expect(config.VITE_PROXY).toEqual([]);
    expect(config.VITE_GLOB_APP_TITLE).toBe('Production App');
    expect(config.VITE_GLOB_API_URL).toBe('http://prod.example.com');
    expect(config.VITE_GLOB_APP_SHORT_NAME).toBe('prod_app');
  });
});
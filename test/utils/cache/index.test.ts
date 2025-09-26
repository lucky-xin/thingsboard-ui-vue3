import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WebStorage, createStorage, createSessionStorage, createLocalStorage } from '/@/utils/cache/index';

// Mock dependencies
vi.mock('/@/utils/env', () => ({
  getStorageShortName: vi.fn(() => 'tb'),
}));

vi.mock('/@/settings/encryptionSetting', () => ({
  enableStorageEncryption: false,
  DEFAULT_CACHE_TIME: 7 * 24 * 60 * 60 * 1000, // 7 days
  cacheCipher: {
    key: '_11111000001111@',
    iv: '@11111000001111_',
  },
}));

vi.mock('./storageCache', () => ({
  createStorage: vi.fn(() => ({
    set: vi.fn(),
    get: vi.fn(),
    remove: vi.fn(),
    clear: vi.fn(),
  })),
}));

describe('utils/cache/index', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should export cache utilities', async () => {
    const module = await import('/@/utils/cache/index');
    
    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  describe('WebStorage', () => {
    it('should export WebStorage instance', async () => {
      const module = await import('/@/utils/cache/index');
      
      expect(module.WebStorage).toBeDefined();
      expect(typeof module.WebStorage).toBe('object');
    });

    it('should be default export', async () => {
      const module = await import('/@/utils/cache/index');
      
      expect(module.default).toBe(module.WebStorage);
    });
  });

  describe('createStorage', () => {
    it('should export createStorage function', async () => {
      const module = await import('/@/utils/cache/index');
      
      expect(module.createStorage).toBeDefined();
      expect(typeof module.createStorage).toBe('function');
    });

    it('should create storage with default sessionStorage', () => {
      const storage = createStorage();
      expect(storage).toBeDefined();
      expect(typeof storage).toBe('object');
    });

    it('should create storage with custom storage', () => {
      const storage = createStorage(localStorage);
      expect(storage).toBeDefined();
      expect(typeof storage).toBe('object');
    });

    it('should create storage with custom options', () => {
      const options = { timeout: 3600000 };
      const storage = createStorage(sessionStorage, options);
      expect(storage).toBeDefined();
      expect(typeof storage).toBe('object');
    });
  });

  describe('createSessionStorage', () => {
    it('should export createSessionStorage function', async () => {
      const module = await import('/@/utils/cache/index');
      
      expect(module.createSessionStorage).toBeDefined();
      expect(typeof module.createSessionStorage).toBe('function');
    });

    it('should create session storage with default options', () => {
      const storage = createSessionStorage();
      expect(storage).toBeDefined();
      expect(typeof storage).toBe('object');
    });

    it('should create session storage with custom options', () => {
      const options = { timeout: 1800000 };
      const storage = createSessionStorage(options);
      expect(storage).toBeDefined();
      expect(typeof storage).toBe('object');
    });
  });

  describe('createLocalStorage', () => {
    it('should export createLocalStorage function', async () => {
      const module = await import('/@/utils/cache/index');
      
      expect(module.createLocalStorage).toBeDefined();
      expect(typeof module.createLocalStorage).toBe('function');
    });

    it('should create local storage with default options', () => {
      const storage = createLocalStorage();
      expect(storage).toBeDefined();
      expect(typeof storage).toBe('object');
    });

    it('should create local storage with custom options', () => {
      const options = { timeout: 3600000 };
      const storage = createLocalStorage(options);
      expect(storage).toBeDefined();
      expect(typeof storage).toBe('object');
    });
  });
});
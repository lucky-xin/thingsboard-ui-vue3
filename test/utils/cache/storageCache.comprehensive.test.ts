import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock localStorage and sessionStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

const mockSessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Mock global storage objects
Object.defineProperty(global, 'localStorage', {
  value: mockLocalStorage,
});

Object.defineProperty(global, 'sessionStorage', {
  value: mockSessionStorage,
});

// Mock env utility
vi.mock('/@/utils/env', () => ({
  getStorageShortName: vi.fn(() => 'TEST_'),
}));

// Mock encryption settings
vi.mock('/@/settings/encryptionSetting', () => ({
  enableStorageEncryption: false,
  DEFAULT_CACHE_TIME: 86400,
  cacheCipher: {
    key: '1234567890123456',
    iv: '1234567890123456',
  },
}));

// Mock cipher utility
vi.mock('/@/utils/cipher', () => ({
  AesEncryption: class {
    encryptByAES(data: string) {
      return data;
    }
    decryptByAES(data: string) {
      return data;
    }
  },
}));

// Mock is utility
vi.mock('/@/utils/is', () => ({
  isNullOrUnDef: vi.fn((val) => val === null || val === undefined),
}));

describe('storageCache comprehensive', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Reset mock implementations
    mockLocalStorage.getItem.mockReturnValue(null);
    mockLocalStorage.setItem.mockReturnValue(undefined);
    mockLocalStorage.removeItem.mockReturnValue(undefined);
    mockLocalStorage.clear.mockReturnValue(undefined);

    mockSessionStorage.getItem.mockReturnValue(null);
    mockSessionStorage.setItem.mockReturnValue(undefined);
    mockSessionStorage.removeItem.mockReturnValue(undefined);
    mockSessionStorage.clear.mockReturnValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('WebStorage (default export)', () => {
    it('should import WebStorage as default export', async () => {
      const WebStorage = (await import('/@/utils/cache/index')).default;
      expect(WebStorage).toBeDefined();
      expect(typeof WebStorage.get).toBe('function');
      expect(typeof WebStorage.set).toBe('function');
      expect(typeof WebStorage.remove).toBe('function');
      expect(typeof WebStorage.clear).toBe('function');
    });

    it('should get item from storage', async () => {
      const WebStorage = (await import('/@/utils/cache/index')).default;
      mockSessionStorage.getItem.mockReturnValue('{"value": "test-value", "time": 1234567890, "expire": null}');

      const result = WebStorage.get('test-key');
      expect(result).toBe('test-value');
      expect(mockSessionStorage.getItem).toHaveBeenCalledWith('TEST_TEST-KEY');
    });

    it('should set item to storage', async () => {
      const WebStorage = (await import('/@/utils/cache/index')).default;
      const testData = { key: 'value' };

      WebStorage.set('test-key', testData);
      expect(mockSessionStorage.setItem).toHaveBeenCalled();
    });

    it('should remove item from storage', async () => {
      const WebStorage = (await import('/@/utils/cache/index')).default;

      WebStorage.remove('test-key');
      expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('TEST_TEST-KEY');
    });

    it('should clear all items from storage', async () => {
      const WebStorage = (await import('/@/utils/cache/index')).default;

      WebStorage.clear();
      expect(mockSessionStorage.clear).toHaveBeenCalled();
    });
  });

  describe('createSessionStorage', () => {
    it('should create session storage instance', async () => {
      const { createSessionStorage } = await import('/@/utils/cache/index');
      const sessionStorageInstance = createSessionStorage();

      expect(sessionStorageInstance).toBeDefined();
      expect(typeof sessionStorageInstance.get).toBe('function');
      expect(typeof sessionStorageInstance.set).toBe('function');
      expect(typeof sessionStorageInstance.remove).toBe('function');
      expect(typeof sessionStorageInstance.clear).toBe('function');
    });

    it('should get item from created session storage', async () => {
      const { createSessionStorage } = await import('/@/utils/cache/index');
      const sessionStorageInstance = createSessionStorage();
      mockSessionStorage.getItem.mockReturnValue('{"value": "session-value", "time": 1234567890, "expire": null}');

      const result = sessionStorageInstance.get('session-key');
      expect(result).toBe('session-value');
    });
  });

  describe('createLocalStorage', () => {
    it('should create local storage instance', async () => {
      const { createLocalStorage } = await import('/@/utils/cache/index');
      const localStorageInstance = createLocalStorage();

      expect(localStorageInstance).toBeDefined();
      expect(typeof localStorageInstance.get).toBe('function');
      expect(typeof localStorageInstance.set).toBe('function');
      expect(typeof localStorageInstance.remove).toBe('function');
      expect(typeof localStorageInstance.clear).toBe('function');
    });

    it('should get item from created local storage', async () => {
      const { createLocalStorage } = await import('/@/utils/cache/index');
      const localStorageInstance = createLocalStorage();
      mockLocalStorage.getItem.mockReturnValue('{"value": "local-value", "time": 1234567890, "expire": null}');

      const result = localStorageInstance.get('local-key');
      expect(result).toBe('local-value');
    });
  });

  describe('createStorage', () => {
    it('should create custom storage instance', async () => {
      const { createStorage } = await import('/@/utils/cache/index');
      const customStorageInstance = createStorage(sessionStorage);

      expect(customStorageInstance).toBeDefined();
      expect(typeof customStorageInstance.get).toBe('function');
      expect(typeof customStorageInstance.set).toBe('function');
      expect(typeof customStorageInstance.remove).toBe('function');
      expect(typeof customStorageInstance.clear).toBe('function');
    });
  });
});
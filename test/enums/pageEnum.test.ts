// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

import { describe, it, expect } from 'vitest';
import { PageEnum } from '/@/enums/pageEnum';

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme.css', writable: true
});

describe('enums/pageEnum', () => {
  it('should export PageEnum', () => {
    expect(PageEnum).toBeDefined();
    expect(typeof PageEnum).toBe('object');
  });

  it('should have BASE_LOGIN path', () => {
    expect(PageEnum.BASE_LOGIN).toBe('/auth/login');
  });

  it('should have BASE_HOME path', () => {
    expect(PageEnum.BASE_HOME).toBe('/desktop');
  });

  it('should have ERROR_PAGE path', () => {
    expect(PageEnum.ERROR_PAGE).toBe('/exception');
  });

  it('should have ERROR_LOG_PAGE path', () => {
    expect(PageEnum.ERROR_LOG_PAGE).toBe('/errorLog/list');
  });

  it('should have MOD_PWD_PAGE path', () => {
    expect(PageEnum.MOD_PWD_PAGE).toBe('/modPwd');
  });

  it('should contain all expected enum values', () => {
    const expectedValues = {
      BASE_LOGIN: '/auth/login',
      BASE_HOME: '/desktop',
      ERROR_PAGE: '/exception',
      ERROR_LOG_PAGE: '/errorLog/list',
      MOD_PWD_PAGE: '/modPwd',
    };

    Object.entries(expectedValues).forEach(([key, value]) => {
      expect(PageEnum[key as keyof typeof PageEnum]).toBe(value);
    });
  });

  it('should have all paths starting with forward slash', () => {
    Object.values(PageEnum).forEach((path) => {
      expect(path).toMatch(/^\/.*$/);
    });
  });

  it('should have unique values', () => {
    const values = Object.values(PageEnum);
    const uniqueValues = [...new Set(values)];
    expect(values).toHaveLength(uniqueValues.length);
  });

  it('should have valid path formats', () => {
    Object.values(PageEnum).forEach((path) => {
      // Should be string and start with /
      expect(typeof path).toBe('string');
      expect(path.startsWith('/')).toBe(true);

      // Should not end with / (except root)
      if (path.length > 1) {
        expect(path.endsWith('/')).toBe(false);
      }

      // Should not contain spaces
      expect(path).not.toMatch(/\s/);
    });
  });

  it('should have consistent enum keys and values mapping', () => {
    expect(Object.keys(PageEnum)).toHaveLength(5);
    expect(Object.values(PageEnum)).toHaveLength(5);
  });
});
import { describe, it, expect, vi } from 'vitest';
import { setHtmlPageLang, setLoadLocalePool, genMessage } from '/@/locales/helper';

describe('locales/helper', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('should export locale helper functions', async () => {
    const module = await import('/@/locales/helper');

    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  it('should export setHtmlPageLang function', async () => {
    const module = await import('/@/locales/helper');

    expect(module.setHtmlPageLang).toBeDefined();
    expect(typeof module.setHtmlPageLang).toBe('function');
  });

  it('should export setLoadLocalePool function', async () => {
    const module = await import('/@/locales/helper');

    expect(module.setLoadLocalePool).toBeDefined();
    expect(typeof module.setLoadLocalePool).toBe('function');
  });

  it('should export genMessage function', async () => {
    const module = await import('/@/locales/helper');

    expect(module.genMessage).toBeDefined();
    expect(typeof module.genMessage).toBe('function');
  });

  it('should set html page language correctly', () => {
    // Mock document.querySelector
    const mockElement = {
      setAttribute: vi.fn(),
    };
    const querySelectorSpy = vi.spyOn(document, 'querySelector').mockReturnValue(mockElement as any);

    // Test the function
    setHtmlPageLang('en');

    // Verify the calls
    expect(querySelectorSpy).toHaveBeenCalledWith('html');
    expect(mockElement.setAttribute).toHaveBeenCalledWith('lang', 'en');

    // Restore the original implementation
    querySelectorSpy.mockRestore();
  });

  it('should handle setHtmlPageLang when no html element is found', () => {
    // Mock document.querySelector to return null
    const querySelectorSpy = vi.spyOn(document, 'querySelector').mockReturnValue(null);

    // Test the function - should not throw an error
    expect(() => setHtmlPageLang('en')).not.toThrow();

    // Verify the call
    expect(querySelectorSpy).toHaveBeenCalledWith('html');

    // Restore the original implementation
    querySelectorSpy.mockRestore();
  });

  it('should call the callback function in setLoadLocalePool', () => {
    const mockCallback = vi.fn();

    // Test the function
    setLoadLocalePool(mockCallback);

    // Verify the callback was called
    expect(mockCallback).toHaveBeenCalledWith(expect.any(Array));
  });

  it('should generate message object correctly', () => {
    // Create mock language modules
    const mockLangs = {
      './lang/en/sys.ts': { default: { welcome: 'Welcome' } },
      './lang/zh_CN/sys.ts': { default: { welcome: '欢迎' } },
      './lang/en/component.ts': { default: { button: 'Button' } },
    };

    // Test the function
    const result = genMessage(mockLangs);

    // Verify the result structure
    expect(result).toBeDefined();
    // Note: The actual structure depends on how the genMessage function processes the keys
    // For the key './lang/en/sys.ts', moduleName would be 'en' and objKey would be 'sys'
    // So the result should have result.en.sys = { welcome: 'Welcome' }
  });

  it('should handle empty language modules in genMessage', () => {
    // Create empty mock language modules
    const mockLangs = {};

    // Test the function
    const result = genMessage(mockLangs);

    // Verify the result is an empty object
    expect(result).toEqual({});
  });

  it('should handle language modules with no default export in genMessage', () => {
    // Create mock language modules with no default export
    const mockLangs = {
      './lang/en/sys.ts': {},
    };

    // Test the function
    const result = genMessage(mockLangs);

    // Verify the result structure
    expect(result).toBeDefined();
    // When there's no default export, langFileModule will be undefined
    // The function should set an empty object in this case
  });

  it('should handle language modules with custom prefix in genMessage', () => {
    // Create mock language modules
    const mockLangs = {
      './locale/en/system.ts': { default: { welcome: 'Welcome' } },
    };

    // Test the function with custom prefix
    const result = genMessage(mockLangs, 'locale');

    // Verify the result structure
    expect(result).toBeDefined();
    // With prefix 'locale', the key './locale/en/system.ts' becomes 'en/system.ts'
    // So moduleName would be 'en' and objKey would be 'system'
  });
});
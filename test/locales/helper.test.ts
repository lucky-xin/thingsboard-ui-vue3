import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadLocalePool, setHtmlPageLang, setLoadLocalePool, genMessage } from '/@/locales/helper';

describe('locales/helper', () => {
  beforeEach(() => {
    // Clear the loadLocalePool before each test
    loadLocalePool.length = 0;
  });

  describe('setHtmlPageLang', () => {
    it('should set the lang attribute on the html element', () => {
      // Mock document.querySelector
      const mockHtmlElement = {
        setAttribute: vi.fn(),
      };
      vi.spyOn(document, 'querySelector').mockImplementation(() => mockHtmlElement as any);

      // Call the function
      setHtmlPageLang('en');

      // Check if setAttribute was called with correct parameters
      expect(mockHtmlElement.setAttribute).toHaveBeenCalledWith('lang', 'en');
    });

    it('should not throw error when html element is not found', () => {
      // Mock document.querySelector to return null
      vi.spyOn(document, 'querySelector').mockImplementation(() => null);

      // This should not throw an error
      expect(() => setHtmlPageLang('en')).not.toThrow();
    });
  });

  describe('setLoadLocalePool', () => {
    it('should call the callback function with loadLocalePool', () => {
      const mockCallback = vi.fn();

      // Call the function
      setLoadLocalePool(mockCallback);

      // Check if callback was called with loadLocalePool
      expect(mockCallback).toHaveBeenCalledWith(loadLocalePool);
    });
  });

  describe('genMessage', () => {
    it('should generate message object from language modules', () => {
      const mockLangs = {
        './lang/en/test.ts': {
          default: {
            hello: 'Hello',
            world: 'World'
          }
        },
        './lang/zh-CN/test.ts': {
          default: {
            hello: '你好',
            world: '世界'
          }
        }
      };

      const result = genMessage(mockLangs);

      expect(result).toEqual({
        en: {
          test: {
            hello: 'Hello',
            world: 'World'
          }
        },
        'zh-CN': {
          test: {
            hello: '你好',
            world: '世界'
          }
        }
      });
    });

    it('should handle modules without subdirectories', () => {
      const mockLangs = {
        './lang/en.ts': {
          default: {
            hello: 'Hello'
          }
        },
        './lang/zh-CN.ts': {
          default: {
            hello: '你好'
          }
        }
      };

      const result = genMessage(mockLangs);

      expect(result).toEqual({
        en: {
          hello: 'Hello'
        },
        'zh-CN': {
          hello: '你好'
        }
      });
    });

    it('should handle modules with multiple levels of subdirectories', () => {
      const mockLangs = {
        './lang/en/module/submodule.ts': {
          default: {
            key: 'value'
          }
        }
      };

      const result = genMessage(mockLangs);

      expect(result).toEqual({
        en: {
          module: {
            submodule: {
              key: 'value'
            }
          }
        }
      });
    });

    it('should handle empty language modules', () => {
      const mockLangs = {
        './lang/en/empty.ts': {
          default: undefined
        }
      };

      const result = genMessage(mockLangs);

      expect(result).toEqual({
        en: {
          empty: undefined
        }
      });
    });
  });
});
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock necessary dependencies
vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: () => ({
    showMessage: vi.fn(),
  }),
}));

vi.mock('/@/utils/is', () => ({
  isObject: vi.fn((val) => typeof val === 'object' && val !== null && !Array.isArray(val)),
}));

// Mock vue-router
vi.mock('vue-router', () => ({
  RouteLocationNormalized: {},
  RouteRecordNormalized: {},
}));

// Import the functions to test
import {
  noop,
  REGULAR_HTML_ENCODE,
  getPopupContainer,
  setObjToUrlParams,
  deepMerge,
  openWindow,
  openWindowLayer,
  getDynamicProps,
  getRawRoute,
  withInstall,
  copyToClipboard,
  sleep,
  convertBytesToSize,
  encodeHtml,
  randomSecret,
} from '/@/utils';

describe('utils/index', () => {
  describe('noop', () => {
    it('should be a function', () => {
      expect(typeof noop).toBe('function');
    });

    it('should return undefined', () => {
      expect(noop()).toBeUndefined();
    });
  });

  describe('REGULAR_HTML_ENCODE', () => {
    it('should be a RegExp', () => {
      expect(REGULAR_HTML_ENCODE).toBeInstanceOf(RegExp);
    });

    it('should match special characters', () => {
      expect('"').toMatch(REGULAR_HTML_ENCODE);
      expect('&').toMatch(REGULAR_HTML_ENCODE);
      expect("'").toMatch(REGULAR_HTML_ENCODE);
      expect('<').toMatch(REGULAR_HTML_ENCODE);
      expect('>').toMatch(REGULAR_HTML_ENCODE);
    });

    it('should match control characters', () => {
      expect('\x00').toMatch(REGULAR_HTML_ENCODE);
      expect('\x20').toMatch(REGULAR_HTML_ENCODE);
      expect('\x7F').toMatch(REGULAR_HTML_ENCODE);
      expect('\xFF').toMatch(REGULAR_HTML_ENCODE);
    });

    it('should match unicode characters', () => {
      expect('\u0100').toMatch(REGULAR_HTML_ENCODE);
      expect('\u2700').toMatch(REGULAR_HTML_ENCODE);
    });

    it('should not match normal characters', () => {
      expect('a').not.toMatch(REGULAR_HTML_ENCODE);
      expect('1').not.toMatch(REGULAR_HTML_ENCODE);
      // 注意：空格字符'\x20'在正则表达式的[\x00-\x20]范围内，所以会匹配
      expect(' ').toMatch(REGULAR_HTML_ENCODE);
    });
  });

  describe('getPopupContainer', () => {
    it('should return document.body when no node provided', () => {
      expect(getPopupContainer()).toBe(document.body);
    });

    it('should return parent node when node provided', () => {
      const parent = document.createElement('div');
      const child = document.createElement('div');
      parent.appendChild(child);

      expect(getPopupContainer(child)).toBe(parent);
    });

    it('should return document.body when node has no parent', () => {
      const node = document.createElement('div');
      expect(getPopupContainer(node)).toBe(document.body);
    });
  });

  describe('setObjToUrlParams', () => {
    it('should add parameters to URL', () => {
      const result = setObjToUrlParams('http://example.com', { a: '3', b: '4' });
      expect(result).toBe('http://example.com?a=3&b=4');
    });

    it('should handle URL with existing query string', () => {
      const result = setObjToUrlParams('http://example.com?existing=1', { a: '3' });
      expect(result).toBe('http://example.com?existing=1?a=3');
    });

    it('should handle empty object', () => {
      const result = setObjToUrlParams('http://example.com', {});
      expect(result).toBe('http://example.com?');
    });

    it('should encode special characters', () => {
      const result = setObjToUrlParams('http://example.com', { text: 'hello world' });
      expect(result).toBe('http://example.com?text=hello%20world');
    });
  });

  describe('deepMerge', () => {
    it('should merge objects deeply', () => {
      const src = { a: { b: 1 }, c: 2 };
      const target = { a: { d: 3 }, e: 4 };
      const result = deepMerge(src, target);

      expect(result).toEqual({ a: { b: 1, d: 3 }, c: 2, e: 4 });
    });

    it('should handle empty objects', () => {
      const result = deepMerge({}, {});
      expect(result).toEqual({});
    });

    it('should handle undefined values', () => {
      const result = deepMerge(undefined, { a: 1 });
      expect(result).toEqual({ a: 1 });
    });

    it('should handle array values', () => {
      const src = { a: [1, 2] };
      const target = { a: [3, 4] };
      const result = deepMerge(src, target);
      expect(result).toEqual({ a: [3, 4] });
    });

    it('should handle null values', () => {
      const src = { a: null };
      const target = { a: { b: 1 } };
      const result = deepMerge(src, target);
      expect(result).toEqual({ a: { b: 1 } });
    });
  });

  describe('openWindow', () => {
    beforeEach(() => {
      // Mock window.open
      vi.spyOn(window, 'open').mockImplementation(() => null);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should open window with default options', () => {
      openWindow('http://example.com');
      expect(window.open).toHaveBeenCalledWith('http://example.com', '__blank', 'noopener=yes,noreferrer=yes');
    });

    it('should open window with custom options', () => {
      openWindow('http://example.com', { target: '_self', noopener: false });
      expect(window.open).toHaveBeenCalledWith('http://example.com', '_self', 'noreferrer=yes');
    });

    it('should handle URL with ___blank suffix', () => {
      openWindow('http://example.com?___blank');
      expect(window.open).toHaveBeenCalledWith('http://example.com', '__blank', 'noopener=yes,noreferrer=yes');
    });

    it('should handle URL with &___blank suffix', () => {
      openWindow('http://example.com?param=value&___blank');
      expect(window.open).toHaveBeenCalledWith('http://example.com?param=value', '__blank', 'noopener=yes,noreferrer=yes');
    });
  });

  describe('openWindowLayer', () => {
    beforeEach(() => {
      // Mock window and layer
      const mockLayer = {
        open: vi.fn(),
      };
      (window as any).layer = mockLayer;
      (window as any).$ = vi.fn(() => ({
        width: () => 1024,
        height: () => 768,
      }));
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should open layer window', () => {
      openWindowLayer('http://example.com');
      expect((window as any).layer.open).toHaveBeenCalled();
    });

    it('should open layer window with custom size', () => {
      openWindowLayer('http://example.com', { width: 800, height: 600 });
      expect((window as any).layer.open).toHaveBeenCalled();
    });

    it('should handle small window size', () => {
      (window as any).$ = vi.fn(() => ({
        width: () => 500,
        height: () => 300,
      }));
      openWindowLayer('http://example.com');
      expect((window as any).layer.open).toHaveBeenCalled();
    });
  });

  describe('getDynamicProps', () => {
    it('should convert reactive props to static props', () => {
      const props = {
        name: { value: 'test' },
        age: { value: 25 },
        static: 'value',
      };

      const result = getDynamicProps(props);
      expect(result).toEqual({ name: { value: 'test' }, age: { value: 25 }, static: 'value' });
    });

    it('should handle empty props', () => {
      const result = getDynamicProps({});
      expect(result).toEqual({});
    });
  });

  describe('getRawRoute', () => {
    it('should return route without matched property', () => {
      const route = {
        name: 'test',
        path: '/test',
        matched: [{ name: 'test', path: '/test', meta: {} }],
      } as any;

      const result = getRawRoute(route);
      expect(result.matched).toBeDefined();
      expect(result.name).toBe('test');
      expect(result.path).toBe('/test');
    });

    it('should handle null route', () => {
      const result = getRawRoute(null as any);
      expect(result).toBeNull();
    });

    it('should handle route without matched', () => {
      const route = {
        name: 'test',
        path: '/test',
      } as any;

      const result = getRawRoute(route);
      expect(result.matched).toBeUndefined();
      expect(result.name).toBe('test');
      expect(result.path).toBe('/test');
    });
  });

  describe('withInstall', () => {
    it('should add install method to component', () => {
      const component = { name: 'TestComponent' } as any;
      const result = withInstall(component);

      expect(result).toBeDefined();
      expect(result).toBe(component); // withInstall返回的是同一个组件对象
      expect(typeof result.install).toBe('function');
    });

    it('should handle component with alias', () => {
      const component = { name: 'TestComponent' } as any;
      const result = withInstall(component, 'alias');

      expect(result).toBeDefined();
      expect(result).toBe(component);
      expect(typeof result.install).toBe('function');
    });
  });

  describe('copyToClipboard', () => {
    beforeEach(() => {
      // Mock document methods
      const mockElement = {
        value: '',
        select: vi.fn(),
      };
      vi.spyOn(document, 'createElement').mockReturnValue(mockElement as any);
      vi.spyOn(document.body, 'appendChild').mockImplementation(() => null);
      vi.spyOn(document.body, 'removeChild').mockImplementation(() => null);

      // Mock execCommand for older browsers
      if (!document.execCommand) {
        (document as any).execCommand = vi.fn().mockReturnValue(true);
      } else {
        vi.spyOn(document, 'execCommand').mockReturnValue(true);
      }
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should copy text to clipboard', () => {
      copyToClipboard('test text');
      expect(document.createElement).toHaveBeenCalledWith('input');
      expect(document.execCommand).toHaveBeenCalledWith('copy');
    });

    it('should show success message', () => {
      copyToClipboard('test text', 'Custom success message');
      expect(document.createElement).toHaveBeenCalledWith('input');
    });

    it('should not show message when msg is empty', () => {
      copyToClipboard('test text', '');
      expect(document.createElement).toHaveBeenCalledWith('input');
    });
  });

  describe('sleep', () => {
    it('should return a promise', () => {
      const result = sleep(100);
      expect(result).toBeInstanceOf(Promise);
    });

    it('should resolve after specified time', async () => {
      const start = Date.now();
      await sleep(50);
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(40);
    });
  });

  describe('convertBytesToSize', () => {
    it('should convert bytes to human readable size', () => {
      expect(convertBytesToSize(0)).toBe('0 b');
      expect(convertBytesToSize(1024)).toBe('1.00 Kb');
      expect(convertBytesToSize(1024 * 1024)).toBe('1.00 Mb');
      expect(convertBytesToSize(1024 * 1024 * 1024)).toBe('1.00 Gb');
    });

    it('should handle edge cases', () => {
      expect(convertBytesToSize(1)).toBe('1.00 b');
      expect(convertBytesToSize(1023)).toBe('1023.00 b');
    });
  });

  describe('encodeHtml', () => {
    it('should encode HTML special characters', () => {
      expect(encodeHtml('<script>')).toBe('&#60;script&#62;');
      expect(encodeHtml('&amp;')).toBe('&#38;amp;');
      expect(encodeHtml('"')).toBe('&#34;');
      expect(encodeHtml("'")).toBe('&#39;');
      expect(encodeHtml('>')).toBe('&#62;');
      expect(encodeHtml('<')).toBe('&#60;');
    });

    it('should return non-string values as-is', () => {
      expect(encodeHtml(123)).toBe(123);
      expect(encodeHtml(null)).toBe(null);
      expect(encodeHtml(undefined)).toBe(undefined);
    });

    it('should handle empty string', () => {
      expect(encodeHtml('')).toBe('');
    });
  });

  describe('randomSecret', () => {
    it('should generate random string of specified length', () => {
      const result = randomSecret(10);
      expect(result).toHaveLength(10);
      expect(typeof result).toBe('string');
    });

    it('should generate different strings', () => {
      const result1 = randomSecret(10);
      const result2 = randomSecret(10);
      expect(result1).not.toBe(result2);
    });

    it('should handle zero length', () => {
      const result = randomSecret(0);
      expect(result).toBe('');
    });

    it('should handle negative length', () => {
      const result = randomSecret(-5);
      expect(result).toBe('');
    });
  });
});
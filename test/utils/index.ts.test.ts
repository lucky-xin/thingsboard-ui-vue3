import { describe, it, expect, vi } from 'vitest';
import * as utils from '/@/utils/index';

describe('utils/index', () => {
  it('should export all utility functions', () => {
    expect(utils.noop).toBeDefined();
    expect(utils.getPopupContainer).toBeDefined();
    expect(utils.setObjToUrlParams).toBeDefined();
    expect(utils.deepMerge).toBeDefined();
    expect(utils.openWindow).toBeDefined();
    expect(utils.openWindowLayer).toBeDefined();
    expect(utils.getDynamicProps).toBeDefined();
    expect(utils.getRawRoute).toBeDefined();
    expect(utils.withInstall).toBeDefined();
    expect(utils.copyToClipboard).toBeDefined();
    expect(utils.sleep).toBeDefined();
    expect(utils.convertBytesToSize).toBeDefined();
    expect(utils.encodeHtml).toBeDefined();
    expect(utils.randomSecret).toBeDefined();
  });

  it('should handle noop function', () => {
    expect(() => utils.noop()).not.toThrow();
  });

  it('should handle getPopupContainer function', () => {
    const mockElement = document.createElement('div');
    document.body.appendChild(mockElement);
    const result = utils.getPopupContainer(mockElement);
    expect(result).toBe(document.body);
    document.body.removeChild(mockElement);
  });

  it('should handle setObjToUrlParams function', () => {
    const baseUrl = 'http://example.com';
    const obj = { a: '1', b: '2' };
    const result = utils.setObjToUrlParams(baseUrl, obj);
    expect(result).toBe('http://example.com?a=1&b=2');
  });

  it('should handle deepMerge function', () => {
    const src = { a: 1, b: { c: 2 } };
    const target = { b: { d: 3 }, e: 4 };
    const result = utils.deepMerge(src, target);
    expect(result).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 });
  });

  it('should handle openWindow function', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    utils.openWindow('http://example.com');
    expect(openSpy).toHaveBeenCalledWith('http://example.com', '__blank', 'noopener=yes,noreferrer=yes');
    openSpy.mockRestore();
  });

  it('should handle openWindowLayer function', () => {
    // Mock the window object and jQuery
    const mockLayer = {
      open: vi.fn(),
    };

    const mockJQuery = vi.fn().mockReturnValue({
      width: () => 1000,
      height: () => 800,
    });

    (window as any).$ = mockJQuery;
    (window as any).layer = mockLayer;

    utils.openWindowLayer('http://example.com', { width: 900, height: 700 });

    // Check that layer.open was called
    expect(mockLayer.open).toHaveBeenCalled();
  });

  it('should handle convertBytesToSize function', () => {
    expect(utils.convertBytesToSize(0)).toBe('0 b');
    expect(utils.convertBytesToSize(1024)).toBe('1.00 Kb');
    expect(utils.convertBytesToSize(1048576)).toBe('1.00 Mb');
  });

  it('should handle randomSecret function', () => {
    const result = utils.randomSecret(10);
    expect(result).toHaveLength(10);
    expect(typeof result).toBe('string');
  });

  it('should handle encodeHtml function', () => {
    const result = utils.encodeHtml('<script>alert("xss")</script>');
    expect(result).toContain('&');
  });

  it('should handle getDynamicProps function', () => {
    const props = { a: 1, b: 'test' };
    const result = utils.getDynamicProps(props);
    expect(result).toEqual(props);
  });

  it('should handle getRawRoute function', () => {
    const route = {
      name: 'test',
      path: '/test',
      matched: [{ meta: {}, name: 'test', path: '/test' }],
    };
    const result = utils.getRawRoute(route as any);
    expect(result).toEqual({
      name: 'test',
      path: '/test',
      matched: [{ meta: {}, name: 'test', path: '/test' }],
    });
  });

  it('should handle withInstall function', () => {
    const component = { name: 'TestComponent' };
    const result = utils.withInstall(component as any);
    expect(result).toHaveProperty('install');
    expect(typeof result.install).toBe('function');
  });

  it('should handle copyToClipboard function', () => {
    // Mock document.execCommand since it's not available in test environment
    document.execCommand = vi.fn().mockImplementation(() => true);

    const createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue({
      value: 'test',
      select: vi.fn(),
    } as any);
    const appendChildSpy = vi.spyOn(document.body, 'appendChild').mockImplementation(() => {});
    const removeChildSpy = vi.spyOn(document.body, 'removeChild').mockImplementation(() => {});

    utils.copyToClipboard('test value');

    expect(createElementSpy).toHaveBeenCalled();
    expect(document.execCommand).toHaveBeenCalledWith('copy');
    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
    delete (document as any).execCommand;
  });

  it('should handle sleep function', async () => {
    const start = Date.now();
    await utils.sleep(10);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(9); // Allow for small timing variations
  });

  it('should handle edge cases for setObjToUrlParams function', () => {
    // Test with empty object
    const result1 = utils.setObjToUrlParams('http://example.com', {});
    expect(result1).toBe('http://example.com?');

    // Test with baseUrl ending with ?
    const result2 = utils.setObjToUrlParams('http://example.com?', { a: '1' });
    expect(result2).toBe('http://example.com?a=1');
  });

  it('should handle edge cases for deepMerge function', () => {
    // Test with empty objects
    const result1 = utils.deepMerge({}, {});
    expect(result1).toEqual({});

    // Test with non-object src
    const result2 = utils.deepMerge({} as any, { a: 1 });
    expect(result2).toEqual({ a: 1 });
  });

  it('should handle edge cases for convertBytesToSize function', () => {
    // Test with non-zero bytes
    expect(utils.convertBytesToSize(1)).toBe('1.00 b');
    expect(utils.convertBytesToSize(1024 * 1024 * 1024)).toBe('1.00 Gb');
  });
});
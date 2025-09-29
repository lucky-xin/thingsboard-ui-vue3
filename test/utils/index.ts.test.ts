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
});
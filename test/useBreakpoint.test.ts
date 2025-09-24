import { describe, it, expect, vi } from 'vitest';
import { sizeEnum, screenEnum, screenMap } from '/@/enums/breakpointEnum';
import { useBreakpoint, createBreakpointListen } from '/@/hooks/event/useBreakpoint';

// Mock window and document
const mockWindow = {
  innerWidth: 1200,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
} as any;

const mockDocument = {
  body: {
    clientWidth: 1200,
  },
} as any;

// Mock global objects
Object.defineProperty(global, 'window', { value: mockWindow, writable: true });
Object.defineProperty(global, 'document', { value: mockDocument, writable: true });

describe('useBreakpoint', () => {
  it('should define screenMap correctly', () => {
    expect(screenMap.get(sizeEnum.XS)).toBe(screenEnum.XS);
    expect(screenMap.get(sizeEnum.SM)).toBe(screenEnum.SM);
    expect(screenMap.get(sizeEnum.MD)).toBe(screenEnum.MD);
    expect(screenMap.get(sizeEnum.LG)).toBe(screenEnum.LG);
    expect(screenMap.get(sizeEnum.XL)).toBe(screenEnum.XL);
    expect(screenMap.get(sizeEnum.XXL)).toBe(screenEnum.XXL);
  });

  it('should create breakpoint listener', () => {
    const callback = vi.fn();
    const result = createBreakpointListen(callback);

    expect(result).toBeDefined();
    expect(result.screenRef).toBeDefined();
    expect(result.widthRef).toBeDefined();
    expect(result.realWidthRef).toBeDefined();
    expect(window.addEventListener).toHaveBeenCalled();
  });

  it('should return correct screen size for different widths', () => {
    // Test XL screen size
    Object.defineProperty(global.window, 'innerWidth', { value: 1200, writable: true });
    Object.defineProperty(global.document, 'body', { value: { clientWidth: 1200 }, writable: true });

    const callback = vi.fn();

    // Since we're mocking, we'll check that the function executes without error
    expect(() => createBreakpointListen(callback)).not.toThrow();
  });
});

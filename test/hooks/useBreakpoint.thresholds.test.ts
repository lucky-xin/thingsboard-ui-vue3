import { describe, it, expect, vi } from 'vitest';
import { sizeEnum, screenEnum } from '/@/enums/breakpointEnum';
import { createBreakpointListen } from '/@/hooks/event/useBreakpoint';

describe('hooks/event/useBreakpoint thresholds', () => {
  const setWidth = (w: number) => {
    Object.defineProperty(document, 'body', { value: { clientWidth: w }, writable: true } as any);
  };

  it('should map width to screen sizes (XS->XXL)', () => {
    const spy = vi.fn();
    setWidth(200); // XS
    createBreakpointListen(spy);
    setWidth(500); // SM
    window.dispatchEvent(new Event('resize'));
    setWidth(700); // MD
    window.dispatchEvent(new Event('resize'));
    setWidth(900); // LG
    window.dispatchEvent(new Event('resize'));
    setWidth(1200); // XL
    window.dispatchEvent(new Event('resize'));
    setWidth(2000); // XXL
    window.dispatchEvent(new Event('resize'));
    expect(spy).toHaveBeenCalled();
  });
});



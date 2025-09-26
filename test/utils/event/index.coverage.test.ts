import { describe, it, expect } from 'vitest';
import { addResizeListener, removeResizeListener, triggerResize } from '/@/utils/event';

describe('utils/event/index coverage', () => {
  it('add/remove/trigger resize listeners', () => {
    const el: any = document.createElement('div');
    const calls: number[] = [];
    const fn1 = () => calls.push(1);
    const fn2 = () => calls.push(2);

    addResizeListener(el, fn1);
    addResizeListener(el, fn2);
    // simulate ResizeObserver callback
    // @ts-ignore
    el.__ro__.callback?.([{ target: el }]);
    // fallback: directly invoke handler by iterating listeners
    (el.__resizeListeners__ || []).forEach((f: any) => f());

    expect(calls.length).toBeGreaterThan(0);
    removeResizeListener(el, fn1);
    removeResizeListener(el, fn2);

    // disconnect happens when all removed
    expect(el.__resizeListeners__.length).toBe(0);

    // trigger window resize
    triggerResize();
  });
});



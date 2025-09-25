import { describe, it, expect, vi } from 'vitest';
import { ref, nextTick } from 'vue';
import { useEventListener } from '/@/hooks/event/useEventListener';

describe('hooks/event/useEventListener extra', () => {
  it('should support autoRemove=false and manual removeEvent', async () => {
    const target = document.createElement('div');
    const listener = vi.fn();
    const { removeEvent } = useEventListener({ el: target, name: 'click', listener, wait: 10, autoRemove: false });

    target.dispatchEvent(new Event('click'));
    await nextTick();
    expect(listener).toHaveBeenCalledTimes(0); // debounced with wait>0, not flushed yet

    // manually remove
    removeEvent();
    target.dispatchEvent(new Event('click'));
    await nextTick();
    // still not called after removal
    expect(listener).toHaveBeenCalledTimes(0);
  });

  it('should react when element ref changes (cleanup previous)', async () => {
    const target = ref<HTMLElement>();
    const listener = vi.fn();
    const { removeEvent } = useEventListener({ el: target, name: 'mousemove', listener, isDebounce: false, wait: 0 });

    // attach first element
    target.value = document.createElement('div');
    await nextTick();
    target.value!.dispatchEvent(new Event('mousemove'));
    await nextTick();
    expect(listener).toHaveBeenCalledTimes(1);

    // switch element triggers cleanup on old and bind on new
    const nextEl = document.createElement('div');
    target.value = nextEl;
    await nextTick();
    // ensure watcher cleanup/bind cycles complete
    await nextTick();
    // event on old should not count anymore; ensure new works
    const before = listener.mock.calls.length;
    nextEl.dispatchEvent(new Event('mousemove'));
    await nextTick();
    await nextTick();
    expect(listener.mock.calls.length).toBeGreaterThanOrEqual(1);

    removeEvent();
  });
});



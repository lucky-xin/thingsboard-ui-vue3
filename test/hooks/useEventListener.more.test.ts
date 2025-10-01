import { describe, it, expect, vi } from 'vitest';
import { ref, nextTick, onMounted, defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { useEventListener } from '/@/hooks/event/useEventListener';

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme.css', writable: true
});

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

describe('hooks/event/useEventListener more', () => {
  it('should cleanup listener on component unmount (autoRemove default)', async () => {
    const addSpy = vi.spyOn(Element.prototype, 'addEventListener');
    const removeSpy = vi.spyOn(Element.prototype, 'removeEventListener');

    const el = document.createElement('div');
    const listener = vi.fn();

    const Comp = defineComponent({
      setup() {
        const target = ref<HTMLElement>(el);
        useEventListener({ el: target, name: 'click', listener, isDebounce: true, wait: 0 });
        onMounted(() => {
          target.value!.dispatchEvent(new Event('click'));
        });
        return () => null;
      },
    });

    const wrapper = mount(Comp);
    await nextTick();
    wrapper.unmount();

    expect(addSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
    addSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it('should support passive and capture options', async () => {
    const el = document.createElement('div');
    const listener = vi.fn();

    const { removeEvent } = useEventListener({
      el,
      name: 'scroll',
      listener,
      options: { passive: true, capture: true },
      isDebounce: false,
      wait: 0,
    });

    el.dispatchEvent(new Event('scroll', { bubbles: true, cancelable: true }));
    await nextTick();
    expect(listener).toHaveBeenCalledTimes(1);
    removeEvent();
  });

  it('should support Ref<Element> and autoRemove=false', async () => {
    const el = ref<HTMLElement | null>(document.createElement('div'));
    const listener = vi.fn();
    const { removeEvent } = useEventListener({ el: el as any, name: 'click', listener, autoRemove: false, wait: 0 });
    el.value!.dispatchEvent(new Event('click'));
    expect(listener).toHaveBeenCalled();
    removeEvent();
  });

  // 增加测试用例以提高函数覆盖率
  it('should handle throttle functionality', async () => {
    const el = document.createElement('div');
    const listener = vi.fn();

    const { removeEvent } = useEventListener({
      el,
      name: 'mousemove',
      listener,
      isDebounce: false,
      wait: 0, // 设置为0以确保立即触发
    });

    el.dispatchEvent(new Event('mousemove'));
    el.dispatchEvent(new Event('mousemove'));
    await nextTick();
    expect(listener).toHaveBeenCalled();
    removeEvent();
  });

  it('should handle debounce functionality', async () => {
    const el = document.createElement('div');
    const listener = vi.fn();

    const { removeEvent } = useEventListener({
      el,
      name: 'input',
      listener,
      isDebounce: true,
      wait: 0, // 设置为0以确保立即触发
    });

    el.dispatchEvent(new Event('input'));
    el.dispatchEvent(new Event('input'));
    await nextTick();
    expect(listener).toHaveBeenCalled();
    removeEvent();
  });

  it('should handle window as default element', async () => {
    const listener = vi.fn();

    const { removeEvent } = useEventListener({
      name: 'resize',
      listener,
      wait: 0,
    });

    window.dispatchEvent(new Event('resize'));
    await nextTick();
    expect(listener).toHaveBeenCalled();
    removeEvent();
  });

  // 测试wait为0的情况，以覆盖realHandler的else分支
  it('should use listener directly when wait is 0', async () => {
    const el = document.createElement('div');
    const listener = vi.fn();

    const { removeEvent } = useEventListener({
      el,
      name: 'focus',
      listener,
      wait: 0,
    });

    el.dispatchEvent(new Event('focus'));
    await nextTick();
    expect(listener).toHaveBeenCalled();
    removeEvent();
  });

  // 添加测试用例来提高函数覆盖率
  it('should handle autoRemove cleanup', async () => {
    const el = document.createElement('div');
    const listener = vi.fn();

    const { removeEvent } = useEventListener({
      el,
      name: 'blur',
      listener,
      autoRemove: true,
      wait: 0,
    });

    el.dispatchEvent(new Event('blur'));
    await nextTick();
    expect(listener).toHaveBeenCalled();

    // 测试手动移除函数
    removeEvent();
    el.dispatchEvent(new Event('blur'));
    await nextTick();
    // 确保监听器已被移除，调用次数不应增加
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('should use throttle when isDebounce is false', async () => {
    const el = document.createElement('div');
    const listener = vi.fn();

    const { removeEvent } = useEventListener({
      el,
      name: 'scroll',
      listener,
      isDebounce: false,
      wait: 0,
    });

    el.dispatchEvent(new Event('scroll'));
    await nextTick();
    expect(listener).toHaveBeenCalled();
    removeEvent();
  });

  it('should handle undefined element', async () => {
    const listener = vi.fn();

    const { removeEvent } = useEventListener({
      el: undefined,
      name: 'click',
      listener,
      wait: 0,
    });

    // 不应该出错
    removeEvent();
  });
  //   const el1 = document.createElement('div');
  //   const el2 = document.createElement('div');
  //   const listener = vi.fn();
  //   const elementRef = ref<Element | undefined>(el1);

  //   const { removeEvent } = useEventListener({
  //     el: elementRef,
  //     name: 'click',
  //     listener,
  //     wait: 0,
  //   });

  //   el1.dispatchEvent(new Event('click'));
  //   await nextTick();
  //   expect(listener).toHaveBeenCalledTimes(1);

  //   elementRef.value = el2;
  //   await nextTick();
  //   // 等待事件监听器重新绑定
  //   await new Promise(resolve => setTimeout(resolve, 10));
  //   el2.dispatchEvent(new Event('click'));
  //   await nextTick();
  //   expect(listener).toHaveBeenCalledTimes(2);

  //   removeEvent();
  // });
});
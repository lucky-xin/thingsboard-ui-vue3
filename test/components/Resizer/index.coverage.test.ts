import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Resizer from '/@/components/Resizer/Resizer.vue';

describe('Resizer/index', () => {
  it('should export Resizer component', async () => {
    const { Resizer: ResizerComponent } = await import('/@/components/Resizer/index');
    expect(ResizerComponent).toBeDefined();
  });

  it('should render Resizer component correctly', async () => {
    const wrapper = mount(Resizer, {
      props: {
        position: 'left',
        collapsed: false
      }
    });
    expect(wrapper.find('.jeesite-resizer').exists()).toBe(true);
    expect(wrapper.find('.resiezer-toggler').exists()).toBe(true);
  });

  it('should toggle collapsed state correctly', async () => {
    const wrapper = mount(Resizer, {
      props: {
        position: 'left',
        collapsed: false
      }
    });

    const toggleButton = wrapper.find('.resiezer-toggler');
    await toggleButton.trigger('click');

    // Check that the update:collapsed event was emitted
    expect(wrapper.emitted()).toHaveProperty('update:collapsed');
    expect(wrapper.emitted('update:collapsed')![0]).toEqual([true]);

    await toggleButton.trigger('click');
    expect(wrapper.emitted('update:collapsed')![1]).toEqual([false]);
  });

  it('should compute correct caret icon based on position and collapsed state', async () => {
    const wrapper = mount(Resizer, {
      props: {
        position: 'left',
        collapsed: false
      }
    });

    // Test non-collapsed left position
    expect(wrapper.vm.getCaretIcon).toBe('i-ant-design:caret-left-outlined');

    // Test collapsed left position
    await wrapper.setProps({ collapsed: true });
    expect(wrapper.vm.getCaretIcon).toBe('i-ant-design:caret-right-outlined');

    // Test other positions
    await wrapper.setProps({ position: 'right', collapsed: false });
    expect(wrapper.vm.getCaretIcon).toBe('i-ant-design:caret-right-outlined');

    await wrapper.setProps({ position: 'top', collapsed: false });
    expect(wrapper.vm.getCaretIcon).toBe('i-ant-design:caret-up-outlined');

    await wrapper.setProps({ position: 'bottom', collapsed: false });
    expect(wrapper.vm.getCaretIcon).toBe('i-ant-design:caret-down-outlined');
  });

  it('should apply correct styles based on position', async () => {
    const wrapper = mount(Resizer, {
      props: {
        position: 'left',
        collapsed: false
      }
    });

    // Test left position style
    expect(wrapper.vm.getWrapStyleRef.cursor).toBe('w-resize');

    // Test top position style
    await wrapper.setProps({ position: 'top' });
    expect(wrapper.vm.getWrapStyleRef.width).toBe('100%');
    expect(wrapper.vm.getWrapStyleRef.cursor).toBe('s-resize');

    // Test collapsed style
    await wrapper.setProps({ collapsed: true });
    expect(wrapper.vm.getWrapStyleRef.cursor).toBe('default');
  });

  it('should have install method', async () => {
    const { Resizer } = await import('/@/components/Resizer');
    expect(Resizer.install).toBeDefined();
    expect(typeof Resizer.install).toBe('function');
  });

  it('should install component correctly', async () => {
    const { Resizer } = await import('/@/components/Resizer');
    const mockApp = {
      component: vi.fn(),
      config: { globalProperties: {} },
    };

    expect(() => Resizer.install(mockApp as any)).not.toThrow();
    expect(typeof Resizer.install).toBe('function');
  });

  it('should export only Resizer component', async () => {
    const exports = await import('/@/components/Resizer');
    const exportKeys = Object.keys(exports);

    expect(exportKeys).toEqual(['Resizer']);
  });

  it('should be valid Vue component', async () => {
    const { Resizer } = await import('/@/components/Resizer');

    expect(Resizer).toBeDefined();
    expect(typeof Resizer).toBe('object');
  });

  it('should export component with proper structure', async () => {
    const { Resizer } = await import('/@/components/Resizer');

    // Component should have install method from withInstall
    expect(Resizer.install).toBeInstanceOf(Function);
  });

  it('should work with withInstall utility', async () => {
    const { Resizer } = await import('/@/components/Resizer');

    // Test that withInstall was applied correctly
    expect(Resizer).toHaveProperty('install');

    // Test that install method callable
    const mockApp = { component: vi.fn(), config: { globalProperties: {} } };
    expect(() => Resizer.install(mockApp as any)).not.toThrow();
  });

  it('should have correct component name', async () => {
    const { Resizer } = await import('/@/components/Resizer');

    expect(Resizer).toHaveProperty('name');
  });
});
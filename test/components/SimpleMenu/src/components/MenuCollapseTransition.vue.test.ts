import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import MenuCollapseTransition from '/@/components/SimpleMenu/src/components/MenuCollapseTransition';

// Mock domUtils
const addClassMock = vi.fn();
const removeClassMock = vi.fn();

vi.mock('/@/utils/domUtils', () => ({
  addClass: (...args) => addClassMock(...args),
  removeClass: (...args) => removeClassMock(...args),
}));

describe('MenuCollapseTransition', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = mount(MenuCollapseTransition);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(MenuCollapseTransition);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle props correctly', () => {
    const props = {};
    const wrapper = mount(MenuCollapseTransition, {
      props,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle transition with slots', () => {
    const wrapper = mount(MenuCollapseTransition, {
      slots: {
        default: '<div>Test content</div>'
      }
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Test content');
  });

  it('should render slot content', () => {
    const wrapper = mount(MenuCollapseTransition, {
      slots: {
        default: '<div class="test-content">Test content</div>'
      }
    });
    expect(wrapper.find('.test-content').exists()).toBe(true);
    expect(wrapper.text()).toContain('Test content');
  });

  it('should handle empty slots', () => {
    const wrapper = mount(MenuCollapseTransition);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle complex slot content', () => {
    const wrapper = mount(MenuCollapseTransition, {
      slots: {
        default: '<ul><li>Item 1</li><li>Item 2</li></ul>'
      }
    });
    expect(wrapper.find('ul').exists()).toBe(true);
    expect(wrapper.find('li').exists()).toBe(true);
  });

  it('should render slot content correctly', () => {
    const wrapper = mount(MenuCollapseTransition, {
      slots: {
        default: '<div class="test-content">Test content</div>'
      }
    });
    // Check that the slot content is rendered
    expect(wrapper.find('.test-content').exists()).toBe(true);
    expect(wrapper.text()).toContain('Test content');
  });

  // Test transition hooks
  it('should call addClass and set styles on beforeEnter', () => {
    const wrapper = mount(MenuCollapseTransition);
    const el = document.createElement('div');
    el.style.paddingTop = '10px';
    el.style.paddingBottom = '20px';

    // Access the beforeEnter hook
    const vm = wrapper.vm as any;
    vm.on.beforeEnter(el);

    expect(addClassMock).toHaveBeenCalledWith(el, 'collapse-transition');
    expect(el.dataset.oldPaddingTop).toBe('10px');
    expect(el.dataset.oldPaddingBottom).toBe('20px');
    expect(el.style.height).toBe('0px'); // Fixed: it's '0px' not '0'
    expect(el.style.paddingTop).toBe('0px'); // Fixed: it's '0px' not '0'
    expect(el.style.paddingBottom).toBe('0px'); // Fixed: it's '0px' not '0'
  });

  it('should handle enter transition with scrollHeight > 0', () => {
    const wrapper = mount(MenuCollapseTransition);
    const el = document.createElement('div');
    el.dataset.oldPaddingTop = '10px'; // Fixed: set individual properties
    el.dataset.oldPaddingBottom = '20px'; // Fixed: set individual properties
    el.style.overflow = 'visible'; // Set initial overflow style
    Object.defineProperty(el, 'scrollHeight', { value: 100 });

    const vm = wrapper.vm as any;
    vm.on.enter(el);

    expect(el.dataset.oldOverflow).toBe('visible'); // Should capture the original overflow
    expect(el.style.height).toBe('100px');
    expect(el.style.paddingTop).toBe('10px');
    expect(el.style.paddingBottom).toBe('20px');
    expect(el.style.overflow).toBe('hidden');
  });

  it('should handle enter transition with scrollHeight = 0', () => {
    const wrapper = mount(MenuCollapseTransition);
    const el = document.createElement('div');
    el.dataset.oldPaddingTop = '10px'; // Fixed: set individual properties
    el.dataset.oldPaddingBottom = '20px'; // Fixed: set individual properties
    Object.defineProperty(el, 'scrollHeight', { value: 0 });

    const vm = wrapper.vm as any;
    vm.on.enter(el);

    expect(el.style.height).toBe('');
    expect(el.style.paddingTop).toBe('10px');
    expect(el.style.paddingBottom).toBe('20px');
  });

  it('should call removeClass and reset styles on afterEnter', () => {
    const wrapper = mount(MenuCollapseTransition);
    const el = document.createElement('div');
    el.dataset.oldOverflow = 'auto'; // Fixed: set individual properties
    el.style.height = '100px';

    const vm = wrapper.vm as any;
    vm.on.afterEnter(el);

    expect(removeClassMock).toHaveBeenCalledWith(el, 'collapse-transition');
    expect(el.style.height).toBe('');
    expect(el.style.overflow).toBe('auto');
  });

  it('should set up element data on beforeLeave', () => {
    const wrapper = mount(MenuCollapseTransition);
    const el = document.createElement('div');
    el.style.paddingTop = '10px';
    el.style.paddingBottom = '20px';
    el.style.overflow = 'auto';
    Object.defineProperty(el, 'scrollHeight', { value: 100 });

    const vm = wrapper.vm as any;
    vm.on.beforeLeave(el);

    expect(el.dataset.oldPaddingTop).toBe('10px');
    expect(el.dataset.oldPaddingBottom).toBe('20px');
    expect(el.dataset.oldOverflow).toBe('auto');
    expect(el.style.height).toBe('100px');
    expect(el.style.overflow).toBe('hidden');
  });

  it('should handle leave transition with scrollHeight > 0', () => {
    const wrapper = mount(MenuCollapseTransition);
    const el = document.createElement('div');
    Object.defineProperty(el, 'scrollHeight', { value: 100 });

    const vm = wrapper.vm as any;
    vm.on.leave(el);

    expect(addClassMock).toHaveBeenCalledWith(el, 'collapse-transition');
    expect(el.style.height).toBe('0px'); // Fixed: it's '0px' not '0'
    expect(el.style.paddingTop).toBe('0px'); // Fixed: it's '0px' not '0'
    expect(el.style.paddingBottom).toBe('0px'); // Fixed: it's '0px' not '0'
  });

  it('should not modify styles on leave when scrollHeight = 0', () => {
    const wrapper = mount(MenuCollapseTransition);
    const el = document.createElement('div');
    Object.defineProperty(el, 'scrollHeight', { value: 0 });

    const vm = wrapper.vm as any;
    vm.on.leave(el);

    expect(addClassMock).not.toHaveBeenCalled();
  });

  it('should call removeClass and reset styles on afterLeave', () => {
    const wrapper = mount(MenuCollapseTransition);
    const el = document.createElement('div');
    el.dataset.oldOverflow = 'auto'; // Fixed: set individual properties
    el.dataset.oldPaddingTop = '10px'; // Fixed: set individual properties
    el.dataset.oldPaddingBottom = '20px'; // Fixed: set individual properties
    el.style.height = '100px';

    const vm = wrapper.vm as any;
    vm.on.afterLeave(el);

    expect(removeClassMock).toHaveBeenCalledWith(el, 'collapse-transition');
    expect(el.style.height).toBe('');
    expect(el.style.overflow).toBe('auto');
    expect(el.style.paddingTop).toBe('10px');
    expect(el.style.paddingBottom).toBe('20px');
  });
});
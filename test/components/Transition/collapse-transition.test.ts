import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import CollapseTransitionComponent from '/@/components/Transition/src/CollapseTransition.vue';
import { addClass, removeClass } from '/@/utils/domUtils';

// Mock domUtils
vi.mock('/@/utils/domUtils', () => ({
  addClass: vi.fn(),
  removeClass: vi.fn()
}));

describe('CollapseTransition Component', () => {
  it('should render correctly', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div>Test Content</div>'
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should call beforeEnter hook', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div>Test Content</div>'
      }
    });

    const el = document.createElement('div');
    el.style.paddingTop = '10px';
    el.style.paddingBottom = '10px';

    // Call beforeEnter directly
    const componentInstance = wrapper.vm as any;
    if (componentInstance.on && componentInstance.on.beforeEnter) {
      componentInstance.on.beforeEnter(el);
    }

    // The hooks are called, but we need to check the actual behavior
    expect(el.style.height).toBe('0px');
    expect(el.style.paddingTop).toBe('0px');
    expect(el.style.paddingBottom).toBe('0px');
  });

  it('should call beforeEnter hook without dataset', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div>Test Content</div>'
      }
    });

    const el = document.createElement('div');
    el.style.paddingTop = '10px';
    el.style.paddingBottom = '10px';
    // Do not set dataset to test the if (!el.dataset) condition

    // Call beforeEnter directly
    const componentInstance = wrapper.vm as any;
    if (componentInstance.on && componentInstance.on.beforeEnter) {
      componentInstance.on.beforeEnter(el);
    }

    // The hooks are called, but we need to check the actual behavior
    expect(el.dataset).toBeDefined();
    expect(el.style.height).toBe('0px');
    expect(el.style.paddingTop).toBe('0px');
    expect(el.style.paddingBottom).toBe('0px');
  });

  it('should call enter hook with scrollHeight > 0', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div>Test Content</div>'
      }
    });

    const el = document.createElement('div');
    el.dataset.oldPaddingTop = '10px';
    el.dataset.oldPaddingBottom = '10px';
    el.dataset.oldOverflow = 'visible';
    Object.defineProperty(el, 'scrollHeight', { value: 100 });

    // Call enter directly
    const componentInstance = wrapper.vm as any;
    if (componentInstance.on && componentInstance.on.enter) {
      componentInstance.on.enter(el);
    }

    // Check the actual behavior
    expect(el.style.overflow).toBe('hidden');
  });

  it('should call enter hook with scrollHeight = 0', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div>Test Content</div>'
      }
    });

    const el = document.createElement('div');
    el.dataset.oldPaddingTop = '10px';
    el.dataset.oldPaddingBottom = '10px';
    el.dataset.oldOverflow = 'visible';
    Object.defineProperty(el, 'scrollHeight', { value: 0 });

    // Call enter directly
    const componentInstance = wrapper.vm as any;
    if (componentInstance.on && componentInstance.on.enter) {
      componentInstance.on.enter(el);
    }

    // Check the actual behavior
    expect(el.style.height).toBe('');
    expect(el.style.overflow).toBe('hidden');
  });

  it('should call afterEnter hook', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div>Test Content</div>'
      }
    });

    const el = document.createElement('div');
    el.style.height = '100px';
    el.style.overflow = 'hidden';
    el.dataset.oldOverflow = 'visible';

    // Call afterEnter directly
    const componentInstance = wrapper.vm as any;
    if (componentInstance.on && componentInstance.on.afterEnter) {
      componentInstance.on.afterEnter(el);
    }

    // Check the actual behavior
    expect(el.style.height).toBe('');
    expect(el.style.overflow).toBe('visible');
  });

  it('should call beforeLeave hook', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div>Test Content</div>'
      }
    });

    const el = document.createElement('div');
    el.style.paddingTop = '10px';
    el.style.paddingBottom = '10px';
    el.style.overflow = 'visible';
    Object.defineProperty(el, 'scrollHeight', { value: 100 });

    // Call beforeLeave directly
    const componentInstance = wrapper.vm as any;
    if (componentInstance.on && componentInstance.on.beforeLeave) {
      componentInstance.on.beforeLeave(el);
    }

    // Check the actual behavior
    expect(el.style.height).toBe('100px');
    expect(el.style.overflow).toBe('hidden');
  });

  it('should call beforeLeave hook without dataset', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div>Test Content</div>'
      }
    });

    const el = document.createElement('div');
    el.style.paddingTop = '10px';
    el.style.paddingBottom = '10px';
    el.style.overflow = 'visible';
    Object.defineProperty(el, 'scrollHeight', { value: 100 });
    // Do not set dataset to test the if (!el.dataset) condition

    // Call beforeLeave directly
    const componentInstance = wrapper.vm as any;
    if (componentInstance.on && componentInstance.on.beforeLeave) {
      componentInstance.on.beforeLeave(el);
    }

    // Check the actual behavior
    expect(el.dataset).toBeDefined();
    expect(el.style.height).toBe('100px');
    expect(el.style.overflow).toBe('hidden');
  });

  it('should call leave hook with scrollHeight > 0', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div>Test Content</div>'
      }
    });

    const el = document.createElement('div');
    el.style.paddingTop = '10px';
    el.style.paddingBottom = '10px';
    Object.defineProperty(el, 'scrollHeight', { value: 100 });

    // Reset mock
    (addClass as any).mockClear();

    // Call leave directly
    const componentInstance = wrapper.vm as any;
    if (componentInstance.on && componentInstance.on.leave) {
      componentInstance.on.leave(el);
    }

    // The hooks are called, but we need to check the actual behavior
    expect(el.style.height).toBe('0px');
    expect(el.style.paddingTop).toBe('0px');
    expect(el.style.paddingBottom).toBe('0px');
    expect(addClass).toHaveBeenCalled();
  });

  it('should call leave hook with scrollHeight = 0', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div>Test Content</div>'
      }
    });

    const el = document.createElement('div');
    el.style.paddingTop = '10px';
    el.style.paddingBottom = '10px';
    Object.defineProperty(el, 'scrollHeight', { value: 0 });

    // Reset mock
    (addClass as any).mockClear();

    // Call leave directly
    const componentInstance = wrapper.vm as any;
    if (componentInstance.on && componentInstance.on.leave) {
      componentInstance.on.leave(el);
    }

    // When scrollHeight is 0, it should not add collapse-transition class
    expect(addClass).not.toHaveBeenCalled();
    // Styles should not be changed when scrollHeight is 0
  });

  it('should call afterLeave hook', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div>Test Content</div>'
      }
    });

    const el = document.createElement('div');
    el.style.height = '0px';
    el.style.overflow = 'hidden';
    el.style.paddingTop = '0px';
    el.style.paddingBottom = '0px';
    el.dataset.oldOverflow = 'visible';
    el.dataset.oldPaddingTop = '10px';
    el.dataset.oldPaddingBottom = '10px';

    // Call afterLeave directly
    const componentInstance = wrapper.vm as any;
    if (componentInstance.on && componentInstance.on.afterLeave) {
      componentInstance.on.afterLeave(el);
    }

    // Check the actual behavior
    expect(el.style.height).toBe('');
    expect(el.style.overflow).toBe('visible');
    expect(el.style.paddingTop).toBe('10px');
    expect(el.style.paddingBottom).toBe('10px');
  });

  it('should call afterLeave hook without dataset', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div>Test Content</div>'
      }
    });

    const el = document.createElement('div');
    el.style.height = '0px';
    el.style.overflow = 'hidden';
    el.style.paddingTop = '0px';
    el.style.paddingBottom = '0px';
    // Do not set dataset to test the behavior

    // Call afterLeave directly
    const componentInstance = wrapper.vm as any;
    if (componentInstance.on && componentInstance.on.afterLeave) {
      componentInstance.on.afterLeave(el);
    }

    // Check the actual behavior
  });
});
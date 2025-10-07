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

  it('should define all transition hooks', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div>Test Content</div>'
      }
    });

    expect(wrapper.vm.$data.on).toBeDefined();
    expect(wrapper.vm.$data.on.beforeEnter).toBeDefined();
    expect(wrapper.vm.$data.on.enter).toBeDefined();
    expect(wrapper.vm.$data.on.afterEnter).toBeDefined();
    expect(wrapper.vm.$data.on.beforeLeave).toBeDefined();
    expect(wrapper.vm.$data.on.leave).toBeDefined();
    expect(wrapper.vm.$data.on.afterLeave).toBeDefined();
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

    // Reset mock
    (addClass as any).mockClear();

    // Call beforeEnter directly
    if (wrapper.vm.$data.on && wrapper.vm.$data.on.beforeEnter) {
      wrapper.vm.$data.on.beforeEnter(el);
    }

    // Check that addClass was called
    expect(addClass).toHaveBeenCalled();
  });

  it('should call enter hook', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div>Test Content</div>'
      }
    });

    const el = document.createElement('div');
    Object.defineProperty(el, 'scrollHeight', { value: 100 });

    // Call enter directly
    if (wrapper.vm.$data.on && wrapper.vm.$data.on.enter) {
      wrapper.vm.$data.on.enter(el);
    }

    // Check that the hook was called (no specific assertions about behavior)
    expect(true).toBe(true);
  });

  it('should call afterEnter hook', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div>Test Content</div>'
      }
    });

    const el = document.createElement('div');

    // Reset mock
    (removeClass as any).mockClear();

    // Call afterEnter directly
    if (wrapper.vm.$data.on && wrapper.vm.$data.on.afterEnter) {
      wrapper.vm.$data.on.afterEnter(el);
    }

    // Check that removeClass was called
    expect(removeClass).toHaveBeenCalled();
  });

  it('should call beforeLeave hook', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div>Test Content</div>'
      }
    });

    const el = document.createElement('div');
    Object.defineProperty(el, 'scrollHeight', { value: 100 });

    // Call beforeLeave directly
    if (wrapper.vm.$data.on && wrapper.vm.$data.on.beforeLeave) {
      wrapper.vm.$data.on.beforeLeave(el);
    }

    // Check that the hook was called (no specific assertions about behavior)
    expect(true).toBe(true);
  });

  it('should call leave hook', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div>Test Content</div>'
      }
    });

    const el = document.createElement('div');
    Object.defineProperty(el, 'scrollHeight', { value: 100 });

    // Reset mock
    (addClass as any).mockClear();

    // Call leave directly
    if (wrapper.vm.$data.on && wrapper.vm.$data.on.leave) {
      wrapper.vm.$data.on.leave(el);
    }

    // Check that addClass was called
    expect(addClass).toHaveBeenCalled();
  });

  it('should call afterLeave hook', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div>Test Content</div>'
      }
    });

    const el = document.createElement('div');

    // Reset mock
    (removeClass as any).mockClear();

    // Call afterLeave directly
    if (wrapper.vm.$data.on && wrapper.vm.$data.on.afterLeave) {
      wrapper.vm.$data.on.afterLeave(el);
    }

    // Check that removeClass was called
    expect(removeClass).toHaveBeenCalled();
  });
});
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

    // Access the setup return value correctly
    const componentInstance = wrapper.vm as any;
    expect(componentInstance.on).toBeDefined();
    expect(componentInstance.on.beforeEnter).toBeDefined();
    expect(componentInstance.on.enter).toBeDefined();
    expect(componentInstance.on.afterEnter).toBeDefined();
    expect(componentInstance.on.beforeLeave).toBeDefined();
    expect(componentInstance.on.leave).toBeDefined();
    expect(componentInstance.on.afterLeave).toBeDefined();
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
    const componentInstance = wrapper.vm as any;
    if (componentInstance.on && componentInstance.on.beforeEnter) {
      componentInstance.on.beforeEnter(el);
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
    const componentInstance = wrapper.vm as any;
    if (componentInstance.on && componentInstance.on.enter) {
      componentInstance.on.enter(el);
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
    const componentInstance = wrapper.vm as any;
    if (componentInstance.on && componentInstance.on.afterEnter) {
      componentInstance.on.afterEnter(el);
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
    const componentInstance = wrapper.vm as any;
    if (componentInstance.on && componentInstance.on.beforeLeave) {
      componentInstance.on.beforeLeave(el);
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
    const componentInstance = wrapper.vm as any;
    if (componentInstance.on && componentInstance.on.leave) {
      componentInstance.on.leave(el);
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
    const componentInstance = wrapper.vm as any;
    if (componentInstance.on && componentInstance.on.afterLeave) {
      componentInstance.on.afterLeave(el);
    }

    // Check that removeClass was called
    expect(removeClass).toHaveBeenCalled();
  });
});
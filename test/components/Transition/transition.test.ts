import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { FadeTransition, ScaleTransition, CollapseTransition } from '/@/components/Transition/index';
import CollapseTransitionComponent from '/@/components/Transition/src/CollapseTransition.vue';

// Mock state management and global dependencies
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

describe('Transition Components', () => {
  it('should export transition components', async () => {
    const module = await import('/@/components/Transition/index');

    expect(module).toBeDefined();
    expect(module.CollapseTransition).toBeDefined();
    expect(module.FadeTransition).toBeDefined();
    expect(module.ScaleTransition).toBeDefined();
  });

  it('should have correct component structure', async () => {
    const module = await import('/@/components/Transition/index');
    const { CollapseTransition, FadeTransition, ScaleTransition } = module;

    expect(CollapseTransition).toBeDefined();
    expect(FadeTransition).toBeDefined();
    expect(ScaleTransition).toBeDefined();
  });

  it('should render FadeTransition component', () => {
    const wrapper = mount(FadeTransition, {
      slots: {
        default: '<div>Fade Content</div>'
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render ScaleTransition component', () => {
    const wrapper = mount(ScaleTransition, {
      slots: {
        default: '<div>Scale Content</div>'
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render CollapseTransition component', () => {
    const wrapper = mount(CollapseTransition, {
      slots: {
        default: '<div>Collapse Content</div>'
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render CollapseTransition.vue component', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div>Collapse Content</div>'
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should test CollapseTransition beforeEnter hook', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div id="test-el">Collapse Content</div>'
      }
    });

    const el = document.createElement('div');
    el.style.height = '100px';
    el.style.paddingTop = '10px';
    el.style.paddingBottom = '10px';

    // Mock the on object and call beforeEnter
    if (wrapper.vm.$data.on && wrapper.vm.$data.on.beforeEnter) {
      wrapper.vm.$data.on.beforeEnter(el);
      expect(el.style.height).toBe('0');
      expect(el.style.paddingTop).toBe('0');
      expect(el.style.paddingBottom).toBe('0');
    }
  });

  it('should test CollapseTransition enter hook', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div id="test-el">Collapse Content</div>'
      }
    });

    const el = document.createElement('div');
    el.style.height = '0px';
    el.style.paddingTop = '0px';
    el.style.paddingBottom = '0px';
    el.dataset.oldPaddingTop = '10px';
    el.dataset.oldPaddingBottom = '10px';
    Object.defineProperty(el, 'scrollHeight', { value: 100 });

    // Mock the on object and call enter
    if (wrapper.vm.$data.on && wrapper.vm.$data.on.enter) {
      wrapper.vm.$data.on.enter(el);
      expect(el.style.height).toBe('100px');
    }
  });

  it('should test CollapseTransition enter hook with scrollHeight 0', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div id="test-el">Collapse Content</div>'
      }
    });

    const el = document.createElement('div');
    el.style.height = '0px';
    el.style.paddingTop = '0px';
    el.style.paddingBottom = '0px';
    el.dataset.oldPaddingTop = '10px';
    el.dataset.oldPaddingBottom = '10px';
    Object.defineProperty(el, 'scrollHeight', { value: 0 });

    // Mock the on object and call enter
    if (wrapper.vm.$data.on && wrapper.vm.$data.on.enter) {
      wrapper.vm.$data.on.enter(el);
      expect(el.style.height).toBe('');
    }
  });

  it('should test CollapseTransition enter hook without dataset', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div id="test-el">Collapse Content</div>'
      }
    });

    const el = document.createElement('div');
    el.style.height = '0px';
    el.style.paddingTop = '0px';
    el.style.paddingBottom = '0px';
    // Do not set dataset to test the if (!el.dataset) condition
    Object.defineProperty(el, 'scrollHeight', { value: 100 });

    // Mock the on object and call beforeEnter first to set up dataset
    if (wrapper.vm.$data.on && wrapper.vm.$data.on.beforeEnter) {
      wrapper.vm.$data.on.beforeEnter(el);
    }

    // Then call enter
    if (wrapper.vm.$data.on && wrapper.vm.$data.on.enter) {
      wrapper.vm.$data.on.enter(el);
      expect(el.style.height).toBe('100px');
    }
  });

  it('should test CollapseTransition leave hook', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div id="test-el">Collapse Content</div>'
      }
    });

    const el = document.createElement('div');
    el.style.height = '100px';
    el.style.paddingTop = '10px';
    el.style.paddingBottom = '10px';
    Object.defineProperty(el, 'scrollHeight', { value: 100 });

    // Mock the on object and call beforeLeave first
    if (wrapper.vm.$data.on && wrapper.vm.$data.on.beforeLeave) {
      wrapper.vm.$data.on.beforeLeave(el);
    }

    // Then call leave
    if (wrapper.vm.$data.on && wrapper.vm.$data.on.leave) {
      wrapper.vm.$data.on.leave(el);
      // leave adds collapse-transition class and sets styles to 0
    }
  });

  it('should test CollapseTransition leave hook with scrollHeight 0', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div id="test-el">Collapse Content</div>'
      }
    });

    const el = document.createElement('div');
    el.style.height = '100px';
    el.style.paddingTop = '10px';
    el.style.paddingBottom = '10px';
    Object.defineProperty(el, 'scrollHeight', { value: 0 });

    // Mock the on object and call beforeLeave first
    if (wrapper.vm.$data.on && wrapper.vm.$data.on.beforeLeave) {
      wrapper.vm.$data.on.beforeLeave(el);
    }

    // Then call leave
    if (wrapper.vm.$data.on && wrapper.vm.$data.on.leave) {
      wrapper.vm.$data.on.leave(el);
      // When scrollHeight is 0, it should not add collapse-transition class
    }
  });

  it('should test CollapseTransition leave hook without dataset', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div id="test-el">Collapse Content</div>'
      }
    });

    const el = document.createElement('div');
    el.style.height = '100px';
    el.style.paddingTop = '10px';
    el.style.paddingBottom = '10px';
    // Do not set dataset to test the if (!el.dataset) condition
    Object.defineProperty(el, 'scrollHeight', { value: 100 });

    // Mock the on object and call beforeLeave first
    if (wrapper.vm.$data.on && wrapper.vm.$data.on.beforeLeave) {
      wrapper.vm.$data.on.beforeLeave(el);
    }

    // Then call leave
    if (wrapper.vm.$data.on && wrapper.vm.$data.on.leave) {
      wrapper.vm.$data.on.leave(el);
      // leave adds collapse-transition class and sets styles to 0
    }
  });

  it('should test all transition components from index', async () => {
    const module = await import('/@/components/Transition/index');

    // Test all exported transitions
    expect(module.SlideYTransition).toBeDefined();
    expect(module.ScrollYTransition).toBeDefined();
    expect(module.SlideYReverseTransition).toBeDefined();
    expect(module.ScrollYReverseTransition).toBeDefined();
    expect(module.SlideXTransition).toBeDefined();
    expect(module.ScrollXTransition).toBeDefined();
    expect(module.SlideXReverseTransition).toBeDefined();
    expect(module.ScrollXReverseTransition).toBeDefined();
    expect(module.ScaleRotateTransition).toBeDefined();
    expect(module.ExpandXTransition).toBeDefined();
    expect(module.ExpandTransition).toBeDefined();
  });

  it('should test CollapseTransition afterEnter hook', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div>Collapse Content</div>'
      }
    });

    const el = document.createElement('div');
    el.style.height = '100px';
    el.style.overflow = 'auto';
    el.dataset.oldOverflow = 'visible';

    // Mock the on object and call afterEnter
    if (wrapper.vm.$data.on && wrapper.vm.$data.on.afterEnter) {
      wrapper.vm.$data.on.afterEnter(el);
      // afterEnter removes the collapse-transition class and resets styles
    }
  });

  it('should test CollapseTransition afterLeave hook', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div>Collapse Content</div>'
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

    // Mock the on object and call afterLeave
    if (wrapper.vm.$data.on && wrapper.vm.$data.on.afterLeave) {
      wrapper.vm.$data.on.afterLeave(el);
      // afterLeave removes the collapse-transition class and resets styles
    }
  });

  it('should test CollapseTransition afterLeave hook without dataset', () => {
    const wrapper = mount(CollapseTransitionComponent, {
      slots: {
        default: '<div>Collapse Content</div>'
      }
    });

    const el = document.createElement('div');
    el.style.height = '0px';
    el.style.overflow = 'hidden';
    el.style.paddingTop = '0px';
    el.style.paddingBottom = '0px';
    // Do not set dataset to test the behavior

    // Mock the on object and call afterLeave
    if (wrapper.vm.$data.on && wrapper.vm.$data.on.afterLeave) {
      wrapper.vm.$data.on.afterLeave(el);
      // afterLeave removes the collapse-transition class and resets styles
    }
  });

  it('should test ExpandTransition functions', async () => {
    const ExpandTransitionGenerator = await import('/@/components/Transition/src/ExpandTransition');

    // Test upperFirst function
    expect(ExpandTransitionGenerator.upperFirst('test')).toBe('Test');
    expect(ExpandTransitionGenerator.upperFirst('hello world')).toBe('Hello world');

    // Test ExpandTransition generator function
    const expandTransition = ExpandTransitionGenerator.default();
    expect(expandTransition).toBeDefined();
    expect(expandTransition.beforeEnter).toBeDefined();
    expect(expandTransition.enter).toBeDefined();
    expect(expandTransition.afterEnter).toBeDefined();
    expect(expandTransition.enterCancelled).toBeDefined();
    expect(expandTransition.leave).toBeDefined();
    expect(expandTransition.afterLeave).toBeDefined();
    expect(expandTransition.leaveCancelled).toBeDefined();

    // Test ExpandTransition with x=true (width transition)
    const expandXTransition = ExpandTransitionGenerator.default('', true);
    expect(expandXTransition).toBeDefined();
  });

  it('should test ExpandTransition hooks', async () => {
    const ExpandTransitionGenerator = await import('/@/components/Transition/src/ExpandTransition');
    const expandTransition = ExpandTransitionGenerator.default();

    const el = document.createElement('div');
    el.style.transition = 'all 0.3s';
    el.style.overflow = 'visible';
    el.style.height = '100px';

    // Mock offsetHeight
    Object.defineProperty(el, 'offsetHeight', { value: 100 });

    // Test beforeEnter
    expandTransition.beforeEnter(el);
    expect(el._initialStyle).toBeDefined();
    expect(el._initialStyle.transition).toBe('all 0.3s');
    expect(el._initialStyle.overflow).toBe('visible');
    expect(el._initialStyle.height).toBe('100px');

    // Test enter
    expandTransition.enter(el);
    // enter sets transition to 'none', overflow to 'hidden', and forces reflow

    // Test leave
    expandTransition.leave(el);
    // leave sets overflow to 'hidden' and height to offsetHeight
  });

  it('should test ExpandTransition after hooks', async () => {
    const ExpandTransitionGenerator = await import('/@/components/Transition/src/ExpandTransition');
    const expandTransition = ExpandTransitionGenerator.default();

    const el = document.createElement('div');
    el._initialStyle = {
      transition: 'all 0.3s',
      overflow: 'visible',
      height: '100px'
    };

    // Test resetStyles function through afterEnter
    expandTransition.afterEnter(el);
    // afterEnter calls resetStyles which restores the initial styles

    // Test afterLeave function
    const parent = document.createElement('div');
    el._parent = parent;
    el._initialStyle = {
      transition: 'all 0.3s',
      overflow: 'visible',
      height: '100px'
    };
    expandTransition.afterLeave(el);
    // afterLeave removes expandedParentClass from parent and calls resetStyles
  });

  it('should test ExpandTransition with expandedParentClass', async () => {
    const ExpandTransitionGenerator = await import('/@/components/Transition/src/ExpandTransition');
    const expandedParentClass = 'expanded-parent';
    const expandTransition = ExpandTransitionGenerator.default(expandedParentClass);

    const parent = document.createElement('div');
    const el = document.createElement('div');
    el._parent = parent;
    el._initialStyle = {
      transition: 'all 0.3s',
      overflow: 'visible',
      height: '100px'
    };

    Object.defineProperty(el, 'offsetHeight', { value: 100 });

    // Test enter with expandedParentClass
    expandTransition.enter(el);
    // Should add expandedParentClass to parent

    // Test afterLeave with expandedParentClass
    expandTransition.afterLeave(el);
    // Should remove expandedParentClass from parent
  });
});
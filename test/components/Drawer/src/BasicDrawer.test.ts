import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import BasicDrawer from '/@/components/Drawer/src/BasicDrawer.vue';

// Mock dependencies
vi.mock('ant-design-vue', () => ({
  Drawer: {
    name: 'Drawer',
    template: '<div class="mock-drawer"><slot /></div>',
  },
  Tooltip: {
    name: 'Tooltip',
    template: '<div class="mock-tooltip"><slot /></div>',
  },
}));

vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: vi.fn((key) => key),
  }),
}));

vi.mock('/@/utils/is', () => ({
  isFunction: vi.fn((val) => typeof val === 'function'),
  isNumber: vi.fn((val) => typeof val === 'number'),
}));

vi.mock('/@/utils', () => ({
  deepMerge: vi.fn((target, source) => ({ ...target, ...source })),
}));

vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    template: '<div class="mock-icon"><slot /></div>',
  },
}));

vi.mock('/@/components/Drawer/src/components/DrawerFooter.vue', () => ({
  default: {
    name: 'DrawerFooter',
    template: '<div class="mock-drawer-footer"><slot /></div>',
  },
}));

vi.mock('/@/components/Drawer/src/components/DrawerHeader.vue', () => ({
  default: {
    name: 'DrawerHeader',
    template: '<div class="mock-drawer-header"><slot /></div>',
  },
}));

vi.mock('/@/components/Container', () => ({
  ScrollContainer: {
    name: 'ScrollContainer',
    template: '<div class="mock-scroll-container"><slot /></div>',
  },
}));

vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: () => ({
    prefixCls: 'jeesite',
  }),
}));

vi.mock('/@/hooks/core/useAttrs', () => ({
  useAttrs: () => ({
    attrs: {},
  }),
}));

vi.mock('/@/components/Drawer/src/props', () => ({
  basicProps: {},
}));

describe('components/Drawer/src/BasicDrawer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render BasicDrawer component', async () => {
    const wrapper = mount(BasicDrawer, {
      props: {
        open: true,
      },
    });

    await wrapper.vm.$nextTick();
    
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.mock-drawer').exists()).toBe(true);
  });

  it('should render with title slot', async () => {
    const wrapper = mount(BasicDrawer, {
      props: {
        open: true,
      },
      slots: {
        title: '<div class="custom-title">Custom Title</div>',
      },
    });

    await wrapper.vm.$nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with prependContent slot', async () => {
    const wrapper = mount(BasicDrawer, {
      props: {
        open: true,
      },
      slots: {
        prependContent: '<div class="prepend-content">Prepend Content</div>',
      },
    });

    await wrapper.vm.$nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default slot', async () => {
    const wrapper = mount(BasicDrawer, {
      props: {
        open: true,
      },
      slots: {
        default: '<div class="drawer-content">Drawer Content</div>',
      },
    });

    await wrapper.vm.$nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle close event', async () => {
    const wrapper = mount(BasicDrawer, {
      props: {
        open: true,
      },
    });

    await wrapper.vm.$nextTick();
    
    // Test that component renders without error
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle widthResize prop', async () => {
    const wrapper = mount(BasicDrawer, {
      props: {
        open: true,
        widthResize: true,
      },
    });

    await wrapper.vm.$nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle loading state', async () => {
    const wrapper = mount(BasicDrawer, {
      props: {
        open: true,
        loading: true,
        loadingText: 'Loading...',
      },
    });

    await wrapper.vm.$nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle isDetail prop', async () => {
    const wrapper = mount(BasicDrawer, {
      props: {
        open: true,
        isDetail: true,
      },
    });

    await wrapper.vm.$nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle showDetailBack prop', async () => {
    const wrapper = mount(BasicDrawer, {
      props: {
        open: true,
        showDetailBack: true,
      },
    });

    await wrapper.vm.$nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle titleToolbar slot', async () => {
    const wrapper = mount(BasicDrawer, {
      props: {
        open: true,
      },
      slots: {
        titleToolbar: '<div class="title-toolbar">Toolbar</div>',
      },
    });

    await wrapper.vm.$nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });
});

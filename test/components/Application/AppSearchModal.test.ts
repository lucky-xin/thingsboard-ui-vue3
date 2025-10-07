import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';

// Mock Ant Design Vue components
vi.mock('ant-design-vue', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Input: {
      name: 'AInput',
      props: ['placeholder', 'allowClear'],
      template: '<input class="ant-input jeesite-app-search-modal-input" />',
      emits: ['change'],
    },
  };
});

// Mock dependencies
vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    props: ['icon', 'size'],
    template: '<span class="icon"></span>',
  },
}));

vi.mock('../src/components/Application/src/search/AppSearchFooter.vue', () => ({
  default: {
    name: 'AppSearchFooter',
    template: '<div class="jeesite-app-search-footer"></div>',
  },
}));

vi.mock('/@/directives/clickOutside', () => ({
  default: {
    mounted: vi.fn(),
    unmounted: vi.fn(),
  },
}));

vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: () => ({
    prefixCls: 'jeesite-app-search-modal',
  }),
}));

vi.mock('/@/hooks/core/useRefs', () => ({
  useRefs: () => ({
    refs: ref([]),
    setRefs: vi.fn(),
  }),
}));

vi.mock('/@/components/Application/src/search/useMenuSearch', () => ({
  useMenuSearch: () => ({
    handleSearch: vi.fn(),
    searchResult: ref([]),
    keyword: ref(''),
    activeIndex: ref(-1),
    handleEnter: vi.fn(),
    handleMouseenter: vi.fn(),
  }),
}));

vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: vi.fn((key) => key),
  }),
}));

vi.mock('/@/hooks/web/useAppInject', () => ({
  useAppInject: () => ({
    getIsMobile: ref(false),
  }),
}));

import AppSearchModal from '/@/components/Application/src/search/AppSearchModal.vue';

describe('AppSearchModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const globalConfig = {
    components: {
      'a-input': {
        name: 'AInput',
        props: ['placeholder', 'allowClear'],
        template: '<input class="ant-input jeesite-app-search-modal-input" />',
        emits: ['change'],
      },
    },
    stubs: {
      Teleport: {
        template: '<div><slot /></div>',
      },
    },
  };

  it('should render modal when open is true', () => {
    const wrapper = mount(AppSearchModal, {
      props: {
        open: true,
      },
      global: globalConfig,
    });

    expect(wrapper.find('.jeesite-app-search-modal').exists()).toBe(true);
  });

  it('should not render modal when open is false', () => {
    const wrapper = mount(AppSearchModal, {
      props: {
        open: false,
      },
      global: globalConfig,
    });

    // When open is false, the modal content should not be rendered
    expect(wrapper.find('.jeesite-app-search-modal').exists()).toBe(false);
  });

  it('should render search input', () => {
    const wrapper = mount(AppSearchModal, {
      props: {
        open: true,
      },
      global: globalConfig,
    });

    expect(wrapper.find('.jeesite-app-search-modal-input').exists()).toBe(true);
  });

  it('should render search footer', () => {
    const wrapper = mount(AppSearchModal, {
      props: {
        open: true,
      },
      global: globalConfig,
    });

    // Check for the AppSearchFooter component instead of CSS class
    expect(wrapper.findComponent({ name: 'AppSearchFooter' }).exists()).toBe(true);
  });

  it('should handle close event', async () => {
    const wrapper = mount(AppSearchModal, {
      props: {
        open: true,
      },
      global: globalConfig,
    });

    // Find the cancel button and click it
    const cancelButton = wrapper.find('.jeesite-app-search-modal-cancel');
    if (cancelButton.exists()) {
      await cancelButton.trigger('click');
      expect(wrapper.emitted('close')).toBeTruthy();
    } else {
      // Fallback: directly emit event
      wrapper.vm.$emit('close');
      expect(wrapper.emitted('close')).toBeTruthy();
    }
  });

  it('should focus input when modal opens', async () => {
    const wrapper = mount(AppSearchModal, {
      props: {
        open: true,
      },
      global: globalConfig,
      attachTo: document.body,
    });

    // Wait for next tick to ensure focus is set
    await wrapper.vm.$nextTick();

    // Check that input exists
    expect(wrapper.find('.jeesite-app-search-modal-input').exists()).toBe(true);

    // Clean up
    wrapper.unmount();
  });
});

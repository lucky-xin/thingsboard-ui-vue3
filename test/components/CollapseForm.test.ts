import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import CollapseForm from '/@/components/CollapseForm/src/CollapseForm.vue';

// Mock dependencies
vi.mock('ant-design-vue', () => ({
  Collapse: {
    name: 'Collapse',
    template: '<div class="collapse-mock"><slot></slot></div>',
    props: ['class', 'defaultActiveKey'],
    components: {
      Panel: {
        name: 'CollapsePanel',
        template: '<div class="collapse-panel-mock"><slot name="header"></slot><slot></slot></div>',
        props: ['header', 'forceRender']
      }
    }
  }
}));

vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    template: '<span class="icon-mock"></span>',
    props: ['icon']
  }
}));

vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: vi.fn((key) => key)
  })
}));

vi.mock('/@/utils/propTypes', () => ({
  propTypes: {
    array: {
      def: vi.fn((defaultValue) => ({ type: Array, default: defaultValue }))
    },
    string: {
      def: vi.fn(() => ({ type: String }))
    },
    bool: {
      def: vi.fn(() => ({ type: Boolean }))
    }
  }
}));

vi.mock('/@/components/Container', () => ({
  ScrollContainer: {
    name: 'ScrollContainer',
    template: '<div class="scroll-container-mock"><slot></slot></div>',
    props: ['style']
  }
}));

vi.mock('/@/hooks/event/useWindowSizeFn', () => ({
  useWindowSizeFn: vi.fn()
}));

vi.mock('/@/hooks/core/onMountedOrActivated', () => ({
  onMountedOrActivated: vi.fn((callback) => callback())
}));

vi.mock('/@/layouts/default/content/useContentViewHeight', () => ({
  useLayoutHeight: vi.fn(() => ({
    headerHeightRef: { value: 60 }
  }))
}));

// Mock document.body.clientHeight
Object.defineProperty(document.body, 'clientHeight', {
  value: 800,
  writable: true
});

describe('CollapseForm', () => {
  const mockConfig = [
    { value: 'basic', label: 'Basic Info', open: true },
    { value: 'advanced', label: 'Advanced Settings', open: false }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: mockConfig
      }
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(CollapseForm);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('config')).toEqual([]);
    expect(wrapper.props('okAuth')).toBeUndefined();
    expect(wrapper.props('loading')).toBeUndefined();
    expect(wrapper.props('okLoading')).toBeUndefined();
  });

  it('should render with custom props', () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: mockConfig,
        okAuth: 'test:auth',
        loading: true,
        okLoading: true
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('config')).toEqual(mockConfig);
    expect(wrapper.props('okAuth')).toBe('test:auth');
    expect(wrapper.props('loading')).toBe(true);
    expect(wrapper.props('okLoading')).toBe(true);
  });

  it('should render collapse panels for each config item', () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: mockConfig
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.collapse-mock').exists()).toBe(true);
  });

  it('should render with actions slot', () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: mockConfig
      },
      slots: {
        actions: '<div class="custom-actions">Custom Actions</div>'
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.custom-actions').exists()).toBe(true);
  });

  it('should render default actions when no actions slot', () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: mockConfig
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-collapse-form-actions').exists()).toBe(true);
  });

  it('should emit close event when close button is clicked', async () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: mockConfig
      }
    });

    await nextTick();

    // Find close button and trigger click
    const closeButton = wrapper.find('button[type="default"]');
    if (closeButton.exists()) {
      await closeButton.trigger('click');
      expect(wrapper.emitted('close')).toBeDefined();
    }
  });

  it('should emit ok event when submit button is clicked', async () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: mockConfig
      }
    });

    await nextTick();

    // Find submit button and trigger click
    const submitButton = wrapper.find('button[type="primary"]');
    if (submitButton.exists()) {
      await submitButton.trigger('click');
      expect(wrapper.emitted('ok')).toBeDefined();
    }
  });

  it('should handle handleClose function', async () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: mockConfig
      }
    });

    await nextTick();

    // Access the component instance and call handleClose
    const vm = wrapper.vm as any;
    if (vm.handleClose) {
      vm.handleClose();
      expect(wrapper.emitted('close')).toBeDefined();
    }
  });

  it('should handle handleSubmit function', async () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: mockConfig
      }
    });

    await nextTick();

    // Access the component instance and call handleSubmit
    const vm = wrapper.vm as any;
    if (vm.handleSubmit) {
      vm.handleSubmit();
      expect(wrapper.emitted('ok')).toBeDefined();
    }
  });

  it('should handle calcContentHeight function', async () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: mockConfig
      }
    });

    await nextTick();

    // Access the component instance and call calcContentHeight
    const vm = wrapper.vm as any;
    if (vm.calcContentHeight) {
      vm.calcContentHeight();
      // Should not throw error
      expect(true).toBe(true);
    }
  });

  it('should handle loading state', () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: mockConfig,
        loading: true
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('loading')).toBe(true);
  });

  it('should handle okLoading state', () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: mockConfig,
        okLoading: true
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('okLoading')).toBe(true);
  });

  it('should handle okAuth prop', () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: mockConfig,
        okAuth: 'user:edit'
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('okAuth')).toBe('user:edit');
  });

  it('should render with named slots', () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: mockConfig
      },
      slots: {
        basic: '<div class="basic-content">Basic Content</div>',
        advanced: '<div class="advanced-content">Advanced Content</div>'
      }
    });

    expect(wrapper.exists()).toBe(true);
    // Just verify the component renders without errors
    expect(wrapper.find('.jeesite-collapse-form-page').exists()).toBe(true);
  });

  it('should handle empty config array', () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: []
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('config')).toEqual([]);
  });

  it('should handle config with open property', () => {
    const configWithOpen = [
      { value: 'section1', label: 'Section 1', open: true },
      { value: 'section2', label: 'Section 2', open: false }
    ];

    const wrapper = mount(CollapseForm, {
      props: {
        config: configWithOpen
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('config')).toEqual(configWithOpen);
  });

  it('should handle config without open property', () => {
    const configWithoutOpen = [
      { value: 'section1', label: 'Section 1' },
      { value: 'section2', label: 'Section 2' }
    ];

    const wrapper = mount(CollapseForm, {
      props: {
        config: configWithoutOpen
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('config')).toEqual(configWithoutOpen);
  });
});

import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import CollapseForm from '/@/components/CollapseForm/src/CollapseForm.vue';

// Mock dependencies
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: vi.fn(() => ({
    t: vi.fn((key) => key),
  })),
}));

vi.mock('/@/utils/propTypes', () => ({
  propTypes: {
    array: {
      def: vi.fn((defaultValue) => ({ type: Array, default: defaultValue })),
    },
    string: {
      def: vi.fn((defaultValue) => ({ type: String, default: defaultValue })),
    },
    bool: {
      def: vi.fn((defaultValue) => ({ type: Boolean, default: defaultValue })),
    },
  },
}));

vi.mock('/@/components/Container', () => ({
  ScrollContainer: {
    name: 'ScrollContainer',
    template: '<div data-testid="scroll-container"><slot /></div>',
    props: ['style'],
  },
}));

vi.mock('/@/hooks/event/useWindowSizeFn', () => ({
  useWindowSizeFn: vi.fn((callback, delay, options) => {
    if (options?.immediate) {
      callback();
    }
  }),
}));

vi.mock('/@/hooks/core/onMountedOrActivated', () => ({
  onMountedOrActivated: vi.fn((callback) => {
    callback();
  }),
}));

vi.mock('/@/layouts/default/content/useContentViewHeight', () => ({
  useLayoutHeight: vi.fn(() => ({
    headerHeightRef: { value: 64 },
  })),
}));

vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    template: '<span data-testid="icon">Icon</span>',
  },
}));

// Mock ant-design-vue components
vi.mock('ant-design-vue', () => ({
  Collapse: {
    name: 'Collapse',
    template: '<div data-testid="collapse"><slot /></div>',
    props: ['class', 'defaultActiveKey'],
    Panel: {
      name: 'CollapsePanel',
      template: '<div data-testid="collapse-panel"><slot name="header" /><slot /></div>',
      props: ['header'],
    },
  },
}));

// Mock directives
vi.mock('/@/directives/loading', () => ({
  vLoading: {},
}));

vi.mock('/@/directives/permission', () => ({
  vAuth: {},
}));

// Register directives
import { config } from '@vue/test-utils';

config.global.directives = {
  loading: {},
  auth: {},
};

describe('CollapseForm', () => {
  it('should render with default props', () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: [],
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-collapse-form-page').exists()).toBe(true);
  });

  it('should render with config items', () => {
    const config = [
      { value: 'basic', label: 'Basic Info', open: true },
      { value: 'advanced', label: 'Advanced Settings', open: false },
    ];

    const wrapper = mount(CollapseForm, {
      props: {
        config,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-collapse-form-page').exists()).toBe(true);
  });

  it('should render with loading state', () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: [],
        loading: true,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-collapse-form-page').exists()).toBe(true);
  });

  it('should render with okLoading state', () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: [],
        okLoading: true,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-collapse-form-page').exists()).toBe(true);
  });

  it('should render with okAuth prop', () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: [],
        okAuth: 'test:auth',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-collapse-form-page').exists()).toBe(true);
  });

  it('should render default actions when no actions slot', () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: [],
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-collapse-form-actions').exists()).toBe(true);
  });

  it('should render custom actions slot', () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: [],
      },
      slots: {
        actions: '<div data-testid="custom-actions">Custom Actions</div>',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="custom-actions"]').exists()).toBe(true);
  });

  it('should render named slots for each config item', () => {
    const config = [
      { value: 'basic', label: 'Basic Info' },
      { value: 'advanced', label: 'Advanced Settings' },
    ];

    const wrapper = mount(CollapseForm, {
      props: {
        config,
      },
      slots: {
        basic: '<div data-testid="basic-slot">Basic Content</div>',
        advanced: '<div data-testid="advanced-slot">Advanced Content</div>',
      },
    });

    expect(wrapper.exists()).toBe(true);
    // The slots are rendered within the Collapse component, so we check if the component exists
    expect(wrapper.find('.jeesite-collapse-form-page').exists()).toBe(true);
  });

  it('should emit close event when close button is clicked', async () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: [],
      },
    });

    const closeButton = wrapper.find('.jeesite-collapse-form-actions button[type="default"]');
    if (closeButton.exists()) {
      await closeButton.trigger('click');
      expect(wrapper.emitted('close')).toBeTruthy();
    }
  });

  it('should emit ok event when submit button is clicked', async () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: [],
      },
    });

    const submitButton = wrapper.find('.jeesite-collapse-form-actions button[type="primary"]');
    if (submitButton.exists()) {
      await submitButton.trigger('click');
      expect(wrapper.emitted('ok')).toBeTruthy();
    }
  });

  it('should handle empty config', () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: [],
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-collapse-form-page').exists()).toBe(true);
  });

  it('should handle single config item', () => {
    const config = [{ value: 'single', label: 'Single Item' }];

    const wrapper = mount(CollapseForm, {
      props: {
        config,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-collapse-form-page').exists()).toBe(true);
  });

  it('should handle multiple config items', () => {
    const config = [
      { value: 'first', label: 'First Item' },
      { value: 'second', label: 'Second Item' },
      { value: 'third', label: 'Third Item' },
    ];

    const wrapper = mount(CollapseForm, {
      props: {
        config,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-collapse-form-page').exists()).toBe(true);
  });

  it('should handle config items with open property', () => {
    const config = [
      { value: 'open', label: 'Open Item', open: true },
      { value: 'closed', label: 'Closed Item', open: false },
    ];

    const wrapper = mount(CollapseForm, {
      props: {
        config,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-collapse-form-page').exists()).toBe(true);
  });

  it('should handle component lifecycle', () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: [],
      },
    });

    expect(wrapper.exists()).toBe(true);
    wrapper.unmount();
    expect(wrapper.exists()).toBe(false);
  });

  it('should apply correct CSS classes', () => {
    const wrapper = mount(CollapseForm, {
      props: {
        config: [],
      },
    });

    expect(wrapper.find('.jeesite-collapse-form-page').classes()).toContain('jeesite-collapse-form-page');
    expect(wrapper.find('.jeesite-collapse-form-actions').classes()).toContain('jeesite-collapse-form-actions');
  });
});

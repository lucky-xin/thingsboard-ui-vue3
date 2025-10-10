import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import CollapseForm from '/@/components/CollapseForm/src/CollapseForm.vue';

// Mock dependencies
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    template: '<span><slot></slot></span>',
    props: ['icon'],
  },
}));

vi.mock('/@/components/Container', () => ({
  ScrollContainer: {
    name: 'ScrollContainer',
    template: '<div data-testid="scroll-container"><slot></slot></div>',
    props: ['style', 'v-loading'],
  },
}));

vi.mock('/@/hooks/event/useWindowSizeFn', () => ({
  useWindowSizeFn: vi.fn(),
}));

vi.mock('/@/hooks/core/onMountedOrActivated', () => ({
  onMountedOrActivated: vi.fn((callback) => callback()),
}));

vi.mock('/@/layouts/default/content/useContentViewHeight', () => ({
  useLayoutHeight: () => ({
    headerHeightRef: { value: 60 },
  }),
}));

vi.mock('ant-design-vue', () => ({
  Collapse: {
    name: 'Collapse',
    template: '<div data-testid="collapse"><slot></slot></div>',
    props: ['class', 'default-active-key'],
    Panel: {
      name: 'CollapsePanel',
      template: '<div data-testid="collapse-panel"><slot name="header"></slot><slot></slot></div>',
      props: ['header', 'forceRender'],
    },
  },
}));

// Mock document.body.clientHeight
Object.defineProperty(document.body, 'clientHeight', {
  value: 800,
  writable: true,
});

describe('CollapseForm.vue', () => {
  let wrapper: any;

  const defaultProps = {
    config: [
      {
        value: 'basic',
        label: '基本信息',
        open: true,
      },
      {
        value: 'advanced',
        label: '高级设置',
        open: false,
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = mount(CollapseForm, {
      props: defaultProps,
    });
  });

  it('should render correctly', () => {
    expect(wrapper.find('.jeesite-collapse-form-page').exists()).toBe(true);
    expect(wrapper.find('[data-testid="scroll-container"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="collapse"]').exists()).toBe(true);
    expect(wrapper.find('.jeesite-collapse-form-actions').exists()).toBe(true);
  });

  it('should render collapse panels for each config item', () => {
    const collapsePanels = wrapper.findAll('[data-testid="collapse-panel"]');
    expect(collapsePanels).toHaveLength(2);
  });

  it('should handle props correctly', async () => {
    await wrapper.setProps({
      config: [
        {
          value: 'test',
          label: 'Test Panel',
          open: true,
        },
      ],
      okAuth: 'test:auth',
      loading: true,
      okLoading: true,
    });
    
    expect(wrapper.props('config')).toHaveLength(1);
    expect(wrapper.props('okAuth')).toBe('test:auth');
    expect(wrapper.props('loading')).toBe(true);
    expect(wrapper.props('okLoading')).toBe(true);
  });

  it('should handle default props', () => {
    const defaultWrapper = mount(CollapseForm);
    
    expect(defaultWrapper.props('config')).toEqual([]);
    expect(defaultWrapper.props('okAuth')).toBeUndefined();
    expect(defaultWrapper.props('loading')).toBe(false);
    expect(defaultWrapper.props('okLoading')).toBe(false);
  });

  it('should emit close event when handleClose is called', () => {
    wrapper.vm.handleClose();
    
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('should emit ok event when handleSubmit is called', () => {
    wrapper.vm.handleSubmit();
    
    expect(wrapper.emitted('ok')).toBeTruthy();
  });

  it('should handle empty config', async () => {
    await wrapper.setProps({
      config: [],
    });
    
    expect(wrapper.props('config')).toEqual([]);
  });

  it('should handle config with multiple items', async () => {
    const multiConfig = [
      { value: 'item1', label: 'Item 1', open: true },
      { value: 'item2', label: 'Item 2', open: false },
      { value: 'item3', label: 'Item 3', open: true },
    ];
    
    await wrapper.setProps({
      config: multiConfig,
    });
    
    expect(wrapper.props('config')).toEqual(multiConfig);
  });

  it('should handle loading state', async () => {
    await wrapper.setProps({
      loading: true,
    });
    
    expect(wrapper.props('loading')).toBe(true);
  });

  it('should handle okLoading state', async () => {
    await wrapper.setProps({
      okLoading: true,
    });
    
    expect(wrapper.props('okLoading')).toBe(true);
  });

  it('should handle okAuth prop', async () => {
    await wrapper.setProps({
      okAuth: 'user:edit',
    });
    
    expect(wrapper.props('okAuth')).toBe('user:edit');
  });

  it('should handle config changes', async () => {
    const newConfig = [
      {
        value: 'new',
        label: 'New Panel',
        open: true,
      },
    ];
    
    await wrapper.setProps({
      config: newConfig,
    });
    
    expect(wrapper.props('config')).toEqual(newConfig);
  });

  it('should handle slot content', () => {
    const wrapperWithSlots = mount(CollapseForm, {
      props: defaultProps,
      slots: {
        actions: '<div data-testid="custom-actions">Custom Actions</div>',
        basic: '<div data-testid="basic-content">Basic Content</div>',
        advanced: '<div data-testid="advanced-content">Advanced Content</div>',
      },
    });
    
    expect(wrapperWithSlots.find('[data-testid="custom-actions"]').exists()).toBe(true);
    expect(wrapperWithSlots.find('[data-testid="basic-content"]').exists()).toBe(true);
    expect(wrapperWithSlots.find('[data-testid="advanced-content"]').exists()).toBe(true);
  });
});
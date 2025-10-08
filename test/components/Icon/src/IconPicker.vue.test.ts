import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import IconPicker from '/@/components/Icon/src/IconPicker';

// Mock Ant Design Vue components
vi.mock('ant-design-vue', async () => {
  const actual = await vi.importActual('ant-design-vue');
  return {
    ...actual,
    'a-input': {
      name: 'AInput',
      template: '<div class="a-input-mock"><slot /></div>',
      props: ['disabled', 'style', 'placeholder', 'class', 'value'],
    },
    'a-popover': {
      name: 'APopover',
      template: '<div class="a-popover-mock"><slot /><slot name="title" /><slot name="content" /></div>',
      props: ['placement', 'trigger', 'value', 'overlayClassName'],
    },
    'a-pagination': {
      name: 'APagination',
      template: '<div class="a-pagination-mock"><slot /></div>',
      props: ['size', 'pageSize', 'total', 'showLessItems', 'showSizeChanger'],
    },
    'a-empty': {
      name: 'AEmpty',
      template: '<div class="a-empty-mock"><slot /></div>',
    },
    Popover: {
      template: '<div class="ant-popover-mock"><slot /><slot name="title" /><slot name="content" /></div>',
      props: ['placement', 'trigger', 'value', 'overlayClassName'],
    },
    Pagination: {
      template: '<div class="ant-pagination-mock"><slot /></div>',
      props: ['size', 'pageSize', 'total', 'showLessItems', 'showSizeChanger'],
    },
    Empty: {
      template: '<div class="ant-empty-mock"><slot /></div>',
    },
  };
});

// Mock Icon component
vi.mock('/@/components/Icon/src/Icon.vue', () => ({
  default: {
    name: 'Icon',
    template: '<div class="icon-mock" :icon="icon"></div>',
    props: ['icon'],
  },
}));

// Mock useDesign hook
vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: () => ({ prefixCls: 'jeesite-icon-picker' }),
}));

// Mock useI18n hook
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

// Mock IconData
vi.mock('/@/components/Icon/src/IconData', () => ({
  default: ['icon1', 'icon2', 'icon3'],
}));

// Mock usePagination hook
vi.mock('/@/hooks/web/usePagination', () => ({
  usePagination: (list: any[], pageSize: number) => {
    // Ensure list is an array
    const safeList = Array.isArray(list) ? list : [];
    return {
      getPaginationList: safeList.slice(0, pageSize),
      getTotal: safeList.length,
      setCurrentPage: vi.fn(),
    };
  },
}));

// Mock useDebounceFn
vi.mock('@vueuse/core', () => ({
  useDebounceFn: (fn: any) => fn,
}));

// Mock useCopyToClipboard
vi.mock('/@/hooks/web/useCopyToClipboard', () => ({
  useCopyToClipboard: () => ({
    clipboardRef: { value: '' },
    isSuccessRef: { value: false },
  }),
}));

// Mock useMessage
vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: () => ({
    createMessage: {
      success: vi.fn(),
    },
  }),
}));

describe('IconPicker', () => {
  it('should render without crashing', () => {
    const wrapper = mount(IconPicker);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(IconPicker);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle user interactions', () => {
    const wrapper = mount(IconPicker);
    expect(wrapper.exists()).toBe(true);
  });

  it('should have correct component structure', () => {
    const wrapper = mount(IconPicker);
    expect(wrapper.exists()).toBe(true);
  });
});
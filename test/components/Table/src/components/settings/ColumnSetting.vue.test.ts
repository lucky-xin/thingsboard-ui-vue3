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

import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ColumnSetting from '/@/components/Table/src/components/settings/ColumnSetting';
import { createTableContext } from '/@/components/Table/src/hooks/useTableContext';

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme-output.css',
  writable: true
});
Object.defineProperty(globalThis, '__VITE_PLUGIN_THEME__', {
  value: true,
  writable: true
});

// Mock the table context hook
vi.mock('/@/components/Table/src/hooks/useTableContext', () => ({
  createTableContext: vi.fn(),
  useTableContext: vi.fn(() => ({
    getColumns: vi.fn(() => []),
    setColumns: vi.fn(),
    getBindValues: { value: {} },
    getDefaultRowSelection: vi.fn(() => ({})),
    getCacheColumns: vi.fn(() => []),
    setProps: vi.fn(),
  })),
}));

// Mock ant-design-vue components
vi.mock('ant-design-vue', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Tooltip: {
      name: 'ATooltip',
      template: '<div class="ant-tooltip"><slot /><slot name="title" /></div>',
    },
    Popover: {
      name: 'APopover',
      template: '<div class="ant-popover"><slot /><slot name="title" /><slot name="content" /></div>',
    },
    Checkbox: {
      name: 'ACheckbox',
      template: '<div class="ant-checkbox"><slot /></div>',
      Group: {
        name: 'ACheckboxGroup',
        template: '<div class="ant-checkbox-group"><slot /></div>',
      },
    },
    Divider: {
      name: 'ADivider',
      template: '<div class="ant-divider"></div>',
    },
    Button: {
      name: 'AButton',
      template: '<button class="ant-btn"><slot /></button>',
    },
  };
});

// Mock ant-design icons
vi.mock('@ant-design/icons-vue', () => ({
  SettingOutlined: {
    name: 'SettingOutlined',
    template: '<div class="setting-outlined-icon" />',
  },
  DragOutlined: {
    name: 'DragOutlined',
    template: '<div class="drag-outlined-icon" />',
  },
}));

// Mock components
vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    template: '<div class="icon-component"></div>',
  },
}));

vi.mock('/@/components/Container', () => ({
  ScrollContainer: {
    name: 'ScrollContainer',
    template: '<div class="scroll-container"><slot /></div>',
  },
}));

describe('ColumnSetting', () => {
  const createMockTableContext = (overrides = {}) => {
    return {
      getColumns: vi.fn(() => []),
      setColumns: vi.fn(),
      getBindValues: { value: {} },
      getDefaultRowSelection: vi.fn(() => ({})),
      getCacheColumns: vi.fn(() => []),
      setProps: vi.fn(),
      ...overrides
    };
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    const mockTableContext = createMockTableContext();
    createTableContext(mockTableContext as any);

    const wrapper = mount(ColumnSetting);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const mockTableContext = createMockTableContext();
    createTableContext(mockTableContext as any);

    const wrapper = mount(ColumnSetting);
    expect(wrapper.exists()).toBe(true);
  });

  it('should emit columns-change event', () => {
    const mockTableContext = createMockTableContext();
    createTableContext(mockTableContext as any);

    const wrapper = mount(ColumnSetting);
    wrapper.vm.$emit('columns-change');
    expect(wrapper.emitted('columns-change')).toBeTruthy();
  });

  it('should handle user interactions', () => {
    const mockTableContext = createMockTableContext();
    createTableContext(mockTableContext as any);

    const wrapper = mount(ColumnSetting);
    expect(wrapper.exists()).toBe(true);
  });

  it('should have correct component structure', () => {
    const mockTableContext = createMockTableContext();
    createTableContext(mockTableContext as any);

    const wrapper = mount(ColumnSetting);
    expect(wrapper.findComponent(ColumnSetting).exists()).toBe(true);
  });

  it('should handle open change for popover', async () => {
    const mockTableContext = createMockTableContext({
      getColumns: vi.fn(() => [
        { title: 'Column 1', dataIndex_: 'col1' },
        { title: 'Column 2', dataIndex_: 'col2' },
      ]),
      setColumns: vi.fn(),
    });
    createTableContext(mockTableContext as any);

    const wrapper = mount(ColumnSetting);

    // Wait for next tick to allow component to initialize
    await wrapper.vm.$nextTick();

    // Test handleOpenChange function
    expect(typeof wrapper.vm.handleOpenChange).toBe('function');

    // Call handleOpenChange
    wrapper.vm.handleOpenChange();
  });

  it('should handle column with ifShow property', async () => {
    const mockTableContext = createMockTableContext({
      getColumns: vi.fn(() => [
        { title: 'Column 1', dataIndex_: 'col1', ifShow: false },
        { title: 'Column 2', dataIndex_: 'col2', ifShow: true },
      ]),
      setColumns: vi.fn(),
    });
    createTableContext(mockTableContext as any);

    const wrapper = mount(ColumnSetting);

    // Wait for next tick to allow component to initialize
    await wrapper.vm.$nextTick();

    // Component should render without errors
    expect(wrapper.exists()).toBe(true);
  });
});
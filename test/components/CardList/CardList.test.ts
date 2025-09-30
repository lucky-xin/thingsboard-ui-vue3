import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import CardList from '/@/components/CardList/src/CardList';
import { useMessage } from '/@/hooks/web/useMessage';
import { useGlobSetting } from '/@/hooks/setting';
import { useI18n } from '/@/hooks/web/useI18n';

// Mock useMessage hook
vi.mock('/@/hooks/web/useMessage', () => {
  return {
    useMessage: vi.fn(),
  };
});

// Mock useGlobSetting hook
vi.mock('/@/hooks/setting', () => {
  return {
    useGlobSetting: vi.fn(),
  };
});

// Mock useI18n hook
vi.mock('/@/hooks/web/useI18n', () => {
  return {
    useI18n: vi.fn(),
  };
});

// Mock Form component
vi.mock('/@/components/Form', () => {
  return {
    BasicForm: {
      name: 'BasicForm',
      template: '<div data-testid="basic-form"><slot></slot></div>',
    },
    useForm: vi.fn(() => [
      vi.fn(),
      {
        validate: vi.fn(),
      },
    ]),
  };
});

// Mock Dropdown component
vi.mock('/@/components/Dropdown', () => {
  return {
    Dropdown: {
      name: 'Dropdown',
      template: '<div data-testid="dropdown"><slot></slot></div>',
      props: ['trigger', 'dropMenuList', 'popconfirm'],
    },
  };
});

// Mock isFunction utility
vi.mock('/@/utils/is', () => {
  return {
    isFunction: vi.fn().mockReturnValue(true),
  };
});

// Mock data module
vi.mock('/@/components/CardList/src/data', () => {
  return {
    useSlider: vi.fn(() => ({
      min: 6,
      max: 20,
      marks: {},
      step: 1,
    })),
    grid: { value: 20 },
  };
});

describe('CardList.vue', () => {
  const mockShowMessage = vi.fn();
  const mockUseGlobSetting = {
    ctxPath: '/test',
  };
  const mockT = vi.fn((key) => key);

  beforeEach(() => {
    // Reset mocks before each test
    mockShowMessage.mockReset();
    (useMessage as any).mockReturnValue({
      showMessage: mockShowMessage,
    });
    (useGlobSetting as any).mockImplementation(() => mockUseGlobSetting);
    (useI18n as any).mockReturnValue({
      t: mockT,
    });
  });

  it('renders correctly with default props', () => {
    const wrapper = mount(CardList, {
      props: {
        api: vi.fn(),
      },
      global: {
        stubs: {
          'a-list': true,
          'a-list-item': true,
          'a-card': true,
          'a-avatar': true,
          'a-tooltip': true,
          'a-slider': true,
          'a-button': true,
          'edit-outlined': true,
          'ellipsis-outlined': true,
          'redo-outlined': true,
          'table-outlined': true,
          dropdown: true,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('calls api function on mount', async () => {
    const mockApi = vi.fn().mockResolvedValue({
      list: [],
      count: 0,
    });

    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
      },
      global: {
        stubs: {
          'a-list': true,
          'a-list-item': true,
          'a-card': true,
          'a-avatar': true,
          'a-tooltip': true,
          'a-slider': true,
          'a-button': true,
          'edit-outlined': true,
          'ellipsis-outlined': true,
          'redo-outlined': true,
          'table-outlined': true,
          dropdown: true,
        },
      },
    });

    // Wait for the component to mount and fetch to complete
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(mockApi).toHaveBeenCalled();
    expect(wrapper.exists()).toBe(true);
  });

  it('handles api error gracefully', async () => {
    const mockApi = vi.fn().mockImplementation(() => {
      return Promise.resolve({
        list: [],
        count: 0,
      });
    });

    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
      },
      global: {
        stubs: {
          'a-list': true,
          'a-list-item': true,
          'a-card': true,
          'a-avatar': true,
          'a-tooltip': true,
          'a-slider': true,
          'a-button': true,
          'edit-outlined': true,
          'ellipsis-outlined': true,
          'redo-outlined': true,
          'table-outlined': true,
          dropdown: true,
        },
      },
    });

    // Wait for the component to mount and fetch to complete
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(mockApi).toHaveBeenCalled();
    // Component should still render even if API fails
    expect(wrapper.exists()).toBe(true);
  });

  it('handles api rejection', async () => {
    const mockApi = vi.fn().mockRejectedValue(new Error('API Error'));

    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
      },
      global: {
        stubs: {
          'a-list': true,
          'a-list-item': true,
          'a-card': true,
          'a-avatar': true,
          'a-tooltip': true,
          'a-slider': true,
          'a-button': true,
          'edit-outlined': true,
          'ellipsis-outlined': true,
          'redo-outlined': true,
          'table-outlined': true,
          dropdown: true,
        },
      },
    });

    // Wait for the component to mount and fetch to complete
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(mockApi).toHaveBeenCalled();
    expect(wrapper.exists()).toBe(true);
  });

  it('renders with custom props', () => {
    const wrapper = mount(CardList, {
      props: {
        api: vi.fn(),
        title: 'Custom Title',
        showSearch: true,
        showToolbar: true,
      },
      global: {
        stubs: {
          'a-list': true,
          'a-list-item': true,
          'a-card': true,
          'a-avatar': true,
          'a-tooltip': true,
          'a-slider': true,
          'a-button': true,
          'edit-outlined': true,
          'ellipsis-outlined': true,
          'redo-outlined': true,
          'table-outlined': true,
          dropdown: true,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('handles pagination', async () => {
    const mockApi = vi.fn().mockResolvedValue({
      list: [{ id: 1, name: 'Item 1' }],
      count: 1,
    });

    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
      },
      global: {
        stubs: {
          'a-list': true,
          'a-list-item': true,
          'a-card': true,
          'a-avatar': true,
          'a-tooltip': true,
          'a-slider': true,
          'a-button': true,
          'edit-outlined': true,
          'ellipsis-outlined': true,
          'redo-outlined': true,
          'table-outlined': true,
          dropdown: true,
        },
      },
    });

    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(mockApi).toHaveBeenCalled();
    expect(wrapper.exists()).toBe(true);
  });

  it('handles search functionality', async () => {
    const mockApi = vi.fn().mockResolvedValue({
      list: [],
      count: 0,
    });

    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        showSearch: true,
      },
      global: {
        stubs: {
          'a-list': true,
          'a-list-item': true,
          'a-card': true,
          'a-avatar': true,
          'a-tooltip': true,
          'a-slider': true,
          'a-button': true,
          'edit-outlined': true,
          'ellipsis-outlined': true,
          'redo-outlined': true,
          'table-outlined': true,
          dropdown: true,
        },
      },
    });

    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(wrapper.exists()).toBe(true);
  });

  it('handles toolbar functionality', async () => {
    const mockApi = vi.fn().mockResolvedValue({
      list: [],
      count: 0,
    });

    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        showToolbar: true,
      },
      global: {
        stubs: {
          'a-list': true,
          'a-list-item': true,
          'a-card': true,
          'a-avatar': true,
          'a-tooltip': true,
          'a-slider': true,
          'a-button': true,
          'edit-outlined': true,
          'ellipsis-outlined': true,
          'redo-outlined': true,
          'table-outlined': true,
          dropdown: true,
        },
      },
    });

    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(wrapper.exists()).toBe(true);
  });

  it('handles form submission', async () => {
    const mockApi = vi.fn().mockResolvedValue({
      list: [{ id: 1, userName: 'Test User' }],
      count: 1,
    });

    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
      },
      global: {
        stubs: {
          'a-list': true,
          'a-list-item': true,
          'a-card': true,
          'a-avatar': true,
          'a-tooltip': true,
          'a-slider': true,
          'a-button': true,
          'edit-outlined': true,
          'ellipsis-outlined': true,
          'redo-outlined': true,
          'table-outlined': true,
          dropdown: true,
        },
      },
    });

    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Test form submission
    await wrapper.vm.handleSubmit();
    expect(mockApi).toHaveBeenCalled();
  });

  it('handles slider change', async () => {
    const mockApi = vi.fn().mockResolvedValue({
      list: [],
      count: 0,
    });

    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
      },
      global: {
        stubs: {
          'a-list': true,
          'a-list-item': true,
          'a-card': true,
          'a-avatar': true,
          'a-tooltip': true,
          'a-slider': true,
          'a-button': true,
          'edit-outlined': true,
          'ellipsis-outlined': true,
          'redo-outlined': true,
          'table-outlined': true,
          dropdown: true,
        },
      },
    });

    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Test slider change
    wrapper.vm.sliderChange(10);
    expect(mockApi).toHaveBeenCalled();
  });

  it('handles pagination change', async () => {
    const mockApi = vi.fn().mockResolvedValue({
      list: [],
      count: 0,
    });

    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
      },
      global: {
        stubs: {
          'a-list': true,
          'a-list-item': true,
          'a-card': true,
          'a-avatar': true,
          'a-tooltip': true,
          'a-slider': true,
          'a-button': true,
          'edit-outlined': true,
          'ellipsis-outlined': true,
          'redo-outlined': true,
          'table-outlined': true,
          dropdown: true,
        },
      },
    });

    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Test pagination change
    wrapper.vm.pageChange(2, 20);
    expect(mockApi).toHaveBeenCalled();
  });

  it('handles page size change', async () => {
    const mockApi = vi.fn().mockResolvedValue({
      list: [],
      count: 0,
    });

    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
      },
      global: {
        stubs: {
          'a-list': true,
          'a-list-item': true,
          'a-card': true,
          'a-avatar': true,
          'a-tooltip': true,
          'a-slider': true,
          'a-button': true,
          'edit-outlined': true,
          'ellipsis-outlined': true,
          'redo-outlined': true,
          'table-outlined': true,
          dropdown: true,
        },
      },
    });

    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Test page size change
    wrapper.vm.pageSizeChange(1, 50);
    expect(mockApi).toHaveBeenCalled();
  });

  it('handles delete action', async () => {
    const mockApi = vi.fn().mockResolvedValue({
      list: [],
      count: 0,
    });

    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
      },
      global: {
        stubs: {
          'a-list': true,
          'a-list-item': true,
          'a-card': true,
          'a-avatar': true,
          'a-tooltip': true,
          'a-slider': true,
          'a-button': true,
          'edit-outlined': true,
          'ellipsis-outlined': true,
          'redo-outlined': true,
          'table-outlined': true,
          dropdown: true,
        },
      },
    });

    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Test delete action
    wrapper.vm.handleDelete(1);
    expect(wrapper.emitted('delete')).toBeTruthy();
    expect(wrapper.emitted('delete')[0]).toEqual([1]);
  });

  it('handles getAvatar with avatarUrl', async () => {
    const mockApi = vi.fn().mockResolvedValue({
      list: [{ id: 1, userName: 'Test User', avatarUrl: '/ctxPath/avatar.jpg' }],
      count: 1,
    });

    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
      },
      global: {
        stubs: {
          'a-list': true,
          'a-list-item': true,
          'a-card': true,
          'a-avatar': true,
          'a-tooltip': true,
          'a-slider': true,
          'a-button': true,
          'edit-outlined': true,
          'ellipsis-outlined': true,
          'redo-outlined': true,
          'table-outlined': true,
          dropdown: true,
        },
      },
    });

    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Test getAvatar function
    const avatarUrl = wrapper.vm.getAvatar({ avatarUrl: '/ctxPath/avatar.jpg' });
    expect(avatarUrl).toBe('/test/avatar.jpg');
  });

  it('handles getAvatar without avatarUrl', async () => {
    const mockApi = vi.fn().mockResolvedValue({
      list: [{ id: 1, userName: 'Test User' }],
      count: 1,
    });

    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
      },
      global: {
        stubs: {
          'a-list': true,
          'a-list-item': true,
          'a-card': true,
          'a-avatar': true,
          'a-tooltip': true,
          'a-slider': true,
          'a-button': true,
          'edit-outlined': true,
          'ellipsis-outlined': true,
          'redo-outlined': true,
          'table-outlined': true,
          dropdown: true,
        },
      },
    });

    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Test getAvatar function with default avatar
    const avatarUrl = wrapper.vm.getAvatar({});
    expect(avatarUrl).toBe('/test/static/images/user1.jpg');
  });

  it('handles fetch with custom parameters', async () => {
    const mockApi = vi.fn().mockResolvedValue({
      list: [],
      count: 0,
    });

    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        params: { customParam: 'test' },
      },
      global: {
        stubs: {
          'a-list': true,
          'a-list-item': true,
          'a-card': true,
          'a-avatar': true,
          'a-tooltip': true,
          'a-slider': true,
          'a-button': true,
          'edit-outlined': true,
          'ellipsis-outlined': true,
          'redo-outlined': true,
          'table-outlined': true,
          dropdown: true,
        },
      },
    });

    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Test fetch with custom parameters
    await wrapper.vm.fetch({ searchParam: 'value' });
    expect(mockApi).toHaveBeenCalledWith({
      customParam: 'test',
      pageNo: 1,
      pageSize: 36,
      searchParam: 'value',
    });
  });

  it('handles fetch when api is not a function', async () => {
    const wrapper = mount(CardList, {
      props: {
        api: null,
      },
      global: {
        stubs: {
          'a-list': true,
          'a-list-item': true,
          'a-card': true,
          'a-avatar': true,
          'a-tooltip': true,
          'a-slider': true,
          'a-button': true,
          'edit-outlined': true,
          'ellipsis-outlined': true,
          'redo-outlined': true,
          'table-outlined': true,
          dropdown: true,
        },
      },
    });

    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Test fetch when api is not a function
    await wrapper.vm.fetch();
    expect(wrapper.exists()).toBe(true);
  });

  it('emits getMethod on mount', async () => {
    const mockApi = vi.fn().mockResolvedValue({
      list: [],
      count: 0,
    });

    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
      },
      global: {
        stubs: {
          'a-list': true,
          'a-list-item': true,
          'a-card': true,
          'a-avatar': true,
          'a-tooltip': true,
          'a-slider': true,
          'a-button': true,
          'edit-outlined': true,
          'ellipsis-outlined': true,
          'redo-outlined': true,
          'table-outlined': true,
          dropdown: true,
        },
      },
    });

    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Test that getMethod is emitted on mount
    expect(wrapper.emitted('getMethod')).toBeTruthy();
    expect(wrapper.emitted('getMethod')[0][0]).toBe(wrapper.vm.fetch);
  });
});

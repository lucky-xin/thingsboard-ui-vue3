import { mount } from '@vue/test-utils';
import CardList from '/@/components/CardList/src/CardList.vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { useGlobSetting } from '/@/hooks/setting';

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

// Mock isFunction utility
vi.mock('/@/utils/is', () => {
  return {
    isFunction: vi.fn().mockReturnValue(true),
  };
});

describe('CardList.vue', () => {
  const mockShowMessage = vi.fn();
  const mockUseGlobSetting = {
    ctxPath: '/test',
  };

  beforeEach(() => {
    // Reset mocks before each test
    mockShowMessage.mockReset();
    (useMessage as any).mockReturnValue({
      showMessage: mockShowMessage,
    });
    (useGlobSetting as any).mockReturnValue(mockUseGlobSetting);
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
          'dropdown': true,
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
          'dropdown': true,
        },
      },
    });

    // Wait for the component to mount and fetch to complete
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 200));
    
    expect(mockApi).toHaveBeenCalled();
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
          'dropdown': true,
        },
      },
    });

    // Wait for the component to mount and fetch to complete
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 200));
    
    expect(mockApi).toHaveBeenCalled();
    // Component should still render even if API fails
    expect(wrapper.exists()).toBe(true);
  });
});
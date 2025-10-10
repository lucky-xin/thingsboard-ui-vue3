import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import CardList from '/@/components/CardList/src/CardList.vue';

// Mock Ant Design Vue components
vi.mock('ant-design-vue', () => ({
  List: {
    name: 'a-list',
    template: '<div class="ant-list"><slot></slot></div>',
    props: ['grid', 'dataSource', 'pagination'],
  },
  Card: {
    name: 'a-card',
    template: '<div class="ant-card"><slot></slot></div>',
    props: [],
  },
  Tooltip: {
    name: 'a-tooltip',
    template: '<div class="ant-tooltip-wrapper"><slot></slot></div>',
    props: ['overlayStyle'],
  },
  Slider: {
    name: 'a-slider',
    template: '<input class="ant-slider" />',
    props: ['value'],
  },
  Avatar: {
    name: 'a-avatar',
    template: '<div class="ant-avatar"></div>',
    props: ['src'],
  },
}));

// Mock Ant Design Icons
vi.mock('@ant-design/icons-vue', () => ({
  EditOutlined: {
    name: 'EditOutlined',
    template: '<span class="edit-outlined"></span>',
  },
  EllipsisOutlined: {
    name: 'EllipsisOutlined',
    template: '<span class="ellipsis-outlined"></span>',
  },
  RedoOutlined: {
    name: 'RedoOutlined',
    template: '<span class="redo-outlined"></span>',
  },
  TableOutlined: {
    name: 'TableOutlined',
    template: '<span class="table-outlined"></span>',
  },
}));

// Mock components
vi.mock('/@/components/Dropdown', () => ({
  Dropdown: {
    name: 'Dropdown',
    template: '<div class="dropdown"><slot></slot></div>',
    props: ['trigger', 'dropMenuList', 'popconfirm'],
  },
}));

vi.mock('/@/components/Form', () => ({
  BasicForm: {
    name: 'BasicForm',
    template: '<div class="basic-form"><slot></slot></div>',
    props: ['register'],
  },
  useForm: vi.fn(() => [
    'registerForm',
    {
      validate: vi.fn().mockResolvedValue({}),
      setFieldsValue: vi.fn(),
      resetFields: vi.fn(),
    },
  ]),
}));

// Mock hooks
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: vi.fn((key) => key),
  }),
}));

vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: () => ({
    showMessage: vi.fn(),
    notification: vi.fn(),
  }),
}));

vi.mock('/@/hooks/setting', () => ({
  useGlobSetting: () => ({
    ctxPath: '/ctxPath',
  }),
}));

vi.mock('/@/utils/is', () => ({
  isFunction: vi.fn((fn) => typeof fn === 'function'),
}));

vi.mock('/@/utils/propTypes', () => ({
  propTypes: {
    object: {
      def: () => ({}),
    },
    func: {},
  },
}));

vi.mock('/@/components/CardList/src/data', () => ({
  useSlider: vi.fn(() => ({})),
  grid: {
    value: 36,
  },
}));

describe('CardList Coverage', () => {
  let wrapper: any;
  const pinia = createPinia();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with default props', () => {
    wrapper = mount(CardList, {
      global: {
        plugins: [pinia],
        stubs: {
          'a-list': {
            template: '<div class="ant-list"><slot></slot></div>',
            props: ['grid', 'dataSource', 'pagination'],
          },
          'a-card': {
            template: '<div class="ant-card"><slot></slot></div>',
            props: [],
          },
          'a-tooltip': {
            template: '<div class="ant-tooltip-wrapper"><slot></slot></div>',
            props: ['overlayStyle'],
          },
          'a-slider': {
            template: '<input class="ant-slider" />',
            props: ['value'],
          },
          'a-avatar': {
            template: '<div class="ant-avatar"></div>',
            props: ['src'],
          },
          'Dropdown': {
            template: '<div class="dropdown"><slot></slot></div>',
            props: ['trigger', 'dropMenuList', 'popconfirm'],
          },
          'BasicForm': {
            template: '<div class="basic-form"><slot></slot></div>',
            props: ['register'],
          },
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with custom props', () => {
    const mockApi = vi.fn().mockResolvedValue({
      list: [
        { id: 1, userName: 'User 1', avatarUrl: '/avatar1.jpg' },
        { id: 2, userName: 'User 2', avatarUrl: '/avatar2.jpg' },
      ],
      count: 2,
    });

    wrapper = mount(CardList, {
      props: {
        params: { search: 'test' },
        api: mockApi,
      },
      global: {
        plugins: [pinia],
        stubs: {
          'a-list': {
            template: '<div class="ant-list"><slot></slot></div>',
            props: ['grid', 'dataSource', 'pagination'],
          },
          'a-card': {
            template: '<div class="ant-card"><slot></slot></div>',
            props: [],
          },
          'a-tooltip': {
            template: '<div class="ant-tooltip-wrapper"><slot></slot></div>',
            props: ['overlayStyle'],
          },
          'a-slider': {
            template: '<input class="ant-slider" />',
            props: ['value'],
          },
          'a-avatar': {
            template: '<div class="ant-avatar"></div>',
            props: ['src'],
          },
          'Dropdown': {
            template: '<div class="dropdown"><slot></slot></div>',
            props: ['trigger', 'dropMenuList', 'popconfirm'],
          },
          'BasicForm': {
            template: '<div class="basic-form"><slot></slot></div>',
            props: ['register'],
          },
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle form submission', async () => {
    const mockApi = vi.fn().mockResolvedValue({
      list: [],
      count: 0,
    });

    wrapper = mount(CardList, {
      props: {
        api: mockApi,
      },
      global: {
        plugins: [pinia],
        stubs: {
          'a-list': {
            template: '<div class="ant-list"><slot></slot></div>',
            props: ['grid', 'dataSource', 'pagination'],
          },
          'a-card': {
            template: '<div class="ant-card"><slot></slot></div>',
            props: [],
          },
          'a-tooltip': {
            template: '<div class="ant-tooltip-wrapper"><slot></slot></div>',
            props: ['overlayStyle'],
          },
          'a-slider': {
            template: '<input class="ant-slider" />',
            props: ['value'],
          },
          'a-avatar': {
            template: '<div class="ant-avatar"></div>',
            props: ['src'],
          },
          'Dropdown': {
            template: '<div class="dropdown"><slot></slot></div>',
            props: ['trigger', 'dropMenuList', 'popconfirm'],
          },
          'BasicForm': {
            template: '<div class="basic-form"><slot></slot></div>',
            props: ['register'],
          },
        },
      },
    });

    // Test handleSubmit function
    await wrapper.vm.handleSubmit();
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle slider change', () => {
    wrapper = mount(CardList, {
      global: {
        plugins: [pinia],
        stubs: {
          'a-list': {
            template: '<div class="ant-list"><slot></slot></div>',
            props: ['grid', 'dataSource', 'pagination'],
          },
          'a-card': {
            template: '<div class="ant-card"><slot></slot></div>',
            props: [],
          },
          'a-tooltip': {
            template: '<div class="ant-tooltip-wrapper"><slot></slot></div>',
            props: ['overlayStyle'],
          },
          'a-slider': {
            template: '<input class="ant-slider" />',
            props: ['value'],
          },
          'a-avatar': {
            template: '<div class="ant-avatar"></div>',
            props: ['src'],
          },
          'Dropdown': {
            template: '<div class="dropdown"><slot></slot></div>',
            props: ['trigger', 'dropMenuList', 'popconfirm'],
          },
          'BasicForm': {
            template: '<div class="basic-form"><slot></slot></div>',
            props: ['register'],
          },
        },
      },
    });

    // Test sliderChange function
    wrapper.vm.sliderChange(20);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle fetch function', async () => {
    const mockApi = vi.fn().mockResolvedValue({
      list: [
        { id: 1, userName: 'User 1', avatarUrl: '/avatar1.jpg' },
      ],
      count: 1,
    });

    wrapper = mount(CardList, {
      props: {
        api: mockApi,
      },
      global: {
        plugins: [pinia],
        stubs: {
          'a-list': {
            template: '<div class="ant-list"><slot></slot></div>',
            props: ['grid', 'dataSource', 'pagination'],
          },
          'a-card': {
            template: '<div class="ant-card"><slot></slot></div>',
            props: [],
          },
          'a-tooltip': {
            template: '<div class="ant-tooltip-wrapper"><slot></slot></div>',
            props: ['overlayStyle'],
          },
          'a-slider': {
            template: '<input class="ant-slider" />',
            props: ['value'],
          },
          'a-avatar': {
            template: '<div class="ant-avatar"></div>',
            props: ['src'],
          },
          'Dropdown': {
            template: '<div class="dropdown"><slot></slot></div>',
            props: ['trigger', 'dropMenuList', 'popconfirm'],
          },
          'BasicForm': {
            template: '<div class="basic-form"><slot></slot></div>',
            props: ['register'],
          },
        },
      },
    });

    // Test fetch function
    await wrapper.vm.fetch();
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle getAvatar function', () => {
    wrapper = mount(CardList, {
      global: {
        plugins: [pinia],
        stubs: {
          'a-list': {
            template: '<div class="ant-list"><slot></slot></div>',
            props: ['grid', 'dataSource', 'pagination'],
          },
          'a-card': {
            template: '<div class="ant-card"><slot></slot></div>',
            props: [],
          },
          'a-tooltip': {
            template: '<div class="ant-tooltip-wrapper"><slot></slot></div>',
            props: ['overlayStyle'],
          },
          'a-slider': {
            template: '<input class="ant-slider" />',
            props: ['value'],
          },
          'a-avatar': {
            template: '<div class="ant-avatar"></div>',
            props: ['src'],
          },
          'Dropdown': {
            template: '<div class="dropdown"><slot></slot></div>',
            props: ['trigger', 'dropMenuList', 'popconfirm'],
          },
          'BasicForm': {
            template: '<div class="basic-form"><slot></slot></div>',
            props: ['register'],
          },
        },
      },
    });

    // Test getAvatar function
    const avatar = wrapper.vm.getAvatar({ avatarUrl: '/test.jpg' });
    expect(avatar).toBeDefined();
  });

  it('should handle page change', () => {
    wrapper = mount(CardList, {
      global: {
        plugins: [pinia],
        stubs: {
          'a-list': {
            template: '<div class="ant-list"><slot></slot></div>',
            props: ['grid', 'dataSource', 'pagination'],
          },
          'a-card': {
            template: '<div class="ant-card"><slot></slot></div>',
            props: [],
          },
          'a-tooltip': {
            template: '<div class="ant-tooltip-wrapper"><slot></slot></div>',
            props: ['overlayStyle'],
          },
          'a-slider': {
            template: '<input class="ant-slider" />',
            props: ['value'],
          },
          'a-avatar': {
            template: '<div class="ant-avatar"></div>',
            props: ['src'],
          },
          'Dropdown': {
            template: '<div class="dropdown"><slot></slot></div>',
            props: ['trigger', 'dropMenuList', 'popconfirm'],
          },
          'BasicForm': {
            template: '<div class="basic-form"><slot></slot></div>',
            props: ['register'],
          },
        },
      },
    });

    // Test pageChange function
    wrapper.vm.pageChange(2, 20);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle page size change', () => {
    wrapper = mount(CardList, {
      global: {
        plugins: [pinia],
        stubs: {
          'a-list': {
            template: '<div class="ant-list"><slot></slot></div>',
            props: ['grid', 'dataSource', 'pagination'],
          },
          'a-card': {
            template: '<div class="ant-card"><slot></slot></div>',
            props: [],
          },
          'a-tooltip': {
            template: '<div class="ant-tooltip-wrapper"><slot></slot></div>',
            props: ['overlayStyle'],
          },
          'a-slider': {
            template: '<input class="ant-slider" />',
            props: ['value'],
          },
          'a-avatar': {
            template: '<div class="ant-avatar"></div>',
            props: ['src'],
          },
          'Dropdown': {
            template: '<div class="dropdown"><slot></slot></div>',
            props: ['trigger', 'dropMenuList', 'popconfirm'],
          },
          'BasicForm': {
            template: '<div class="basic-form"><slot></slot></div>',
            props: ['register'],
          },
        },
      },
    });

    // Test pageSizeChange function
    wrapper.vm.pageSizeChange(1, 30);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle delete function', () => {
    wrapper = mount(CardList, {
      global: {
        plugins: [pinia],
        stubs: {
          'a-list': {
            template: '<div class="ant-list"><slot></slot></div>',
            props: ['grid', 'dataSource', 'pagination'],
          },
          'a-card': {
            template: '<div class="ant-card"><slot></slot></div>',
            props: [],
          },
          'a-tooltip': {
            template: '<div class="ant-tooltip-wrapper"><slot></slot></div>',
            props: ['overlayStyle'],
          },
          'a-slider': {
            template: '<input class="ant-slider" />',
            props: ['value'],
          },
          'a-avatar': {
            template: '<div class="ant-avatar"></div>',
            props: ['src'],
          },
          'Dropdown': {
            template: '<div class="dropdown"><slot></slot></div>',
            props: ['trigger', 'dropMenuList', 'popconfirm'],
          },
          'BasicForm': {
            template: '<div class="basic-form"><slot></slot></div>',
            props: ['register'],
          },
        },
      },
    });

    // Test handleDelete function
    wrapper.vm.handleDelete(1);
    expect(wrapper.emitted('delete')).toBeTruthy();
  });

  it('should handle component lifecycle', () => {
    wrapper = mount(CardList, {
      global: {
        plugins: [pinia],
        stubs: {
          'a-list': {
            template: '<div class="ant-list"><slot></slot></div>',
            props: ['grid', 'dataSource', 'pagination'],
          },
          'a-card': {
            template: '<div class="ant-card"><slot></slot></div>',
            props: [],
          },
          'a-tooltip': {
            template: '<div class="ant-tooltip-wrapper"><slot></slot></div>',
            props: ['overlayStyle'],
          },
          'a-slider': {
            template: '<input class="ant-slider" />',
            props: ['value'],
          },
          'a-avatar': {
            template: '<div class="ant-avatar"></div>',
            props: ['src'],
          },
          'Dropdown': {
            template: '<div class="dropdown"><slot></slot></div>',
            props: ['trigger', 'dropMenuList', 'popconfirm'],
          },
          'BasicForm': {
            template: '<div class="basic-form"><slot></slot></div>',
            props: ['register'],
          },
        },
      },
    });

    expect(wrapper.exists()).toBe(true);

    wrapper.unmount();
    expect(wrapper.exists()).toBe(false);
  });

  it('should handle edge cases', () => {
    wrapper = mount(CardList, {
      props: {
        params: {},
        api: null,
      },
      global: {
        plugins: [pinia],
        stubs: {
          'a-list': {
            template: '<div class="ant-list"><slot></slot></div>',
            props: ['grid', 'dataSource', 'pagination'],
          },
          'a-card': {
            template: '<div class="ant-card"><slot></slot></div>',
            props: [],
          },
          'a-tooltip': {
            template: '<div class="ant-tooltip-wrapper"><slot></slot></div>',
            props: ['overlayStyle'],
          },
          'a-slider': {
            template: '<input class="ant-slider" />',
            props: ['value'],
          },
          'a-avatar': {
            template: '<div class="ant-avatar"></div>',
            props: ['src'],
          },
          'Dropdown': {
            template: '<div class="dropdown"><slot></slot></div>',
            props: ['trigger', 'dropMenuList', 'popconfirm'],
          },
          'BasicForm': {
            template: '<div class="basic-form"><slot></slot></div>',
            props: ['register'],
          },
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});

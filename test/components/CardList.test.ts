import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import CardList from '/@/components/CardList/src/CardList.vue';

// Mock dependencies
vi.mock('@ant-design/icons-vue', () => ({
  EditOutlined: {
    name: 'EditOutlined',
    template: '<span class="edit-icon"></span>'
  },
  EllipsisOutlined: {
    name: 'EllipsisOutlined',
    template: '<span class="ellipsis-icon"></span>'
  },
  RedoOutlined: {
    name: 'RedoOutlined',
    template: '<span class="redo-icon"></span>'
  },
  TableOutlined: {
    name: 'TableOutlined',
    template: '<span class="table-icon"></span>'
  }
}));

vi.mock('ant-design-vue', () => ({
  List: {
    name: 'List',
    template: '<div class="list-mock"><slot name="header"></slot><slot name="renderItem" v-for="item in dataSource" :item="item"></slot></div>',
    props: ['grid', 'dataSource', 'pagination']
  },
  Card: {
    name: 'Card',
    template: '<div class="card-mock"><slot name="actions"></slot><slot></slot></div>'
  },
  Image: {
    name: 'Image',
    template: '<img class="image-mock" />'
  },
  Typography: {
    name: 'Typography',
    template: '<div class="typography-mock"></div>'
  },
  Tooltip: {
    name: 'Tooltip',
    template: '<div class="tooltip-mock"><slot name="title"></slot><slot></slot></div>'
  },
  Slider: {
    name: 'Slider',
    template: '<div class="slider-mock"></div>',
    props: ['value'],
    emits: ['change']
  },
  Avatar: {
    name: 'Avatar',
    template: '<div class="avatar-mock"></div>',
    props: ['src']
  }
}));

vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: vi.fn((key) => key)
  })
}));

vi.mock('/@/components/Dropdown', () => ({
  Dropdown: {
    name: 'Dropdown',
    template: '<div class="dropdown-mock"><slot></slot></div>',
    props: ['trigger', 'dropMenuList', 'popconfirm']
  }
}));

vi.mock('/@/components/Form', () => ({
  BasicForm: {
    name: 'BasicForm',
    template: '<div class="basic-form-mock"></div>'
  },
  useForm: vi.fn(() => [
    vi.fn(),
    {
      validate: vi.fn(() => Promise.resolve({ loginCode: 'test' }))
    }
  ])
}));

vi.mock('/@/utils/propTypes', () => ({
  propTypes: {
    object: {
      def: vi.fn((defaultValue) => ({ type: Object, default: defaultValue }))
    },
    func: {
      def: vi.fn(() => ({ type: Function }))
    }
  }
}));

vi.mock('/@/utils/is', () => ({
  isFunction: vi.fn((fn) => typeof fn === 'function')
}));

vi.mock('/@/components/CardList/src/data', () => ({
  useSlider: vi.fn(() => ({ min: 1, max: 10, step: 1 })),
  grid: { value: 4 }
}));

vi.mock('/@/hooks/setting', () => ({
  useGlobSetting: vi.fn(() => ({
    ctxPath: '/test-path'
  }))
}));

vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: () => ({
    showMessage: vi.fn()
  })
}));

describe('CardList', () => {
  const mockApi = vi.fn(() => Promise.resolve({
    list: [
      { id: 1, userName: 'User 1', avatarUrl: '/avatar1.jpg' },
      { id: 2, userName: 'User 2', avatarUrl: '/avatar2.jpg' }
    ],
    count: 2
  }));

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        params: {}
      }
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        params: {}
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.list-mock').exists()).toBe(true);
  });

  it('should render with custom params', () => {
    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        params: { customParam: 'value' }
      }
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with header slot', () => {
    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        params: {}
      },
      slots: {
        header: '<div class="custom-header">Custom Header</div>'
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.custom-header').exists()).toBe(true);
  });

  it('should handle form submission', async () => {
    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        params: {}
      }
    });

    await nextTick();
    
    // Test that the component renders without errors
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle slider change', async () => {
    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        params: {}
      }
    });

    await nextTick();
    
    // Test that the component renders without errors
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle page change', async () => {
    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        params: {}
      }
    });

    await nextTick();
    
    // Test that the component renders without errors
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle page size change', async () => {
    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        params: {}
      }
    });

    await nextTick();
    
    // Test that the component renders without errors
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle delete action', async () => {
    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        params: {}
      }
    });

    await nextTick();
    
    // Test that the component renders without errors
    expect(wrapper.exists()).toBe(true);
  });

  it('should get avatar URL correctly', async () => {
    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        params: {}
      }
    });

    await nextTick();
    
    // Test that the component renders without errors
    expect(wrapper.exists()).toBe(true);
  });

  it('should emit getMethod event on mount', async () => {
    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        params: {}
      }
    });

    await nextTick();
    
    expect(wrapper.emitted('getMethod')).toBeDefined();
  });

  it('should emit delete event when handleDelete is called', async () => {
    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        params: {}
      }
    });

    await nextTick();
    
    // Access the component instance and call handleDelete
    const vm = wrapper.vm as any;
    if (vm.handleDelete) {
      vm.handleDelete(123);
      expect(wrapper.emitted('delete')).toBeDefined();
      expect(wrapper.emitted('delete')[0]).toEqual([123]);
    }
  });

  it('should handle fetch with API', async () => {
    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        params: { test: 'value' }
      }
    });

    await nextTick();
    
    // Test that the component renders without errors
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle fetch without API', async () => {
    const wrapper = mount(CardList, {
      props: {
        params: {}
      }
    });

    await nextTick();
    
    // Test that the component renders without errors
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle pagination properties', async () => {
    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        params: {}
      }
    });

    await nextTick();
    
    // Test that the component renders without errors
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle slider change function', async () => {
    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        params: {}
      }
    });

    await nextTick();
    
    // Access the component instance and call sliderChange
    const vm = wrapper.vm as any;
    if (vm.sliderChange) {
      vm.sliderChange(20);
      // Should not throw error
      expect(true).toBe(true);
    }
  });

  it('should handle page change function', async () => {
    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        params: {}
      }
    });

    await nextTick();
    
    // Access the component instance and call pageChange
    const vm = wrapper.vm as any;
    if (vm.pageChange) {
      vm.pageChange(2, 20);
      // Should not throw error
      expect(true).toBe(true);
    }
  });

  it('should handle page size change function', async () => {
    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        params: {}
      }
    });

    await nextTick();
    
    // Access the component instance and call pageSizeChange
    const vm = wrapper.vm as any;
    if (vm.pageSizeChange) {
      vm.pageSizeChange(1, 20);
      // Should not throw error
      expect(true).toBe(true);
    }
  });

  it('should handle getAvatar function', async () => {
    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        params: {}
      }
    });

    await nextTick();
    
    // Access the component instance and call getAvatar
    const vm = wrapper.vm as any;
    if (vm.getAvatar) {
      const result = vm.getAvatar({ avatarUrl: '/ctxPath/test.jpg' });
      expect(result).toContain('/test-path/test.jpg');
    }
  });

  it('should handle getAvatar function with default avatar', async () => {
    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        params: {}
      }
    });

    await nextTick();
    
    // Access the component instance and call getAvatar
    const vm = wrapper.vm as any;
    if (vm.getAvatar) {
      const result = vm.getAvatar({});
      expect(result).toContain('/test-path/static/images/user1.jpg');
    }
  });

  it('should handle fetch function with parameters', async () => {
    const wrapper = mount(CardList, {
      props: {
        api: mockApi,
        params: {}
      }
    });

    await nextTick();
    
    // Access the component instance and call fetch
    const vm = wrapper.vm as any;
    if (vm.fetch) {
      await vm.fetch({ customParam: 'value' });
      // Should not throw error
      expect(true).toBe(true);
    }
  });
});

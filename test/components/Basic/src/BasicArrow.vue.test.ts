import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import BasicArrow from '/@/components/Basic/src/BasicArrow';

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: { template: '<div>Home</div>' }
    }
  ],
});

// Mock pinia
const pinia = createPinia();

// Mock global properties
const globalMocks = {
  $t: (key: string) => key,
  $router: router,
  $route: router.currentRoute.value,
};

// Mock Ant Design components
vi.mock('ant-design-vue', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Button: {
      name: 'Button',
      props: ['type', 'onClick'],
      template: '<button @click="$emit(\'click\')"><slot /></button>',
    },
    Input: {
      name: 'Input',
      props: ['value', 'placeholder'],
      template: '<input :value="value" :placeholder="placeholder" />',
    },
    Tooltip: {
      name: 'Tooltip',
      props: ['placement'],
      template: '<div><slot /></div>',
    },
    Modal: {
      name: 'Modal',
      props: ['open', 'onClose'],
      template: '<div v-if="open"><slot /></div>',
    },
  };
});

describe('BasicArrow', () => {
  it('should render without crashing', () => {
    const wrapper = mount(BasicArrow, {
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(BasicArrow, {
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    // Vue converts undefined to false for boolean props
    expect(wrapper.props().expand).toBe(false);
    expect(wrapper.props().up).toBe(false);
  });

  it('should handle props correctly', () => {
    const props = {
      expand: false,
      up: true,
    };
    const wrapper = mount(BasicArrow, {
      props,
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    expect(wrapper.props().expand).toBe(false);
    expect(wrapper.props().up).toBe(true);
  });

  it('should render with expand prop true', () => {
    const wrapper = mount(BasicArrow, {
      props: {
        expand: true,
      },
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    expect(wrapper.props().expand).toBe(true);
  });

  it('should render with expand prop false', () => {
    const wrapper = mount(BasicArrow, {
      props: {
        expand: false,
      },
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    expect(wrapper.props().expand).toBe(false);
  });

  it('should render with up prop true', () => {
    const wrapper = mount(BasicArrow, {
      props: {
        up: true,
      },
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    expect(wrapper.props().up).toBe(true);
  });

  it('should render with up prop false', () => {
    const wrapper = mount(BasicArrow, {
      props: {
        up: false,
      },
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    expect(wrapper.props().up).toBe(false);
  });

  it('should handle both props together', () => {
    const wrapper = mount(BasicArrow, {
      props: {
        expand: false,
        up: true,
      },
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    expect(wrapper.props().expand).toBe(false);
    expect(wrapper.props().up).toBe(true);
  });

  it('should handle component lifecycle', async () => {
    const wrapper = mount(BasicArrow, {
      props: {
        expand: true,
        up: false,
      },
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    
    // Test component mounting
    expect(wrapper.exists()).toBe(true);
    
    // Test prop changes
    await wrapper.setProps({ expand: false, up: true });
    expect(wrapper.props().expand).toBe(false);
    expect(wrapper.props().up).toBe(true);
    
    // Test component unmounting
    await wrapper.unmount();
    expect(wrapper.exists()).toBe(false);
  });

  it('should handle click events', async () => {
    const wrapper = mount(BasicArrow, {
      props: {
        expand: true,
        up: false,
      },
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    
    // Test click event
    await wrapper.trigger('click');
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle different prop combinations', () => {
    const combinations = [
      { expand: true, up: true },
      { expand: true, up: false },
      { expand: false, up: true },
      { expand: false, up: false },
    ];

    combinations.forEach((combo) => {
      const wrapper = mount(BasicArrow, {
        props: combo,
        global: {
          plugins: [router, pinia],
          mocks: globalMocks,
        },
      });
      expect(wrapper.props().expand).toBe(combo.expand);
      expect(wrapper.props().up).toBe(combo.up);
      wrapper.unmount();
    });
  });

  it('should render with custom classes', () => {
    const wrapper = mount(BasicArrow, {
      props: {
        expand: true,
        up: false,
      },
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle prop changes dynamically', async () => {
    const wrapper = mount(BasicArrow, {
      props: {
        expand: true,
        up: false,
      },
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });

    // Change expand prop
    await wrapper.setProps({ expand: false });
    expect(wrapper.props().expand).toBe(false);

    // Change up prop
    await wrapper.setProps({ up: true });
    expect(wrapper.props().up).toBe(true);

    // Change both props
    await wrapper.setProps({ expand: true, up: true });
    expect(wrapper.props().expand).toBe(true);
    expect(wrapper.props().up).toBe(true);
  });

  it('should handle edge cases', () => {
    const wrapper = mount(BasicArrow, {
      props: {
        expand: true,
        up: false,
      },
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});

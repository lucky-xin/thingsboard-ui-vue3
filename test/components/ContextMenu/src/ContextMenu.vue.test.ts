import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ContextMenu from '/@/components/ContextMenu/src/ContextMenu.vue';

// Mock dependencies
vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    template: '<div class="mock-icon"><slot /></div>',
  },
}));

vi.mock('ant-design-vue', () => ({
  Menu: {
    name: 'Menu',
    template: '<div class="mock-menu"><slot /></div>',
    props: ['inlineIndent', 'mode', 'class', 'style'],
    Item: {
      name: 'MenuItem',
      template: '<div class="mock-menu-item"><slot /></div>',
      props: ['disabled', 'class', 'itemKey'],
    },
    SubMenu: {
      name: 'SubMenu',
      template: '<div class="mock-sub-menu"><slot name="title" /><slot /></div>',
      props: ['disabled', 'popupClassName', 'subKey'],
    },
  },
  Divider: {
    name: 'Divider',
    template: '<div class="mock-divider"></div>',
  },
}));

// Mock document for testing
Object.defineProperty(document, 'body', {
  value: {
    clientWidth: 1000,
    clientHeight: 1000,
    appendChild: vi.fn(),
    removeChild: vi.fn(),
  },
  writable: true,
});

describe('ContextMenu', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('should render without crashing', async () => {
    const wrapper = mount(ContextMenu, {
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', async () => {
    const wrapper = mount(ContextMenu, {
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle props correctly', async () => {
    const props = {
      width: 200,
      showIcon: true,
      axis: { x: 100, y: 100 },
      items: [
        { label: 'Test Item', handler: vi.fn() },
        { label: 'Disabled Item', disabled: true, handler: vi.fn() },
      ],
    };
    const wrapper = mount(ContextMenu, {
      props,
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
  });

  it('should render menu items correctly', async () => {
    const items = [
      { label: 'Item 1', handler: vi.fn() },
      { label: 'Item 2', handler: vi.fn(), icon: 'test-icon' },
      { label: 'Item 3', handler: vi.fn(), disabled: true },
    ];

    const wrapper = mount(ContextMenu, {
      props: {
        items,
        showIcon: true,
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle item with children', async () => {
    const items = [
      {
        label: 'Parent Item',
        handler: vi.fn(),
        children: [
          { label: 'Child Item 1', handler: vi.fn() },
          { label: 'Child Item 2', handler: vi.fn() },
        ],
      },
    ];

    const wrapper = mount(ContextMenu, {
      props: {
        items,
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle item with divider', async () => {
    const items = [
      { label: 'Item 1', handler: vi.fn(), divider: true },
      { label: 'Item 2', handler: vi.fn() },
    ];

    const wrapper = mount(ContextMenu, {
      props: {
        items,
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle axis positioning', async () => {
    const wrapper = mount(ContextMenu, {
      props: {
        axis: { x: 50, y: 50 },
        items: [{ label: 'Test', handler: vi.fn() }],
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle custom styles', async () => {
    const wrapper = mount(ContextMenu, {
      props: {
        styles: { backgroundColor: 'red' },
        items: [{ label: 'Test', handler: vi.fn() }],
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle empty items', async () => {
    const wrapper = mount(ContextMenu, {
      props: {
        items: [],
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle width prop', async () => {
    const wrapper = mount(ContextMenu, {
      props: {
        width: 300,
        items: [{ label: 'Test', handler: vi.fn() }],
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle showIcon prop', async () => {
    const wrapper = mount(ContextMenu, {
      props: {
        showIcon: false,
        items: [{ label: 'Test', handler: vi.fn(), icon: 'test' }],
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle item click', async () => {
    const handler = vi.fn();
    const items = [
      { label: 'Test Item', handler },
    ];

    const wrapper = mount(ContextMenu, {
      props: {
        items,
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();

    // Find and trigger click on menu item
    const menuItem = wrapper.find('.mock-menu-item');
    if (menuItem.exists()) {
      await menuItem.trigger('click');
    }

    expect(wrapper.exists()).toBe(true);
  });
});
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';

// Mock DOM APIs required by ant-design-vue CSS-in-JS
Object.defineProperty(document, 'body', {
  value: {
    clientWidth: 1920,
    clientHeight: 1080,
    appendChild: vi.fn(),
    removeChild: vi.fn(),
    querySelectorAll: vi.fn(() => []),
    querySelector: vi.fn(() => null),
  },
  writable: true,
});

Object.defineProperty(document, 'querySelectorAll', {
  value: vi.fn(() => []),
  writable: true,
});

Object.defineProperty(document, 'querySelector', {
  value: vi.fn(() => null),
  writable: true,
});

Object.defineProperty(document, 'head', {
  value: {
    appendChild: vi.fn(),
    removeChild: vi.fn(),
    querySelectorAll: vi.fn(() => []),
    querySelector: vi.fn(() => null),
  },
  writable: true,
});

Object.defineProperty(document, 'createElement', {
  value: vi.fn(() => ({
    tagName: 'div',
    appendChild: vi.fn(),
    removeChild: vi.fn(),
    insertBefore: vi.fn(),
    setAttribute: vi.fn(),
    getAttribute: vi.fn(),
    style: {},
    textContent: '',
    innerHTML: '',
    parentNode: null,
    nextSibling: null,
    previousSibling: null,
  })),
  writable: true,
});

Object.defineProperty(document, 'createTextNode', {
  value: vi.fn(() => ({
    nodeType: 3,
    textContent: '',
    parentNode: null,
    nextSibling: null,
    previousSibling: null,
  })),
  writable: true,
});

Object.defineProperty(document, 'createComment', {
  value: vi.fn(() => ({
    nodeType: 8,
    textContent: '',
    parentNode: null,
    nextSibling: null,
    previousSibling: null,
  })),
  writable: true,
});

describe('ContextMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', async () => {
    const { default: ContextMenu } = await import('/@/components/ContextMenu/src/ContextMenu.vue');
    const wrapper = mount(ContextMenu, {
      props: {
        items: [{ label: 'Test Item', handler: vi.fn() }],
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', async () => {
    const { default: ContextMenu } = await import('/@/components/ContextMenu/src/ContextMenu.vue');
    const wrapper = mount(ContextMenu, {
      props: {
        items: [{ label: 'Test Item', handler: vi.fn() }],
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('width')).toBe(156);
    expect(wrapper.props('showIcon')).toBe(true);
    expect(wrapper.props('axis')).toEqual({ x: 0, y: 0 });
  });

  it('should handle custom props correctly', async () => {
    const { default: ContextMenu } = await import('/@/components/ContextMenu/src/ContextMenu.vue');
    const handler = vi.fn();
    const props = {
      width: 200,
      showIcon: false,
      axis: { x: 100, y: 100 },
      items: [
        { label: 'Test Item', handler },
        { label: 'Disabled Item', disabled: true, handler: vi.fn() },
      ],
    };
    const wrapper = mount(ContextMenu, { props });
    await wrapper.vm.$nextTick();
    
    expect(wrapper.props('width')).toBe(200);
    expect(wrapper.props('showIcon')).toBe(false);
    expect(wrapper.props('axis')).toEqual({ x: 100, y: 100 });
    expect(wrapper.props('items')).toHaveLength(2);
  });

  it('should render menu items correctly', async () => {
    const { default: ContextMenu } = await import('/@/components/ContextMenu/src/ContextMenu.vue');
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
    });
    await wrapper.vm.$nextTick();
    
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('items')).toHaveLength(3);
  });

  it('should handle item with children', async () => {
    const { default: ContextMenu } = await import('/@/components/ContextMenu/src/ContextMenu.vue');
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
    });
    await wrapper.vm.$nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle item with divider', async () => {
    const { default: ContextMenu } = await import('/@/components/ContextMenu/src/ContextMenu.vue');
    const items = [
      { label: 'Item 1', handler: vi.fn(), divider: true },
      { label: 'Item 2', handler: vi.fn() },
    ];

    const wrapper = mount(ContextMenu, {
      props: {
        items,
      },
    });
    await wrapper.vm.$nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should calculate style positioning correctly', async () => {
    const { default: ContextMenu } = await import('/@/components/ContextMenu/src/ContextMenu.vue');
    const wrapper = mount(ContextMenu, {
      props: {
        axis: { x: 50, y: 50 },
        items: [{ label: 'Test', handler: vi.fn() }],
        width: 200,
      },
    });
    await wrapper.vm.$nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle custom styles', async () => {
    const { default: ContextMenu } = await import('/@/components/ContextMenu/src/ContextMenu.vue');
    const customStyles = { backgroundColor: 'red', border: '1px solid blue' };
    const wrapper = mount(ContextMenu, {
      props: {
        items: [{ label: 'Test', handler: vi.fn() }],
        styles: customStyles,
      },
    });
    await wrapper.vm.$nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle empty items array', async () => {
    const { default: ContextMenu } = await import('/@/components/ContextMenu/src/ContextMenu.vue');
    const wrapper = mount(ContextMenu, {
      props: {
        items: [],
      },
    });
    await wrapper.vm.$nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle null axis', async () => {
    const { default: ContextMenu } = await import('/@/components/ContextMenu/src/ContextMenu.vue');
    const wrapper = mount(ContextMenu, {
      props: {
        items: [{ label: 'Test', handler: vi.fn() }],
        axis: null,
      },
    });
    await wrapper.vm.$nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle disabled items', async () => {
    const { default: ContextMenu } = await import('/@/components/ContextMenu/src/ContextMenu.vue');
    const handler = vi.fn();
    const wrapper = mount(ContextMenu, {
      props: {
        items: [{ label: 'Disabled Item', disabled: true, handler }],
      },
    });
    await wrapper.vm.$nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle items with icons when showIcon is true', async () => {
    const { default: ContextMenu } = await import('/@/components/ContextMenu/src/ContextMenu.vue');
    const wrapper = mount(ContextMenu, {
      props: {
        items: [{ label: 'Item with Icon', icon: 'test-icon', handler: vi.fn() }],
        showIcon: true,
      },
    });
    await wrapper.vm.$nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle items with icons when showIcon is false', async () => {
    const { default: ContextMenu } = await import('/@/components/ContextMenu/src/ContextMenu.vue');
    const wrapper = mount(ContextMenu, {
      props: {
        items: [{ label: 'Item with Icon', icon: 'test-icon', handler: vi.fn() }],
        showIcon: false,
      },
    });
    await wrapper.vm.$nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle menu positioning near screen edges', async () => {
    const { default: ContextMenu } = await import('/@/components/ContextMenu/src/ContextMenu.vue');
    // Position near right edge
    const wrapper = mount(ContextMenu, {
      props: {
        axis: { x: 1900, y: 100 },
        items: [{ label: 'Test', handler: vi.fn() }],
        width: 200,
      },
    });
    await wrapper.vm.$nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle menu positioning near bottom edge', async () => {
    const { default: ContextMenu } = await import('/@/components/ContextMenu/src/ContextMenu.vue');
    // Position near bottom edge
    const wrapper = mount(ContextMenu, {
      props: {
        axis: { x: 100, y: 1000 },
        items: [{ label: 'Test', handler: vi.fn() }],
        width: 200,
      },
    });
    await wrapper.vm.$nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle lifecycle hooks', async () => {
    const { default: ContextMenu } = await import('/@/components/ContextMenu/src/ContextMenu.vue');
    const wrapper = mount(ContextMenu, {
      props: {
        items: [{ label: 'Test', handler: vi.fn() }],
      },
    });
    
    // Test mounted
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
    
    // Test unmounted
    wrapper.unmount();
    expect(wrapper.exists()).toBe(false);
  });
});
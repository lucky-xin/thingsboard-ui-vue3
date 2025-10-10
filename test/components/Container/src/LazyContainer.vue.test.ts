import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import LazyContainer from '/@/components/Container/src/LazyContainer.vue';

// Mock dependencies
vi.mock('/@/hooks/core/useTimeout', () => ({
  useTimeoutFn: vi.fn((fn, delay) => {
    // Execute immediately for testing
    fn();
    return { stop: vi.fn() };
  }),
}));

vi.mock('/@/hooks/event/useIntersectionObserver', () => ({
  useIntersectionObserver: vi.fn(() => ({
    stop: vi.fn(),
    observer: null,
  })),
}));

// Mock ant-design-vue
vi.mock('ant-design-vue', () => ({
  Skeleton: {
    name: 'Skeleton',
    template: '<div>Skeleton</div>',
  },
}));

describe('LazyContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = mount(LazyContainer);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(LazyContainer);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.h-full.w-full').exists()).toBe(true);
  });

  it('should render skeleton when not initialized', () => {
    const wrapper = mount(LazyContainer);
    expect(wrapper.find('div[key="skeleton"]').exists()).toBe(true);
  });

  it('should render component when initialized', async () => {
    const wrapper = mount(LazyContainer, {
      props: {
        timeout: 0, // Immediate initialization
      },
    });
    
    await wrapper.vm.$nextTick();
    expect(wrapper.find('div[key="component"]').exists()).toBe(true);
  });

  it('should handle timeout prop', () => {
    const wrapper = mount(LazyContainer, {
      props: {
        timeout: 100,
      },
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle viewport prop', () => {
    const mockViewport = document.createElement('div');
    const wrapper = mount(LazyContainer, {
      props: {
        viewport: mockViewport,
      },
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle threshold prop', () => {
    const wrapper = mount(LazyContainer, {
      props: {
        threshold: '50px',
      },
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle direction prop', () => {
    const wrapper = mount(LazyContainer, {
      props: {
        direction: 'horizontal',
      },
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle tag prop', () => {
    const wrapper = mount(LazyContainer, {
      props: {
        tag: 'section',
      },
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle maxWaitingTime prop', () => {
    const wrapper = mount(LazyContainer, {
      props: {
        maxWaitingTime: 100,
      },
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle transitionName prop', () => {
    const wrapper = mount(LazyContainer, {
      props: {
        transitionName: 'custom-transition',
      },
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should emit init event when initialized', async () => {
    const wrapper = mount(LazyContainer, {
      props: {
        timeout: 0, // Immediate initialization
      },
    });
    
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('init')).toBeTruthy();
  });

  it('should render custom skeleton slot', () => {
    const wrapper = mount(LazyContainer, {
      slots: {
        skeleton: '<div>Custom Skeleton</div>',
      },
    });
    
    expect(wrapper.find('div[key="skeleton"]').text()).toBe('Custom Skeleton');
  });

  it('should render default skeleton when no skeleton slot', () => {
    const wrapper = mount(LazyContainer);
    
    expect(wrapper.find('div[key="skeleton"]').text()).toBe('Skeleton');
  });

  it('should pass loading state to slot', async () => {
    const wrapper = mount(LazyContainer, {
      props: {
        timeout: 0, // Immediate initialization
      },
      slots: {
        default: '<div>{{ loading }}</div>',
      },
    });
    
    await wrapper.vm.$nextTick();
    expect(wrapper.find('div[key="component"]').text()).toBe('true');
  });

  it('should handle vertical direction', () => {
    const wrapper = mount(LazyContainer, {
      props: {
        direction: 'vertical',
        threshold: '100px',
      },
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle horizontal direction', () => {
    const wrapper = mount(LazyContainer, {
      props: {
        direction: 'horizontal',
        threshold: '100px',
      },
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle invalid direction gracefully', () => {
    const wrapper = mount(LazyContainer, {
      props: {
        direction: 'invalid',
      },
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle zero timeout', () => {
    const wrapper = mount(LazyContainer, {
      props: {
        timeout: 0,
      },
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle null viewport', () => {
    const wrapper = mount(LazyContainer, {
      props: {
        viewport: null,
      },
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle undefined viewport', () => {
    const wrapper = mount(LazyContainer, {
      props: {
        viewport: undefined,
      },
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle empty threshold', () => {
    const wrapper = mount(LazyContainer, {
      props: {
        threshold: '',
      },
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle zero maxWaitingTime', () => {
    const wrapper = mount(LazyContainer, {
      props: {
        maxWaitingTime: 0,
      },
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle empty transitionName', () => {
    const wrapper = mount(LazyContainer, {
      props: {
        transitionName: '',
      },
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle empty tag', () => {
    const wrapper = mount(LazyContainer, {
      props: {
        tag: '',
      },
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle all props together', () => {
    const mockViewport = document.createElement('div');
    const wrapper = mount(LazyContainer, {
      props: {
        timeout: 100,
        viewport: mockViewport,
        threshold: '50px',
        direction: 'horizontal',
        tag: 'section',
        maxWaitingTime: 150,
        transitionName: 'custom-transition',
      },
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle slot with loading state', () => {
    const wrapper = mount(LazyContainer, {
      slots: {
        default: '<div>Loading: {{ loading }}</div>',
      },
    });
    
    expect(wrapper.find('div[key="skeleton"]').text()).toBe('Skeleton');
  });

  it('should handle multiple slots', () => {
    const wrapper = mount(LazyContainer, {
      slots: {
        default: '<div>Main Content</div>',
        skeleton: '<div>Custom Skeleton</div>',
      },
    });
    
    expect(wrapper.find('div[key="skeleton"]').text()).toBe('Custom Skeleton');
  });

  it('should handle attrs inheritance', () => {
    const wrapper = mount(LazyContainer, {
      attrs: {
        class: 'custom-class',
        id: 'custom-id',
      },
    });
    
    expect(wrapper.find('.custom-class').exists()).toBe(true);
    expect(wrapper.find('#custom-id').exists()).toBe(true);
  });

  it('should handle ref access', () => {
    const wrapper = mount(LazyContainer);
    
    expect(wrapper.vm.elRef).toBeDefined();
  });

  it('should handle state properties', () => {
    const wrapper = mount(LazyContainer);
    
    expect(wrapper.vm.isInit).toBeDefined();
    expect(wrapper.vm.loading).toBeDefined();
    expect(wrapper.vm.intersectionObserverInstance).toBeDefined();
  });

  it('should handle immediate initialization with timeout', async () => {
    const wrapper = mount(LazyContainer, {
      props: {
        timeout: 0,
      },
    });
    
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isInit).toBe(true);
  });

  it('should handle intersection observer initialization', () => {
    const wrapper = mount(LazyContainer);
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle intersection observer error', () => {
    const { useIntersectionObserver } = require('/@/hooks/event/useIntersectionObserver');
    vi.mocked(useIntersectionObserver).mockImplementation(() => {
      throw new Error('IntersectionObserver error');
    });
    
    const wrapper = mount(LazyContainer);
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle component lifecycle', async () => {
    const wrapper = mount(LazyContainer);
    
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
    
    await wrapper.unmount();
    expect(wrapper.exists()).toBe(false);
  });
});
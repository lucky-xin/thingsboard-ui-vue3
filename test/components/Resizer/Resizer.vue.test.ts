import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Resizer from '/@/components/Resizer/Resizer';

// Mock useI18n
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: (key: string) => key
  })
}));

// Mock Icon component
vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    props: ['icon'],
    template: '<span class="mock-icon" :class="icon"></span>'
  }
}));

// Mock useEventListener
vi.mock('/@/hooks/event/useEventListener', () => ({
  useEventListener: vi.fn()
}));

describe('Resizer', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up after each test
    vi.resetAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = mount(Resizer);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-resizer').exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(Resizer);
    expect(wrapper.props('position')).toBe('left');
    expect(wrapper.props('collapsed')).toBe(false);
  });

  it('should handle props correctly', () => {
    const wrapper = mount(Resizer, {
      props: {
        position: 'right',
        collapsed: true
      }
    });
    expect(wrapper.props('position')).toBe('right');
    expect(wrapper.props('collapsed')).toBe(true);
  });

  it('should render with position prop', () => {
    const wrapper = mount(Resizer, {
      props: {
        position: 'right'
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with collapsed prop', () => {
    const wrapper = mount(Resizer, {
      props: {
        collapsed: true
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with different positions', () => {
    const positions = ['left', 'right', 'top', 'bottom'] as const;
    positions.forEach(position => {
      const wrapper = mount(Resizer, {
        props: { position }
      });
      expect(wrapper.exists()).toBe(true);
    });
  });

  it('should render slot content', () => {
    const wrapper = mount(Resizer, {
      slots: {
        default: '<div class="test-content">Test content</div>'
      }
    });
    expect(wrapper.find('.test-content').exists()).toBe(true);
    expect(wrapper.text()).toContain('Test content');
  });

  it('should handle toggle function', async () => {
    const wrapper = mount(Resizer);
    const toggleElement = wrapper.find('.resiezer-toggler');

    // Initially not collapsed
    expect(wrapper.emitted('update:collapsed')).toBeFalsy();

    // Click to toggle
    await toggleElement.trigger('click');
    expect(wrapper.emitted('update:collapsed')).toBeTruthy();
    expect(wrapper.emitted('update:collapsed')![0]).toEqual([true]);
  });

  it('should handle toggle function with collapsed prop', async () => {
    const wrapper = mount(Resizer, {
      props: {
        collapsed: true
      }
    });
    const toggleElement = wrapper.find('.resiezer-toggler');

    // Initially collapsed
    expect(wrapper.props('collapsed')).toBe(true);

    // Click to toggle
    await toggleElement.trigger('click');
    expect(wrapper.emitted('update:collapsed')).toBeTruthy();
    expect(wrapper.emitted('update:collapsed')![0]).toEqual([false]);
  });

  it('should handle mouse down event', async () => {
    const wrapper = mount(Resizer);
    const resizerElement = wrapper.find('.jeesite-resizer');

    // Mock addEventListener
    const mockAddEventListener = vi.spyOn(document, 'addEventListener');

    await resizerElement.trigger('mousedown', {
      screenX: 100,
      screenY: 100
    });

    expect(mockAddEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
  });

  it('should not handle mouse down event when collapsed', async () => {
    const wrapper = mount(Resizer, {
      props: {
        collapsed: true
      }
    });
    const resizerElement = wrapper.find('.jeesite-resizer');

    // Mock addEventListener
    const mockAddEventListener = vi.spyOn(document, 'addEventListener');

    await resizerElement.trigger('mousedown', {
      screenX: 100,
      screenY: 100
    });

    expect(mockAddEventListener).not.toHaveBeenCalledWith('mousemove', expect.any(Function));
  });

  it('should handle different caret icons based on position and collapsed state', () => {
    // Test left position, not collapsed
    const wrapper1 = mount(Resizer, {
      props: { position: 'left', collapsed: false }
    });
    expect(wrapper1.find('.mock-icon').classes()).toContain('i-ant-design:caret-left-outlined');

    // Test right position, not collapsed
    const wrapper2 = mount(Resizer, {
      props: { position: 'right', collapsed: false }
    });
    expect(wrapper2.find('.mock-icon').classes()).toContain('i-ant-design:caret-right-outlined');

    // Test top position, not collapsed
    const wrapper3 = mount(Resizer, {
      props: { position: 'top', collapsed: false }
    });
    expect(wrapper3.find('.mock-icon').classes()).toContain('i-ant-design:caret-up-outlined');

    // Test bottom position, not collapsed
    const wrapper4 = mount(Resizer, {
      props: { position: 'bottom', collapsed: false }
    });
    expect(wrapper4.find('.mock-icon').classes()).toContain('i-ant-design:caret-down-outlined');

    // Test left position, collapsed
    const wrapper5 = mount(Resizer, {
      props: { position: 'left', collapsed: true }
    });
    expect(wrapper5.find('.mock-icon').classes()).toContain('i-ant-design:caret-right-outlined');

    // Test right position, collapsed
    const wrapper6 = mount(Resizer, {
      props: { position: 'right', collapsed: true }
    });
    expect(wrapper6.find('.mock-icon').classes()).toContain('i-ant-design:caret-left-outlined');

    // Test top position, collapsed
    const wrapper7 = mount(Resizer, {
      props: { position: 'top', collapsed: true }
    });
    expect(wrapper7.find('.mock-icon').classes()).toContain('i-ant-design:caret-down-outlined');

    // Test bottom position, collapsed
    const wrapper8 = mount(Resizer, {
      props: { position: 'bottom', collapsed: true }
    });
    expect(wrapper8.find('.mock-icon').classes()).toContain('i-ant-design:caret-up-outlined');
  });

  it('should handle default caret icon case', () => {
    // Test the default case in getCaretIcon when no conditions match
    const wrapper = mount(Resizer, {
      props: {
        position: 'invalid' as any // Force an invalid position to test default case
      }
    });
    expect(wrapper.find('.mock-icon').classes()).toContain('i-ant-design:caret-right-outlined');
  });

  it('should handle collapsed prop watcher', async () => {
    const wrapper = mount(Resizer, {
      props: {
        collapsed: false
      }
    });

    expect(wrapper.props('collapsed')).toBe(false);
    await wrapper.setProps({ collapsed: true });
    expect(wrapper.props('collapsed')).toBe(true);
  });

  it('should handle wrap style computation for different positions', () => {
    // Test top position
    const wrapper1 = mount(Resizer, {
      props: { position: 'top', collapsed: false }
    });
    expect(wrapper1.find('.jeesite-resizer').attributes('style')).toContain('width: 100%');
    expect(wrapper1.find('.jeesite-resizer').attributes('style')).toContain('cursor: s-resize');

    // Test bottom position
    const wrapper2 = mount(Resizer, {
      props: { position: 'bottom', collapsed: false }
    });
    expect(wrapper2.find('.jeesite-resizer').attributes('style')).toContain('width: 100%');
    expect(wrapper2.find('.jeesite-resizer').attributes('style')).toContain('cursor: s-resize');

    // Test left position
    const wrapper3 = mount(Resizer, {
      props: { position: 'left', collapsed: false }
    });
    expect(wrapper3.find('.jeesite-resizer').attributes('style')).toContain('cursor: w-resize');

    // Test right position
    const wrapper4 = mount(Resizer, {
      props: { position: 'right', collapsed: false }
    });
    expect(wrapper4.find('.jeesite-resizer').attributes('style')).toContain('cursor: w-resize');

    // Test collapsed cases
    const wrapper5 = mount(Resizer, {
      props: { position: 'left', collapsed: true }
    });
    expect(wrapper5.find('.jeesite-resizer').attributes('style')).toContain('cursor: default');
  });

  it('should emit move event during mouse movement', async () => {
    const wrapper = mount(Resizer);
    const resizerElement = wrapper.find('.jeesite-resizer');

    // Mock addEventListener to capture the mousemove listener
    let mouseMoveListener: Function | null = null;
    vi.spyOn(document, 'addEventListener').mockImplementation((event, listener) => {
      if (event === 'mousemove') {
        mouseMoveListener = listener as Function;
      }
    });

    // Trigger mouse down
    await resizerElement.trigger('mousedown', {
      screenX: 100,
      screenY: 100
    });

    // Simulate mouse move
    if (mouseMoveListener) {
      mouseMoveListener({
        screenX: 90,
        screenY: 90
      });
    }

    // Check if move event was emitted
    expect(wrapper.emitted('move')).toBeTruthy();
  });

  it('should not emit move event when collapsed', async () => {
    const wrapper = mount(Resizer, {
      props: {
        collapsed: true
      }
    });
    const resizerElement = wrapper.find('.jeesite-resizer');

    // Mock addEventListener to capture the mousemove listener
    let mouseMoveListener: Function | null = null;
    vi.spyOn(document, 'addEventListener').mockImplementation((event, listener) => {
      if (event === 'mousemove') {
        mouseMoveListener = listener as Function;
      }
    });

    // Trigger mouse down
    await resizerElement.trigger('mousedown', {
      screenX: 100,
      screenY: 100
    });

    // Simulate mouse move
    if (mouseMoveListener) {
      mouseMoveListener({
        screenX: 90,
        screenY: 90
      });
    }

    // Check that move event was not emitted
    expect(wrapper.emitted('move')).toBeFalsy();
  });
});
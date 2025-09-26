import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ClickOutSide from '/@/components/ClickOutSide/src/ClickOutSide.vue';

// Mock @vueuse/core
vi.mock('@vueuse/core', () => ({
  onClickOutside: vi.fn((ref, callback) => {
    // Simulate click outside after mount
    setTimeout(() => {
      callback();
    }, 100);
  }),
}));

describe('components/ClickOutSide/src/ClickOutSide', () => {
  it('should render with slot content', () => {
    const wrapper = mount(ClickOutSide, {
      slots: {
        default: '<div data-testid="content">Test Content</div>',
      },
    });
    
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="content"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="content"]').text()).toBe('Test Content');
  });

  it('should emit mounted event on mount', () => {
    const wrapper = mount(ClickOutSide, {
      slots: {
        default: '<div>Test Content</div>',
      },
    });
    
    expect(wrapper.emitted('mounted')).toBeTruthy();
    expect(wrapper.emitted('mounted')).toHaveLength(1);
  });

  it('should emit clickOutside event when clicked outside', async () => {
    const wrapper = mount(ClickOutSide, {
      slots: {
        default: '<div>Test Content</div>',
      },
    });
    
    // Wait for the mocked onClickOutside to trigger
    await new Promise(resolve => setTimeout(resolve, 150));
    
    expect(wrapper.emitted('clickOutside')).toBeTruthy();
    expect(wrapper.emitted('clickOutside')).toHaveLength(1);
  });

  it('should render with complex slot content', () => {
    const wrapper = mount(ClickOutSide, {
      slots: {
        default: `
          <div>
            <h1>Title</h1>
            <p>Paragraph</p>
            <button>Button</button>
          </div>
        `,
      },
    });
    
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h1').text()).toBe('Title');
    expect(wrapper.find('p').text()).toBe('Paragraph');
    expect(wrapper.find('button').text()).toBe('Button');
  });

  it('should render with multiple slot elements', () => {
    const wrapper = mount(ClickOutSide, {
      slots: {
        default: [
          '<div data-testid="item1">Item 1</div>',
          '<div data-testid="item2">Item 2</div>',
        ],
      },
    });
    
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="item1"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="item2"]').exists()).toBe(true);
  });

  it('should render with empty slot', () => {
    const wrapper = mount(ClickOutSide);
    
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div').exists()).toBe(true);
  });

  it('should have correct ref structure', () => {
    const wrapper = mount(ClickOutSide, {
      slots: {
        default: '<div>Test Content</div>',
      },
    });
    
    const wrapDiv = wrapper.find('div');
    expect(wrapDiv.exists()).toBe(true);
    expect(wrapDiv.element).toBe(wrapper.vm.wrap);
  });

  it('should emit both mounted and clickOutside events', async () => {
    const wrapper = mount(ClickOutSide, {
      slots: {
        default: '<div>Test Content</div>',
      },
    });
    
    // Check mounted event
    expect(wrapper.emitted('mounted')).toBeTruthy();
    
    // Wait for clickOutside event
    await new Promise(resolve => setTimeout(resolve, 150));
    
    expect(wrapper.emitted('clickOutside')).toBeTruthy();
  });
});

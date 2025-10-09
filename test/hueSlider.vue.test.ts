import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import hueSlider from '/@/components/ColorPicker/src/components/hueSlider.vue';

// Mock draggable function
vi.mock('/@/components/ColorPicker/src/lib/draggable', () => ({
  default: vi.fn(),
}));

describe('hueSlider', () => {
  it('should render correctly', () => {
    // Create a mock color object
    const mockColor = {
      get: vi.fn(() => 0),
      set: vi.fn(),
    };

    const wrapper = mount(hueSlider, {
      props: {
        color: mockColor,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});

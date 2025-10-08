import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('hueSlider', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(hueSlider);
    expect(wrapper.exists()).toBe(true);
  });
});

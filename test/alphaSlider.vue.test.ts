import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AlphaSlider from '/@/components/ColorPicker/src/components/alphaSlider.vue';

describe('alphaSlider', () => {
  it('should render correctly', () => {
    const wrapper = mount(AlphaSlider);
    expect(wrapper.exists()).toBe(true);
  });
});

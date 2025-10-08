import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('SimpleColorPicker', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(SimpleColorPicker);
    expect(wrapper.exists()).toBe(true);
  });
});

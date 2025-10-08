import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('IconPicker', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(IconPicker);
    expect(wrapper.exists()).toBe(true);
  });
});

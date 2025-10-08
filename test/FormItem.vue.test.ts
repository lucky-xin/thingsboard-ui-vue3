import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('FormItem', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(FormItem);
    expect(wrapper.exists()).toBe(true);
  });
});

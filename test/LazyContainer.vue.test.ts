import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('LazyContainer', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(LazyContainer);
    expect(wrapper.exists()).toBe(true);
  });
});

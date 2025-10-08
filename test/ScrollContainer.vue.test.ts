import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('ScrollContainer', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(ScrollContainer);
    expect(wrapper.exists()).toBe(true);
  });
});

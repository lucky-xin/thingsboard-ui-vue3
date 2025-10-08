import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('svPanel', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(svPanel);
    expect(wrapper.exists()).toBe(true);
  });
});

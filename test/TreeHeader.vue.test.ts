import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('TreeHeader', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(TreeHeader);
    expect(wrapper.exists()).toBe(true);
  });
});

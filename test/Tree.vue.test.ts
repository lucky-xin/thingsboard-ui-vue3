import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('Tree', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(Tree);
    expect(wrapper.exists()).toBe(true);
  });
});

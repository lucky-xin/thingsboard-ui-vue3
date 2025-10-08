import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('BasicDialog', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(BasicDialog);
    expect(wrapper.exists()).toBe(true);
  });
});

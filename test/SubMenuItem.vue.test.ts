import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('SubMenuItem', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(SubMenuItem);
    expect(wrapper.exists()).toBe(true);
  });
});

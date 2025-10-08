import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('BasicModal', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(BasicModal);
    expect(wrapper.exists()).toBe(true);
  });
});

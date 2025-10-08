import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('ForgetPassword', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(ForgetPassword);
    expect(wrapper.exists()).toBe(true);
  });
});

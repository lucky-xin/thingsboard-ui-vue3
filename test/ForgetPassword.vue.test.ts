import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ForgetPassword from '/@/components/Authentication/src/ForgetPassword.vue';

describe('ForgetPassword', () => {
  it('should render correctly', () => {
    const wrapper = mount(ForgetPassword);
    expect(wrapper.exists()).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Login from '/@/components/Authentication/src/Login.vue';

describe('Login', () => {
  it('should render correctly', () => {
    const wrapper = mount(Login);
    expect(wrapper.exists()).toBe(true);
  });
});

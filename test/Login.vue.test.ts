import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('Login', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(Login);
    expect(wrapper.exists()).toBe(true);
  });
});

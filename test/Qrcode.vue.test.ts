import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('Qrcode', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(Qrcode);
    expect(wrapper.exists()).toBe(true);
  });
});

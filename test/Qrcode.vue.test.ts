import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Qrcode from '/@/components/Qrcode/src/Qrcode.vue';

describe('Qrcode', () => {
  it('should render correctly', () => {
    const wrapper = mount(Qrcode);
    expect(wrapper.exists()).toBe(true);
  });
});

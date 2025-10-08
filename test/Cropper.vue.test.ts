import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Cropper from '/@/components/Cropper/src/Cropper.vue';

describe('Cropper', () => {
  it('should render correctly', () => {
    const wrapper = mount(Cropper);
    expect(wrapper.exists()).toBe(true);
  });
});

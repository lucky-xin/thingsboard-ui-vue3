import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CopperModal from '/@/components/Cropper/src/CopperModal.vue';

describe('CopperModal', () => {
  it('should render correctly', () => {
    const wrapper = mount(CopperModal);
    expect(wrapper.exists()).toBe(true);
  });
});

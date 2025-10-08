import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ModalWrapper from '/@/components/Modal/src/components/ModalWrapper.vue';

describe('ModalWrapper', () => {
  it('should render correctly', () => {
    const wrapper = mount(ModalWrapper);
    expect(wrapper.exists()).toBe(true);
  });
});

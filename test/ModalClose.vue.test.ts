import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ModalClose from '/@/components/Modal/src/components/ModalClose.vue';

describe('ModalClose', () => {
  it('should render correctly', () => {
    const wrapper = mount(ModalClose);
    expect(wrapper.exists()).toBe(true);
  });
});

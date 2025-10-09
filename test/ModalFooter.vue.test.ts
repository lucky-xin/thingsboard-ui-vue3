import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ModalFooter from '/@/components/Modal/src/components/ModalFooter.vue';

describe('ModalFooter', () => {
  it('should render correctly', () => {
    const wrapper = mount(ModalFooter);
    expect(wrapper.exists()).toBe(true);
  });
});

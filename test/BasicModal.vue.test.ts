import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BasicModal from '/@/components/Modal/src/BasicModal.vue';

describe('BasicModal', () => {
  it('should render correctly', () => {
    const wrapper = mount(BasicModal);
    expect(wrapper.exists()).toBe(true);
  });
});

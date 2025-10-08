import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BasicDialog from '/@/components/Dialog/src/BasicDialog.vue';

describe('BasicDialog', () => {
  it('should render correctly', () => {
    const wrapper = mount(BasicDialog);
    expect(wrapper.exists()).toBe(true);
  });
});

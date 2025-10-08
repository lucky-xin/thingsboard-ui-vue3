import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DragVerify from '/@/components/Verify/src/DragVerify.vue';

describe('DragVerify', () => {
  it('should render correctly', () => {
    const wrapper = mount(DragVerify);
    expect(wrapper.exists()).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ImgRotate from '/@/components/Verify/src/ImgRotate.vue';

describe('ImgRotate', () => {
  it('should render correctly', () => {
    const wrapper = mount(ImgRotate);
    expect(wrapper.exists()).toBe(true);
  });
});

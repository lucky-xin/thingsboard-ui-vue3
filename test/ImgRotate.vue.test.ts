import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('ImgRotate', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(ImgRotate);
    expect(wrapper.exists()).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('CropperAvatar', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(CropperAvatar);
    expect(wrapper.exists()).toBe(true);
  });
});

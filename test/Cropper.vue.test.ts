import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('Cropper', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(Cropper);
    expect(wrapper.exists()).toBe(true);
  });
});

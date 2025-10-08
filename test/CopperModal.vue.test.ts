import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('CopperModal', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(CopperModal);
    expect(wrapper.exists()).toBe(true);
  });
});

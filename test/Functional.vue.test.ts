import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('Functional', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(Functional);
    expect(wrapper.exists()).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('ModalFooter', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(ModalFooter);
    expect(wrapper.exists()).toBe(true);
  });
});

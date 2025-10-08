import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('ModalWrapper', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(ModalWrapper);
    expect(wrapper.exists()).toBe(true);
  });
});

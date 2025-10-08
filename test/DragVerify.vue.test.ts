import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('DragVerify', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(DragVerify);
    expect(wrapper.exists()).toBe(true);
  });
});

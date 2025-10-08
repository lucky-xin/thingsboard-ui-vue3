import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('WangEditor', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(WangEditor);
    expect(wrapper.exists()).toBe(true);
  });
});

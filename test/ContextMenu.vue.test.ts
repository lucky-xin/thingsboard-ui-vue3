import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('ContextMenu', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(ContextMenu);
    expect(wrapper.exists()).toBe(true);
  });
});

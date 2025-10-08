import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('Markdown', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(Markdown);
    expect(wrapper.exists()).toBe(true);
  });
});

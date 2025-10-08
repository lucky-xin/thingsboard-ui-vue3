import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('MarkdownViewer', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(MarkdownViewer);
    expect(wrapper.exists()).toBe(true);
  });
});

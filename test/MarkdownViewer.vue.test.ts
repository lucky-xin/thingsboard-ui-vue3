import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MarkdownViewer from '/@/components/Markdown/src/MarkdownViewer.vue';

describe('MarkdownViewer', () => {
  it('should render correctly', () => {
    const wrapper = mount(MarkdownViewer);
    expect(wrapper.exists()).toBe(true);
  });
});

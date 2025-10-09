import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Markdown from '/@/components/Markdown/src/Markdown.vue';

describe('Markdown', () => {
  it('should render correctly', () => {
    const wrapper = mount(Markdown);
    expect(wrapper.exists()).toBe(true);
  });
});

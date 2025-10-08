import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CodeMirror from '/@/components/CodeEditor/src/codemirror/CodeMirror.vue';

describe('CodeMirror', () => {
  it('should render correctly', () => {
    const wrapper = mount(CodeMirror);
    expect(wrapper.exists()).toBe(true);
  });
});

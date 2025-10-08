import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('CodeMirror', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(CodeMirror);
    expect(wrapper.exists()).toBe(true);
  });
});

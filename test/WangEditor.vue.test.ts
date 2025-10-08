import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import WangEditor from '/@/components/WangEditor/src/WangEditor.vue';

describe('WangEditor', () => {
  it('should render correctly', () => {
    const wrapper = mount(WangEditor);
    expect(wrapper.exists()).toBe(true);
  });
});

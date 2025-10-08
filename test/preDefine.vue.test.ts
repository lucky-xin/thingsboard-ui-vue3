import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('preDefine', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(preDefine);
    expect(wrapper.exists()).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('TableTitle', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(TableTitle);
    expect(wrapper.exists()).toBe(true);
  });
});

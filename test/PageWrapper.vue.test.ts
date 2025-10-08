import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('PageWrapper', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(PageWrapper);
    expect(wrapper.exists()).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('JeeSiteSelect', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(JeeSiteSelect);
    expect(wrapper.exists()).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('ColumnSetting', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(ColumnSetting);
    expect(wrapper.exists()).toBe(true);
  });
});

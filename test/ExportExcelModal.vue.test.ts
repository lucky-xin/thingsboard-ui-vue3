import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('ExportExcelModal', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(ExportExcelModal);
    expect(wrapper.exists()).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ImportExcel from '/@/components/Excel/src/ImportExcel.vue';

describe('ImportExcel', () => {
  it('should render correctly', () => {
    const wrapper = mount(ImportExcel);
    expect(wrapper.exists()).toBe(true);
  });
});

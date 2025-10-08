import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ExportExcelModal from '/@/components/Excel/src/ExportExcelModal.vue';

describe('ExportExcelModal', () => {
  it('should render correctly', () => {
    const wrapper = mount(ExportExcelModal);
    expect(wrapper.exists()).toBe(true);
  });
});

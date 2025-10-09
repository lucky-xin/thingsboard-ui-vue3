import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ExportExcelModal from '/@/components/Excel/src/ExportExcelModal.vue';

// Mock dependencies
vi.mock('/@/components/Modal', () => ({
  BasicModal: {
    template: '<div class="mock-modal"><slot /></div>',
  },
  useModalInner: () => [vi.fn(), vi.fn()],
}));

vi.mock('/@/components/Form', () => ({
  BasicForm: {
    template: '<div class="mock-form"><slot /></div>',
  },
  useForm: () => [vi.fn(), {}],
}));

vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: vi.fn().mockImplementation((key) => key),
  }),
}));

describe('ExportExcelModal', () => {
  it('should render correctly', () => {
    const wrapper = mount(ExportExcelModal);
    expect(wrapper.exists()).toBe(true);
  });
});

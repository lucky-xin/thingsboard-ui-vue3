import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import TableFooter from '/@/components/Table/src/components/TableFooter.vue';

// Mock the useTableContext hook
vi.mock('/@/components/Table/src/hooks/useTableContext', () => ({
  useTableContext: vi.fn(() => ({
    getDataSource: vi.fn(() => []),
    getColumns: vi.fn(() => []),
    getRowSelection: vi.fn(() => null)
  }))
}));

describe('TableFooter', () => {
  it('should render correctly', () => {
    const wrapper = mount(TableFooter, {
      props: {
        summaryFunc: () => [],
        scroll: {}
      },
      global: {
        stubs: {
          Table: true
        }
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});

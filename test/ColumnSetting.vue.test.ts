import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ColumnSetting from '/@/components/Table/src/components/settings/ColumnSetting.vue';

// Mock the useTableContext hook
vi.mock('/@/components/Table/src/hooks/useTableContext', () => ({
  useTableContext: vi.fn(() => ({
    getColumns: vi.fn(() => []),
    getDefaultRowSelection: vi.fn(() => null),
    getBindValues: {},
    setProps: vi.fn(),
    setColumns: vi.fn(),
    getCacheColumns: vi.fn(() => []),
    getRowSelection: vi.fn(() => null)
  }))
}));

describe('ColumnSetting', () => {
  it('should render correctly', () => {
    const wrapper = mount(ColumnSetting, {
      global: {
        stubs: {
          Tooltip: true,
          Popover: true,
          Checkbox: true,
          Icon: true,
          ScrollContainer: true,
          Divider: true
        }
      },
      attrs: {
        getPopupContainer: () => document.body
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});

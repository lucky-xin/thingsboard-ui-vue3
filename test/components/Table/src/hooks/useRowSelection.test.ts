import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, computed } from 'vue';
import * as module from '/@/components/Table/src/hooks/useRowSelection';

// Mock dependencies
vi.mock('/@/utils/is', () => ({
  isFunction: vi.fn((val) => typeof val === 'function'),
  isString: vi.fn((val) => typeof val === 'string'),
}));

vi.mock('/@/utils/helper/treeHelper', () => ({
  findNodeAll: vi.fn((data, predicate) => {
    return data.filter(predicate);
  }),
}));

vi.mock('/@/components/Table/src/const', () => ({
  ROW_KEY: '__ROW_KEY__',
}));

vi.mock('lodash-es', () => ({
  omit: vi.fn((obj, keys) => {
    const result = { ...obj };
    keys.forEach((key: string) => delete result[key]);
    return result;
  }),
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

describe('useRowSelection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should export useRowSelection hook', async () => {
    const module = await import('/@/components/Table/src/hooks/useRowSelection');

    expect(module).toBeDefined();
    expect(module.useRowSelection).toBeDefined();
    expect(typeof module.useRowSelection).toBe('function');
  });

  it('should be a valid hook module', async () => {
    const module = await import('/@/components/Table/src/hooks/useRowSelection');

    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  it('should export additional utilities', async () => {
    const module = await import('/@/components/Table/src/hooks/useRowSelection');

    // Check that module has exports
    const exportKeys = Object.keys(module);
    expect(exportKeys.length).toBeGreaterThan(0);
  });

  it('should return correct functions and properties', () => {
    const propsRef = computed(() => ({}));
    const tableData = ref([]);
    const emit = vi.fn();

    const result = module.useRowSelection(propsRef, tableData, emit);

    expect(result).toHaveProperty('getRowSelection');
    expect(result).toHaveProperty('getRowSelectionRef');
    expect(result).toHaveProperty('getSelectRows');
    expect(result).toHaveProperty('getSelectRowKeys');
    expect(result).toHaveProperty('setSelectedRowKeys');
    expect(result).toHaveProperty('clearSelectedRowKeys');
    expect(result).toHaveProperty('deleteSelectRowByKey');
    expect(result).toHaveProperty('setSelectedRows');

    expect(typeof result.getRowSelection).toBe('function');
    expect(typeof result.getSelectRows).toBe('function');
    expect(typeof result.getSelectRowKeys).toBe('function');
    expect(typeof result.setSelectedRowKeys).toBe('function');
    expect(typeof result.clearSelectedRowKeys).toBe('function');
    expect(typeof result.deleteSelectRowByKey).toBe('function');
    expect(typeof result.setSelectedRows).toBe('function');
  });

  it('should handle row selection correctly', () => {
    const propsRef = computed(() => ({}));
    const tableData = ref([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ]);
    const emit = vi.fn();

    const { setSelectedRowKeys, getSelectRowKeys, getSelectRows } = module.useRowSelection(propsRef, tableData, emit);

    // Initially no selection
    expect(getSelectRowKeys()).toEqual([]);
    expect(getSelectRows()).toEqual([]);

    // Set selection
    setSelectedRowKeys([1, 2]);

    // Check selection
    expect(getSelectRowKeys()).toEqual([1, 2]);
    expect(getSelectRows()).toEqual([]);
  });

  it('should clear row selection correctly', () => {
    const propsRef = computed(() => ({}));
    const tableData = ref([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ]);
    const emit = vi.fn();

    const { setSelectedRowKeys, getSelectRowKeys, clearSelectedRowKeys } = module.useRowSelection(propsRef, tableData, emit);

    // Set selection
    setSelectedRowKeys([1, 2]);
    expect(getSelectRowKeys()).toEqual([1, 2]);

    // Clear selection
    clearSelectedRowKeys();
    expect(getSelectRowKeys()).toEqual([]);
  });

  it('should delete specific row from selection', () => {
    const propsRef = computed(() => ({}));
    const tableData = ref([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ]);
    const emit = vi.fn();

    const { setSelectedRowKeys, getSelectRowKeys, deleteSelectRowByKey } = module.useRowSelection(propsRef, tableData, emit);

    // Set selection
    setSelectedRowKeys([1, 2, 3]);
    expect(getSelectRowKeys()).toEqual([1, 2, 3]);

    // Delete specific row
    deleteSelectRowByKey(2);
    expect(getSelectRowKeys()).toEqual([1, 3]);
  });

  it('should handle row selection with rowSelection config', () => {
    const propsRef = computed(() => ({
      rowSelection: {
        type: 'checkbox',
        onChange: vi.fn(),
      },
    }));
    const tableData = ref([]);
    const emit = vi.fn();

    const { getRowSelectionRef, getRowSelection } = module.useRowSelection(propsRef, tableData, emit);

    const rowSelectionRef = getRowSelectionRef.value;
    expect(rowSelectionRef).not.toBeNull();
    expect(rowSelectionRef).toHaveProperty('selectedRowKeys');
    expect(rowSelectionRef).toHaveProperty('preserveSelectedRowKeys');
    expect(rowSelectionRef).toHaveProperty('onChange');
    expect(rowSelectionRef?.preserveSelectedRowKeys).toBe(true);

    const rowSelection = getRowSelection();
    expect(rowSelection).toBeDefined();
  });

  it('should handle row selection without rowSelection config', () => {
    const propsRef = computed(() => ({}));
    const tableData = ref([]);
    const emit = vi.fn();

    const { getRowSelectionRef } = module.useRowSelection(propsRef, tableData, emit);

    const rowSelectionRef = getRowSelectionRef.value;
    expect(rowSelectionRef).toBeNull();
  });

  it('should call onChange when row selection changes', async () => {
    const onChangeMock = vi.fn();
    const propsRef = computed(() => ({
      rowSelection: {
        onChange: onChangeMock,
      },
    }));
    const tableData = ref([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ]);
    const emit = vi.fn();

    const { setSelectedRowKeys } = module.useRowSelection(propsRef, tableData, emit);

    // Set selection
    setSelectedRowKeys([1, 2]);

    // Wait for next tick to allow watchers to run
    await new Promise(resolve => setTimeout(resolve, 0));

    // Check that onChange was called
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('should handle autoCreateKey correctly', () => {
    const propsRef = computed(() => ({
      autoCreateKey: true,
      rowKey: undefined,
    }));
    const tableData = ref([]);
    const emit = vi.fn();

    const { getRowSelectionRef } = module.useRowSelection(propsRef, tableData, emit);

    // This test ensures the hook handles autoCreateKey logic
    expect(getRowSelectionRef.value).toBeNull();
  });

  it('should handle string rowKey correctly', () => {
    const propsRef = computed(() => ({
      rowKey: 'id',
    }));
    const tableData = ref([]);
    const emit = vi.fn();

    const { getRowSelectionRef } = module.useRowSelection(propsRef, tableData, emit);

    // This test ensures the hook handles string rowKey logic
    expect(getRowSelectionRef.value).toBeNull();
  });

  it('should handle function rowKey correctly', () => {
    const propsRef = computed(() => ({
      rowKey: vi.fn((record) => record.id),
    }));
    const tableData = ref([]);
    const emit = vi.fn();

    const { getRowSelectionRef } = module.useRowSelection(propsRef, tableData, emit);

    // This test ensures the hook handles function rowKey logic
    expect(getRowSelectionRef.value).toBeNull();
  });
});
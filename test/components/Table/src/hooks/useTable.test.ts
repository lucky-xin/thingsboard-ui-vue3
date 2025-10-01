import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import * as module from '/@/components/Table/src/hooks/useTable';

// Mock dependencies
vi.mock('/@/utils', () => ({
  getDynamicProps: vi.fn((props) => props),
}));

vi.mock('/@/utils/env', () => ({
  isProdMode: vi.fn(() => false),
}));

vi.mock('/@/utils/log', () => ({
  error: vi.fn(),
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

describe('useTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should export expected functions/classes', () => {
    expect(module).toBeDefined();
  });

  it('should have correct exports', () => {
    const exports = Object.keys(module);
    expect(exports.length).toBeGreaterThan(0);
  });

  it('should export useTable', () => {
    expect(module.useTable).toBeDefined();
  });

  it('should have useTable function', () => {
    expect(typeof module.useTable).toBe('function');
  });

  it('should return register function and methods object', () => {
    const [register, methods] = module.useTable();

    expect(typeof register).toBe('function');
    expect(typeof methods).toBe('object');
    expect(methods).toHaveProperty('getForm');
  });

  it('should register table instance correctly', () => {
    const [register, methods] = module.useTable();

    const mockTableInstance = {
      setProps: vi.fn(),
      reload: vi.fn(),
      setLoading: vi.fn(),
      getTableRef: vi.fn(),
      redoHeight: vi.fn(),
      scrollTo: vi.fn(),
      getSize: vi.fn(),
      emit: vi.fn(),
      getColumns: vi.fn(),
      getCacheColumns: vi.fn(),
      setColumns: vi.fn(),
      updateColumn: vi.fn(),
      getPagination: vi.fn(),
      setPagination: vi.fn(),
      getShowPagination: vi.fn(),
      setShowPagination: vi.fn(),
      getDataSource: vi.fn(),
      getDelDataSource: vi.fn(),
      getRawDataSource: vi.fn(),
      setTableData: vi.fn(),
      updateTableData: vi.fn(),
      updateTableDataRecord: vi.fn(),
      deleteTableDataRecord: vi.fn(),
      insertTableDataRecord: vi.fn(),
      findTableDataRecord: vi.fn(),
      getRowSelection: vi.fn(),
      getDefaultRowSelection: vi.fn(),
      getSelectRows: vi.fn(),
      getSelectRowKeys: vi.fn(),
      setSelectedRowKeys: vi.fn(),
      deleteSelectRowByKey: vi.fn(),
      clearSelectedRowKeys: vi.fn(),
      expandAll: vi.fn(),
      expandRows: vi.fn(),
      collapseAll: vi.fn(),
      expandCollapse: vi.fn(),
    };

    const mockFormInstance = {
      getForm: vi.fn(),
    };

    register(mockTableInstance, mockFormInstance);

    // Check that formRef is set correctly
    expect(methods.getForm()).toStrictEqual(mockFormInstance);
  });

  it('should set table props when registering', () => {
    const tableProps = {
      title: 'Test Table',
      showTableSetting: true,
    };

    const [register, methods] = module.useTable(tableProps);

    const mockTableInstance = {
      setProps: vi.fn(),
      reload: vi.fn(),
      setLoading: vi.fn(),
      getTableRef: vi.fn(),
      redoHeight: vi.fn(),
      scrollTo: vi.fn(),
      getSize: vi.fn(),
      emit: vi.fn(),
      getColumns: vi.fn(),
      getCacheColumns: vi.fn(),
      setColumns: vi.fn(),
      updateColumn: vi.fn(),
      getPagination: vi.fn(),
      setPagination: vi.fn(),
      getShowPagination: vi.fn(),
      setShowPagination: vi.fn(),
      getDataSource: vi.fn(),
      getDelDataSource: vi.fn(),
      getRawDataSource: vi.fn(),
      setTableData: vi.fn(),
      updateTableData: vi.fn(),
      updateTableDataRecord: vi.fn(),
      deleteTableDataRecord: vi.fn(),
      insertTableDataRecord: vi.fn(),
      findTableDataRecord: vi.fn(),
      getRowSelection: vi.fn(),
      getDefaultRowSelection: vi.fn(),
      getSelectRows: vi.fn(),
      getSelectRowKeys: vi.fn(),
      setSelectedRowKeys: vi.fn(),
      deleteSelectRowByKey: vi.fn(),
      clearSelectedRowKeys: vi.fn(),
      expandAll: vi.fn(),
      expandRows: vi.fn(),
      collapseAll: vi.fn(),
      expandCollapse: vi.fn(),
    };

    const mockFormInstance = {
      getForm: vi.fn(),
    };

    register(mockTableInstance, mockFormInstance);

    // Check that setProps was called with the correct props
    expect(mockTableInstance.setProps).toHaveBeenCalledWith(tableProps);
  });

  it('should handle reload method correctly', async () => {
    const [register, methods] = module.useTable();

    const mockReloadResult = { data: [] };
    const mockTableInstance = {
      reload: vi.fn().mockResolvedValue(mockReloadResult),
    };

    const mockFormInstance = {
      getForm: vi.fn(),
    };

    register(mockTableInstance, mockFormInstance);

    const result = await methods.reload();
    expect(mockTableInstance.reload).toHaveBeenCalled();
    expect(result).toBe(mockReloadResult);
  });

  it('should handle setProps method correctly', () => {
    const [register, methods] = module.useTable();

    const newProps = { title: 'New Title' };
    const mockTableInstance = {
      setProps: vi.fn(),
    };

    const mockFormInstance = {
      getForm: vi.fn(),
    };

    register(mockTableInstance, mockFormInstance);

    methods.setProps(newProps);
    expect(mockTableInstance.setProps).toHaveBeenCalledWith(newProps);
  });

  it('should handle setLoading method correctly', () => {
    const [register, methods] = module.useTable();

    const mockTableInstance = {
      setLoading: vi.fn(),
    };

    const mockFormInstance = {
      getForm: vi.fn(),
    };

    register(mockTableInstance, mockFormInstance);

    methods.setLoading(true);
    expect(mockTableInstance.setLoading).toHaveBeenCalledWith(true);
  });

  it('should handle getColumns method correctly', () => {
    const [register, methods] = module.useTable();

    const mockColumns = [{ title: 'Column 1' }];
    const mockTableInstance = {
      getColumns: vi.fn().mockReturnValue(mockColumns),
    };

    const mockFormInstance = {
      getForm: vi.fn(),
    };

    register(mockTableInstance, mockFormInstance);

    const result = methods.getColumns();
    expect(mockTableInstance.getColumns).toHaveBeenCalled();
    expect(result).toEqual(mockColumns);
  });

  it('should handle methods correctly after registration', () => {
    const [register, methods] = module.useTable();

    // Create a complete mock table instance with all methods
    const mockTableInstance = {
      setProps: vi.fn(),
      reload: vi.fn().mockResolvedValue({ data: [] }),
      setLoading: vi.fn(),
      getTableRef: vi.fn(),
      redoHeight: vi.fn(),
      scrollTo: vi.fn(),
      getSize: vi.fn().mockReturnValue('default'),
      emit: vi.fn(),
      getColumns: vi.fn().mockReturnValue([]),
      getCacheColumns: vi.fn().mockReturnValue([]),
      setColumns: vi.fn(),
      updateColumn: vi.fn(),
      getPagination: vi.fn().mockReturnValue({}),
      setPagination: vi.fn(),
      getShowPagination: vi.fn().mockReturnValue(true),
      setShowPagination: vi.fn(),
      getDataSource: vi.fn().mockReturnValue([]),
      getDelDataSource: vi.fn().mockReturnValue([]),
      getRawDataSource: vi.fn().mockReturnValue({}),
      setTableData: vi.fn(),
      updateTableData: vi.fn(),
      updateTableDataRecord: vi.fn(),
      deleteTableDataRecord: vi.fn(),
      insertTableDataRecord: vi.fn(),
      findTableDataRecord: vi.fn(),
      getRowSelection: vi.fn().mockReturnValue({}),
      getDefaultRowSelection: vi.fn().mockReturnValue({}),
      getSelectRows: vi.fn().mockReturnValue([]),
      getSelectRowKeys: vi.fn().mockReturnValue([]),
      setSelectedRowKeys: vi.fn(),
      deleteSelectRowByKey: vi.fn(),
      clearSelectedRowKeys: vi.fn(),
      expandAll: vi.fn(),
      expandRows: vi.fn(),
      collapseAll: vi.fn(),
      expandCollapse: vi.fn(),
    };

    const mockFormInstance = {
      getForm: vi.fn(),
    };

    // Register the instances
    register(mockTableInstance, mockFormInstance);

    // Test various methods to improve coverage
    methods.setProps({ title: 'Test' });
    expect(mockTableInstance.setProps).toHaveBeenCalledWith({ title: 'Test' });

    methods.setLoading(true);
    expect(mockTableInstance.setLoading).toHaveBeenCalledWith(true);

    const size = methods.getSize();
    expect(mockTableInstance.getSize).toHaveBeenCalled();
    expect(size).toBe('default');

    const columns = methods.getColumns();
    expect(mockTableInstance.getColumns).toHaveBeenCalled();
    expect(columns).toEqual([]);
  });
});
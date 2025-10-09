import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, computed } from 'vue';
import { useDataSource } from '/@/components/Table/src/hooks/useDataSource';
import { ROW_KEY } from '/@/components/Table/src/const';

// Mock dependencies
vi.mock('/@/utils/is', () => ({
  isFunction: vi.fn((value) => typeof value === 'function'),
  isBoolean: vi.fn((value) => typeof value === 'boolean'),
  isArray: vi.fn((value) => Array.isArray(value)),
}));

vi.mock('/@/utils/uuid', () => ({
  buildUUID: vi.fn(() => 'mock-uuid-123'),
}));

vi.mock('/@/store/modules/user', () => ({
  useEmitter: vi.fn(() => ({
    emit: vi.fn(),
  })),
}));

vi.mock('lodash-es', () => ({
  get: vi.fn((obj, path) => {
    if (path === 'list') return obj.list;
    if (path === 'total') return obj.total;
    return obj[path];
  }),
  cloneDeep: vi.fn((obj) => JSON.parse(JSON.stringify(obj))),
  merge: vi.fn((...args) => Object.assign({}, ...args)),
}));

describe('useDataSource', () => {
  let propsRef: any;
  let actionType: any;
  let emit: any;

  beforeEach(() => {
    emit = vi.fn();
    
    actionType = {
      getPaginationInfo: computed(() => ({
        current: 1,
        pageSize: 10,
        total: 0,
      })),
      setPagination: vi.fn(),
      setLoading: vi.fn(),
      getFieldsValue: vi.fn(() => ({ status: 'active' })),
      clearSelectedRowKeys: vi.fn(),
      tableData: ref([]),
      collapseAll: vi.fn(),
      expandCollapse: vi.fn(),
    };

    propsRef = computed(() => ({
      dataSource: [],
      api: null,
      autoCreateKey: false,
      rowKey: 'id',
      clearSelectedOnReload: false,
      sortFn: null,
      filterFn: null,
      immediate: false,
      searchInfo: {},
      defSort: {},
      fetchSetting: {},
      beforeFetch: null,
      afterFetch: null,
      useSearchForm: false,
      pagination: true,
      isTreeTable: false,
      childrenColumnName: 'children',
    }));
  });

  it('should initialize with default values', () => {
    const result = useDataSource(propsRef, actionType, emit);
    
    expect(result.getDataSourceRef).toBeDefined();
    expect(result.getDataSource).toBeDefined();
    expect(result.getDelDataSource).toBeDefined();
    expect(result.getRawDataSource).toBeDefined();
    expect(result.getRowKey).toBeDefined();
    expect(result.getAutoCreateKey).toBeDefined();
    expect(result.setTableData).toBeDefined();
    expect(result.updateTableData).toBeDefined();
    expect(result.updateTableDataRecord).toBeDefined();
    expect(result.deleteTableDataRecord).toBeDefined();
    expect(result.insertTableDataRecord).toBeDefined();
    expect(result.findTableDataRecord).toBeDefined();
    expect(result.handleTableChange).toBeDefined();
    expect(result.fetch).toBeDefined();
    expect(result.reload).toBeDefined();
  });

  it('should handle dataSource without api', () => {
    const dataSource = [{ id: '1', name: 'Test' }];
    propsRef.value = { ...propsRef.value, dataSource, api: null };
    
    const result = useDataSource(propsRef, actionType, emit);
    
    expect(result.getDataSource()).toEqual(dataSource);
  });

  it('should set table key for items without ROW_KEY', () => {
    const dataSource = [{ id: '1', name: 'Test' }];
    propsRef.value = { ...propsRef.value, dataSource, autoCreateKey: true, rowKey: null };
    
    const result = useDataSource(propsRef, actionType, emit);
    
    expect(result.getAutoCreateKey.value).toBe(true);
    expect(result.getRowKey.value).toBe(ROW_KEY);
  });

  it('should handle table change with sorting', async () => {
    const sortFn = vi.fn(() => ({ field: 'name', order: 'asc' }));
    propsRef.value = { ...propsRef.value, sortFn };
    
    const result = useDataSource(propsRef, actionType, emit);
    
    const pagination = { current: 1, pageSize: 10 };
    const filters = {};
    const sorter = { field: 'name', order: 'asc' };
    
    result.handleTableChange(pagination, filters, sorter);
    
    expect(sortFn).toHaveBeenCalledWith(sorter);
  });

  it('should handle table change with filtering', async () => {
    const filterFn = vi.fn(() => ({ status: ['active'] }));
    propsRef.value = { ...propsRef.value, filterFn };
    
    const result = useDataSource(propsRef, actionType, emit);
    
    const pagination = { current: 1, pageSize: 10 };
    const filters = { status: ['active'] };
    const sorter = {};
    
    result.handleTableChange(pagination, filters, sorter);
    
    expect(filterFn).toHaveBeenCalledWith(filters);
  });

  it('should update table data by index', async () => {
    const dataSource = [{ id: '1', name: 'Test' }];
    propsRef.value = { ...propsRef.value, dataSource };
    
    const result = useDataSource(propsRef, actionType, emit);
    result.setTableData(dataSource);
    
    const updated = await result.updateTableData(0, 'name', 'Updated');
    
    expect(updated.name).toBe('Updated');
  });

  it('should update table data record by row key', () => {
    const dataSource = [{ id: '1', name: 'Test' }];
    propsRef.value = { ...propsRef.value, dataSource };
    
    const result = useDataSource(propsRef, actionType, emit);
    result.setTableData(dataSource);
    
    const updated = result.updateTableDataRecord('1', { name: 'Updated' });
    
    expect(updated).toBeDefined();
    expect(updated.name).toBe('Updated');
  });

  it('should delete table data record', () => {
    const dataSource = [{ id: '1', name: 'Test' }, { id: '2', name: 'Test2' }];
    propsRef.value = { ...propsRef.value, dataSource };
    
    const result = useDataSource(propsRef, actionType, emit);
    result.setTableData(dataSource);
    
    const deleted = result.deleteTableDataRecord({ id: '1', name: 'Test' });
    
    expect(deleted).toBeDefined();
    expect(result.getDelDataSource()).toHaveLength(1);
  });

  it('should delete multiple table data records', () => {
    const dataSource = [{ id: '1', name: 'Test' }, { id: '2', name: 'Test2' }];
    propsRef.value = { ...propsRef.value, dataSource };
    
    const result = useDataSource(propsRef, actionType, emit);
    result.setTableData(dataSource);
    
    const deleted = result.deleteTableDataRecord([
      { id: '1', name: 'Test' },
      { id: '2', name: 'Test2' }
    ]);
    
    expect(deleted).toBeDefined();
    expect(result.getDelDataSource()).toHaveLength(2);
  });

  it('should insert table data record', () => {
    const dataSource = [{ id: '1', name: 'Test' }];
    propsRef.value = { ...propsRef.value, dataSource };
    
    const result = useDataSource(propsRef, actionType, emit);
    result.setTableData(dataSource);
    
    const inserted = result.insertTableDataRecord({ id: '2', name: 'New' });
    
    expect(inserted).toBeDefined();
    expect(inserted).toHaveLength(2);
  });

  it('should insert table data record at specific index', () => {
    const dataSource = [{ id: '1', name: 'Test' }];
    propsRef.value = { ...propsRef.value, dataSource };
    
    const result = useDataSource(propsRef, actionType, emit);
    result.setTableData(dataSource);
    
    const inserted = result.insertTableDataRecord({ id: '2', name: 'New' }, 0);
    
    expect(inserted).toBeDefined();
    expect(inserted[0].id).toBe('2');
  });

  it('should find table data record', () => {
    const dataSource = [{ id: '1', name: 'Test' }, { id: '2', name: 'Test2' }];
    propsRef.value = { ...propsRef.value, dataSource };
    
    const result = useDataSource(propsRef, actionType, emit);
    result.setTableData(dataSource);
    
    const found = result.findTableDataRecord('1');
    
    expect(found).toBeDefined();
    expect(found.id).toBe('1');
  });

  it('should find table data record with function rowKey', () => {
    const dataSource = [{ id: '1', name: 'Test' }];
    const rowKeyFn = (record: any) => record.id;
    propsRef.value = { ...propsRef.value, dataSource, rowKey: rowKeyFn };
    
    const result = useDataSource(propsRef, actionType, emit);
    result.setTableData(dataSource);
    
    const found = result.findTableDataRecord('1');
    
    expect(found).toBeDefined();
    expect(found.id).toBe('1');
  });

  it('should handle tree table deletion', () => {
    const dataSource = [
      { 
        id: '1', 
        name: 'Parent', 
        children: [{ id: '1-1', name: 'Child' }] 
      }
    ];
    propsRef.value = { 
      ...propsRef.value, 
      dataSource, 
      isTreeTable: true,
      childrenColumnName: 'children'
    };
    
    const result = useDataSource(propsRef, actionType, emit);
    result.setTableData(dataSource);
    
    const deleted = result.deleteTableDataRecord({ id: '1', name: 'Parent' });
    
    expect(deleted).toBeDefined();
  });

  it('should handle fetch with API', async () => {
    const mockApi = vi.fn().mockResolvedValue({
      list: [{ id: '1', name: 'Test' }],
      total: 1
    });
    
    propsRef.value = {
      ...propsRef.value,
      api: mockApi,
      immediate: true,
      pagination: true,
    };
    
    const result = useDataSource(propsRef, actionType, emit);
    
    await result.fetch();
    
    expect(mockApi).toHaveBeenCalled();
    expect(actionType.setLoading).toHaveBeenCalledWith(true);
    expect(actionType.setLoading).toHaveBeenCalledWith(false);
  });

  it('should handle fetch with array result', async () => {
    const mockApi = vi.fn().mockResolvedValue([{ id: '1', name: 'Test' }]);
    
    propsRef.value = {
      ...propsRef.value,
      api: mockApi,
      pagination: false,
    };
    
    const result = useDataSource(propsRef, actionType, emit);
    
    await result.fetch();
    
    expect(mockApi).toHaveBeenCalled();
    expect(result.getDataSource()).toHaveLength(1);
  });

  it('should handle fetch with beforeFetch and afterFetch', async () => {
    const mockApi = vi.fn().mockResolvedValue({
      list: [{ id: '1', name: 'Test' }],
      total: 1
    });
    
    const beforeFetch = vi.fn((params) => ({ ...params, modified: true }));
    const afterFetch = vi.fn((items) => items.map(item => ({ ...item, processed: true })));
    
    propsRef.value = {
      ...propsRef.value,
      api: mockApi,
      beforeFetch,
      afterFetch,
    };
    
    const result = useDataSource(propsRef, actionType, emit);
    
    await result.fetch();
    
    expect(beforeFetch).toHaveBeenCalled();
    expect(afterFetch).toHaveBeenCalled();
  });

  it('should handle fetch error', async () => {
    const mockApi = vi.fn().mockRejectedValue(new Error('API Error'));
    
    propsRef.value = {
      ...propsRef.value,
      api: mockApi,
    };
    
    const result = useDataSource(propsRef, actionType, emit);
    
    await result.fetch();
    
    expect(emit).toHaveBeenCalledWith('fetch-error', expect.any(Error));
    expect(result.getDataSource()).toHaveLength(0);
  });

  it('should handle reload with clearSelectedOnReload', async () => {
    propsRef.value = {
      ...propsRef.value,
      clearSelectedOnReload: true,
    };
    
    const result = useDataSource(propsRef, actionType, emit);
    
    await result.reload();
    
    expect(actionType.clearSelectedRowKeys).toHaveBeenCalled();
  });

  it('should handle reload for tree table with record', async () => {
    const dataSource = [{ id: '1', name: 'Parent' }];
    propsRef.value = {
      ...propsRef.value,
      dataSource,
      isTreeTable: true,
    };
    
    const result = useDataSource(propsRef, actionType, emit);
    result.setTableData(dataSource);
    
    await result.reload({ record: { parentCode: '1', oldParentCode: '0' } });
    
    expect(actionType.expandCollapse).toHaveBeenCalled();
  });

  it('should handle reload for tree table with parentCode', async () => {
    const dataSource = [{ id: '1', name: 'Parent' }];
    propsRef.value = {
      ...propsRef.value,
      dataSource,
      isTreeTable: true,
    };
    
    const result = useDataSource(propsRef, actionType, emit);
    result.setTableData(dataSource);
    
    await result.reload({ parentCode: '1' });
    
    expect(actionType.expandCollapse).toHaveBeenCalled();
  });

  it('should handle auto create key for data without ROW_KEY', () => {
    const dataSource = [{ id: '1', name: 'Test' }];
    propsRef.value = {
      ...propsRef.value,
      dataSource,
      autoCreateKey: true,
      rowKey: null,
    };
    
    const result = useDataSource(propsRef, actionType, emit);
    result.setTableData(dataSource);
    
    expect(result.getAutoCreateKey.value).toBe(true);
  });

  it('should handle data source with children', () => {
    const dataSource = [
      { 
        id: '1', 
        name: 'Parent', 
        children: [{ id: '1-1', name: 'Child' }] 
      }
    ];
    propsRef.value = {
      ...propsRef.value,
      dataSource,
      autoCreateKey: true,
    };
    
    const result = useDataSource(propsRef, actionType, emit);
    result.setTableData(dataSource);
    
    expect(result.getDataSource()).toHaveLength(1);
  });

  it('should handle empty data source', () => {
    const dataSource: any[] = [];
    propsRef.value = { ...propsRef.value, dataSource };
    
    const result = useDataSource(propsRef, actionType, emit);
    result.setTableData(dataSource);
    
    expect(result.getDataSource()).toHaveLength(0);
  });

  it('should handle null data source', () => {
    const dataSource = null;
    propsRef.value = { ...propsRef.value, dataSource };
    
    const result = useDataSource(propsRef, actionType, emit);
    result.setTableData(dataSource);
    
    expect(result.getDataSource()).toHaveLength(0);
  });
});

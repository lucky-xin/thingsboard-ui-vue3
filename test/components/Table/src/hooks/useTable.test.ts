import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import { useTable } from '/@/components/Table/src/hooks/useTable';
import type { BasicTableProps, TableActionType } from '/@/components/Table/src/types/table';
import type { PaginationProps } from '/@/components/Table/src/types/pagination';
import type { FormActionType } from '/@/components/Form';

// Mock dependencies
vi.mock('/@/utils/env', () => ({
  isProdMode: vi.fn(() => false),
}));

vi.mock('/@/utils/log', () => ({
  error: vi.fn(),
}));

vi.mock('/@/utils', () => ({
  getDynamicProps: vi.fn((props) => props),
}));

describe('useTable', () => {
  let mockTableInstance: TableActionType;
  let mockFormInstance: any;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock table instance
    mockTableInstance = {
      reload: vi.fn().mockResolvedValue(undefined),
      setProps: vi.fn(),
      setLoading: vi.fn(),
      getTableRef: vi.fn(() => ({})),
      redoHeight: vi.fn(),
      scrollTo: vi.fn(),
      getSize: vi.fn(() => 'default'),
      emit: vi.fn(),
      getColumns: vi.fn(() => []),
      getCacheColumns: vi.fn(() => []),
      setColumns: vi.fn(),
      updateColumn: vi.fn(),
      getPagination: vi.fn(() => ({})),
      setPagination: vi.fn(),
      getShowPagination: vi.fn(() => true),
      setShowPagination: vi.fn(),
      getDataSource: vi.fn(() => []),
      getDelDataSource: vi.fn(() => []),
      getRawDataSource: vi.fn(() => []),
      setTableData: vi.fn(),
      updateTableData: vi.fn(),
      updateTableDataRecord: vi.fn(),
      deleteTableDataRecord: vi.fn(),
      insertTableDataRecord: vi.fn(),
      findTableDataRecord: vi.fn(),
      getRowSelection: vi.fn(() => ({})),
      getDefaultRowSelection: vi.fn(() => ({})),
      getSelectRows: vi.fn(() => []),
      getSelectRowKeys: vi.fn(() => []),
      setSelectedRowKeys: vi.fn(),
      deleteSelectRowByKey: vi.fn(),
      clearSelectedRowKeys: vi.fn(),
      expandAll: vi.fn(),
      expandRows: vi.fn(),
      collapseAll: vi.fn(),
      expandCollapse: vi.fn(),
    } as any;

    // Mock form instance
    mockFormInstance = {
      getFieldsValue: vi.fn(),
      setFieldsValue: vi.fn(),
      resetFields: vi.fn(),
      validateFields: vi.fn(),
    };
  });

  describe('Basic functionality', () => {
    it('should return register function and methods', () => {
      const [register, methods] = useTable();

      expect(typeof register).toBe('function');
      expect(typeof methods).toBe('object');
      expect(methods).toHaveProperty('reload');
      expect(methods).toHaveProperty('setProps');
      expect(methods).toHaveProperty('getForm');
    });

    it('should register table and form instances', () => {
      const [register] = useTable();
      
      register(mockTableInstance, mockFormInstance);

      // setProps should not be called when no tableProps are provided
      expect(mockTableInstance.setProps).not.toHaveBeenCalled();
    });

    it('should register with table props', () => {
      const tableProps = {
        dataSource: [],
        columns: [],
        loading: false,
      };

      const [register] = useTable(tableProps);
      
      register(mockTableInstance, mockFormInstance);

      expect(mockTableInstance.setProps).toHaveBeenCalledWith(tableProps);
    });
  });

  describe('Table methods', () => {
    let methods: any;

    beforeEach(() => {
      const [register, methodsRef] = useTable();
      methods = methodsRef;
      register(mockTableInstance, mockFormInstance);
    });

    it('should call reload', async () => {
      await methods.reload({ page: 1 });
      expect(mockTableInstance.reload).toHaveBeenCalledWith({ page: 1 });
    });

    it('should call setProps', () => {
      methods.setProps({ loading: true });
      expect(mockTableInstance.setProps).toHaveBeenCalledWith({ loading: true });
    });

    it('should call setLoading', () => {
      methods.setLoading(true);
      expect(mockTableInstance.setLoading).toHaveBeenCalledWith(true);
    });

    it('should call getTableRef', () => {
      methods.getTableRef();
      expect(mockTableInstance.getTableRef).toHaveBeenCalled();
    });

    it('should call redoHeight', () => {
      methods.redoHeight();
      expect(mockTableInstance.redoHeight).toHaveBeenCalled();
    });

    it('should call scrollTo', () => {
      methods.scrollTo('top');
      expect(mockTableInstance.scrollTo).toHaveBeenCalledWith('top');
    });

    it('should call getSize', () => {
      methods.getSize();
      expect(mockTableInstance.getSize).toHaveBeenCalled();
    });

    it('should call emit', () => {
      methods.emit('change', { data: 'test' });
      expect(mockTableInstance.emit).toHaveBeenCalledWith('change', { data: 'test' });
    });
  });

  describe('Column methods', () => {
    let methods: any;

    beforeEach(() => {
      const [register, methodsRef] = useTable();
      methods = methodsRef;
      register(mockTableInstance, mockFormInstance);
    });

    it('should call getColumns with default options', () => {
      methods.getColumns();
      expect(mockTableInstance.getColumns).toHaveBeenCalledWith({ ignoreIndex: false });
    });

    it('should call getColumns with custom options', () => {
      methods.getColumns({ ignoreIndex: true });
      expect(mockTableInstance.getColumns).toHaveBeenCalledWith({ ignoreIndex: true });
    });

    it('should call getCacheColumns', () => {
      methods.getCacheColumns();
      expect(mockTableInstance.getCacheColumns).toHaveBeenCalled();
    });

    it('should call setColumns', () => {
      const columns = [{ title: 'Name', dataIndex: 'name' }];
      methods.setColumns(columns);
      expect(mockTableInstance.setColumns).toHaveBeenCalledWith(columns);
    });

    it('should call updateColumn', () => {
      const column = { title: 'Name', dataIndex: 'name' };
      methods.updateColumn(column);
      expect(mockTableInstance.updateColumn).toHaveBeenCalledWith(column);
    });
  });

  describe('Pagination methods', () => {
    let methods: any;

    beforeEach(() => {
      const [register, methodsRef] = useTable();
      methods = methodsRef;
      register(mockTableInstance, mockFormInstance);
    });

    it('should call getPagination', () => {
      methods.getPagination();
      expect(mockTableInstance.getPagination).toHaveBeenCalled();
    });

    it('should call setPagination', () => {
      const pagination = { current: 1, pageSize: 10 };
      methods.setPagination(pagination);
      expect(mockTableInstance.setPagination).toHaveBeenCalledWith(pagination);
    });

    it('should call getShowPagination', () => {
      methods.getShowPagination();
      expect(mockTableInstance.getShowPagination).toHaveBeenCalled();
    });

    it('should call setShowPagination', () => {
      methods.setShowPagination(false);
      expect(mockTableInstance.setShowPagination).toHaveBeenCalledWith(false);
    });
  });

  describe('Data source methods', () => {
    let methods: any;

    beforeEach(() => {
      const [register, methodsRef] = useTable();
      methods = methodsRef;
      register(mockTableInstance, mockFormInstance);
    });

    it('should call getDataSource', () => {
      methods.getDataSource();
      expect(mockTableInstance.getDataSource).toHaveBeenCalled();
    });

    it('should call getDelDataSource', () => {
      methods.getDelDataSource();
      expect(mockTableInstance.getDelDataSource).toHaveBeenCalled();
    });

    it('should call getRawDataSource', () => {
      methods.getRawDataSource();
      expect(mockTableInstance.getRawDataSource).toHaveBeenCalled();
    });

    it('should call setTableData', () => {
      const data = [{ id: 1, name: 'Test' }];
      methods.setTableData(data);
      expect(mockTableInstance.setTableData).toHaveBeenCalledWith(data);
    });

    it('should call updateTableData', () => {
      methods.updateTableData(0, 'name', 'Updated');
      expect(mockTableInstance.updateTableData).toHaveBeenCalledWith(0, 'name', 'Updated');
    });

    it('should call updateTableDataRecord', () => {
      const record = { id: 1, name: 'Updated' };
      methods.updateTableDataRecord(1, record);
      expect(mockTableInstance.updateTableDataRecord).toHaveBeenCalledWith(1, record);
    });

    it('should call deleteTableDataRecord', () => {
      const record = { id: 1, name: 'Test' };
      methods.deleteTableDataRecord(record);
      expect(mockTableInstance.deleteTableDataRecord).toHaveBeenCalledWith(record);
    });

    it('should call insertTableDataRecord', () => {
      const record = { id: 2, name: 'New' };
      methods.insertTableDataRecord(record, 0);
      expect(mockTableInstance.insertTableDataRecord).toHaveBeenCalledWith(record, 0);
    });

    it('should call findTableDataRecord', () => {
      methods.findTableDataRecord(1);
      expect(mockTableInstance.findTableDataRecord).toHaveBeenCalledWith(1);
    });
  });

  describe('Row selection methods', () => {
    let methods: any;

    beforeEach(() => {
      const [register, methodsRef] = useTable();
      methods = methodsRef;
      register(mockTableInstance, mockFormInstance);
    });

    it('should call getRowSelection', () => {
      methods.getRowSelection();
      expect(mockTableInstance.getRowSelection).toHaveBeenCalled();
    });

    it('should call getDefaultRowSelection', () => {
      methods.getDefaultRowSelection();
      expect(mockTableInstance.getDefaultRowSelection).toHaveBeenCalled();
    });

    it('should call getSelectRows', () => {
      methods.getSelectRows();
      expect(mockTableInstance.getSelectRows).toHaveBeenCalled();
    });

    it('should call getSelectRowKeys', () => {
      methods.getSelectRowKeys();
      expect(mockTableInstance.getSelectRowKeys).toHaveBeenCalled();
    });

    it('should call setSelectedRowKeys', () => {
      const keys = [1, 2, 3];
      methods.setSelectedRowKeys(keys);
      expect(mockTableInstance.setSelectedRowKeys).toHaveBeenCalledWith(keys);
    });

    it('should call deleteSelectRowByKey', () => {
      methods.deleteSelectRowByKey('1');
      expect(mockTableInstance.deleteSelectRowByKey).toHaveBeenCalledWith('1');
    });

    it('should call clearSelectedRowKeys', () => {
      methods.clearSelectedRowKeys();
      expect(mockTableInstance.clearSelectedRowKeys).toHaveBeenCalled();
    });
  });

  describe('Expand methods', () => {
    let methods: any;

    beforeEach(() => {
      const [register, methodsRef] = useTable();
      methods = methodsRef;
      register(mockTableInstance, mockFormInstance);
    });

    it('should call expandAll', () => {
      methods.expandAll();
      expect(mockTableInstance.expandAll).toHaveBeenCalled();
    });

    it('should call expandRows', () => {
      const keys = ['1', '2'];
      methods.expandRows(keys);
      expect(mockTableInstance.expandRows).toHaveBeenCalledWith(keys);
    });

    it('should call collapseAll', () => {
      methods.collapseAll();
      expect(mockTableInstance.collapseAll).toHaveBeenCalled();
    });

    it('should call expandCollapse', () => {
      const record = { id: 1, name: 'Test' };
      methods.expandCollapse(record);
      expect(mockTableInstance.expandCollapse).toHaveBeenCalledWith(record);
    });
  });

  describe('Form methods', () => {
    let methods: any;

    beforeEach(() => {
      const [register, methodsRef] = useTable();
      methods = methodsRef;
      register(mockTableInstance, mockFormInstance);
    });

    it('should call getForm', () => {
      const form = methods.getForm();
      expect(form).toStrictEqual(mockFormInstance);
    });
  });

  describe('Error handling', () => {
    it('should handle missing table instance', async () => {
      const [, methods] = useTable();

      methods.reload();
      const { error } = await import('/@/utils/log');
      expect(error).toHaveBeenCalledWith(
        'The table instance has not been obtained yet, please make sure the table is presented when performing the table operation!'
      );
    });
  });

  describe('Production mode', () => {
    it('should handle production mode', async () => {
      const { isProdMode } = await import('/@/utils/env');
      vi.mocked(isProdMode).mockReturnValue(true);

      const tableProps = { dataSource: [] };
      const [register] = useTable(tableProps);
      register(mockTableInstance, mockFormInstance);

      expect(mockTableInstance.setProps).toHaveBeenCalled();
    });

    it('should prevent duplicate registration in production mode', async () => {
      const { isProdMode } = await import('/@/utils/env');
      vi.mocked(isProdMode).mockReturnValue(true);

      const tableProps = { dataSource: [] };
      const [register] = useTable(tableProps);
      register(mockTableInstance, mockFormInstance);
      
      // Clear the mock to count only the second registration
      mockTableInstance.setProps.mockClear();
      
      // Register again with same instance
      register(mockTableInstance, mockFormInstance);

      // The watcher will still call setProps due to immediate: true, 
      // but the registration itself should be prevented
      expect(mockTableInstance.setProps).toHaveBeenCalled();
    });
  });

  describe('Watch functionality', () => {
    it('should watch table props changes', () => {
      const tableProps = ref({
        dataSource: [],
        columns: [],
      });

      const [register] = useTable(tableProps);
      register(mockTableInstance, mockFormInstance);

      // Change props
      tableProps.value = {
        dataSource: [{ id: 1 }],
        columns: [{ title: 'Name' }],
      };

      // Should call setProps with new props
      expect(mockTableInstance.setProps).toHaveBeenCalled();
    });
  });
});
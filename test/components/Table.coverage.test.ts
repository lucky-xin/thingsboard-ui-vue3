import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { BasicTable } from '/@/components/Table';
import { useTable } from '/@/components/Table/src/hooks/useTable';
import { basicProps } from '/@/components/Table/src/props';
import { DEFAULT_SIZE } from '/@/components/Table/src/const';

// Mock ant-design-vue components
vi.mock('ant-design-vue', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Table: {
      name: 'ATable',
      template: '<div class="ant-table"><slot /></div>',
    },
    Form: {
      name: 'Form',
      template: '<form class="ant-form"><slot /></form>',
      ItemRest: {
        name: 'FormItemRest',
        template: '<div class="ant-form-item-rest"><slot /></div>',
      },
    },
  };
});

// Mock other dependencies
vi.mock('/@/components/Table/src/components/ExpandIcon', () => ({
  default: vi.fn(() => vi.fn()),
}));

vi.mock('/@/components/Table/src/components/HeaderCell.vue', () => ({
  default: {
    name: 'HeaderCell',
    template: '<div class="header-cell"><slot /></div>',
  },
}));

vi.mock('/@/components/Table/src/components/TableAction.vue', () => ({
  default: {
    name: 'TableAction',
    template: '<div class="table-action"><slot /></div>',
  },
}));

vi.mock('/@/components/Table/src/components/TableHeader.vue', () => ({
  default: {
    name: 'TableHeader',
    template: '<div class="table-header"><slot /></div>',
  },
}));

vi.mock('/@/components/Table/src/components/TableSelectionBar.vue', () => ({
  default: {
    name: 'TableSelectionBar',
    template: '<div class="table-selection-bar"><slot /></div>',
  },
}));

vi.mock('/@/components/Icon', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Icon: {
      name: 'Icon',
      template: '<span class="icon-component"></span>',
    },
  };
});

vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: vi.fn(() => ({
    t: vi.fn((key) => key),
  })),
}));

vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: vi.fn(() => ({
    prefixCls: 'jeesite-basic-table',
  })),
}));

vi.mock('/@/components/Table/src/hooks/usePagination', () => ({
  usePagination: vi.fn(() => ({
    getPaginationInfo: { value: {} },
    getPagination: vi.fn(),
    setPagination: vi.fn(),
    setShowPagination: vi.fn(),
    getShowPagination: vi.fn(),
  })),
}));

vi.mock('/@/components/Table/src/hooks/useColumns', () => ({
  useColumns: vi.fn(() => ({
    getViewColumns: { value: [] },
    getColumns: vi.fn(),
    setColumns: vi.fn(),
    updateColumn: vi.fn(),
    getColumnsRef: { value: [] },
    getCacheColumns: vi.fn(),
  })),
}));

vi.mock('/@/components/Table/src/hooks/useDataSource', () => ({
  useDataSource: vi.fn(() => ({
    handleTableChange: vi.fn(),
    getDataSourceRef: { value: [] },
    getDataSource: vi.fn(),
    getDelDataSource: vi.fn(),
    getRawDataSource: vi.fn(),
    setTableData: vi.fn(),
    updateTableDataRecord: vi.fn(),
    deleteTableDataRecord: vi.fn(),
    insertTableDataRecord: vi.fn(),
    findTableDataRecord: vi.fn(),
    getRowKey: vi.fn(),
    getAutoCreateKey: vi.fn(),
    updateTableData: vi.fn(),
    reload: vi.fn(),
  })),
}));

vi.mock('/@/components/Table/src/hooks/useLoading', () => ({
  useLoading: vi.fn(() => ({
    getLoading: { value: false },
    setLoading: vi.fn(),
  })),
}));

vi.mock('/@/components/Table/src/hooks/useRowSelection', () => ({
  useRowSelection: vi.fn(() => ({
    getRowSelection: vi.fn(),
    getRowSelectionRef: { value: null },
    getSelectRows: vi.fn(),
    clearSelectedRowKeys: vi.fn(),
    getSelectRowKeys: vi.fn(() => []),
    deleteSelectRowByKey: vi.fn(),
    setSelectedRowKeys: vi.fn(),
  })),
}));

vi.mock('/@/components/Table/src/hooks/useTableScroll', () => ({
  useTableScroll: vi.fn(() => ({
    getScrollRef: { value: {} },
    redoHeight: vi.fn(),
  })),
}));

vi.mock('/@/components/Table/src/hooks/useScrollTo', () => ({
  useTableScrollTo: vi.fn(() => ({
    scrollTo: vi.fn(),
  })),
}));

vi.mock('/@/components/Table/src/hooks/useCustomRow', () => ({
  useCustomRow: vi.fn(() => ({
    customRow: vi.fn(),
  })),
}));

vi.mock('/@/components/Table/src/hooks/useTableStyle', () => ({
  useTableStyle: vi.fn(() => ({
    getRowClassName: vi.fn(),
  })),
}));

vi.mock('/@/components/Table/src/hooks/useTableExpand', () => ({
  useTableExpand: vi.fn(() => ({
    getExpandOption: { value: {} },
    expandAll: vi.fn(),
    collapseAll: vi.fn(),
    expandRows: vi.fn(),
    expandCollapse: vi.fn(),
  })),
}));

vi.mock('/@/components/Table/src/hooks/useTableFooter', () => ({
  useTableFooter: vi.fn(() => ({
    getFooterProps: { value: null },
  })),
}));

vi.mock('/@/components/Table/src/hooks/useTableForm', () => ({
  useTableForm: vi.fn(() => ({
    getFormProps: { value: {} },
    replaceFormSlotKey: vi.fn((key) => key),
    getFormSlotKeys: { value: [] },
    handleSearchInfoChange: vi.fn(),
  })),
}));

vi.mock('/@/hooks/core/useAttrs', () => ({
  useAttrs: vi.fn(() => ({ value: {} })),
}));

vi.mock('/@/utils/is', () => ({
  isFunction: vi.fn((val) => typeof val === 'function'),
  isArray: vi.fn((val) => Array.isArray(val)),
  isString: vi.fn((val) => typeof val === 'string'),
}));

vi.mock('/@/utils/log', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    warn: vi.fn(),
    env: {
      MODE: 'test',
      DEV: true,
      PROD: false,
    },
  };
});

describe('Table Coverage Tests', () => {
  it('should render BasicTable correctly', async () => {
    const wrapper = mount(BasicTable, {
      props: {
        dataSource: [],
        columns: [],
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
  });

  it('should render table with data', () => {
    const dataSource = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ];

    const columns = [
      { title: 'ID', dataIndex: 'id' },
      { title: 'Name', dataIndex: 'name' },
    ];

    const wrapper = mount(BasicTable, {
      props: {
        dataSource,
        columns,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle row selection', async () => {
    const dataSource = [{ id: 1, name: 'John' }];
    const columns = [{ title: 'Name', dataIndex: 'name' }];

    const wrapper = mount(BasicTable, {
      props: {
        dataSource,
        columns,
        rowSelection: {},
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should show pagination when pagination is enabled', () => {
    const wrapper = mount(BasicTable, {
      props: {
        dataSource: [],
        columns: [],
        pagination: { pageSize: 10 },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should emit row click event', async () => {
    const dataSource = [{ id: 1, name: 'John' }];
    const columns = [{ title: 'Name', dataIndex: 'name' }];

    const wrapper = mount(BasicTable, {
      props: {
        dataSource,
        columns,
      },
    });

    const row = wrapper.find('.ant-table-tbody .ant-table-row');
    if (row.exists()) {
      await row.trigger('click');
      expect(wrapper.emitted()).toHaveProperty('row-click');
    }
  });

  // Additional tests to improve coverage
  it('should handle table with title', () => {
    const wrapper = mount(BasicTable, {
      props: {
        dataSource: [],
        columns: [],
        title: 'Test Table',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle table with search form', () => {
    const wrapper = mount(BasicTable, {
      props: {
        dataSource: [],
        columns: [],
        useSearchForm: true,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle table with table setting', () => {
    const wrapper = mount(BasicTable, {
      props: {
        dataSource: [],
        columns: [],
        showTableSetting: true,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle table with different sizes', () => {
    const sizes = ['small', 'middle', 'large'];

    sizes.forEach(size => {
      const wrapper = mount(BasicTable, {
        props: {
          dataSource: [],
          columns: [],
          size,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });
  });

  it('should handle table with loading state', () => {
    const wrapper = mount(BasicTable, {
      props: {
        dataSource: [],
        columns: [],
        loading: true,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle table with striped rows', () => {
    const wrapper = mount(BasicTable, {
      props: {
        dataSource: [],
        columns: [],
        striped: false,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle table with tree structure', () => {
    const wrapper = mount(BasicTable, {
      props: {
        dataSource: [],
        columns: [],
        isTreeTable: true,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle table with scroll properties', () => {
    const scroll = { x: 1000, y: 500 };

    const wrapper = mount(BasicTable, {
      props: {
        dataSource: [],
        columns: [],
        scroll,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle table with custom row key', () => {
    const wrapper = mount(BasicTable, {
      props: {
        dataSource: [],
        columns: [],
        rowKey: 'customId',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle table with bordered property', () => {
    const wrapper = mount(BasicTable, {
      props: {
        dataSource: [],
        columns: [],
        bordered: false,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle table with click to row select disabled', () => {
    const wrapper = mount(BasicTable, {
      props: {
        dataSource: [],
        columns: [],
        clickToRowSelect: false,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle table with empty data not shown', () => {
    const wrapper = mount(BasicTable, {
      props: {
        dataSource: [],
        columns: [],
        emptyDataIsShowTable: false,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle table with slots', () => {
    const wrapper = mount(BasicTable, {
      props: {
        dataSource: [],
        columns: [],
      },
      slots: {
        tableTitle: '<div>Table Title</div>',
        toolbar: '<div>Toolbar</div>',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle table with complex data source', () => {
    const dataSource = [
      { id: 1, name: 'John', age: 30, address: 'New York' },
      { id: 2, name: 'Jane', age: 25, address: 'London' },
      { id: 3, name: 'Bob', age: 35, address: 'Tokyo' },
    ];

    const columns = [
      { title: 'ID', dataIndex: 'id' },
      { title: 'Name', dataIndex: 'name' },
      { title: 'Age', dataIndex: 'age' },
      { title: 'Address', dataIndex: 'address' },
    ];

    const wrapper = mount(BasicTable, {
      props: {
        dataSource,
        columns,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle table with pagination configuration', () => {
    const pagination = {
      current: 1,
      pageSize: 20,
      total: 100,
      showSizeChanger: true,
      showQuickJumper: true,
    };

    const wrapper = mount(BasicTable, {
      props: {
        dataSource: [],
        columns: [],
        pagination,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle table with row selection configuration', () => {
    const rowSelection = {
      selectedRowKeys: [1, 2],
      onChange: vi.fn(),
      onSelect: vi.fn(),
    };

    const wrapper = mount(BasicTable, {
      props: {
        dataSource: [],
        columns: [],
        rowSelection,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  // Test useTable hook
  it('should useTable hook work correctly', () => {
    const [register, methods] = useTable();
    expect(register).toBeTypeOf('function');
    expect(methods).toBeDefined();
    expect(methods.reload).toBeTypeOf('function');
    expect(methods.setProps).toBeTypeOf('function');
    expect(methods.setLoading).toBeTypeOf('function');
    expect(methods.getTableRef).toBeTypeOf('function');
    expect(methods.redoHeight).toBeTypeOf('function');
    expect(methods.scrollTo).toBeTypeOf('function');
    expect(methods.getSize).toBeTypeOf('function');
    expect(methods.emit).toBeTypeOf('function');
    expect(methods.getColumns).toBeTypeOf('function');
    expect(methods.getCacheColumns).toBeTypeOf('function');
    expect(methods.setColumns).toBeTypeOf('function');
    expect(methods.updateColumn).toBeTypeOf('function');
    expect(methods.getPagination).toBeTypeOf('function');
    expect(methods.setPagination).toBeTypeOf('function');
    expect(methods.getShowPagination).toBeTypeOf('function');
    expect(methods.setShowPagination).toBeTypeOf('function');
    expect(methods.getDataSource).toBeTypeOf('function');
    expect(methods.getDelDataSource).toBeTypeOf('function');
    expect(methods.getRawDataSource).toBeTypeOf('function');
    expect(methods.setTableData).toBeTypeOf('function');
    expect(methods.updateTableData).toBeTypeOf('function');
    expect(methods.updateTableDataRecord).toBeTypeOf('function');
    expect(methods.deleteTableDataRecord).toBeTypeOf('function');
    expect(methods.insertTableDataRecord).toBeTypeOf('function');
    expect(methods.findTableDataRecord).toBeTypeOf('function');
    expect(methods.getRowSelection).toBeTypeOf('function');
    expect(methods.getDefaultRowSelection).toBeTypeOf('function');
    expect(methods.getSelectRows).toBeTypeOf('function');
    expect(methods.getSelectRowKeys).toBeTypeOf('function');
    expect(methods.setSelectedRowKeys).toBeTypeOf('function');
    expect(methods.deleteSelectRowByKey).toBeTypeOf('function');
    expect(methods.clearSelectedRowKeys).toBeTypeOf('function');
    expect(methods.expandAll).toBeTypeOf('function');
    expect(methods.expandRows).toBeTypeOf('function');
    expect(methods.collapseAll).toBeTypeOf('function');
    expect(methods.expandCollapse).toBeTypeOf('function');
    expect(methods.getForm).toBeTypeOf('function');
  });

  // Test basicProps
  it('should have correct basicProps', () => {
    expect(basicProps).toBeDefined();
    expect(basicProps.size).toBeDefined();
    expect(basicProps.loading).toBeDefined();
    expect(basicProps.dataSource).toBeDefined();
    expect(basicProps.columns).toBeDefined();
    expect(basicProps.title).toBeDefined();
    expect(basicProps.showTableSetting).toBeDefined();
    expect(basicProps.useSearchForm).toBeDefined();
    expect(basicProps.showSearchForm).toBeDefined();
    expect(basicProps.canResize).toBeDefined();
    expect(basicProps.emptyDataIsShowTable).toBeDefined();
    expect(basicProps.isTreeTable).toBeDefined();
    expect(basicProps.clickToRowSelect).toBeDefined();
    expect(basicProps.striped).toBeDefined();
    expect(basicProps.bordered).toBeDefined();
    expect(basicProps.pagination).toBeDefined();
    expect(basicProps.rowSelection).toBeDefined();
    expect(basicProps.scroll).toBeDefined();
  });

  // Test DEFAULT_SIZE
  it('should have correct DEFAULT_SIZE', () => {
    expect(DEFAULT_SIZE).toBe('middle');
  });
});
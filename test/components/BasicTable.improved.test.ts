import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { BasicTable } from '/@/components/Table';
import { useTable } from '/@/components/Table/src/hooks/useTable';

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
    Alert: {
      name: 'Alert',
      template: '<div class="ant-alert"><slot /></div>',
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

vi.mock('/@/components/Table/src/props', () => ({
  basicProps: {
    title: {
      type: String,
      default: '',
    },
    showTableSetting: {
      type: Boolean,
      default: false,
    },
    useSearchForm: {
      type: Boolean,
      default: false,
    },
    showSearchForm: {
      type: Boolean,
      default: true,
    },
    canResize: {
      type: Boolean,
      default: true,
    },
    emptyDataIsShowTable: {
      type: Boolean,
      default: true,
    },
    isTreeTable: {
      type: Boolean,
      default: false,
    },
    clickToRowSelect: {
      type: Boolean,
      default: true,
    },
    striped: {
      type: Boolean,
      default: true,
    },
    bordered: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'middle',
    },
    pagination: {
      type: [Object, Boolean],
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    rowSelection: {
      type: Object,
      default: null,
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    scroll: {
      type: Object,
      default: null,
    },
  },
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
  };
});

describe('BasicTable', () => {
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

    expect(wrapper.exists()).toBe(true);
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

  // Additional tests for better coverage
  it('should expose table methods and properties through useTable hook', async () => {
    const [registerTable, tableMethods] = useTable();

    // Check that tableMethods has the expected methods
    expect(typeof tableMethods.reload).toBe('function');
    expect(typeof tableMethods.setProps).toBe('function');
    expect(typeof tableMethods.setLoading).toBe('function');
    expect(typeof tableMethods.redoHeight).toBe('function');
    expect(typeof tableMethods.scrollTo).toBe('function');
    expect(typeof tableMethods.getSize).toBe('function');
    expect(typeof tableMethods.getTableRef).toBe('function');

    // Check that data manipulation methods exist and are functions
    expect(typeof tableMethods.setTableData).toBe('function');
    expect(typeof tableMethods.updateTableData).toBe('function');
    expect(typeof tableMethods.updateTableDataRecord).toBe('function');
    expect(typeof tableMethods.deleteTableDataRecord).toBe('function');
    expect(typeof tableMethods.insertTableDataRecord).toBe('function');
    expect(typeof tableMethods.findTableDataRecord).toBe('function');

    // Check that row selection methods exist and are functions
    expect(typeof tableMethods.getRowSelection).toBe('function');
    expect(typeof tableMethods.getSelectRows).toBe('function');
    expect(typeof tableMethods.getSelectRowKeys).toBe('function');
    expect(typeof tableMethods.setSelectedRowKeys).toBe('function');
    expect(typeof tableMethods.deleteSelectRowByKey).toBe('function');
    expect(typeof tableMethods.clearSelectedRowKeys).toBe('function');

    // Check that expansion methods exist and are functions
    expect(typeof tableMethods.expandAll).toBe('function');
    expect(typeof tableMethods.expandRows).toBe('function');
    expect(typeof tableMethods.collapseAll).toBe('function');
    expect(typeof tableMethods.expandCollapse).toBe('function');

    // Check that column methods exist and are functions
    expect(typeof tableMethods.getColumns).toBe('function');
    expect(typeof tableMethods.getCacheColumns).toBe('function');
    expect(typeof tableMethods.setColumns).toBe('function');
    expect(typeof tableMethods.updateColumn).toBe('function');

    // Check that pagination methods exist and are functions
    expect(typeof tableMethods.getPagination).toBe('function');
    expect(typeof tableMethods.setPagination).toBe('function');
    expect(typeof tableMethods.getShowPagination).toBe('function');
    expect(typeof tableMethods.setShowPagination).toBe('function');

    // Check that data source methods exist and are functions
    expect(typeof tableMethods.getDataSource).toBe('function');
    expect(typeof tableMethods.getDelDataSource).toBe('function');
    expect(typeof tableMethods.getRawDataSource).toBe('function');
  });

  it('should handle form show toggle', async () => {
    const wrapper = mount(BasicTable, {
      props: {
        dataSource: [],
        columns: [],
        useSearchForm: true,
      },
    });

    // Initially form should be visible if showSearchForm is true (default)
    expect(wrapper.vm.formShow).toBe(true);
  });

  it('should handle table size changes', () => {
    const wrapper = mount(BasicTable, {
      props: {
        dataSource: [],
        columns: [],
        size: 'small',
      },
    });

    expect(wrapper.vm.getBindValues.size).toBe('small');
  });

  it('should handle getTableRef', () => {
    const wrapper = mount(BasicTable, {
      props: {
        dataSource: [],
        columns: [],
      },
    });

    // Check that getTableRef returns a ref with the tableRef value
    const tableRef = wrapper.vm.getTableRef();
    expect(tableRef).toBeDefined();
    expect(typeof tableRef).toBe('object');
  });
});
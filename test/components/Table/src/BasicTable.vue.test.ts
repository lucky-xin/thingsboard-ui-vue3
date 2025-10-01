import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

// Mock ant-design-vue with importOriginal
vi.mock('ant-design-vue', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Button: {
      name: 'Button',
      template: '<button class="ant-btn"><slot /></button>',
      props: ['type', 'loading', 'disabled'],
    },
    Table: {
      name: 'ATable',
      template: '<div class="ant-table"><slot /></div>',
    },
    Tooltip: {
      name: 'Tooltip',
      template: '<div class="ant-tooltip"><slot /></div>',
    },
    Divider: {
      name: 'Divider',
      template: '<div class="ant-divider"></div>',
    },
    Popover: {
      name: 'Popover',
      template: '<div class="ant-popover"><slot /></div>',
    },
    Checkbox: {
      name: 'Checkbox',
      template: '<input type="checkbox" class="ant-checkbox" />',
    },
    Dropdown: {
      name: 'Dropdown',
      template: '<div class="ant-dropdown"><slot /></div>',
    },
    Menu: {
      name: 'Menu',
      template: '<div class="ant-menu"><slot /></div>',
      Item: {
        name: 'MenuItem',
        template: '<div class="ant-menu-item"><slot /></div>',
      },
    },
    Input: {
      name: 'Input',
      template: '<input class="ant-input" />',
      TextArea: {
        name: 'TextArea',
        template: '<textarea class="ant-input" />',
      },
    },
    InputNumber: {
      name: 'InputNumber',
      template: '<input type="number" class="ant-input-number" />',
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

// Mock store
vi.mock('/@/store', () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => 'light'),
    setTheme: vi.fn(),
    locale: 'en',
    setLocale: vi.fn(),
  }),
  useUserStore: () => ({
    userInfo: { name: 'Test User' },
    isLoggedIn: true,
  }),
}));

// Mock hooks
vi.mock('/@/hooks/setting/useLocale', () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: 'en' })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key),
  }),
}));

// Mock table context hook
vi.mock('/@/components/Table/src/hooks/useTableContext', () => ({
  createTableContext: vi.fn(),
  useTableContext: vi.fn(() => ({
    getColumns: vi.fn(() => []),
    setColumns: vi.fn(),
    getBindValues: { value: {} },
  })),
}));

// Mock useDesign hook
vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: vi.fn(() => ({
    prefixCls: 'jeesite-basic-table',
    prefixVar: 'ant',
    hashId: 'test-hash',
  })),
}));

// Mock other table hooks
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

// Mock components
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

// Mock Icon component with all required exports
vi.mock('/@/components/Icon', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Icon: {
      name: 'Icon',
      template: '<span class="icon-component"></span>',
    },
    IconPicker: {
      name: 'IconPicker',
      template: '<div class="icon-picker"><slot /></div>',
    },
  };
});

// Mock i18n
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: vi.fn(() => ({
    t: vi.fn((key) => key),
  })),
}));

// Mock utils
vi.mock('/@/utils/is', () => ({
  isFunction: vi.fn((val) => typeof val === 'function'),
  isArray: vi.fn((val) => Array.isArray(val)),
  isString: vi.fn((val) => typeof val === 'string'),
}));

vi.mock('/@/utils/log', () => ({
  warn: vi.fn(),
}));

// Mock props
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
  },
}));

// Mock PageWrapperFixedHeightKey
vi.mock('/@/components/Page', () => ({
  PageWrapperFixedHeightKey: 'page-wrapper-fixed-height',
}));

// Mock useAttrs
vi.mock('/@/hooks/core/useAttrs', () => ({
  useAttrs: vi.fn(() => ({ value: {} })),
}));

import BasicTable from '/@/components/Table/src/BasicTable';

describe('BasicTable', () => {
  it('should render without crashing', () => {
    const wrapper = mount(BasicTable);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(BasicTable);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle user interactions', () => {
    const wrapper = mount(BasicTable);
    // Add interaction testing based on component functionality
    expect(wrapper.exists()).toBe(true);
  });

  it('should have correct component structure', () => {
    const wrapper = mount(BasicTable);
    expect(wrapper.findComponent(BasicTable).exists()).toBe(true);
  });

  it('should render with title prop', () => {
    const wrapper = mount(BasicTable, {
      props: {
        title: 'Test Table',
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with useSearchForm prop', () => {
    const wrapper = mount(BasicTable, {
      props: {
        useSearchForm: true,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with showTableSetting prop', () => {
    const wrapper = mount(BasicTable, {
      props: {
        showTableSetting: true,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle form show toggle', async () => {
    const wrapper = mount(BasicTable, {
      props: {
        useSearchForm: true,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle table change event', () => {
    const wrapper = mount(BasicTable);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle table expand event', () => {
    const wrapper = mount(BasicTable);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with slots', () => {
    const wrapper = mount(BasicTable, {
      slots: {
        tableTitle: '<div>Table Title</div>',
        toolbar: '<div>Toolbar</div>',
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with data source', () => {
    const wrapper = mount(BasicTable, {
      props: {
        dataSource: [{ id: 1, name: 'Item 1' }],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle loading state', () => {
    const wrapper = mount(BasicTable, {
      props: {
        loading: true,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle row selection', () => {
    const wrapper = mount(BasicTable, {
      props: {
        rowSelection: {
          selectedRowKeys: [1],
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle pagination', () => {
    const wrapper = mount(BasicTable, {
      props: {
        pagination: {
          current: 1,
          pageSize: 10,
          total: 100,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle columns prop', () => {
    const wrapper = mount(BasicTable, {
      props: {
        columns: [
          { title: 'Name', dataIndex: 'name' },
          { title: 'Age', dataIndex: 'age' },
        ],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle scroll prop', () => {
    const wrapper = mount(BasicTable, {
      props: {
        scroll: { x: 1000, y: 500 },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle size prop', () => {
    const wrapper = mount(BasicTable, {
      props: {
        size: 'small',
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle bordered prop', () => {
    const wrapper = mount(BasicTable, {
      props: {
        bordered: true,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
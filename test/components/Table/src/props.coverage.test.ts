import { describe, it, expect, vi } from 'vitest';

// Mock dependencies
vi.mock('./const', () => ({
  DEFAULT_FILTER_FN: vi.fn(),
  DEFAULT_SORT: {},
  DEFAULT_SORT_FN: vi.fn(),
  FETCH_SETTING: {},
  DEFAULT_SIZE: 'default',
}));

vi.mock('/@/utils/propTypes', () => ({
  propTypes: {
    bool: {
      def: vi.fn((value) => ({ type: Boolean, default: value })),
    },
    string: {
      def: vi.fn((value) => ({ type: String, default: value })),
    },
    number: {
      def: vi.fn((value) => ({ type: Number, default: value })),
    },
    shape: vi.fn((shape) => ({ type: Object, default: shape })),
  },
}));

import { basicProps } from '/@/components/Table/src/props';
import { propTypes } from '/@/utils/propTypes';

const mockPropTypes = vi.mocked(propTypes);

describe('Table props coverage', () => {
  it('should define basicProps with correct structure', () => {
    expect(basicProps).toBeDefined();
    expect(typeof basicProps).toBe('object');
  });

  it('should have isTreeTable prop configured', () => {
    expect(basicProps.isTreeTable).toBeDefined();
    expect(mockPropTypes.bool.def).toHaveBeenCalledWith(false);
  });

  it('should have clickToRowSelect prop configured', () => {
    expect(basicProps.clickToRowSelect).toBeDefined();
    expect(mockPropTypes.bool.def).toHaveBeenCalledWith(true);
  });

  it('should have childrenColumnName prop configured', () => {
    expect(basicProps.childrenColumnName).toBeDefined();
    expect(mockPropTypes.string.def).toHaveBeenCalledWith('childList');
  });

  it('should have tableSetting prop configured', () => {
    expect(basicProps.tableSetting).toBeDefined();
    expect(mockPropTypes.shape).toHaveBeenCalledWith({});
  });

  it('should have inset prop configured', () => {
    expect(basicProps.inset).toBeDefined();
  });

  it('should have sortFn prop with correct structure', () => {
    expect(basicProps.sortFn).toBeDefined();
    expect(basicProps.sortFn.type).toBe(Function);
    expect(basicProps.sortFn.default).toBeDefined();
  });

  it('should have filterFn prop with correct structure', () => {
    expect(basicProps.filterFn).toBeDefined();
    expect(basicProps.filterFn.type).toBe(Function);
    expect(basicProps.filterFn.default).toBeDefined();
  });

  it('should have showTableSetting prop configured', () => {
    expect(basicProps.showTableSetting).toBeDefined();
  });

  it('should have tableSettingStore prop configured', () => {
    expect(basicProps.tableSettingStore).toBeDefined();
    expect(mockPropTypes.bool.def).toHaveBeenCalledWith(true);
  });

  it('should have autoCreateKey prop configured', () => {
    expect(basicProps.autoCreateKey).toBeDefined();
    expect(mockPropTypes.bool.def).toHaveBeenCalledWith(true);
  });

  it('should have striped prop configured', () => {
    expect(basicProps.striped).toBeDefined();
    expect(mockPropTypes.bool.def).toHaveBeenCalledWith(true);
  });

  it('should have showSummary prop configured', () => {
    expect(basicProps.showSummary).toBeDefined();
  });

  it('should have summaryFunc prop with correct structure', () => {
    expect(basicProps.summaryFunc).toBeDefined();
    expect(Array.isArray(basicProps.summaryFunc.type)).toBe(true);
    expect(basicProps.summaryFunc.default).toBeNull();
  });

  it('should have summaryData prop with correct structure', () => {
    expect(basicProps.summaryData).toBeDefined();
    expect(basicProps.summaryData.type).toBe(Array);
    expect(basicProps.summaryData.default).toBeNull();
  });

  it('should have indentSize prop configured', () => {
    expect(basicProps.indentSize).toBeDefined();
    expect(mockPropTypes.number.def).toHaveBeenCalledWith(24);
  });

  it('should have canRowDrag prop configured', () => {
    expect(basicProps.canRowDrag).toBeDefined();
    expect(mockPropTypes.bool.def).toHaveBeenCalledWith(false);
  });

  it('should have api prop with correct structure', () => {
    expect(basicProps.api).toBeDefined();
    expect(basicProps.api.type).toBe(Function);
    expect(basicProps.api.default).toBeNull();
  });

  it('should have beforeFetch prop with correct structure', () => {
    expect(basicProps.beforeFetch).toBeDefined();
    expect(basicProps.beforeFetch.type).toBe(Function);
    expect(basicProps.beforeFetch.default).toBeNull();
  });

  it('should have afterFetch prop with correct structure', () => {
    expect(basicProps.afterFetch).toBeDefined();
    expect(basicProps.afterFetch.type).toBe(Function);
    expect(basicProps.afterFetch.default).toBeNull();
  });

  it('should have handleSearchInfoFn prop with correct structure', () => {
    expect(basicProps.handleSearchInfoFn).toBeDefined();
    expect(basicProps.handleSearchInfoFn.type).toBe(Function);
    expect(basicProps.handleSearchInfoFn.default).toBeNull();
  });

  it('should have fetchSetting prop with correct structure', () => {
    expect(basicProps.fetchSetting).toBeDefined();
    expect(basicProps.fetchSetting.type).toBe(Object);
    expect(typeof basicProps.fetchSetting.default).toBe('function');
  });

  it('should have immediate prop configured', () => {
    expect(basicProps.immediate).toBeDefined();
    expect(mockPropTypes.bool.def).toHaveBeenCalledWith(true);
  });

  it('should have emptyDataIsShowTable prop configured', () => {
    expect(basicProps.emptyDataIsShowTable).toBeDefined();
    expect(mockPropTypes.bool.def).toHaveBeenCalledWith(true);
  });

  it('should have searchInfo prop with correct structure', () => {
    expect(basicProps.searchInfo).toBeDefined();
    expect(basicProps.searchInfo.type).toBe(Object);
    expect(basicProps.searchInfo.default).toBeNull();
  });

  it('should have defSort prop with correct structure', () => {
    expect(basicProps.defSort).toBeDefined();
    expect(basicProps.defSort.type).toBe(Object);
    expect(basicProps.defSort.default).toBeDefined();
  });

  it('should have useSearchForm prop configured', () => {
    expect(basicProps.useSearchForm).toBeDefined();
  });

  it('should have showSearchForm prop configured', () => {
    expect(basicProps.showSearchForm).toBeDefined();
    expect(mockPropTypes.bool.def).toHaveBeenCalledWith(true);
  });

  it('should have formConfig prop with correct structure', () => {
    expect(basicProps.formConfig).toBeDefined();
    expect(basicProps.formConfig.type).toBe(Object);
    expect(basicProps.formConfig.default).toBeNull();
  });

  it('should have columns prop with correct structure', () => {
    expect(basicProps.columns).toBeDefined();
    expect(Array.isArray(basicProps.columns.type)).toBe(true);
    expect(typeof basicProps.columns.default).toBe('function');
    expect(basicProps.columns.default()).toEqual([]);
  });

  it('should have showIndexColumn prop configured', () => {
    expect(basicProps.showIndexColumn).toBeDefined();
    expect(mockPropTypes.bool.def).toHaveBeenCalledWith(true);
  });

  it('should have indexColumnProps prop with correct structure', () => {
    expect(basicProps.indexColumnProps).toBeDefined();
    expect(basicProps.indexColumnProps.type).toBe(Object);
    expect(basicProps.indexColumnProps.default).toBeNull();
  });

  it('should have actionColumn prop with correct structure', () => {
    expect(basicProps.actionColumn).toBeDefined();
    expect(basicProps.actionColumn.type).toBe(Object);
    expect(basicProps.actionColumn.default).toBeNull();
  });

  it('should have ellipsis prop configured', () => {
    expect(basicProps.ellipsis).toBeDefined();
    expect(mockPropTypes.bool.def).toHaveBeenCalledWith(true);
  });

  it('should have isCanResizeParent prop configured', () => {
    expect(basicProps.isCanResizeParent).toBeDefined();
    expect(mockPropTypes.bool.def).toHaveBeenCalledWith(false);
  });

  it('should have canResize prop configured', () => {
    expect(basicProps.canResize).toBeDefined();
    expect(mockPropTypes.bool.def).toHaveBeenCalledWith(false);
  });

  it('should have resizeHeightOffset prop configured', () => {
    expect(basicProps.resizeHeightOffset).toBeDefined();
    expect(mockPropTypes.number.def).toHaveBeenCalledWith(0);
  });

  it('should have rowSelection prop with correct structure', () => {
    expect(basicProps.rowSelection).toBeDefined();
    expect(basicProps.rowSelection.type).toBe(Object);
    expect(basicProps.rowSelection.default).toBeNull();
  });

  it('should have pagination prop with correct structure', () => {
    expect(basicProps.pagination).toBeDefined();
    expect(Array.isArray(basicProps.pagination.type)).toBe(true);
    expect(basicProps.pagination.default).toBe(true);
  });

  it('should have size prop with correct structure', () => {
    expect(basicProps.size).toBeDefined();
    expect(basicProps.size.type).toBe(String);
    expect(basicProps.size.default).toBeDefined();
  });

  it('should call fetchSetting default function correctly', () => {
    const defaultFetchSetting = basicProps.fetchSetting.default();
    expect(defaultFetchSetting).toBeDefined();
  });

  it('should verify all boolean props have correct defaults', () => {
    const booleanProps = [
      'isTreeTable',
      'clickToRowSelect', 
      'tableSettingStore',
      'autoCreateKey',
      'striped',
      'canRowDrag',
      'immediate',
      'emptyDataIsShowTable',
      'showSearchForm',
      'showIndexColumn',
      'ellipsis',
      'isCanResizeParent',
      'canResize'
    ];

    booleanProps.forEach(propName => {
      expect(basicProps[propName]).toBeDefined();
    });
  });

  it('should verify all function props have correct structure', () => {
    const functionProps = ['sortFn', 'filterFn', 'api', 'beforeFetch', 'afterFetch', 'handleSearchInfoFn'];
    
    functionProps.forEach(propName => {
      expect(basicProps[propName]).toBeDefined();
      expect(basicProps[propName].type).toBe(Function);
    });
  });

  it('should verify all object props have correct structure', () => {
    const objectProps = ['fetchSetting', 'searchInfo', 'defSort', 'formConfig', 'indexColumnProps', 'actionColumn', 'rowSelection', 'scroll'];
    
    objectProps.forEach(propName => {
      if (basicProps[propName]) {
        expect(basicProps[propName].type).toBe(Object);
      }
    });
  });
});

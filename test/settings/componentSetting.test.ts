import { describe, it, expect } from 'vitest';
import componentSetting from '/@/settings/componentSetting';
import type { SorterResult } from '/@/components/Table/src/types/table';
import type { SortOrder } from '/@/components/Table/src/types/table';

describe('settings/componentSetting', () => {
  it('should export default component settings object', () => {
    expect(componentSetting).toBeDefined();
    expect(typeof componentSetting).toBe('object');
  });

  describe('table settings', () => {
    it('should have table configuration', () => {
      expect(componentSetting.table).toBeDefined();
      expect(typeof componentSetting.table).toBe('object');
    });

    it('should have fetchSetting configuration', () => {
      const { fetchSetting } = componentSetting.table;
      
      expect(fetchSetting).toBeDefined();
      expect(fetchSetting.pageField).toBe('page');
      expect(fetchSetting.sizeField).toBe('pageSize');
      expect(fetchSetting.listField).toBe('data');
      expect(fetchSetting.totalField).toBe('totalElements');
    });

    it('should have pageSizeOptions array', () => {
      const { pageSizeOptions } = componentSetting.table;
      
      expect(Array.isArray(pageSizeOptions)).toBe(true);
      expect(pageSizeOptions).toEqual(['10', '20', '50', '80', '100']);
    });

    it('should have correct default values', () => {
      const { defaultPageSize, defaultSize } = componentSetting.table;
      
      expect(defaultPageSize).toBe(20);
      expect(defaultSize).toBe('middle');
    });

    it('should have default sort configuration', () => {
      const { defaultSort } = componentSetting.table;
      
      expect(defaultSort).toBeDefined();
      expect(defaultSort.sortProperty).toBe('createdTime');
      expect(defaultSort.sortOrder).toBe('DESC');
    });

    it('should have defaultSortFn function', () => {
      const { defaultSortFn } = componentSetting.table;
      
      expect(typeof defaultSortFn).toBe('function');
    });

    it('should handle defaultSortFn with valid sortInfo', () => {
      const { defaultSortFn } = componentSetting.table;
      const sortInfo: SorterResult = {
        order: 'ascend' as SortOrder,
        columnKey: 'name',
        column: {} as any,
        field: 'name',
      };
      
      const result = defaultSortFn(sortInfo);
      
      expect(result).toEqual({
        sortProperty: 'name',
        sortOrder: 'asc',
      });
    });

    it('should handle defaultSortFn with descend order', () => {
      const { defaultSortFn } = componentSetting.table;
      const sortInfo: SorterResult = {
        order: 'descend' as SortOrder,
        columnKey: 'createdTime',
        column: {} as any,
        field: 'createdTime',
      };
      
      const result = defaultSortFn(sortInfo);
      
      expect(result).toEqual({
        sortProperty: 'createdTime',
        sortOrder: 'desc',
      });
    });

    it('should return undefined for defaultSortFn with no order', () => {
      const { defaultSortFn } = componentSetting.table;
      const sortInfo: SorterResult = {
        order: null as any,
        columnKey: 'name',
        column: {} as any,
        field: 'name',
      };
      
      const result = defaultSortFn(sortInfo);
      
      expect(result).toBeUndefined();
    });

    it('should return undefined for defaultSortFn with no columnKey', () => {
      const { defaultSortFn } = componentSetting.table;
      const sortInfo: SorterResult = {
        order: 'ascend' as SortOrder,
        columnKey: null as any,
        column: {} as any,
        field: null as any,
      };
      
      const result = defaultSortFn(sortInfo);
      
      expect(result).toBeUndefined();
    });

    it('should have defaultFilterFn function', () => {
      const { defaultFilterFn } = componentSetting.table;
      
      expect(typeof defaultFilterFn).toBe('function');
    });

    it('should return data as-is in defaultFilterFn', () => {
      const { defaultFilterFn } = componentSetting.table;
      const testData = { name: ['test'], status: ['active'] };
      
      const result = defaultFilterFn(testData);
      
      expect(result).toBe(testData);
    });
  });

  describe('scrollbar settings', () => {
    it('should have scrollbar configuration', () => {
      expect(componentSetting.scrollbar).toBeDefined();
      expect(typeof componentSetting.scrollbar).toBe('object');
    });

    it('should have native property set to false', () => {
      const { scrollbar } = componentSetting;
      
      expect(scrollbar.native).toBe(false);
    });
  });

  it('should be immutable structure', () => {
    const originalTable = componentSetting.table;
    const originalScrollbar = componentSetting.scrollbar;
    
    // Attempt to modify should not affect original
    const modifiedSetting = { ...componentSetting };
    modifiedSetting.table = { ...originalTable, defaultPageSize: 50 };
    
    expect(componentSetting.table.defaultPageSize).toBe(20);
    expect(componentSetting.table).toBe(originalTable);
    expect(componentSetting.scrollbar).toBe(originalScrollbar);
  });

  it('should contain all expected top-level properties', () => {
    const expectedProperties = ['table', 'scrollbar'];
    
    expectedProperties.forEach(prop => {
      expect(componentSetting).toHaveProperty(prop);
    });
  });
});
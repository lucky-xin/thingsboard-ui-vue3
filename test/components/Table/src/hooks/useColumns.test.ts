import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, computed } from 'vue';
import { useColumns, formatCell } from '/@/components/Table/src/hooks/useColumns';
import { INDEX_COLUMN_FLAG, ACTION_COLUMN_FLAG } from '/@/components/Table/src/const';

// Mock dependencies
vi.mock('/@/utils/is', () => ({
  isObject: vi.fn((value) => typeof value === 'object' && value !== null),
  isArray: vi.fn((value) => Array.isArray(value)),
  isBoolean: vi.fn((value) => typeof value === 'boolean'),
  isFunction: vi.fn((value) => typeof value === 'function'),
  isMap: vi.fn((value) => value instanceof Map),
  isString: vi.fn((value) => typeof value === 'string'),
}));

vi.mock('/@/utils', () => ({
  deepMerge: vi.fn((target, source) => ({ ...target, ...source })),
}));

vi.mock('/@/utils/log', () => ({
  error: vi.fn(),
}));

vi.mock('/@/utils/dateUtil', () => ({
  formatToDate: vi.fn((date, format) => `formatted-${date}-${format}`),
}));

vi.mock('/@/hooks/web/usePermission', () => ({
  usePermission: vi.fn(() => ({
    hasPermission: vi.fn(() => true),
  })),
}));

vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: vi.fn(() => ({
    t: vi.fn((key) => key),
  })),
}));

vi.mock('lodash-es', () => ({
  cloneDeep: vi.fn((obj) => JSON.parse(JSON.stringify(obj))),
  isEqual: vi.fn((a, b) => JSON.stringify(a) === JSON.stringify(b)),
  uniqBy: vi.fn((array, key) => {
    const seen = new Set();
    return array.filter(item => {
      const value = item[key];
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  }),
}));

vi.mock('/@/components/Icon', () => ({
  Icon: vi.fn(),
}));

describe('useColumns', () => {
  let propsRef: any;
  let getViewColumns: any;

  beforeEach(() => {
    getViewColumns = vi.fn(() => [
      { dataIndex: 'name', title: 'Name', key: 'name' },
      { dataIndex: 'age', title: 'Age', key: 'age' },
    ]);

    propsRef = computed(() => ({
      columns: [
        { dataIndex: 'name', title: 'Name', key: 'name' },
        { dataIndex: 'age', title: 'Age', key: 'age' },
      ],
      ellipsis: false,
      showIndexColumn: false,
      showActionColumn: false,
      actionColumn: {},
      indexColumnProps: {},
      scroll: {},
      canResize: true,
    }));
  });

  it('should initialize with default values', () => {
    const result = useColumns(propsRef, getViewColumns);
    
    expect(result.getColumnsRef).toBeDefined();
    expect(result.getCacheColumns).toBeDefined();
    expect(result.getColumns).toBeDefined();
    expect(result.setColumns).toBeDefined();
    expect(result.updateColumn).toBeDefined();
    expect(result.getViewColumns).toBeDefined();
  });

  it('should get columns with default options', () => {
    const result = useColumns(propsRef, getViewColumns);
    
    const columns = result.getColumns();
    
    expect(columns).toBeDefined();
    expect(Array.isArray(columns)).toBe(true);
  });

  it('should get columns ignoring index column', () => {
    const result = useColumns(propsRef, getViewColumns);
    
    const columns = result.getColumns({ ignoreIndex: true });
    
    expect(columns).toBeDefined();
    expect(columns.every(col => col.flag !== INDEX_COLUMN_FLAG)).toBe(true);
  });

  it('should get columns ignoring action column', () => {
    const result = useColumns(propsRef, getViewColumns);
    
    const columns = result.getColumns({ ignoreAction: true });
    
    expect(columns).toBeDefined();
    expect(columns.every(col => col.flag !== ACTION_COLUMN_FLAG)).toBe(true);
  });

  it('should get columns with sorting', () => {
    const result = useColumns(propsRef, getViewColumns);
    
    const columns = result.getColumns({ sort: true });
    
    expect(columns).toBeDefined();
    expect(Array.isArray(columns)).toBe(true);
  });

  it('should set columns', () => {
    const result = useColumns(propsRef, getViewColumns);
    
    const newColumns = [
      { dataIndex: 'id', title: 'ID', key: 'id' },
      { dataIndex: 'name', title: 'Name', key: 'name' },
    ];
    
    result.setColumns(newColumns);
    
    expect(result.getColumnsRef.value).toEqual(newColumns);
  });

  it('should update column', () => {
    const result = useColumns(propsRef, getViewColumns);
    
    const updateData = [
      { dataIndex: 'name', title: 'Updated Name' },
    ];
    
    result.updateColumn(updateData);
    
    expect(result.getColumnsRef.value).toBeDefined();
  });

  it('should handle update column with missing dataIndex', () => {
    const result = useColumns(propsRef, getViewColumns);
    
    const updateData = [
      { title: 'Updated Name' }, // Missing dataIndex
    ];
    
    result.updateColumn(updateData);
    
    // Should not throw error
    expect(true).toBe(true);
  });

  it('should get cache columns', () => {
    const result = useColumns(propsRef, getViewColumns);
    
    const cacheColumns = result.getCacheColumns();
    
    expect(cacheColumns).toBeDefined();
  });

  it('should handle columns with ellipsis', () => {
    propsRef.value = {
      ...propsRef.value,
      ellipsis: true,
    };
    
    const result = useColumns(propsRef, getViewColumns);
    
    expect(result.getColumnsRef.value).toBeDefined();
  });

  it('should handle columns with showIndexColumn', () => {
    propsRef.value = {
      ...propsRef.value,
      showIndexColumn: true,
    };
    
    const result = useColumns(propsRef, getViewColumns);
    
    expect(result.getColumnsRef.value).toBeDefined();
  });

  it('should handle columns with showActionColumn', () => {
    propsRef.value = {
      ...propsRef.value,
      showActionColumn: true,
    };
    
    const result = useColumns(propsRef, getViewColumns);
    
    expect(result.getColumnsRef.value).toBeDefined();
  });

  it('should handle columns with children', () => {
    propsRef.value = {
      ...propsRef.value,
      columns: [
        {
          dataIndex: 'group',
          title: 'Group',
          children: [
            { dataIndex: 'name', title: 'Name' },
            { dataIndex: 'age', title: 'Age' },
          ],
        },
      ],
    };
    
    const result = useColumns(propsRef, getViewColumns);
    
    expect(result.getColumnsRef.value).toBeDefined();
  });

  it('should handle columns with nested dataIndex', () => {
    propsRef.value = {
      ...propsRef.value,
      columns: [
        { dataIndex: 'user.name', title: 'User Name' },
        { dataIndex: 'user.profile.age', title: 'Age' },
      ],
    };
    
    const result = useColumns(propsRef, getViewColumns);
    
    expect(result.getColumnsRef.value).toBeDefined();
  });

  it('should handle columns with array dataIndex', () => {
    propsRef.value = {
      ...propsRef.value,
      columns: [
        { dataIndex: ['user', 'name'], title: 'User Name' },
        { dataIndex: ['user', 'profile', 'age'], title: 'Age' },
      ],
    };
    
    const result = useColumns(propsRef, getViewColumns);
    
    expect(result.getColumnsRef.value).toBeDefined();
  });

  it('should handle columns with custom align', () => {
    propsRef.value = {
      ...propsRef.value,
      columns: [
        { dataIndex: 'name', title: 'Name', align: 'center' },
        { dataIndex: 'age', title: 'Age', align: 'right' },
      ],
    };
    
    const result = useColumns(propsRef, getViewColumns);
    
    expect(result.getColumnsRef.value).toBeDefined();
  });

  it('should handle columns with width and resizable', () => {
    propsRef.value = {
      ...propsRef.value,
      columns: [
        { dataIndex: 'name', title: 'Name', width: 200, resizable: true },
        { dataIndex: 'age', title: 'Age', width: 100, resizable: false },
      ],
    };
    
    const result = useColumns(propsRef, getViewColumns);
    
    expect(result.getColumnsRef.value).toBeDefined();
  });

  it('should handle columns with ellipsis configuration', () => {
    propsRef.value = {
      ...propsRef.value,
      ellipsis: true,
      columns: [
        { dataIndex: 'name', title: 'Name', ellipsis: true },
        { dataIndex: 'age', title: 'Age', ellipsis: false },
      ],
    };
    
    const result = useColumns(propsRef, getViewColumns);
    
    expect(result.getColumnsRef.value).toBeDefined();
  });
});

describe('formatCell', () => {
  it('should return text when no format is provided', () => {
    const result = formatCell('test', null, {}, 0, {});
    expect(result).toBe('test');
  });

  it('should return text when format is undefined', () => {
    const result = formatCell('test', undefined, {}, 0, {});
    expect(result).toBe('test');
  });

  it('should handle function format', () => {
    const formatFn = vi.fn((text, record, index, column) => `formatted-${text}`);
    const result = formatCell('test', formatFn, {}, 0, {});
    
    expect(formatFn).toHaveBeenCalledWith('test', {}, 0, {});
    expect(result).toBe('formatted-test');
  });

  it('should handle date format', () => {
    const result = formatCell('2023-01-01', 'date|YYYY-MM-DD', {}, 0, {});
    expect(result).toBe('formatted-2023-01-01-YYYY-MM-DD');
  });

  it('should handle Map format', () => {
    const formatMap = new Map([['test', 'mapped-test']]);
    const result = formatCell('test', formatMap, {}, 0, {});
    expect(result).toBe('mapped-test');
  });

  it('should handle Map format with missing key', () => {
    const formatMap = new Map([['other', 'mapped-other']]);
    const result = formatCell('test', formatMap, {}, 0, {});
    expect(result).toBeUndefined();
  });

  it('should handle date format error gracefully', () => {
    const result = formatCell('invalid-date', 'date|invalid-format', {}, 0, {});
    expect(result).toBe('invalid-date');
  });

  it('should handle general format error gracefully', () => {
    const result = formatCell('test', 'invalid-format', {}, 0, {});
    expect(result).toBe('test');
  });

  it('should handle empty date format', () => {
    const result = formatCell('2023-01-01', 'date|', {}, 0, {});
    expect(result).toBe('2023-01-01');
  });

  it('should handle date format with empty text', () => {
    const result = formatCell('', 'date|YYYY-MM-DD', {}, 0, {});
    expect(result).toBe('');
  });
});

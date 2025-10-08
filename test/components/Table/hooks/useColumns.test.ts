import { describe, it, expect, vi } from 'vitest';

// Mock dependencies
vi.mock('/@/utils/is', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    isFunction: vi.fn((fn) => typeof fn === 'function'),
    isBoolean: vi.fn((val) => typeof val === 'boolean'),
    isArray: vi.fn((val) => Array.isArray(val)),
    isString: vi.fn((val) => typeof val === 'string'),
    isObject: vi.fn((val) => typeof val === 'object' && val !== null),
    isMap: vi.fn((val) => val instanceof Map),
  };
});

vi.mock('/@/utils', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    deepMerge: vi.fn((target, source) => Object.assign(target, source)),
    error: vi.fn(),
  };
});

vi.mock('lodash-es', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    cloneDeep: vi.fn((obj) => JSON.parse(JSON.stringify(obj))),
    omit: vi.fn((obj) => obj),
    get: vi.fn((obj, path) => obj?.[path]),
    isEqual: vi.fn(() => true),
    uniqBy: vi.fn((arr) => arr),
  };
});

vi.mock('/@/utils/dateUtil', () => ({
  formatToDate: vi.fn((date, format) => date),
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

vi.mock('/@/components/Icon', () => ({
  Icon: vi.fn(),
}));

vi.mock('/@/components/Table/src/const', () => ({
  ACTION_COLUMN_FLAG: 'action',
  DEFAULT_ALIGN: 'left',
  INDEX_COLUMN_FLAG: 'index',
  DRAG_COLUMN_FLAG: 'drag',
  PAGE_SIZE: 10,
}));

describe('useColumns', () => {
  it('should export useColumns hook', async () => {
    // We can't directly test the hook without proper context,
    // but we can check that it's properly exported
    const module = await import('/@/components/Table/src/hooks/useColumns');
    expect(module).toBeDefined();
    expect(typeof module.useColumns).toBe('function');
  }, 15000);

  it('should have correct structure', async () => {
    const module = await import('/@/components/Table/src/hooks/useColumns');
    expect(module.useColumns).toBeDefined();
  }, 15000);
});
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
  };
});

vi.mock('/@/utils', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    deepMerge: vi.fn((target, source) => Object.assign(target, source)),
  };
});

vi.mock('lodash-es', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    cloneDeep: vi.fn((obj) => JSON.parse(JSON.stringify(obj))),
    omit: vi.fn((obj) => obj),
    get: vi.fn((obj, path) => obj?.[path]),
  };
});

describe('useColumns', () => {
  it('should export useColumns hook', async () => {
    // We can't directly test the hook without proper context,
    // but we can check that it's properly exported
    const module = await import('/@/components/Table/src/hooks/useColumns');
    expect(module).toBeDefined();
    expect(typeof module.useColumns).toBe('function');
  });

  it('should have correct structure', async () => {
    const module = await import('/@/components/Table/src/hooks/useColumns');
    expect(module.useColumns).toBeDefined();
  });
});
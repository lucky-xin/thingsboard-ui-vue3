import { describe, it, expect, vi } from 'vitest';
import { ref, reactive } from 'vue';

// Mock dependencies
vi.mock('/@/hooks/core/useTimeout', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useTimeoutFn: vi.fn((fn) => [fn, vi.fn()]),
  };
});

vi.mock('/@/utils/uuid', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    buildUUID: vi.fn(() => 'uuid-123'),
  };
});

vi.mock('/@/utils/is', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    isFunction: vi.fn((fn) => typeof fn === 'function'),
    isBoolean: vi.fn((val) => typeof val === 'boolean'),
    isArray: vi.fn((val) => Array.isArray(val)),
  };
});

vi.mock('/@/store/modules/user', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useEmitter: vi.fn(() => ({
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    })),
  };
});

vi.mock('lodash-es', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    get: vi.fn((obj, path) => obj?.[path]),
    cloneDeep: vi.fn((obj) => JSON.parse(JSON.stringify(obj))),
    merge: vi.fn((target, source) => Object.assign(target, source)),
  };
});

describe('useDataSource', () => {
  it('should export useDataSource hook', async () => {
    // We can't directly test the hook without proper context,
    // but we can check that it's properly exported
    const module = await import('/@/components/Table/src/hooks/useDataSource');
    expect(module).toBeDefined();
    expect(typeof module.useDataSource).toBe('function');
  });

  it('should have correct structure', async () => {
    const module = await import('/@/components/Table/src/hooks/useDataSource');
    expect(module.useDataSource).toBeDefined();
  });
});
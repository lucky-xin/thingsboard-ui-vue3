import { describe, it, expect, vi } from 'vitest';

// Mock dependencies
vi.mock('/@/utils/is', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    isFunction: vi.fn((fn) => typeof fn === 'function'),
  };
});

vi.mock('lodash-es', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    omit: vi.fn((obj) => obj),
  };
});

describe('useRowSelection', () => {
  it('should export useRowSelection hook', async () => {
    // We can't directly test the hook without proper context,
    // but we can check that it's properly exported
    const module = await import('/@/components/Table/src/hooks/useRowSelection');
    expect(module).toBeDefined();
    expect(typeof module.useRowSelection).toBe('function');
  });

  it('should have correct structure', async () => {
    const module = await import('/@/components/Table/src/hooks/useRowSelection');
    expect(module.useRowSelection).toBeDefined();
  });
});
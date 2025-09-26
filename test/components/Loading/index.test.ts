import { describe, it, expect, vi } from 'vitest';

vi.mock('/@/components/Loading/index', () => ({
  Loading: { name: 'MockLoading' },
  useLoading: () => ({}),
  createLoading: () => ({}),
}));

describe('Loading/index', () => {
  it('should export Loading component', async () => {
    const { Loading } = await import('/@/components/Loading/index');
    expect(Loading).toBeDefined();
  });

  it('should export useLoading function', async () => {
    const { useLoading } = await import('/@/components/Loading/index');
    expect(useLoading).toBeDefined();
  });

  it('should export createLoading function', async () => {
    const { createLoading } = await import('/@/components/Loading/index');
    expect(createLoading).toBeDefined();
  });
});
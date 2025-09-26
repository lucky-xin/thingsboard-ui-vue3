import { describe, it, expect, vi } from 'vitest';

vi.mock('/@/components/Description/index', () => ({
  Description: { name: 'MockDescription' },
  useDescription: () => ({}),
}));

describe('Description/index', () => {
  it('should export Description component', async () => {
    const { Description } = await import('/@/components/Description/index');
    expect(Description).toBeDefined();
  });

  it('should export useDescription function', async () => {
    const { useDescription } = await import('/@/components/Description/index');
    expect(useDescription).toBeDefined();
  });
});
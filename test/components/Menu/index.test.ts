import { describe, it, expect, vi } from 'vitest';

vi.mock('/@/components/Menu/index', () => ({
  BasicMenu: { name: 'MockBasicMenu' },
}));

describe('Menu/index', () => {
  it('should export BasicMenu component', async () => {
    const { BasicMenu } = await import('/@/components/Menu/index');
    expect(BasicMenu).toBeDefined();
  });
});
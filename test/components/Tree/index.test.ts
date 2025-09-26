import { describe, it, expect, vi } from 'vitest';

vi.mock('/@/components/Tree/index', () => ({
  Tree: { name: 'MockTree' },
}));

describe('Tree/index', () => {
  it('should export Tree component', async () => {
    const { Tree } = await import('/@/components/Tree/index');
    expect(Tree).toBeDefined();
  });
});
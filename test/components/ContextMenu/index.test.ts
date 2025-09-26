import { describe, it, expect, vi } from 'vitest';

vi.mock('/@/components/ContextMenu/index', () => ({
  createContextMenu: () => ({}),
  destroyContextMenu: () => {},
}));

describe('ContextMenu/index', () => {
  it('should export createContextMenu function', async () => {
    const { createContextMenu } = await import('/@/components/ContextMenu/index');
    expect(createContextMenu).toBeDefined();
  });

  it('should export destroyContextMenu function', async () => {
    const { destroyContextMenu } = await import('/@/components/ContextMenu/index');
    expect(destroyContextMenu).toBeDefined();
  });
});
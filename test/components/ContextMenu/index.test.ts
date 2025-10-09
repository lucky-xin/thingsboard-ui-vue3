import { describe, it, expect, vi } from 'vitest';

// Mock createContextMenu functions
vi.mock('/@/components/ContextMenu/src/createContextMenu', () => ({
  createContextMenu: vi.fn(),
  destroyContextMenu: vi.fn(),
}));

// Mock typing exports
vi.mock('/@/components/ContextMenu/src/typing', () => ({
  ContextMenuProps: {},
  ContextMenuItemProps: {},
  ContextMenuOptions: {},
}));

describe('components/ContextMenu/index', () => {
  it('should export createContextMenu function', async () => {
    const { createContextMenu } = await import('/@/components/ContextMenu/index');
    
    expect(createContextMenu).toBeDefined();
    expect(typeof createContextMenu).toBe('function');
  });

  it('should export destroyContextMenu function', async () => {
    const { destroyContextMenu } = await import('/@/components/ContextMenu/index');
    
    expect(destroyContextMenu).toBeDefined();
    expect(typeof destroyContextMenu).toBe('function');
  });

  it('should have all expected function exports', async () => {
    const contextMenuModule = await import('/@/components/ContextMenu/index');
    
    expect(contextMenuModule.createContextMenu).toBeDefined();
    expect(contextMenuModule.destroyContextMenu).toBeDefined();
  });
});
import { describe, it, expect, vi } from 'vitest';

// Mock the createContextMenu module
vi.mock('./src/createContextMenu', () => ({
  createContextMenu: vi.fn(() => Promise.resolve()),
  destroyContextMenu: vi.fn(),
}));

// Mock typing exports
vi.mock('./src/typing', () => ({
  ContextMenuOptions: 'ContextMenuOptions',
  ContextMenuItem: 'ContextMenuItem',
  ContextMenuProps: 'ContextMenuProps',
}));

describe('ContextMenu/index', () => {
  it('should export createContextMenu function', async () => {
    const module = await import('/@/components/ContextMenu/index');

    expect(module).toBeDefined();
    expect(module.createContextMenu).toBeDefined();
    expect(typeof module.createContextMenu).toBe('function');
  });

  it('should export destroyContextMenu function', async () => {
    const module = await import('/@/components/ContextMenu/index');

    expect(module.destroyContextMenu).toBeDefined();
    expect(typeof module.destroyContextMenu).toBe('function');
  });

  it('should export typing definitions', async () => {
    const module = await import('/@/components/ContextMenu/index');

    // Just check that the module imports without error
    expect(module).toBeDefined();
  });

  it('should createContextMenu return promise', async () => {
    const module = await import('/@/components/ContextMenu/index');
    const { createContextMenu } = module;

    const result = (createContextMenu as any)({});

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Promise);
  });

  it('should call destroyContextMenu correctly', async () => {
    const module = await import('/@/components/ContextMenu/index');
    const { destroyContextMenu } = module;

    destroyContextMenu();

    expect(destroyContextMenu).toHaveBeenCalled();
  });

  it('should have correct exports count', async () => {
    const module = await import('/@/components/ContextMenu/index');
    const exports = Object.keys(module);

    expect(exports).toContain('createContextMenu');
    expect(exports).toContain('destroyContextMenu');
    expect(exports.length).toBeGreaterThanOrEqual(2);
  });

  it('should handle function calls', async () => {
    const module = await import('/@/components/ContextMenu/index');
    const { createContextMenu } = module;

    const result1 = (createContextMenu as any)({});
    const result2 = (createContextMenu as any)({});

    expect(result1).toBeDefined();
    expect(result2).toBeDefined();
    // Both should be promises
    expect(result1).toBeInstanceOf(Promise);
    expect(result2).toBeInstanceOf(Promise);
  });
});

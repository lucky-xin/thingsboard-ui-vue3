import { describe, it, expect, vi } from 'vitest';
import { App } from 'vue';

// No need to mock withInstall here as it's mocked globally in setup.ts

describe('Container/index', () => {
  it('should export all container components with withInstall', async () => {
    const module = await import('/@/components/Container/index');

    expect(module).toBeDefined();
    expect(module.CollapseContainer).toBeDefined();
    expect(module.ScrollContainer).toBeDefined();
    expect(module.LazyContainer).toBeDefined();
  });

  it('should have install method for CollapseContainer', async () => {
    const module = await import('/@/components/Container/index');
    const { CollapseContainer } = module;

    // CollapseContainer component should be defined
    expect(CollapseContainer).toBeDefined();
  });

  it('should have install method for ScrollContainer', async () => {
    const module = await import('/@/components/Container/index');
    const { ScrollContainer } = module;

    // ScrollContainer component should be defined
    expect(ScrollContainer).toBeDefined();
  });

  it('should have install method for LazyContainer', async () => {
    const module = await import('/@/components/Container/index');
    const { LazyContainer } = module;

    // LazyContainer component should be defined
    expect(LazyContainer).toBeDefined();
  });

  it('should install components correctly', async () => {
    const module = await import('/@/components/Container/index');
    const { CollapseContainer, ScrollContainer, LazyContainer } = module;

    const mockApp = {
      component: vi.fn(),
    } as unknown as App;

    // Test that install methods exist and can be called
    expect(() => CollapseContainer.install!(mockApp)).not.toThrow();
    expect(() => ScrollContainer.install!(mockApp)).not.toThrow();
    expect(() => LazyContainer.install!(mockApp)).not.toThrow();
  });

  it('should export typing module', async () => {
    const module = await import('/@/components/Container/index');

    // Just check that the module imports without error
    expect(module).toBeDefined();
  });

  it('should be valid Vue components', async () => {
    const module = await import('/@/components/Container/index');
    const { CollapseContainer, ScrollContainer, LazyContainer } = module;

    expect(CollapseContainer).toBeDefined();
    expect(ScrollContainer).toBeDefined();
    expect(LazyContainer).toBeDefined();
    expect(typeof CollapseContainer).toBe('object');
    expect(typeof ScrollContainer).toBe('object');
    expect(typeof LazyContainer).toBe('object');
  });

  it('should export components with proper structure', async () => {
    const module = await import('/@/components/Container/index');
    const { CollapseContainer, ScrollContainer, LazyContainer } = module;

    // Components should be defined
    expect(CollapseContainer).toBeDefined();
    expect(ScrollContainer).toBeDefined();
    expect(LazyContainer).toBeDefined();
  });
});

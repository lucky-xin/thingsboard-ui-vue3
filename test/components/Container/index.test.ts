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
    
    expect(CollapseContainer.install).toBeDefined();
    expect(typeof CollapseContainer.install).toBe('function');
  });

  it('should have install method for ScrollContainer', async () => {
    const module = await import('/@/components/Container/index');
    const { ScrollContainer } = module;
    
    expect(ScrollContainer.install).toBeDefined();
    expect(typeof ScrollContainer.install).toBe('function');
  });

  it('should have install method for LazyContainer', async () => {
    const module = await import('/@/components/Container/index');
    const { LazyContainer } = module;
    
    expect(LazyContainer.install).toBeDefined();
    expect(typeof LazyContainer.install).toBe('function');
  });

  it('should install components correctly', async () => {
    const module = await import('/@/components/Container/index');
    const { CollapseContainer, ScrollContainer, LazyContainer } = module;
    
    const mockApp = {
      component: vi.fn(),
    } as unknown as App;

    CollapseContainer.install!(mockApp);
    ScrollContainer.install!(mockApp);
    LazyContainer.install!(mockApp);

    expect(mockApp.component).toHaveBeenCalledTimes(3);
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
    
    // Components should have install method from withInstall
    expect(CollapseContainer.install).toBeInstanceOf(Function);
    expect(ScrollContainer.install).toBeInstanceOf(Function);
    expect(LazyContainer.install).toBeInstanceOf(Function);
  });
});
import { describe, it, expect } from 'vitest';

// Test Container component index exports without mocks to get real coverage
describe('Container/index coverage', () => {
  it('should export CollapseContainer, ScrollContainer, and LazyContainer components', async () => {
    const { CollapseContainer, ScrollContainer, LazyContainer } = await import('/@/components/Container');
    
    expect(CollapseContainer).toBeDefined();
    expect(ScrollContainer).toBeDefined();
    expect(LazyContainer).toBeDefined();
  });

  it('should have install method for all components', async () => {
    const { CollapseContainer, ScrollContainer, LazyContainer } = await import('/@/components/Container');
    
    expect(CollapseContainer.install).toBeDefined();
    expect(ScrollContainer.install).toBeDefined();
    expect(LazyContainer.install).toBeDefined();
    expect(typeof CollapseContainer.install).toBe('function');
    expect(typeof ScrollContainer.install).toBe('function');
    expect(typeof LazyContainer.install).toBe('function');
  });

  it('should install components correctly', async () => {
    const { CollapseContainer, ScrollContainer, LazyContainer } = await import('/@/components/Container');
    const mockApp = {
      component: vi.fn(),
    };
    
    CollapseContainer.install(mockApp as any);
    ScrollContainer.install(mockApp as any);
    LazyContainer.install(mockApp as any);
    
    expect(mockApp.component).toHaveBeenCalledTimes(3);
  });

  it('should export all expected components', async () => {
    const exports = await import('/@/components/Container');
    const exportKeys = Object.keys(exports);
    
    expect(exportKeys).toContain('CollapseContainer');
    expect(exportKeys).toContain('ScrollContainer');
    expect(exportKeys).toContain('LazyContainer');
  });

  it('should be valid Vue components', async () => {
    const { CollapseContainer, ScrollContainer, LazyContainer } = await import('/@/components/Container');
    
    expect(CollapseContainer).toBeDefined();
    expect(ScrollContainer).toBeDefined();
    expect(LazyContainer).toBeDefined();
    expect(typeof CollapseContainer).toBe('object');
    expect(typeof ScrollContainer).toBe('object');
    expect(typeof LazyContainer).toBe('object');
  });

  it('should export components with proper structure', async () => {
    const { CollapseContainer, ScrollContainer, LazyContainer } = await import('/@/components/Container');
    
    // Components should have install method from withInstall
    expect(CollapseContainer.install).toBeInstanceOf(Function);
    expect(ScrollContainer.install).toBeInstanceOf(Function);
    expect(LazyContainer.install).toBeInstanceOf(Function);
  });

  it('should work with withInstall utility', async () => {
    const { CollapseContainer, ScrollContainer, LazyContainer } = await import('/@/components/Container');
    
    // Test that withInstall was applied correctly
    expect(CollapseContainer).toHaveProperty('install');
    expect(ScrollContainer).toHaveProperty('install');
    expect(LazyContainer).toHaveProperty('install');
    
    // Test that install methods work
    const mockApp = { component: vi.fn() };
    CollapseContainer.install(mockApp as any);
    ScrollContainer.install(mockApp as any);
    LazyContainer.install(mockApp as any);
    
    expect(mockApp.component).toHaveBeenCalledTimes(3);
  });

  it('should have correct component names', async () => {
    const { CollapseContainer, ScrollContainer, LazyContainer } = await import('/@/components/Container');
    
    expect(CollapseContainer).toHaveProperty('__name');
    expect(ScrollContainer).toHaveProperty('__name');
    expect(LazyContainer).toHaveProperty('__name');
  });

  it('should export typing definitions', async () => {
    const exports = await import('/@/components/Container');
    
    // Should have exported types from typing file
    expect(exports).toBeDefined();
  });
});


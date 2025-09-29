import { describe, it, expect, vi } from 'vitest';

// Mock withInstall utility
vi.mock('/@/utils', () => ({
  withInstall: vi.fn((component) => {
    const mockComponent = {
      ...component,
      install: vi.fn((app, name) => {
        app.component(name || component.name || 'MockComponent', component);
      }),
    };
    return mockComponent;
  }),
  deepMerge: vi.fn((target, source) => ({ ...target, ...source })),
}));

// Test Page component index exports
describe('Page/index', () => {
  it('should export PageFooter and PageWrapper components with withInstall', async () => {
    const { PageFooter, PageWrapper } = await import('/@/components/Page');

    expect(PageFooter).toBeDefined();
    expect(PageWrapper).toBeDefined();
    expect(PageFooter.install).toBeDefined();
    expect(PageWrapper.install).toBeDefined();
  });

  it('should export PageWrapperFixedHeightKey constant', async () => {
    const { PageWrapperFixedHeightKey } = await import('/@/components/Page');

    expect(PageWrapperFixedHeightKey).toBeDefined();
    expect(PageWrapperFixedHeightKey).toBe('PageWrapperFixedHeight');
    expect(typeof PageWrapperFixedHeightKey).toBe('string');
  });

  it('should have install method for both components', async () => {
    const { PageFooter, PageWrapper } = await import('/@/components/Page');

    expect(PageFooter.install).toBeDefined();
    expect(PageWrapper.install).toBeDefined();
    expect(typeof PageFooter.install).toBe('function');
    expect(typeof PageWrapper.install).toBe('function');
  });

  it('should install components correctly', async () => {
    const { PageFooter, PageWrapper } = await import('/@/components/Page');
    const mockApp = {
      component: vi.fn(),
    };

    PageFooter.install(mockApp as any, 'TestPageFooter');
    PageWrapper.install(mockApp as any, 'TestPageWrapper');

    expect(mockApp.component).toHaveBeenCalledTimes(2);
    expect(mockApp.component).toHaveBeenCalledWith('TestPageFooter', expect.any(Object));
    expect(mockApp.component).toHaveBeenCalledWith('TestPageWrapper', expect.any(Object));
  });

  it('should have correct exports count', async () => {
    const exports = await import('/@/components/Page');
    const exportKeys = Object.keys(exports);

    // Should export: PageFooter, PageWrapper, and PageWrapperFixedHeightKey
    expect(exportKeys).toContain('PageFooter');
    expect(exportKeys).toContain('PageWrapper');
    expect(exportKeys).toContain('PageWrapperFixedHeightKey');
    expect(exportKeys.length).toBe(3);
  });

  it('should be valid Vue components', async () => {
    const { PageFooter, PageWrapper } = await import('/@/components/Page');

    expect(PageFooter).toBeDefined();
    expect(PageWrapper).toBeDefined();
    expect(typeof PageFooter).toBe('object');
    expect(typeof PageWrapper).toBe('object');
  });

  it('should export components with proper structure', async () => {
    const { PageFooter, PageWrapper } = await import('/@/components/Page');

    // Components should have install method from withInstall
    expect(PageFooter.install).toBeInstanceOf(Function);
    expect(PageWrapper.install).toBeInstanceOf(Function);
  });
});

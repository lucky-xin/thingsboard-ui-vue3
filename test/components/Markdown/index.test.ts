import { describe, it, expect, vi } from 'vitest';

// Mock withInstall utility to ensure proper testing
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

// Test Markdown component index exports
describe('Markdown/index', () => {
  it('should export Markdown and MarkdownViewer components with withInstall', async () => {
    const { Markdown, MarkdownViewer } = await import('/@/components/Markdown');

    expect(Markdown).toBeDefined();
    expect(MarkdownViewer).toBeDefined();
    expect(Markdown.install).toBeDefined();
    expect(MarkdownViewer.install).toBeDefined();
  });

  it('should have install method for both components', async () => {
    const { Markdown, MarkdownViewer } = await import('/@/components/Markdown');

    expect(Markdown.install).toBeDefined();
    expect(MarkdownViewer.install).toBeDefined();
    expect(typeof Markdown.install).toBe('function');
    expect(typeof MarkdownViewer.install).toBe('function');
  });

  it('should install components correctly', async () => {
    const { Markdown, MarkdownViewer } = await import('/@/components/Markdown');
    const mockApp = {
      component: vi.fn(),
    };

    Markdown.install(mockApp as any, 'TestMarkdown');
    MarkdownViewer.install(mockApp as any, 'TestMarkdownViewer');

    expect(mockApp.component).toHaveBeenCalledTimes(2);
    expect(mockApp.component).toHaveBeenCalledWith('TestMarkdown', expect.any(Object));
    expect(mockApp.component).toHaveBeenCalledWith('TestMarkdownViewer', expect.any(Object));
  });

  it('should export typing definitions', async () => {
    // This tests that the typing exports don't throw errors
    const exports = await import('/@/components/Markdown');

    expect(exports).toBeDefined();
    expect(exports.Markdown).toBeDefined();
    expect(exports.MarkdownViewer).toBeDefined();
  });

  it('should have correct exports count', async () => {
    const exports = await import('/@/components/Markdown');
    const exportKeys = Object.keys(exports);

    // Should export: Markdown, MarkdownViewer, and typing exports
    expect(exportKeys).toContain('Markdown');
    expect(exportKeys).toContain('MarkdownViewer');
    expect(exportKeys.length).toBeGreaterThanOrEqual(2);
  });

  it('should be valid Vue components', async () => {
    const { Markdown, MarkdownViewer } = await import('/@/components/Markdown');

    expect(Markdown).toBeDefined();
    expect(MarkdownViewer).toBeDefined();
    expect(typeof Markdown).toBe('object');
    expect(typeof MarkdownViewer).toBe('object');
  });

  it('should export components with proper structure', async () => {
    const { Markdown, MarkdownViewer } = await import('/@/components/Markdown');

    // Components should have install method from withInstall
    expect(Markdown.install).toBeInstanceOf(Function);
    expect(MarkdownViewer.install).toBeInstanceOf(Function);
  });
});

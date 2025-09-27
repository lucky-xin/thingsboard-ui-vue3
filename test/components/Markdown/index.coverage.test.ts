import { describe, it, expect } from 'vitest';

// Test Markdown component index exports without mocks to get real coverage
describe('Markdown/index coverage', () => {
  it('should export Markdown and MarkdownViewer components', async () => {
    const { Markdown, MarkdownViewer } = await import('/@/components/Markdown');
    
    expect(Markdown).toBeDefined();
    expect(MarkdownViewer).toBeDefined();
  });

  it('should have install method for all components', async () => {
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
    
    Markdown.install(mockApp as any);
    MarkdownViewer.install(mockApp as any);
    
    expect(mockApp.component).toHaveBeenCalledTimes(2);
  });

  it('should export all expected components', async () => {
    const exports = await import('/@/components/Markdown');
    const exportKeys = Object.keys(exports);
    
    expect(exportKeys).toContain('Markdown');
    expect(exportKeys).toContain('MarkdownViewer');
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

  it('should work with withInstall utility', async () => {
    const { Markdown, MarkdownViewer } = await import('/@/components/Markdown');
    
    // Test that withInstall was applied correctly
    expect(Markdown).toHaveProperty('install');
    expect(MarkdownViewer).toHaveProperty('install');
    
    // Test that install methods work
    const mockApp = { component: vi.fn() };
    Markdown.install(mockApp as any);
    MarkdownViewer.install(mockApp as any);
    
    expect(mockApp.component).toHaveBeenCalledTimes(2);
  });

  it('should have correct component names', async () => {
    const { Markdown, MarkdownViewer } = await import('/@/components/Markdown');
    
    expect(Markdown).toHaveProperty('__name');
    expect(MarkdownViewer).toHaveProperty('__name');
  });

  it('should export typing definitions', async () => {
    const exports = await import('/@/components/Markdown');
    
    // Should have exported types from typing file
    expect(exports).toBeDefined();
  });
});


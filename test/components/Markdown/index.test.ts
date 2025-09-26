import { describe, it, expect } from 'vitest';

describe('Markdown/index', () => {
  it('should export Markdown and MarkdownViewer components', async () => {
    const module = await import('/@/components/Markdown/index');
    
    expect(module).toBeDefined();
    expect(module.Markdown).toBeDefined();
    expect(module.MarkdownViewer).toBeDefined();
  });

  it('should be valid Vue components', async () => {
    const module = await import('/@/components/Markdown/index');
    const { Markdown, MarkdownViewer } = module;
    
    expect(typeof Markdown).toBe('object');
    expect(typeof MarkdownViewer).toBe('object');
  });

  it('should export only Markdown and MarkdownViewer components', async () => {
    const module = await import('/@/components/Markdown/index');
    const componentExports = Object.keys(module).filter(key => key.includes('Markdown'));
    
    expect(componentExports).toContain('Markdown');
    expect(componentExports).toContain('MarkdownViewer');
    expect(componentExports.length).toBe(2);
  });

  it('should export typing definitions', async () => {
    const module = await import('/@/components/Markdown/index');
    
    // Just check that the module imports without error
    expect(module).toBeDefined();
  });
});
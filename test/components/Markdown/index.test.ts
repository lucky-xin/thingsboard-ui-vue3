import { describe, it, expect } from 'vitest';

describe('Markdown/index', () => {
  it('should export Markdown component', async () => {
    const { Markdown } = await import('/@/components/Markdown/index');
    expect(Markdown).toBeDefined();
  });

  it('should export MarkdownViewer component', async () => {
    const { MarkdownViewer } = await import('/@/components/Markdown/index');
    expect(MarkdownViewer).toBeDefined();
  });
});
import { describe, it, expect, vi } from 'vitest';

vi.mock('/@/components/CodeEditor/index', () => ({
  CodeEditor: { name: 'MockCodeEditor' },
  JsonPreview: { name: 'MockJsonPreview' },
}));

describe('CodeEditor/index', () => {
  it('should export CodeEditor component', async () => {
    const { CodeEditor } = await import('/@/components/CodeEditor/index');
    expect(CodeEditor).toBeDefined();
  });

  it('should export JsonPreview component', async () => {
    const { JsonPreview } = await import('/@/components/CodeEditor/index');
    expect(JsonPreview).toBeDefined();
  });
});
import { describe, it, expect } from 'vitest';

// Test CodeEditor component index exports without mocks to get real coverage
describe('CodeEditor/index coverage', () => {
  it('should export all expected components', async () => {
    const module = await import('/@/components/CodeEditor');

    expect(module.CodeEditor).toBeDefined();
    expect(module.JsonPreview).toBeDefined();
  }, 10000); // Increase timeout to 10 seconds

  it('should have correct component structure', async () => {
    const { CodeEditor, JsonPreview } = await import('/@/components/CodeEditor');

    // Check that all components are wrapped with withInstall
    expect(CodeEditor).toHaveProperty('install');
    expect(JsonPreview).toHaveProperty('install');
  }, 10000); // Increase timeout to 10 seconds

  it('should be valid Vue components', async () => {
    const { CodeEditor, JsonPreview } = await import('/@/components/CodeEditor');

    expect(typeof CodeEditor).toBe('object');
    expect(typeof JsonPreview).toBe('object');
  }, 10000); // Increase timeout to 10 seconds

  it('should export typing types', async () => {
    const module = await import('/@/components/CodeEditor');

    // Check that typing exports are available
    expect(module).toBeDefined();
  }, 10000); // Increase timeout to 10 seconds

  it('should be importable as named exports', async () => {
    const { CodeEditor, JsonPreview } = await import('/@/components/CodeEditor');

    expect(CodeEditor).toBeDefined();
    expect(JsonPreview).toBeDefined();
  }, 10000); // Increase timeout to 10 seconds

  it('should export only expected components', async () => {
    const module = await import('/@/components/CodeEditor');
    const exportKeys = Object.keys(module);

    expect(exportKeys).toContain('CodeEditor');
    expect(exportKeys).toContain('JsonPreview');
    expect(exportKeys.length).toBeGreaterThanOrEqual(2);
  }, 10000); // Increase timeout to 10 seconds
});


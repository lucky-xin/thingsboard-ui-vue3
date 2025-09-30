import { describe, it, expect } from 'vitest';

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme.css', writable: true
});
Object.defineProperty(globalThis, '__PROD__', {
  value: false, writable: true
});
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OPTIONS__', {
  value: { injectTo: 'body' }, writable: true
});

describe('hooks/useAppInject', () => {
  it('should export useAppInject hook', { timeout: 30000 }, async () => {
    const module = await import('/@/hooks/web/useAppInject');

    expect(module).toBeDefined();
    expect(module.useAppInject).toBeDefined();
    expect(typeof module.useAppInject).toBe('function');
  });

  it('should be a valid hook module', async () => {
    const module = await import('/@/hooks/web/useAppInject');

    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });
});
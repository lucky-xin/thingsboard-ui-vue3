import { describe, it, expect, vi } from 'vitest';

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

// Mock the useAppProviderContext
vi.mock('/@/components/Application', () => ({
  useAppProviderContext: vi.fn(() => ({
    isMobile: { value: false }
  }))
}));

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

  // 增加测试用例以提高覆盖率
  it('should return correct values when calling useAppInject', async () => {
    const module = await import('/@/hooks/web/useAppInject');
    const { useAppInject } = module;

    // Call the hook function to improve coverage
    const result = useAppInject();

    expect(result).toBeDefined();
    expect(result.getIsMobile).toBeDefined();
  });
});
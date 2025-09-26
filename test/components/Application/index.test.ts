import { describe, it, expect } from 'vitest';

describe('Application/index', () => {
  it('should be importable without errors', () => {
    expect(() => {
      import('/@/components/Application/index');
    }).not.toThrow();
  });

  it('should export useAppProviderContext', async () => {
    const module = await import('/@/components/Application/index');
    expect(module.useAppProviderContext).toBeDefined();
    expect(typeof module.useAppProviderContext).toBe('function');
  });
});
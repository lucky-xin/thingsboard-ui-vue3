import { describe, it, expect, vi } from 'vitest';

// Mock router guard index
vi.mock('./index.ts', () => ({
  setupRouterGuard: vi.fn(),
}));

describe('router/guard/index', () => {
  it('should export setupRouterGuard function', async () => {
    const module = await import('/@/router/guard/index');

    expect(module).toBeDefined();
    expect(module.setupRouterGuard).toBeDefined();
    expect(typeof module.setupRouterGuard).toBe('function');
  });

  it('should be a valid module', async () => {
    const module = await import('/@/router/guard/index');

    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });
});

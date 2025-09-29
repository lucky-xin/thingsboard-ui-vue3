import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createApp } from 'vue';
import { setupGlobDirectives } from '/@/directives/index';

// Mock the directive modules
vi.mock('/@/directives/permission', () => ({
  setupPermissionDirective: vi.fn(),
}));

vi.mock('/@/directives/loading', () => ({
  setupLoadingDirective: vi.fn(),
}));

describe('directives/index', () => {
  let app: any;

  beforeEach(() => {
    app = createApp({});
    vi.clearAllMocks();
  });

  it('should export setupGlobDirectives function', () => {
    expect(setupGlobDirectives).toBeDefined();
    expect(typeof setupGlobDirectives).toBe('function');
  });

  it('should setup permission directive', async () => {
    const { setupPermissionDirective } = await import('/@/directives/permission');

    setupGlobDirectives(app);

    expect(setupPermissionDirective).toHaveBeenCalledWith(app);
  });

  it('should setup loading directive', async () => {
    const { setupLoadingDirective } = await import('/@/directives/loading');

    setupGlobDirectives(app);

    expect(setupLoadingDirective).toHaveBeenCalledWith(app);
  });

  it('should setup both directives when called', async () => {
    const { setupPermissionDirective } = await import('/@/directives/permission');
    const { setupLoadingDirective } = await import('/@/directives/loading');

    setupGlobDirectives(app);

    expect(setupPermissionDirective).toHaveBeenCalledTimes(1);
    expect(setupLoadingDirective).toHaveBeenCalledTimes(1);
  });

  it('should handle app parameter correctly', () => {
    expect(() => setupGlobDirectives(app)).not.toThrow();
  });
});
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setupGlobDirectives } from '/@/directives';

// Mock the directive setup functions
vi.mock('/@/directives/permission', () => ({
  setupPermissionDirective: vi.fn(),
}));

vi.mock('/@/directives/loading', () => ({
  setupLoadingDirective: vi.fn(),
}));

describe('directives/index', () => {
  let mockApp: any;

  beforeEach(() => {
    mockApp = {
      directive: vi.fn(),
    };
    vi.clearAllMocks();
  });

  it('should setup global directives', async () => {
    const { setupPermissionDirective } = await import('/@/directives/permission');
    const { setupLoadingDirective } = await import('/@/directives/loading');

    setupGlobDirectives(mockApp);

    expect(setupPermissionDirective).toHaveBeenCalledWith(mockApp);
    expect(setupLoadingDirective).toHaveBeenCalledWith(mockApp);
  });

  it('should call directive setup functions in correct order', async () => {
    const { setupPermissionDirective } = await import('/@/directives/permission');
    const { setupLoadingDirective } = await import('/@/directives/loading');

    setupGlobDirectives(mockApp);

    expect(setupPermissionDirective).toHaveBeenCalledBefore(setupLoadingDirective as any);
  });

  it('should handle app parameter correctly', async () => {
    const { setupPermissionDirective } = await import('/@/directives/permission');
    const { setupLoadingDirective } = await import('/@/directives/loading');

    expect(() => setupGlobDirectives(mockApp)).not.toThrow();
    expect(setupPermissionDirective).toHaveBeenCalledTimes(1);
    expect(setupLoadingDirective).toHaveBeenCalledTimes(1);
  });
});
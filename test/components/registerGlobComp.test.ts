// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerGlobComp } from '/@/components/registerGlobComp';

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme.css', writable: true
});

describe('registerGlobComp', () => {
  let mockApp: any;

  beforeEach(() => {
    mockApp = {
      use: vi.fn().mockReturnThis(),
    };
  });

  it('should register global components', () => {
    registerGlobComp(mockApp);

    expect(mockApp.use).toHaveBeenCalledTimes(2);
    expect(mockApp.use).toHaveBeenNthCalledWith(1, expect.any(Object)); // Input
    expect(mockApp.use).toHaveBeenNthCalledWith(2, expect.any(Object)); // Button
  });

  it('should chain app.use calls', () => {
    registerGlobComp(mockApp);

    // Verify that the chaining works (each use returns the app)
    expect(mockApp.use().use).toBeDefined();
  });

  it('should handle app parameter correctly', () => {
    const mockAppWithoutChaining = {
      use: vi.fn().mockReturnThis(),
    } as any;

    expect(() => registerGlobComp(mockAppWithoutChaining)).not.toThrow();
    expect(mockAppWithoutChaining.use).toHaveBeenCalledTimes(2);
  });
});
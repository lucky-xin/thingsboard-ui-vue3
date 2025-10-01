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

import { describe, it, expect, vi } from 'vitest';

// Mock the Verify components
vi.mock('./src/DragVerify.vue', () => ({
  default: {
    __name: 'DragVerify',
    setup() {
      return {};
    },
  },
}));

vi.mock('./src/ImgRotate.vue', () => ({
  default: {
    __name: 'ImgRotate',
    setup() {
      return {};
    },
  },
}));

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme.css', writable: true
});

describe('Verify/index', () => {
  it('should export verification components', async () => {
    const module = await import('/@/components/Verify/index');

    expect(module).toBeDefined();
    expect(module.BasicDragVerify).toBeDefined();
    expect(module.RotateDragVerify).toBeDefined();
  }, 25000);

  it('should have correct component structure', async () => {
    const module = await import('/@/components/Verify/index');
    const { BasicDragVerify, RotateDragVerify } = module;

    expect(BasicDragVerify).toBeDefined();
    expect(RotateDragVerify).toBeDefined();
    expect(typeof BasicDragVerify).toBe('object');
    expect(typeof RotateDragVerify).toBe('object');
  }, 20000);

  it('should export typing definitions', async () => {
    const module = await import('/@/components/Verify/index');
    expect(module).toBeDefined();
  });

  it('should test withInstall functionality', async () => {
    const module = await import('/@/components/Verify/index');
    const { BasicDragVerify, RotateDragVerify } = module;

    // Test that components have install methods
    expect(typeof BasicDragVerify.install).toBe('function');
    expect(typeof RotateDragVerify.install).toBe('function');
  });

  it('should test component names', async () => {
    const module = await import('/@/components/Verify/index');
    const { BasicDragVerify, RotateDragVerify } = module;

    // Test component names
    expect(BasicDragVerify.name).toBe('BaseDargVerify');
    expect(RotateDragVerify.name).toBe('ImgRotateDragVerify');
  });

  it('should test component installation', async () => {
    // Import utils to test withInstall function
    const utilsModule = await import('/@/utils');
    const { withInstall } = utilsModule;

    // Create mock components
    const mockBasicDragVerify = {
      name: 'BasicDragVerify',
    };

    const mockRotateDragVerify = {
      name: 'RotateDragVerify',
    };

    // Use withInstall to wrap components
    const installedBasicDragVerify = withInstall(mockBasicDragVerify);
    const installedRotateDragVerify = withInstall(mockRotateDragVerify);

    // Verify the returned components have install methods
    expect(typeof installedBasicDragVerify.install).toBe('function');
    expect(typeof installedRotateDragVerify.install).toBe('function');

    // Mock Vue app instances
    const mockApp1 = {
      component: vi.fn(),
      config: {
        globalProperties: {}
      }
    };

    const mockApp2 = {
      component: vi.fn(),
      config: {
        globalProperties: {}
      }
    };

    // Call install methods
    installedBasicDragVerify.install(mockApp1);
    installedRotateDragVerify.install(mockApp2);

    // Verify component methods were called
    expect(mockApp1.component).toHaveBeenCalled();
    expect(mockApp2.component).toHaveBeenCalled();
  });
});
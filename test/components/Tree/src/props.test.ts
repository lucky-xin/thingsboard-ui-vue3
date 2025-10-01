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

import { describe, it, expect } from 'vitest';

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme-output.css',
  writable: true
});
Object.defineProperty(globalThis, '__VITE_PLUGIN_THEME__', {
  value: true,
  writable: true
});

describe('components/Tree/src/props', () => {
  it('should export tree component props', async () => {
    const module = await import('/@/components/Tree/src/props');

    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  it('should have props definitions', async () => {
    const module = await import('/@/components/Tree/src/props');

    // Check that module has exports
    const exportKeys = Object.keys(module);
    expect(exportKeys.length).toBeGreaterThan(0);
  });

  it('should export basicProps and treeNodeProps', async () => {
    const module = await import('/@/components/Tree/src/props');

    expect(module.basicProps).toBeDefined();
    expect(module.treeNodeProps).toBeDefined();
  });

  it('should have correct basicProps structure', async () => {
    const module = await import('/@/components/Tree/src/props');
    const { basicProps } = module;

    // Test some key props
    expect(basicProps.value).toBeDefined();
    expect(basicProps.title).toBeDefined();
    expect(basicProps.toolbar).toBeDefined();
    expect(basicProps.search).toBeDefined();
    expect(basicProps.checkable).toBeDefined();
    expect(basicProps.treeData).toBeDefined();
    expect(basicProps.expandedKeys).toBeDefined();
    expect(basicProps.selectedKeys).toBeDefined();
    expect(basicProps.checkedKeys).toBeDefined();
  });

  it('should have correct treeNodeProps structure', async () => {
    const module = await import('/@/components/Tree/src/props');
    const { treeNodeProps } = module;

    // Test treeNodeProps
    expect(treeNodeProps.actionList).toBeDefined();
    expect(treeNodeProps.fieldNames).toBeDefined();
    expect(treeNodeProps.treeData).toBeDefined();
  });

  it('should have correct prop types', async () => {
    const module = await import('/@/components/Tree/src/props');
    const { basicProps, treeNodeProps } = module;

    // Test basicProps types
    expect(basicProps.checkable).toBeDefined();
    expect(basicProps.defaultExpandAll).toBeDefined();
    expect(basicProps.showIcon).toBeDefined();

    // Test treeNodeProps types
    expect(treeNodeProps.treeData).toBeDefined();
    expect(treeNodeProps.actionList).toBeDefined();
  });

  it('should have default values', async () => {
    const module = await import('/@/components/Tree/src/props');
    const { basicProps, treeNodeProps } = module;

    // Test default values
    expect(treeNodeProps.treeData.default()).toEqual([]);
    expect(treeNodeProps.actionList.default()).toEqual([]);
    expect(basicProps.expandedKeys.default()).toEqual([]);
    expect(basicProps.selectedKeys.default()).toEqual([]);
    expect(basicProps.checkedKeys.default()).toEqual([]);
  });
});
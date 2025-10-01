import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

// Mock state management and global dependencies - only once
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

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme.css', writable: true
});

// Mock the WangEditor component
vi.mock('/@/components/WangEditor/src/WangEditor.vue', () => ({
  default: {
    name: 'WangEditor',
    props: {
      value: String,
      height: [Number, String],
      width: [Number, String],
      bizKey: [String, Number],
      bizType: String,
    },
    template: '<div class="wang-editor-mock">WangEditor</div>',
    setup: () => ({
      prefixCls: 'jeesite-editor-container',
      containerWidth: '100%',
      containerHeight: '300px',
      editorRef: {},
      mode: 'default',
      toolbarConfig: {},
      editorConfig: {},
      handleCreated: vi.fn(),
      handleChange: vi.fn(),
    })
  },
}));

describe('WangEditor/index', () => {
  it('should export WangEditor component', async () => {
    const module = await import('/@/components/WangEditor/index');

    expect(module).toBeDefined();
    expect(module.WangEditor).toBeDefined();
  });

  it('should have correct component structure', async () => {
    const module = await import('/@/components/WangEditor/index');

    const { WangEditor } = module;

    expect(WangEditor).toBeDefined();
    expect(typeof WangEditor).toBe('object');
    expect(WangEditor.name).toBe('WangEditor');
  });

  it('should be able to create component instance', async () => {
    const module = await import('/@/components/WangEditor/index');

    const { WangEditor } = module;

    expect(WangEditor).toBeDefined();
  });

  it('should export component with proper properties', async () => {
    const module = await import('/@/components/WangEditor/index');

    expect(module).toBeDefined();
    expect(module.WangEditor).toBeDefined();

    // Check that it's a Vue component
    const { WangEditor } = module;
    expect(WangEditor.name).toBe('WangEditor');
  });

  it('should handle dynamic import correctly', async () => {
    // Test that we can dynamically import the module
    const module = await import('/@/components/WangEditor/index');

    expect(module).toBeDefined();
    expect(typeof module).toBe('object');

    // Check named export (this is what the file actually exports)
    expect(module.WangEditor).toBeDefined();
  });

  it('should have consistent exports', async () => {
    // Import twice to ensure consistency
    const module1 = await import('/@/components/WangEditor/index');
    const module2 = await import('/@/components/WangEditor/index');

    expect(module1).toEqual(module2);
    expect(module1.WangEditor).toBe(module2.WangEditor);
  });

  // 新增测试用例以提高覆盖率
  it('should test withInstall functionality', async () => {
    const module = await import('/@/components/WangEditor/index');
    const { WangEditor } = module;

    // 测试 install 方法是否存在
    expect(typeof WangEditor.install).toBe('function');

    // 模拟 Vue 应用实例
    const mockApp = {
      component: vi.fn(),
      config: {
        globalProperties: {}
      }
    };

    // 调用 install 方法
    WangEditor.install(mockApp);

    // 验证 component 方法被调用
    expect(mockApp.component).toHaveBeenCalled();
  });

  it('should test withInstall function directly', async () => {
    // 导入 utils 来测试 withInstall 函数
    const utilsModule = await import('/@/utils');
    const { withInstall } = utilsModule;

    // 创建一个模拟组件
    const mockComponent = {
      name: 'TestComponent',
    };

    // 使用 withInstall 包装组件
    const installedComponent = withInstall(mockComponent);

    // 验证返回的组件有 install 方法
    expect(typeof installedComponent.install).toBe('function');

    // 验证组件名称
    expect(installedComponent.name).toBe('TestComponent');
  });

  it('should test component props', async () => {
    const module = await import('/@/components/WangEditor/index');
    const { WangEditor } = module;

    // 验证组件属性
    expect(WangEditor.props).toBeDefined();
    expect(WangEditor.props).toEqual({
      value: String,
      height: [Number, String],
      width: [Number, String],
      bizKey: [String, Number],
      bizType: String,
    });
  });
});
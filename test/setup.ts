import { vi } from 'vitest';
import { config } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { createPinia, setActivePinia } from 'pinia';

// 优先级最高的核心 Mock，避免加载组件索引中的 withInstall 逻辑
vi.mock('/@/components/Application', () => ({
  useAppProviderContext: () => ({ prefixCls: 'jeesite', isMobile: false }),
}));

vi.mock('/@/components/Container', () => ({
  CollapseContainer: { name: 'CollapseContainer', template: '<div class="tb-collapse-container"><slot /></div>' },
  ScrollContainer: { name: 'ScrollContainer', template: '<div class="tb-scroll-container"><slot /></div>' },
}));

vi.mock('/@/components/StrengthMeter', () => ({
  StrengthMeter: { name: 'StrengthMeter', template: '<div class="tb-strength-meter"></div>' },
}));

// Mock environment variables
process.env.VITE_GLOB_API_URL = 'http://localhost:8080';
process.env.VITE_GLOB_API_URL_PREFIX = '/api';
process.env.VITE_GLOB_APP_TITLE = 'Test App';
process.env.VITE_PROXY = '[["/api", "http://localhost:8080"]]';

// Mock window and document for jsdom
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:8080',
    origin: 'http://localhost:8080',
    protocol: 'http:',
    host: 'localhost:8080',
    hostname: 'localhost',
    port: '8080',
    pathname: '/',
    search: '',
    hash: '',
    assign: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
  },
  writable: true,
});

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
});

// Initialize Pinia for tests（与业务导出的 store 绑定同一个实例）
const pinia = createPinia();
setActivePinia(pinia);
vi.mock('/@/store', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    store: pinia,
  };
});

// Mock vite-plugin-theme-vite3 client constants to avoid ReferenceError in tests
// These are injected by Vite in real builds; here we provide sane defaults
// @ts-ignore

// Provide globals expected by vite-plugin-theme-vite3/es/client
// @ts-ignore
globalThis.__COLOR_PLUGIN_OUTPUT_FILE_NAME__ = 'color.css';
// @ts-ignore
globalThis.__PROD__ = false;
// @ts-ignore
globalThis.__COLOR_PLUGIN_OPTIONS__ = {};

// Mock loadDarkThemeCss/darkCssIsReady to no-op
vi.mock('vite-plugin-theme-vite3/es/client', () => ({
  darkCssIsReady: true,
  loadDarkThemeCss: vi.fn(async () => true),
}));

// Mock ant-design-vue CSS-in-JS cache to prevent unhandled errors
vi.mock('ant-design-vue/lib/_util/cssinjs/hooks/useStyleRegister/cacheMapUtil', () => {
  const mockCache = new Map();
  return {
    prepare: vi.fn((path: string) => {
      if (!mockCache.has(path)) {
        mockCache.set(path, { position: 'static' });
      }
      return mockCache.get(path);
    }),
    existPath: vi.fn((path: string) => {
      const result = mockCache.has(path);
      if (!result) {
        mockCache.set(path, { position: 'static' });
      }
      return result;
    }),
    mark: vi.fn((path: string) => {
      mockCache.set(path, { position: 'static' });
    }),
  };
});

// Mock ant-design-vue CSS-in-JS hooks
vi.mock('ant-design-vue/lib/_util/cssinjs/hooks/useGlobalCache', () => ({
  useGlobalCache: vi.fn(() => ({
    update: vi.fn(),
    cache: new Map(),
  })),
}));

// Mock ant-design-vue CSS-in-JS Cache
vi.mock('ant-design-vue/lib/_util/cssinjs/Cache', () => ({
  default: vi.fn(() => ({
    update: vi.fn(),
  })),
}));

// 彻底 mock antd 消息与通知，避免内部依赖 cssinjs 的副作用
vi.mock('ant-design-vue', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  const noop = (..._args: any[]) => ({ destroy: () => {} });
  const message = new Proxy(
    {},
    {
      get: () => noop,
    },
  );
  const notification = new Proxy(
    {},
    {
      get: () => noop,
    },
  );
  return {
    ...actual,
    message,
    notification,
  };
});

// 由于部分组件在引入时依赖 /@/components/Dropdown 的 withInstall，
// 在单测环境下用一个最小实现替代，避免干扰其它组件逻辑
vi.mock('/@/components/Dropdown', () => ({
  Dropdown: {
    name: 'Dropdown',
    props: ['placement', 'trigger', 'dropMenuList', 'selectedKeys', 'overlayClassName'],
    template: '<div class="tb-dropdown"><slot /></div>',
  },
}));

// 最小化 mock `withInstall`，保持返回传入的组件本身，避免 import 时运行出错
vi.mock('/@/utils', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    withInstall: <T>(comp: T) => comp,
  };
});

// ant-design-vue 依赖的 matchMedia 与 getComputedStyle 简单 mock
// 更完整的 matchMedia polyfill，满足 antdv 的响应式监听
// @ts-ignore
window.matchMedia =
  window.matchMedia ||
  ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));

if (!('getComputedStyle' in window)) {
  // @ts-ignore
  window.getComputedStyle = () => ({ getPropertyValue: () => '' });
} else {
  // Enhance existing getComputedStyle to handle pseudo-elements
  const originalGetComputedStyle = window.getComputedStyle;
  // @ts-ignore
  window.getComputedStyle = (element: Element, pseudoElement?: string) => {
    if (pseudoElement) {
      // Return a mock object for pseudo-elements
      return {
        getPropertyValue: () => '',
        position: 'static',
        display: 'block',
        width: '0px',
        height: '0px',
      } as CSSStyleDeclaration;
    }
    return originalGetComputedStyle(element);
  };
}

// jsdom: stub canvas methods to remove Not implemented warnings
try {
  // @ts-ignore
  if (!HTMLCanvasElement.prototype.getContext) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      value: vi.fn(() => null),
      configurable: true,
      writable: true,
    });
  }
  // @ts-ignore
  if (!HTMLCanvasElement.prototype.toDataURL) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toDataURL', {
      value: vi.fn(() => 'data:image/png;base64,'),
      configurable: true,
      writable: true,
    });
  }
} catch {}

// 精准 stub 部分 antd 组件，保证渲染与交互选择器可用
config.global.stubs = {
  'a-button': defineComponent({
    name: 'AButtonStub',
    props: {
      loading: { type: Boolean, default: false },
      type: { type: String, default: '' },
      disabled: { type: Boolean, default: false },
    },
    template:
      '<button class="ant-btn" :class="[{\'ant-btn-loading\': loading}, type ? `ant-btn-${type}` : null]" :disabled="disabled"><slot /></button>',
  }),
  'a-form': defineComponent({
    name: 'AFormStub',
    methods: {
      async validate() {
        return {};
      },
      async resetFields() {
        return {};
      },
    },
    template: '<form class="ant-form"><slot /></form>',
  }),
  'a-form-item': defineComponent({
    name: 'AFormItemStub',
    template: '<div class="ant-form-item"><slot /></div>',
  }),
};

// 过滤已知的 vue warn 文本，降低测试噪音
const originalWarn = console.warn;
console.warn = (...args: any[]) => {
  const msg = String(args[0] ?? '');
  if (
    msg.includes('injection "prefixCls" not found') ||
    msg.includes('onMounted is called when there is no active component instance') ||
    msg.includes('getComputedStyle() method: with pseudo-elements') ||
    msg.includes('Sum of column `span` in a line not match `column` of Descriptions')
  ) {
    return;
  }
  originalWarn.apply(console, args);
};

// 过滤已知的错误输出（不影响断言）
const originalError = console.error;
console.error = (...args: any[]) => {
  const includes = (substr: string) => args.some((a) => String(a ?? '').includes(substr));
  if (
    includes("Not implemented: HTMLCanvasElement's getContext() method") ||
    includes("Not implemented: HTMLCanvasElement's toDataURL() method") ||
    // permission 测试中模拟的异常日志，属于预期行为，避免污染输出（包含主消息与堆栈行）
    includes('Failed to change permission code: Error: API Error')
  ) {
    return;
  }
  originalError.apply(console, args);
};

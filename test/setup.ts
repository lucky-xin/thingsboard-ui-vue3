import { vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { config } from '@vue/test-utils';

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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
window.matchMedia = window.matchMedia || ((query: string) => ({
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
}

// jsdom: stub canvas methods to remove Not implemented warnings
// @ts-ignore
HTMLCanvasElement.prototype.getContext = HTMLCanvasElement.prototype.getContext || (() => null);
// @ts-ignore
HTMLCanvasElement.prototype.toDataURL = HTMLCanvasElement.prototype.toDataURL || (() => 'data:image/png;base64,');

// 全局 stubs：避免 antd 相关运行时告警
config.global.stubs = {
  'a-button': true,
  'a-input': true,
  'a-form': true,
  'a-form-item': true,
};

// 过滤已知的 vue warn 文本，降低测试噪音
const originalWarn = console.warn;
console.warn = (...args: any[]) => {
  const msg = String(args[0] ?? '');
  if (
    msg.includes('injection "prefixCls" not found') ||
    msg.includes('Failed to resolve component: a-button') ||
    msg.includes("onMounted is called when there is no active component instance") ||
    msg.includes('getComputedStyle() method: with pseudo-elements')
  ) {
    return;
  }
  originalWarn.apply(console, args);
};

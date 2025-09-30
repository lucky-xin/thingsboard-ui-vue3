import { vi } from 'vitest';
import { config } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { createPinia, setActivePinia } from 'pinia';

// Environment setup
process.env.VITE_GLOB_APP_TITLE = 'Test App';
process.env.VITE_GLOB_API_URL = 'http://localhost:8080';
process.env.VITE_GLOB_API_URL_PREFIX = '/api';
process.env.VITE_GLOB_APP_SHORT_NAME = 'test_app';

// Initialize Pinia for tests
const pinia = createPinia();
setActivePinia(pinia);

// Basic environment setup
process.env.VITE_GLOB_APP_TITLE = 'Test App';
process.env.VITE_GLOB_API_URL = 'http://localhost:8080';
process.env.VITE_GLOB_API_URL_PREFIX = '/api';
process.env.VITE_GLOB_APP_SHORT_NAME = 'test_app';
process.env.VITE_PROXY = '[["/api", "http://localhost:8080"]]';

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

// Basic localStorage mock
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
});

// Basic matchMedia mock
window.matchMedia = window.matchMedia || vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Basic getComputedStyle mock
if (!window.getComputedStyle) {
  Object.defineProperty(window, 'getComputedStyle', {
    value: vi.fn(() => ({ getPropertyValue: vi.fn(() => '') })),
    writable: true,
  });
}

// Mock ant-design-vue selectively
vi.mock('ant-design-vue', async () => {
  const actual = await vi.importActual('ant-design-vue');
  return {
    ...actual,
    message: {
      error: vi.fn(),
      success: vi.fn(),
      warning: vi.fn(),
      info: vi.fn(),
      loading: vi.fn(),
    },
    notification: {
      error: vi.fn(),
      success: vi.fn(),
      warning: vi.fn(),
      info: vi.fn(),
      open: vi.fn(),
    },
  };
});

// Basic useDesign mock
vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: vi.fn((scope?: string) => {
    const prefixVar = 'jeesite';
    const prefixCls = scope ? `${prefixVar}-${scope}` : prefixVar;
    return {
      prefixCls,
      prefixVar,
      hashId: 'test-hash',
    };
  }),
}));

// Basic useMessage mock
vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: vi.fn(() => ({
    createMessage: {
      error: vi.fn(),
      success: vi.fn(),
      warning: vi.fn(),
      info: vi.fn(),
    },
    notification: {
      error: vi.fn(),
      success: vi.fn(),
      warning: vi.fn(),
      info: vi.fn(),
    },
    createConfirm: vi.fn(),
  })),
}));

// Basic utils mock
vi.mock('/@/utils', () => ({
  withInstall: vi.fn((comp) => {
    if (!comp) return comp;
    comp.install = vi.fn();
    return comp;
  }),
  openWindow: vi.fn((url, options = {}) => {
    // Handle URL with ___blank suffix
    if (url.includes('?___blank')) {
      url = url.replace('?___blank', '');
    }
    const { target = '__blank', noopener = true, noreferrer = true } = options;
    const features = [];
    if (noopener) features.push('noopener=yes');
    if (noreferrer) features.push('noreferrer=yes');
    return window.open(url, target, features.join(','));
  }),
  deepMerge: vi.fn((target, source) => {
    if (!target) return source;
    if (!source) return target;
    const result = { ...target };
    Object.keys(source).forEach(key => {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = { ...(target[key] || {}), ...source[key] };
      } else {
        result[key] = source[key];
      }
    });
    return result;
  }),
  getPopupContainer: vi.fn((node) => {
    if (node && node.parentNode) {
      return node.parentNode;
    }
    return document.body;
  }),
  noop: vi.fn(),
  sleep: vi.fn((ms) => new Promise(resolve => setTimeout(resolve, ms))),
  convertBytesToSize: vi.fn((bytes) => {
    if (bytes === 0) return '0 b';
    if (bytes < 1024) return `${bytes} b`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} Kb`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} Mb`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} Gb`;
  }),
  encodeHtml: vi.fn((str) => {
    if (typeof str !== 'string') return str;
    return str.replace(/[<>&"']/g, (match) => {
      const map = {
        '<': '&#60;',
        '>': '&#62;',
        '&': '&#38;',
        '"': '&#34;',
        "'": '&#39;',
      };
      return map[match];
    });
  }),
  randomSecret: vi.fn((length = 10) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }),
  setObjToUrlParams: vi.fn((baseUrl, obj) => {
    const params = [];
    Object.keys(obj).forEach(key => {
      if (obj[key] !== undefined && obj[key] !== null) {
        params.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(obj[key]))}`);
      }
    });
    return `${baseUrl}?${params.join('&')}`;
  }),
  getDynamicProps: vi.fn((props) => {
    const result = {};
    Object.keys(props).forEach(key => {
      const value = props[key];
      if (value && typeof value === 'object' && 'value' in value) {
        result[key] = value.value;
      } else {
        result[key] = value;
      }
    });
    return result;
  }),
  getRawRoute: vi.fn((route) => {
    if (!route) return null;
    const { matched, ...rest } = route;
    return { ...rest, matched };
  }),
  openWindowLayer: vi.fn((url, options = {}) => {
    if ((window as any).layer) {
      (window as any).layer.open({
        type: 2,
        title: options.title || '',
        area: [`${options.width || 800}px`, `${options.height || 600}px`],
        content: url,
        ...options,
      });
    }
  }),
  copyToClipboard: vi.fn((text) => {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }),
  REGULAR_HTML_ENCODE: /[<>&"'\x00-\x20\x7F-\uFFFF]/g,
}));

// Basic stubs for complex components
config.global.stubs = {
  'a-button': defineComponent({
    name: 'AButton',
    template: '<button><slot /></button>',
  }),
  'a-tooltip': defineComponent({
    name: 'ATooltip',
    template: '<div><slot /></div>',
  }),
};

// Suppress known warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  const msg = String(args[0] ?? '');
  if (
    msg.includes('injection "prefixCls" not found') ||
    msg.includes('onMounted is called when there is no active component instance')
  ) {
    return;
  }
  originalWarn.apply(console, args);
};
import { vi } from 'vitest';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { config } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { createPinia, setActivePinia } from 'pinia';

// helper: attach install method to mocked components and return SAME reference
function addInstall<T extends any>(comp: T & Record<string, any>, name?: string) {
  if (!comp.__name && (comp.name || name)) comp.__name = comp.name || name;
  comp.install = vi.fn((app: any, n?: string) => {
    if (app?.component) app.component(n || name || comp.name || comp.__name || 'MockComponent', comp);
  });
  return comp;
}

// 优先级最高的核心 Mock，避免加载组件索引中的 withInstall 逻辑
vi.mock('components/Application', () => {
  return {
    useAppProviderContext: () => ({ prefixCls: 'jeesite', isMobile: false }),
    AppLogo: addInstall({ name: 'AppLogo', template: '<div class="app-logo"></div>' }),
    AppProvider: addInstall({ name: 'AppProvider', template: '<div class="app-provider"><slot /></div>' }),
    AppSearch: addInstall({ name: 'AppSearch', template: '<div class="app-search"></div>' }),
    AppLocalePicker: addInstall({ name: 'AppLocalePicker', template: '<div class="app-locale-picker"></div>' }),
    AppDarkModeToggle: addInstall({ name: 'AppDarkModeToggle', template: '<div class="app-dark-mode-toggle"></div>' }),
  };
});

// 确保 v8 覆盖率临时目录存在，避免并发写入时报 ENOENT
try {
  const covTmp = join(process.cwd(), 'coverage', '.tmp');
  if (!existsSync(covTmp)) {
    mkdirSync(covTmp, { recursive: true });
  }
  // 进程结束前再确认一次
  // @ts-ignore
  process.on?.('beforeExit', () => {
    try {
      if (!existsSync(covTmp)) mkdirSync(covTmp, { recursive: true });
    } catch {}
  });
} catch {}

vi.mock('/@/components/Container', () => ({
  CollapseContainer: addInstall({
    name: 'CollapseContainer',
    template: '<div class="tb-collapse-container"><slot /></div>',
  }),
  ScrollContainer: addInstall({ name: 'ScrollContainer', template: '<div class="tb-scroll-container"><slot /></div>' }),
  LazyContainer: addInstall({ name: 'LazyContainer', template: '<div class="tb-lazy-container"><slot /></div>' }),
}));

vi.mock('/@/components/StrengthMeter', () => ({
  StrengthMeter: addInstall({ name: 'StrengthMeter', template: '<div class="tb-strength-meter"></div>' }),
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
  Dropdown: addInstall({
    name: 'Dropdown',
    props: ['placement', 'trigger', 'dropMenuList', 'selectedKeys', 'overlayClassName'],
    template: '<div class="tb-dropdown"><slot /></div>',
  }),
}));

// 组件索引导出的额外符号最小 mock，避免“未定义导出”失败
vi.mock('components/Icon/index', () => {
  const Icon = addInstall({ name: 'Icon', template: '<i class="tb-icon" />' });
  const IconPicker = addInstall({ name: 'IconPicker', template: '<div class="tb-icon-picker" />' });
  return { Icon, IconPicker, default: Icon };
});

vi.mock('components/Button/index', () => {
  const BasicButton = addInstall({ name: 'BasicButton', template: '<button class="tb-basic-btn" />' });
  const PopConfirmButton = addInstall({ name: 'PopConfirmButton', template: '<button class="tb-popconfirm-btn" />' });
  const Button = addInstall({ name: 'Button', template: '<button class="tb-btn" />' });
  return { BasicButton, PopConfirmButton, Button, ButtonProps: {}, default: BasicButton };
});

// Remove over-broad mock for Table to keep real exports available
// (previous mock removed)

// 批量最小化 mock 组件 index，避免导入重组件耗时与副作用
const simpleComponent = (name: string) => addInstall({ name, template: `<div class="${name}"><slot /></div>` });

vi.mock('/@/components/CardList', () => ({ CardList: simpleComponent('CardList') }));
vi.mock('/@/components/CollapseForm', () => ({ CollapseForm: simpleComponent('CollapseForm') }));
vi.mock('/@/components/Cropper', () => ({
  CropperImage: simpleComponent('CropperImage'),
  CropperAvatar: simpleComponent('CropperAvatar'),
}));
vi.mock('/@/components/Dialog', () => ({ BasicDialog: simpleComponent('BasicDialog'), BasicDialogInstance: {} }));
vi.mock('/@/components/Drawer', () => ({
  BasicDrawer: simpleComponent('BasicDrawer'),
  BasicDrawerInstance: {}, // Mock the type export
  useDrawer: () => [vi.fn(), vi.fn()],
  useDrawerInner: () => [vi.fn(), vi.fn()],
}));
vi.mock('/@/components/Markdown', () => ({
  Markdown: simpleComponent('Markdown'),
  MarkdownViewer: simpleComponent('MarkdownViewer'),
}));
vi.mock('/@/components/Modal', () => ({
  BasicModal: simpleComponent('BasicModal'),
  BasicModalInstance: {}, // Mock the type export
  useModalContext: () => ({ closeModal: vi.fn(), redoModalHeight: vi.fn() }),
  useModal: () => [vi.fn(), vi.fn()],
  useModalInner: () => [vi.fn(), vi.fn()],
}));
vi.mock('/@/components/Popover', () => ({ Popover: simpleComponent('Popover') }));
vi.mock('/@/components/Resizer', () => ({ Resizer: simpleComponent('Resizer') }));
vi.mock('/@/components/VirtualScroll', () => ({ VScroll: simpleComponent('VScroll') }));

// 全局最小 mock useMessage，避免 axios/checkStatus 等处调用时报错
vi.mock('hooks/web/useMessage', () => {
  const fn = () => ({
    createMessage: {
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
    createConfirm: vi.fn(),
    showMessage: vi.fn(),
  });
  return { useMessage: fn };
});

// 最小 mock useDesign，避免引入 antd theme/token 与 Application 依赖链
vi.mock('hooks/web/useDesign', () => {
  function useDesign(scope?: string) {
    const prefixVar = 'jeesite';
    const prefixCls = scope ? `${prefixVar}-${scope}` : prefixVar;
    const variables = {};
    const hashId = 'hash123';
    return { prefixCls, prefixVar, variables, hashId } as any;
  }
  const useAppInject = () => ({ getIsMobile: false });
  return { useDesign, useAppInject };
});

// Mock `withInstall` globally to ensure all component tests work properly
vi.mock('/@/utils', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    withInstall: vi.fn((comp: any) => {
      if (!comp) return comp;
      // mutate original component and return same reference
      comp.install = vi.fn((app: any, name?: string) => {
        if (app?.component) {
          app.component(name || comp.name || comp.__name || 'MockComponent', comp);
        }
      });
      return comp;
    }),
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
      // Return a minimal mock for pseudo-elements
      return {
        getPropertyValue: () => '',
      } as any as CSSStyleDeclaration;
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

// Prevent unhandled promise rejections from failing unrelated tests in jsdom
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (e) => {
    try {
      e.preventDefault?.();
    } catch {}
  });
}
// Node handler (no-op) to avoid crashing on teardown-time rejections
// @ts-ignore
process.on?.('unhandledRejection', () => {});

// Additional simple component mocks used by tests
vi.mock('/@/components/Authority', () => ({
  Authority: addInstall({ name: 'Authority', template: '<div class="authority" />' }),
}));

vi.mock('components/Basic', () => {
  const BasicArrow = addInstall({ name: 'BasicArrow', template: '<div class="basic-arrow" />' });
  const BasicTitle = addInstall({ name: 'BasicTitle', template: '<div class="basic-title" />' });
  const BasicHelp = addInstall({ name: 'BasicHelp', template: '<div class="basic-help" />' });
  return { BasicArrow, BasicTitle, BasicHelp };
});

vi.mock('components/CountDown', () => {
  const CountdownInput = addInstall({
    name: 'CountdownInput',
    emits: ['change', 'update:value', 'send'],
    props: {
      value: { type: [String, Number, Boolean, Object], default: '' },
      count: { type: Number, default: 60 },
      sendCodeApi: { type: Function, default: null },
      placeholder: { type: String, default: '' },
      size: { type: String, default: 'middle' },
      disabled: { type: Boolean, default: false },
    },
    template: '<input class="countdown-input" />',
  });
  const CountButton = addInstall({
    name: 'CountButton',
    emits: ['update:value', 'change', 'end'],
    props: {
      value: { type: [String, Number, Boolean, Object], default: '' },
      count: { type: Number, default: 60 },
      beforeStartFunc: { type: Function, default: null },
      type: { type: String, default: 'default' },
      size: { type: String, default: 'middle' },
      disabled: { type: Boolean, default: false },
      loading: { type: Boolean, default: false },
    },
    template: '<button class="count-button" />',
  });
  return { CountdownInput, CountButton };
});

// Ensure __name and utility exports for Table index, include useTable
vi.mock('/@/components/Table/index', async (importOriginal) => {
  try {
    const actual = (await importOriginal()) as any;
    const ensureName = (c: any, fallback: string) => (c && (c.__name ||= c.name || fallback), c);
    const useTable = actual.useTable ?? (() => [vi.fn(), vi.fn()]);
    return {
      ...actual,
      BasicTable: ensureName(actual.BasicTable, 'BasicTable'),
      TableAction: ensureName(actual.TableAction, 'TableAction'),
      TableHeader: ensureName(actual.TableHeader, 'TableHeader'),
      useTable,
      default: ensureName(actual.default ?? actual.BasicTable, 'BasicTable'),
    };
  } catch {
    const BasicTable = addInstall({ name: 'BasicTable', template: '<div />' });
    const TableAction = addInstall({ name: 'TableAction', template: '<div />' });
    const TableHeader = addInstall({ name: 'TableHeader', template: '<div />' });
    const useTable = () => [vi.fn(), vi.fn()];
    return { BasicTable, TableAction, TableHeader, useTable, default: BasicTable };
  }
});

// Mock useFormItem hook to match tuple return [state, setState, defaultState]
vi.mock('hooks/component/useFormItem', () => {
  function normalizeValue(props: any, key = 'value') {
    const val = props?.[key];
    let compName = '';
    try {
      const { getCurrentInstance } = require('vue');
      compName = getCurrentInstance?.()?.type?.name ?? '';
    } catch {}
    const isMultiple =
      compName.includes('CheckboxGroup') || props?.mode === 'multiple' || props?.treeCheckable === true;

    if (props?.labelInValue) {
      if (Array.isArray(val)) {
        return val.map((v: any) => (typeof v === 'object' ? v : { value: v }));
      }
      if (typeof val === 'string') {
        if (isMultiple) {
          const values = val.split(',');
          const labels = String(props?.labelValue ?? '').split(',');
          return values.map((v, idx) => ({ value: v, label: labels[idx] }));
        }
        return { value: val, label: props?.labelValue };
      }
      if (typeof val === 'object' && val) return val;
      return val;
    }

    if (val === '') return undefined;

    if (isMultiple) {
      if (Array.isArray(val)) return val;
      if (typeof val === 'string') return val.split(',');
    }
    return val;
  }

  return {
    useRuleFormItem: (props: any, key: string = 'value', event: string = 'change', emitData?: any) => {
      const initial = normalizeValue(props, key);
      const state: any = { __v: initial };
      const defaultState: any = { value: initial };
      const setState = (val: any) => {
        state.value = val;
      };

      Object.defineProperty(state, 'value', {
        get() {
          return this.__v;
        },
        set(v: any) {
          this.__v = v;
          try {
            const { getCurrentInstance } = require('vue');
            const inst = getCurrentInstance?.();
            let arg1 = v;
            let arg2 = undefined;
            if (Array.isArray(v) && v[0] && typeof v[0] === 'object') {
              arg1 = v[0].value ?? v;
              arg2 = v[0].label;
            } else if (v === '') {
              return; // do not emit for empty string
            }
            inst?.emit?.(event, arg1, arg2, ...(emitData?.value ?? []));
          } catch {}
        },
        configurable: true,
        enumerable: true,
      });

      return [state, setState, defaultState];
    },
  };
});

// CountTo minimal mock
vi.mock('/@/components/CountTo', () => ({
  CountTo: addInstall({ name: 'CountTo', template: '<div class="count-to" />' }),
}));

// Direct, lightweight mock for '/@/components/Table' (directory import path)
vi.mock('components/Table', () => {
  const BasicTable = addInstall({
    name: 'BasicTable',
    props: {
      dataSource: { type: Array, default: () => [] },
      columns: { type: Array, default: () => [] },
      rowSelection: { type: Object, default: undefined },
      pagination: { type: [Object, Boolean], default: true },
    },
    template: '<div class="tb-basic-table"><slot /></div>',
  });
  const TableAction = addInstall({ name: 'TableAction', template: '<div />' });
  const TableHeader = addInstall({ name: 'TableHeader', template: '<div />' });
  const EditTableHeaderIcon = addInstall({ name: 'EditTableHeaderIcon', template: '<div />' });
  const TableImg = addInstall({ name: 'TableImg', template: '<div />' });
  const useTable = () => [vi.fn(), vi.fn()];
  return { BasicTable, TableAction, TableHeader, EditTableHeaderIcon, TableImg, useTable, default: BasicTable };
});

// Mock demo view for router types test
vi.mock('../src/views/demo/index.vue', () => ({ default: addInstall({ name: 'DemoIndex', template: '<div />' }) }));

// Mock ContextMenu index to expose spies
vi.mock('/@/components/ContextMenu/index', () => ({
  createContextMenu: vi.fn(async () => {}),
  destroyContextMenu: vi.fn(() => {}),
}));

// Menus helpers: spies for isUrl and pathToRegexp
vi.mock('/@/utils/is', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    isUrl: vi.fn(actual.isUrl ?? (() => false)),
    isHttpUrl: vi.fn(actual.isHttpUrl ?? (() => false)),
  };
});
vi.mock('path-to-regexp', () => ({ pathToRegexp: vi.fn(() => ({}) as any) }));

// Provide minimal document stub for environments where it's undefined or torn down
if (typeof (globalThis as any).document === 'undefined') {
  (globalThis as any).document = { body: { clientHeight: 800, clientWidth: 1200 } } as any;
} else {
  try {
    // Ensure body exists
    (document as any).body = (document as any).body || { clientHeight: 800, clientWidth: 1200 };
  } catch {}
}

// Lightweight mocks for various component index modules to avoid heavy imports
vi.mock('/@/components/Authentication', () => ({
  AuthenticationCodeLogin: addInstall({ name: 'AuthenticationCodeLogin', template: '<div />' }),
  AuthenticationForgetPassword: addInstall({ name: 'AuthenticationForgetPassword', template: '<div />' }),
  AuthenticationLogin: addInstall({ name: 'AuthenticationLogin', template: '<div />' }),
  AuthenticationQrCodeLogin: addInstall({ name: 'AuthenticationQrCodeLogin', template: '<div />' }),
  AuthenticationRegister: addInstall({ name: 'AuthenticationRegister', template: '<div />' }),
  AuthenticationProps: {},
}));
vi.mock('/@/components/ColorPicker', () => ({ ColorPicker: addInstall({ name: 'ColorPicker', template: '<div />' }) }));
vi.mock('/@/components/Description', () => ({
  Description: addInstall({ name: 'Description', template: '<div />' }),
  useDescription: vi.fn(),
}));
vi.mock('/@/components/Excel', () => ({
  ImpExcel: addInstall({ name: 'ImpExcel', template: '<div />' }),
  ExpExcelModal: addInstall({ name: 'ExpExcelModal', template: '<div />' }),
  jsonToSheetXlsx: vi.fn(),
  aoaToSheetXlsx: vi.fn(),
}));
vi.mock('/@/components/Loading', () => ({
  Loading: addInstall({ name: 'Loading', template: '<div />' }),
  useLoading: vi.fn(),
  createLoading: vi.fn(),
}));
vi.mock('/@/components/Menu', () => ({ BasicMenu: addInstall({ name: 'BasicMenu', template: '<div />' }) }));
vi.mock('/@/components/Page', () => ({
  PageFooter: addInstall({ name: 'PageFooter', template: '<div />' }),
  PageWrapper: addInstall({ name: 'PageWrapper', template: '<div />' }),
  PageWrapperFixedHeightKey: 'PageWrapperFixedHeight',
}));
vi.mock('components/Form', () => {
  const BasicForm = addInstall({ name: 'BasicForm', template: '<form />' });
  const Select = addInstall({ name: 'Select', template: '<select />' });
  const TreeSelect = addInstall({ name: 'TreeSelect', template: '<div />' });
  const RadioGroup = addInstall({ name: 'RadioGroup', template: '<div />' });
  const RadioButtonGroup = addInstall({ name: 'RadioButtonGroup', template: '<div />' });
  const CheckboxGroup = addInstall({ name: 'CheckboxGroup', template: '<div />' });
  const FormGroup = addInstall({ name: 'FormGroup', template: '<div />' });

  return {
    BasicForm,
    Select,
    TreeSelect,
    RadioGroup,
    RadioButtonGroup,
    CheckboxGroup,
    FormGroup,
    useComponentRegister: vi.fn(),
    useForm: vi.fn(() => [vi.fn(), vi.fn()]),
  };
});
vi.mock('/@/components/Preview', () => ({
  ImagePreview: addInstall({ name: 'ImagePreview', template: '<div />' }),
  createImgPreview: vi.fn(),
}));
vi.mock('/@/components/SimpleMenu', () => ({
  SimpleMenu: addInstall({ name: 'SimpleMenu', template: '<div />' }),
  SimpleMenuTag: addInstall({ name: 'SimpleMenuTag', template: '<div />' }),
}));
vi.mock('/@/components/Tree', () => ({
  BasicTree: addInstall({ name: 'BasicTree', template: '<div />' }),
  ContextMenuItem: {},
}));

// Mock loading directive module
vi.mock('directives/loading', () => {
  const dir: any = { mounted: vi.fn(), updated: vi.fn(), unmounted: vi.fn() };
  const setupLoadingDirective = vi.fn((_app: any) => {});
  return { default: dir, setupLoadingDirective };
});

// Mock permission directive module
vi.mock('directives/permission', () => {
  const dir: any = { mounted: vi.fn(), updated: vi.fn(), unmounted: vi.fn() };
  const setupPermissionDirective = vi.fn((_app: any) => {});
  return { default: dir, setupPermissionDirective };
});

// Register directives globally
import { config } from '@vue/test-utils';

// Register directives
config.global.directives = {
  loading: {},
  auth: {},
};

// Mock router guard setup
vi.mock('/@/router/guard/index', () => ({ setupRouterGuard: vi.fn(() => {}) }));

// Mock useMessage hook to prevent ant-design-vue import errors
vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: () => ({
    createMessage: {
      success: vi.fn(),
      error: vi.fn(),
      info: vi.fn(),
      warning: vi.fn(),
    },
    notification: {
      success: vi.fn(),
      error: vi.fn(),
      info: vi.fn(),
      warning: vi.fn(),
      open: vi.fn(),
      close: vi.fn(),
      destroy: vi.fn(),
      config: vi.fn(),
    },
    createConfirm: vi.fn(),
    createSuccessModal: vi.fn(),
    createErrorModal: vi.fn(),
    createInfoModal: vi.fn(),
    createWarningModal: vi.fn(),
    showMessageModal: vi.fn(),
    showMessage: vi.fn(),
  }),
}));

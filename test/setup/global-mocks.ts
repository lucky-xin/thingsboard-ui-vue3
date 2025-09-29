import { vi } from 'vitest';

// Global mock for useMessage to prevent "useMessage is not a function" errors
vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: vi.fn(() => ({
    createMessage: vi.fn(),
    createConfirm: vi.fn(),
    createSuccessModal: vi.fn(),
    createInfoModal: vi.fn(),
    createWarningModal: vi.fn(),
    createErrorModal: vi.fn(),
    createSuccessConfirm: vi.fn(),
    createInfoConfirm: vi.fn(),
    createWarningConfirm: vi.fn(),
    createErrorConfirm: vi.fn(),
    showMessage: vi.fn(),
    showMessageModal: vi.fn(),
  })),
}));

// Global mock for useI18n
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: vi.fn(() => ({
    t: vi.fn((key: string) => key),
  })),
  t: vi.fn((key: string) => key),
}));

// Global mock for usePermission
vi.mock('/@/hooks/web/usePermission', () => ({
  usePermission: vi.fn(() => ({
    hasPermission: vi.fn(() => true),
  })),
}));

// Global mock for useGlobSetting
vi.mock('/@/hooks/setting/useGlobSetting', () => ({
  useGlobSetting: vi.fn(() => ({
    title: 'Test App',
    shortName: 'Test',
  })),
}));

// Global mock for useAppProviderContext
vi.mock('/@/components/Application', () => ({
  useAppProviderContext: vi.fn(() => ({
    prefixCls: 'ant',
    isMobile: false,
    siderCollapsed: false,
    collapsed: false,
    theme: 'light',
  })),
  AppLogo: {
    name: 'AppLogo',
    install: vi.fn(),
    template: '<div class="app-logo"></div>',
  },
  AppProvider: {
    name: 'AppProvider',
    install: vi.fn(),
    template: '<div class="app-provider"><slot /></div>',
  },
  AppSearch: {
    name: 'AppSearch',
    install: vi.fn(),
    template: '<div class="app-search"></div>',
  },
  AppLocalePicker: {
    name: 'AppLocalePicker',
    install: vi.fn(),
    template: '<div class="app-locale-picker"></div>',
  },
  AppDarkModeToggle: {
    name: 'AppDarkModeToggle',
    install: vi.fn(),
    template: '<div class="app-dark-mode-toggle"></div>',
  },
}));

// Global mock for withInstall utility
vi.mock('/@/utils', () => ({
  withInstall: vi.fn((component) => {
    const wrappedComponent = component || {};
    wrappedComponent.install = vi.fn((app) => {
      if (app && app.component) {
        app.component(component?.name || 'MockComponent', component);
      }
    });
    return wrappedComponent;
  }),
  deepMerge: vi.fn((target, source) => {
    const result = { ...target };
    Object.keys(source).forEach(key => {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = { ...target[key], ...source[key] };
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
  randomSecret: vi.fn((length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }),
  // Add missing utils functions
  noop: vi.fn(),
  REGULAR_HTML_ENCODE: /[<>&"'\x00-\x20\x7F-\uFFFF]/g,
  setObjToUrlParams: vi.fn((baseUrl, obj) => {
    const params = [];
    Object.keys(obj).forEach(key => {
      if (obj[key] !== undefined && obj[key] !== null) {
        params.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(obj[key]))}`);
      }
    });
    return `${baseUrl}?${params.join('&')}`;
  }),
  openWindow: vi.fn((url, options = {}) => {
    let { target = '__blank', noopener = true, noreferrer = true } = options;
    
    // Handle URL with ___blank suffix
    if (url.includes('?___blank')) {
      url = url.replace('?___blank', '');
    }
    
    const features = [];
    if (noopener) features.push('noopener=yes');
    if (noreferrer) features.push('noreferrer=yes');
    return window.open(url, target, features.join(','));
  }),
  openWindowLayer: vi.fn((url, options = {}) => {
    if (window.layer) {
      window.layer.open({
        type: 2,
        title: options.title || '',
        area: [`${options.width || 800}px`, `${options.height || 600}px`],
        content: url,
        ...options,
      });
    }
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
  copyToClipboard: vi.fn((text) => {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }),
  sleep: vi.fn((ms) => new Promise(resolve => setTimeout(resolve, ms))),
}));

// Global mock for Vue Router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    currentRoute: { value: { path: '/test' } },
    push: vi.fn(),
    replace: vi.fn(),
  })),
  createRouter: vi.fn(() => ({
    currentRoute: { value: { path: '/test' } },
    push: vi.fn(),
    replace: vi.fn(),
  })),
  createWebHashHistory: vi.fn(() => ({})),
}));

// Global mock for ant-design-vue Menu context
vi.mock('ant-design-vue/lib/menu/src/useMenuContext', () => ({
  useInjectMenu: vi.fn(() => ({
    prefixCls: 'ant-menu',
    mode: 'horizontal',
    theme: 'light',
    selectedKeys: [],
    openKeys: [],
    inlineCollapsed: false,
    antdMenuTheme: 'light',
    siderCollapsed: false,
    isRootMenu: true,
    subMenuOpenClose: vi.fn(),
    onItemClick: vi.fn(),
    onOpenChange: vi.fn(),
    onSelect: vi.fn(),
  })),
}));

vi.mock('ant-design-vue/es/menu/src/useMenuContext', () => ({
  useInjectMenu: vi.fn(() => ({
    prefixCls: 'ant-menu',
    mode: 'horizontal',
    theme: 'light',
    selectedKeys: [],
    openKeys: [],
    inlineCollapsed: false,
    antdMenuTheme: 'light',
    siderCollapsed: false,
    isRootMenu: true,
    subMenuOpenClose: vi.fn(),
    onItemClick: vi.fn(),
    onOpenChange: vi.fn(),
    onSelect: vi.fn(),
  })),
}));

// Global mock for ant-design-vue theme
vi.mock('ant-design-vue', async () => {
  const actual = await vi.importActual('ant-design-vue');
  return {
    ...actual,
    theme: {
      useToken: vi.fn(() => ({
        token: {
          colorPrimary: '#1890ff',
          colorBgContainer: '#ffffff',
          hashId: { value: 'test-hash-id' },
        },
      })),
    },
    Alert: {
      name: 'AAlert',
      props: {
        message: String,
        type: String,
        showIcon: Boolean,
      },
      template: '<div class="ant-alert"><slot /></div>',
    },
    // Add all missing components
    Table: {
      name: 'ATable',
      props: {
        dataSource: Array,
        columns: Array,
        pagination: [Object, Boolean],
        loading: Boolean,
        rowKey: [String, Function],
        scroll: Object,
        size: String,
        bordered: Boolean,
      },
      emits: ['change', 'expand', 'expandedRowsChange'],
      template: '<div class="ant-table"><slot /></div>',
    },
    Button: {
      name: 'AButton',
      props: {
        type: String,
        size: String,
        disabled: Boolean,
        loading: Boolean,
      },
      template: '<button class="ant-btn"><slot /></button>',
    },
    Input: {
      name: 'AInput',
      props: {
        value: String,
        placeholder: String,
        disabled: Boolean,
        size: String,
      },
      emits: ['update:value', 'change'],
      template: '<input class="ant-input" />',
    },
    InputNumber: {
      name: 'AInputNumber',
      props: {
        value: Number,
        placeholder: String,
        disabled: Boolean,
        size: String,
      },
      emits: ['update:value', 'change'],
      template: '<input class="ant-input-number" />',
    },
    Select: {
      name: 'ASelect',
      props: {
        value: [String, Number, Array],
        options: Array,
        placeholder: String,
        disabled: Boolean,
        size: String,
      },
      emits: ['update:value', 'change'],
      template: '<select class="ant-select"><slot /></select>',
    },
    Tooltip: {
      name: 'ATooltip',
      props: {
        title: String,
        placement: String,
      },
      template: '<div class="ant-tooltip"><slot /></div>',
    },
    Space: {
      name: 'ASpace',
      template: '<div class="ant-space"><slot /></div>',
    },
    Dropdown: {
      name: 'ADropdown',
      props: {
        trigger: [String, Array],
        placement: String,
      },
      template: '<div class="ant-dropdown"><slot /></div>',
    },
    Menu: {
      name: 'AMenu',
      props: {
        items: Array,
        mode: String,
        theme: String,
        selectedKeys: Array,
        openKeys: Array,
        inlineCollapsed: Boolean,
      },
      emits: ['select', 'openChange'],
      template: '<div class="ant-menu"><slot /></div>',
    },
    MenuItem: {
      name: 'AMenuItem',
      props: {
        key: String,
        disabled: Boolean,
      },
      template: '<div class="ant-menu-item"><slot /></div>',
    },
    SubMenu: {
      name: 'ASubMenu',
      props: {
        key: String,
        title: String,
        disabled: Boolean,
      },
      template: '<div class="ant-submenu"><slot /></div>',
    },
    Divider: {
      name: 'ADivider',
      template: '<div class="ant-divider" />',
    },
    Checkbox: {
      name: 'ACheckbox',
      props: {
        checked: Boolean,
        disabled: Boolean,
        indeterminate: Boolean,
      },
      emits: ['update:checked', 'change'],
      template: '<input type="checkbox" class="ant-checkbox" />',
    },
    CheckboxGroup: {
      name: 'ACheckboxGroup',
      props: {
        value: Array,
        options: Array,
        disabled: Boolean,
      },
      emits: ['update:value', 'change'],
      template: '<div class="ant-checkbox-group"><slot /></div>',
    },
    Popover: {
      name: 'APopover',
      props: {
        title: String,
        content: String,
        trigger: String,
        placement: String,
      },
      template: '<div class="ant-popover"><slot /></div>',
    },
    Image: {
      name: 'AImage',
      props: {
        src: String,
        alt: String,
        width: [String, Number],
        height: [String, Number],
        preview: Boolean,
      },
      template: '<div class="ant-image"><img /></div>',
    },
    Drawer: {
      name: 'ADrawer',
      props: {
        visible: Boolean,
        title: String,
        width: [String, Number],
        height: [String, Number],
        placement: String,
        mask: Boolean,
        maskClosable: Boolean,
        closable: Boolean,
        destroyOnClose: Boolean,
      },
      emits: ['close', 'update:visible'],
      template: '<div class="ant-drawer"><slot /></div>',
    },
    Collapse: {
      name: 'ACollapse',
      props: {
        activeKey: [String, Number, Array],
        defaultActiveKey: [String, Number, Array],
        accordion: Boolean,
        ghost: Boolean,
        size: String,
      },
      emits: ['change'],
      template: '<div class="ant-collapse"><slot /></div>',
    },
    CollapsePanel: {
      name: 'ACollapsePanel',
      props: {
        key: [String, Number],
        header: String,
        disabled: Boolean,
        showArrow: Boolean,
      },
      template: '<div class="ant-collapse-panel"><slot /></div>',
    },
    Tag: {
      name: 'ATag',
      props: {
        color: String,
        closable: Boolean,
      },
      emits: ['close'],
      template: '<span class="ant-tag"><slot /></span>',
    },
    Tree: {
      name: 'ATree',
      props: {
        treeData: Array,
        checkable: Boolean,
        checkStrictly: Boolean,
        selectedKeys: Array,
        checkedKeys: Array,
        expandedKeys: Array,
        defaultExpandAll: Boolean,
        showIcon: Boolean,
        blockNode: Boolean,
      },
      emits: ['check', 'select', 'expand'],
      template: '<div class="ant-tree">Tree</div>',
    },
    AutoComplete: {
      name: 'AAutoComplete',
      props: {
        value: String,
        options: Array,
        placeholder: String,
        disabled: Boolean,
        size: String,
      },
      emits: ['update:value', 'change', 'select'],
      template: '<div class="ant-auto-complete"><input /></div>',
    },
    Badge: {
      name: 'ABadge',
      props: {
        count: [String, Number],
        dot: Boolean,
        status: String,
        text: String,
        numberStyle: Object,
        offset: Array,
        showZero: Boolean,
        overflowCount: Number,
      },
      template: '<span class="ant-badge"><slot /></span>',
    },
  };
});

// Global mock for ant-design-vue theme import
vi.mock('ant-design-vue/es/theme', () => ({
  useToken: vi.fn(() => ({
    hashId: { value: 'test-hash-id' },
    token: {
      colorPrimary: '#1890ff',
      colorBgContainer: '#ffffff',
    },
  })),
}));

// Mock theme import from ant-design-vue
vi.mock('ant-design-vue', async () => {
  const actual = await vi.importActual('ant-design-vue');
  return {
    ...actual,
    theme: {
      useToken: vi.fn(() => ({
        hashId: { value: 'test-hash-id' },
        token: {
          colorPrimary: '#1890ff',
          colorBgContainer: '#ffffff',
        },
      })),
    },
  };
});

// Global mock for Vue provide/inject
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    inject: vi.fn((key) => {
      if (key === 'activeName') {
        return { value: 'test' };
      }
      if (key === 'rootMenuEmitter') {
        return {
          on: vi.fn(),
          off: vi.fn(),
          emit: vi.fn()
        };
      }
      if (key === 'getCollapse') {
        return { value: false };
      }
      return {
        addMenuItem: vi.fn(),
        removeMenuItem: vi.fn(),
        removeAll: vi.fn(),
        addSubMenu: vi.fn(),
        removeSubMenu: vi.fn(),
      };
    }),
  };
});

// Global mock for @vueuse/core
vi.mock('@vueuse/core', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useEventListener: vi.fn(() => vi.fn()),
    useResizeObserver: vi.fn(() => vi.fn()),
    useElementSize: vi.fn(() => ({ width: { value: 0 }, height: { value: 0 } })),
    useFullscreen: vi.fn(() => ({
      toggle: vi.fn(),
      isFullscreen: { value: false }
    })),
    useDebounceFn: vi.fn((fn) => fn),
    useThrottleFn: vi.fn((fn) => fn),
    tryOnUnmounted: vi.fn(),
    useWindowSize: vi.fn(() => ({ width: { value: 1920 }, height: { value: 1080 } })),
    useCopyToClipboard: vi.fn(() => ({
      clipboardRef: { value: '' },
      isSuccessRef: { value: false },
      copy: vi.fn()
    })),
    useWebSocket: vi.fn(() => ({
      status: { value: 'CLOSED' },
      data: { value: null },
      send: vi.fn(),
      close: vi.fn(),
      open: vi.fn()
    })),
  };
});

// Global mock for IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Global mock for addEventListener/removeEventListener
const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();

Object.defineProperty(global, 'addEventListener', {
  value: mockAddEventListener,
  writable: true,
});

Object.defineProperty(global, 'removeEventListener', {
  value: mockRemoveEventListener,
  writable: true,
});

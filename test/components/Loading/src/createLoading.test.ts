import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createLoading } from '/@/components/Loading/src/createLoading';

// Mock DOM environment
Object.defineProperty(document, 'getElementsByTagName', {
  value: vi.fn(() => []),
  writable: true,
});

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Spin: {
    template: "<div class=\"ant-spin\"><slot></slot></div>",
    props: ["spinning", "size", "tip"]
  }
}));

// Mock Vue
vi.mock('vue', () => ({
  createApp: vi.fn(() => ({
    mount: vi.fn(() => ({
      $el: document.createElement('div'),
      unmount: vi.fn()
    })),
    unmount: vi.fn()
  })),
  h: vi.fn((component, props, children) => ({ component, props, children })),
  defineComponent: vi.fn((options) => options),
  reactive: vi.fn((obj) => obj),
  ref: vi.fn((val) => ({ value: val })),
  unref: vi.fn((val) => val.value || val),
  toRaw: vi.fn((val) => val),
  createVNode: vi.fn((component, props, children) => ({ component, props, children })),
  render: vi.fn()
}));

// Mock store
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

// Mock hooks
vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

vi.mock("/@/hooks/web/useDesign", () => ({
  useDesign: vi.fn(() => ({
    prefixCls: 'loading'
  }))
}));

vi.mock("/@/hooks/web/useI18n", () => ({
  useI18n: vi.fn(() => ({
    t: vi.fn((key) => key)
  }))
}));

vi.mock("/@/enums/sizeEnum", () => ({
  SizeEnum: {
    DEFAULT: 'default',
    SMALL: 'small',
    LARGE: 'large'
  }
}));

describe('createLoading', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create loading instance', () => {
    const loading = createLoading();
    
    expect(loading).toBeDefined();
    expect(typeof loading).toBe('object');
  });

  it('should have close method', () => {
    const loading = createLoading();
    
    expect(loading.close).toBeDefined();
    expect(typeof loading.close).toBe('function');
  });

  it('should have setTip method', () => {
    const loading = createLoading();
    
    expect(loading.setTip).toBeDefined();
    expect(typeof loading.setTip).toBe('function');
  });

  it('should have setLoading method', () => {
    const loading = createLoading();
    
    expect(loading.setLoading).toBeDefined();
    expect(typeof loading.setLoading).toBe('function');
  });

  it('should call close method without errors', () => {
    const loading = createLoading();
    
    expect(() => loading.close()).not.toThrow();
  });

  it('should call setTip method without errors', () => {
    const loading = createLoading();
    
    expect(() => loading.setTip('Loading...')).not.toThrow();
  });

  it('should call setLoading method without errors', () => {
    const loading = createLoading();
    
    expect(() => loading.setLoading(true)).not.toThrow();
  });

  it('should handle different tip values', () => {
    const loading = createLoading();
    
    const tips = ['Loading...', 'Please wait...', '', null, undefined];
    
    tips.forEach(tip => {
      expect(() => loading.setTip(tip)).not.toThrow();
    });
  });

  it('should handle different loading states', () => {
    const loading = createLoading();
    
    const states = [true, false, null, undefined];
    
    states.forEach(state => {
      expect(() => loading.setLoading(state)).not.toThrow();
    });
  });
});
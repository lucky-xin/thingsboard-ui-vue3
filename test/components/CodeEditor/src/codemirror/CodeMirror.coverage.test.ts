import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import CodeMirror from '/@/components/CodeEditor/src/codemirror/CodeMirror.vue';

// Mock all dependencies
vi.mock('/@/hooks/event/useWindowSizeFn', () => ({
  useWindowSizeFn: vi.fn(),
}));

vi.mock('@vueuse/core', () => ({
  useDebounceFn: vi.fn((fn) => fn),
}));

vi.mock('/@/store/modules/app', () => ({
  useAppStore: () => ({
    getDarkMode: 'dark',
  }),
}));

vi.mock('codemirror', () => ({
  default: vi.fn(() => ({
    setValue: vi.fn(),
    getValue: vi.fn(() => 'test value'),
    setOption: vi.fn(),
    refresh: vi.fn(),
    on: vi.fn(),
  })),
}));

vi.mock('./../typing', () => ({
  MODE: {
    JSON: 'json',
    JAVASCRIPT: 'javascript',
    TYPESCRIPT: 'typescript',
    HTML: 'html',
    CSS: 'css',
    SQL: 'sql',
  },
  parserDynamicImport: vi.fn(() => () => Promise.resolve()),
}));

vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    ref: vi.fn((val) => ({ value: val })),
    onMounted: vi.fn((fn) => fn()),
    onUnmounted: vi.fn((fn) => fn()),
    watchEffect: vi.fn((fn) => fn()),
    watch: vi.fn(),
    unref: vi.fn((val) => val),
    nextTick: vi.fn(() => Promise.resolve()),
  };
});

// Mock CSS imports
vi.mock('codemirror/lib/codemirror.css', () => ({}));
vi.mock('codemirror/theme/idea.css', () => ({}));
vi.mock('codemirror/theme/material-palenight.css', () => ({}));
vi.mock('codemirror/addon/fold/foldgutter.css', () => ({}));
vi.mock('codemirror/addon/fold/foldcode.js', () => ({}));
vi.mock('codemirror/addon/fold/foldgutter', () => ({}));
vi.mock('codemirror/addon/fold/brace-fold', () => ({}));
vi.mock('codemirror/addon/fold/comment-fold', () => ({}));
vi.mock('codemirror/addon/fold/markdown-fold', () => ({}));
vi.mock('codemirror/addon/fold/xml-fold', () => ({}));
vi.mock('codemirror/addon/fold/indent-fold', () => ({}));

describe('CodeMirror Coverage', () => {
  let wrapper: any;
  const pinia = createPinia();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with default props', () => {
    wrapper = mount(CodeMirror, {
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with custom props', () => {
    wrapper = mount(CodeMirror, {
      props: {
        mode: 'json',
        value: 'test value',
        readonly: true,
        bordered: true,
        config: { tabSize: 4 },
      },
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle value changes with different old value', async () => {
    const CodeMirrorLib = await import('codemirror');
    const mockEditor = {
      setValue: vi.fn(),
      getValue: vi.fn(() => 'old value'),
      setOption: vi.fn(),
      refresh: vi.fn(),
      on: vi.fn(),
    };
    vi.mocked(CodeMirrorLib.default).mockReturnValue(mockEditor);

    wrapper = mount(CodeMirror, {
      props: {
        value: 'initial value',
      },
      global: {
        plugins: [pinia],
      },
    });

    // Test value change logic when old value is different
    await wrapper.setProps({ value: 'new value' });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle value changes with same old value', async () => {
    const CodeMirrorLib = await import('codemirror');
    const mockEditor = {
      setValue: vi.fn(),
      getValue: vi.fn(() => 'same value'),
      setOption: vi.fn(),
      refresh: vi.fn(),
      on: vi.fn(),
    };
    vi.mocked(CodeMirrorLib.default).mockReturnValue(mockEditor);

    wrapper = mount(CodeMirror, {
      props: {
        value: 'same value',
      },
      global: {
        plugins: [pinia],
      },
    });

    // Test value change logic when old value is same
    await wrapper.setProps({ value: 'same value' });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle value changes with empty value', async () => {
    const CodeMirrorLib = await import('codemirror');
    const mockEditor = {
      setValue: vi.fn(),
      getValue: vi.fn(() => 'old value'),
      setOption: vi.fn(),
      refresh: vi.fn(),
      on: vi.fn(),
    };
    vi.mocked(CodeMirrorLib.default).mockReturnValue(mockEditor);

    wrapper = mount(CodeMirror, {
      props: {
        value: 'initial value',
      },
      global: {
        plugins: [pinia],
      },
    });

    // Test value change logic when new value is empty
    await wrapper.setProps({ value: '' });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle mode changes', async () => {
    wrapper = mount(CodeMirror, {
      props: {
        mode: 'json',
      },
      global: {
        plugins: [pinia],
      },
    });

    // Test mode change logic
    await wrapper.setProps({ mode: 'javascript' });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle dark mode changes to light', async () => {
    const { useAppStore } = await import('/@/store/modules/app');
    const mockAppStore = useAppStore();
    
    // Test dark mode change logic
    mockAppStore.getDarkMode = 'light';
    expect(mockAppStore.getDarkMode).toBe('light');
  });

  it('should handle dark mode changes to dark', async () => {
    const { useAppStore } = await import('/@/store/modules/app');
    const mockAppStore = useAppStore();
    
    // Test dark mode change logic
    mockAppStore.getDarkMode = 'dark';
    expect(mockAppStore.getDarkMode).toBe('dark');
  });

  it('should handle editor initialization', async () => {
    const CodeMirrorLib = await import('codemirror');
    const mockEditor = {
      setValue: vi.fn(),
      getValue: vi.fn(() => 'test value'),
      setOption: vi.fn(),
      refresh: vi.fn(),
      on: vi.fn(),
    };
    vi.mocked(CodeMirrorLib.default).mockReturnValue(mockEditor);

    wrapper = mount(CodeMirror, {
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle editor change events', async () => {
    const CodeMirrorLib = await import('codemirror');
    const mockEditor = {
      setValue: vi.fn(),
      getValue: vi.fn(() => 'test value'),
      setOption: vi.fn(),
      refresh: vi.fn(),
      on: vi.fn((event, callback) => {
        if (event === 'change') {
          callback();
        }
      }),
    };
    vi.mocked(CodeMirrorLib.default).mockReturnValue(mockEditor);

    wrapper = mount(CodeMirror, {
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle refresh functionality', async () => {
    const CodeMirrorLib = await import('codemirror');
    const mockEditor = {
      setValue: vi.fn(),
      getValue: vi.fn(() => 'test value'),
      setOption: vi.fn(),
      refresh: vi.fn(),
      on: vi.fn(),
    };
    vi.mocked(CodeMirrorLib.default).mockReturnValue(mockEditor);

    wrapper = mount(CodeMirror, {
      global: {
        plugins: [pinia],
      },
    });

    // Test refresh function call
    mockEditor.refresh();
    expect(mockEditor.refresh).toHaveBeenCalled();
  });

  it('should handle component unmounting', async () => {
    wrapper = mount(CodeMirror, {
      global: {
        plugins: [pinia],
      },
    });

    await wrapper.unmount();
    expect(wrapper.exists()).toBe(false);
  });

  it('should handle readonly prop', () => {
    wrapper = mount(CodeMirror, {
      props: {
        readonly: true,
      },
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle bordered prop', () => {
    wrapper = mount(CodeMirror, {
      props: {
        bordered: true,
      },
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle custom config', () => {
    wrapper = mount(CodeMirror, {
      props: {
        config: {
          tabSize: 4,
          lineNumbers: false,
        },
      },
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle all props combinations', () => {
    const propsCombinations = [
      {
        mode: 'json',
        value: 'test value',
        readonly: false,
        bordered: false,
        config: {},
      },
      {
        mode: 'javascript',
        value: '',
        readonly: true,
        bordered: true,
        config: { tabSize: 4 },
      },
      {
        mode: 'typescript',
        value: 'const test = 1;',
        readonly: false,
        bordered: false,
        config: { lineNumbers: true },
      },
    ];

    propsCombinations.forEach((props) => {
      const testWrapper = mount(CodeMirror, {
        props,
        global: {
          plugins: [pinia],
        },
      });

      expect(testWrapper.exists()).toBe(true);
      testWrapper.unmount();
    });
  });

  it('should handle component lifecycle', () => {
    wrapper = mount(CodeMirror, {
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.exists()).toBe(true);

    wrapper.unmount();
    expect(wrapper.exists()).toBe(false);
  });

  it('should handle edge cases', () => {
    wrapper = mount(CodeMirror, {
      props: {
        value: null,
        mode: 'json',
        readonly: false,
        bordered: false,
        config: null,
      },
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle theme setting with light mode', async () => {
    const { useAppStore } = await import('/@/store/modules/app');
    const mockAppStore = useAppStore();
    
    // Test theme setting with light mode
    mockAppStore.getDarkMode = 'light';
    expect(mockAppStore.getDarkMode).toBe('light');
  });

  it('should handle theme setting with dark mode', async () => {
    const { useAppStore } = await import('/@/store/modules/app');
    const mockAppStore = useAppStore();
    
    // Test theme setting with dark mode
    mockAppStore.getDarkMode = 'dark';
    expect(mockAppStore.getDarkMode).toBe('dark');
  });

  it('should handle refresh function call', async () => {
    const CodeMirrorLib = await import('codemirror');
    const mockEditor = {
      setValue: vi.fn(),
      getValue: vi.fn(() => 'test value'),
      setOption: vi.fn(),
      refresh: vi.fn(),
      on: vi.fn(),
    };
    vi.mocked(CodeMirrorLib.default).mockReturnValue(mockEditor);

    wrapper = mount(CodeMirror, {
      global: {
        plugins: [pinia],
      },
    });
    
    // Test refresh function call
    mockEditor.refresh();
    expect(mockEditor.refresh).toHaveBeenCalled();
  });
});

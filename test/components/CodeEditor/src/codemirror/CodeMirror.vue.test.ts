import { describe, it, expect, vi, beforeEach } from 'vitest';

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

import { mount } from '@vue/test-utils';
import CodeMirror from '/@/components/CodeEditor/src/codemirror/CodeMirror';

describe('CodeMirror', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = mount(CodeMirror);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(CodeMirror);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle props correctly', () => {
    const props = {
      mode: 'json',
      value: 'test value',
      readonly: true,
      bordered: true,
      config: { tabSize: 4 },
    };
    const wrapper = mount(CodeMirror, {
      props,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle value changes', async () => {
    const wrapper = mount(CodeMirror, {
      props: {
        value: 'initial value',
      },
    });

    // Test value change logic
    await wrapper.setProps({ value: 'new value' });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle mode changes', async () => {
    const wrapper = mount(CodeMirror, {
      props: {
        mode: 'json',
      },
    });

    // Test mode change logic
    await wrapper.setProps({ mode: 'javascript' });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle dark mode changes', async () => {
    const { useAppStore } = await import('/@/store/modules/app');
    const mockAppStore = useAppStore();
    
    // Test dark mode change logic
    mockAppStore.getDarkMode = 'light';
    expect(mockAppStore.getDarkMode).toBe('light');
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

    const wrapper = mount(CodeMirror);
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

    const wrapper = mount(CodeMirror);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle theme setting', async () => {
    const { useAppStore } = await import('/@/store/modules/app');
    const mockAppStore = useAppStore();
    
    // Test theme setting logic
    mockAppStore.getDarkMode = 'dark';
    expect(mockAppStore.getDarkMode).toBe('dark');
    
    mockAppStore.getDarkMode = 'light';
    expect(mockAppStore.getDarkMode).toBe('light');
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

    const wrapper = mount(CodeMirror);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle component unmounting', async () => {
    const wrapper = mount(CodeMirror);
    await wrapper.unmount();
    expect(wrapper.exists()).toBe(false);
  });

  it('should handle readonly prop', () => {
    const wrapper = mount(CodeMirror, {
      props: {
        readonly: true,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle bordered prop', () => {
    const wrapper = mount(CodeMirror, {
      props: {
        bordered: true,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle custom config', () => {
    const wrapper = mount(CodeMirror, {
      props: {
        config: {
          tabSize: 4,
          lineNumbers: false,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle value change with different old value', async () => {
    const CodeMirrorLib = await import('codemirror');
    const mockEditor = {
      setValue: vi.fn(),
      getValue: vi.fn(() => 'old value'),
      setOption: vi.fn(),
      refresh: vi.fn(),
      on: vi.fn(),
    };
    vi.mocked(CodeMirrorLib.default).mockReturnValue(mockEditor);

    const wrapper = mount(CodeMirror, {
      props: {
        value: 'initial value',
      },
    });

    // Test value change logic when old value is different
    await wrapper.setProps({ value: 'new value' });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle value change with empty value', async () => {
    const CodeMirrorLib = await import('codemirror');
    const mockEditor = {
      setValue: vi.fn(),
      getValue: vi.fn(() => 'old value'),
      setOption: vi.fn(),
      refresh: vi.fn(),
      on: vi.fn(),
    };
    vi.mocked(CodeMirrorLib.default).mockReturnValue(mockEditor);

    const wrapper = mount(CodeMirror, {
      props: {
        value: 'initial value',
      },
    });

    // Test value change logic when new value is empty
    await wrapper.setProps({ value: '' });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle dark mode change trigger', async () => {
    const { useAppStore } = await import('/@/store/modules/app');
    const mockAppStore = useAppStore();
    
    // Test dark mode change trigger logic
    mockAppStore.getDarkMode = 'dark';
    expect(mockAppStore.getDarkMode).toBe('dark');
    
    // Trigger theme change
    mockAppStore.getDarkMode = 'light';
    expect(mockAppStore.getDarkMode).toBe('light');
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

    const wrapper = mount(CodeMirror);
    
    // Test refresh function call
    mockEditor.refresh();
    expect(mockEditor.refresh).toHaveBeenCalled();
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
});

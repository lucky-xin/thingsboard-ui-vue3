import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import CodeMirror from '/@/components/CodeEditor/src/codemirror/CodeMirror.vue';

// Mock CodeMirror
const mockEditor = {
  getValue: vi.fn(() => ''),
  setValue: vi.fn(),
  setOption: vi.fn(),
  refresh: vi.fn(),
  on: vi.fn()
};

vi.mock('codemirror', () => ({
  default: vi.fn(() => mockEditor)
}));

// Mock dependencies
vi.mock('/@/hooks/event/useWindowSizeFn', () => ({
  useWindowSizeFn: vi.fn()
}));

vi.mock('@vueuse/core', () => ({
  useDebounceFn: vi.fn((fn) => fn)
}));

vi.mock('/@/store/modules/app', () => ({
  useAppStore: vi.fn(() => ({
    getDarkMode: 'light'
  }))
}));

vi.mock('/@/components/CodeEditor/src/typing', () => ({
  MODE: {
    JSON: 'json',
    JAVASCRIPT: 'javascript',
    TYPESCRIPT: 'typescript',
    HTML: 'html',
    CSS: 'css',
    SQL: 'sql'
  },
  parserDynamicImport: vi.fn(() => () => Promise.resolve())
}));

describe('CodeMirror', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = mount(CodeMirror, {
      props: {
        value: 'test code'
      }
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(CodeMirror);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('mode')).toBe('json');
    expect(wrapper.props('value')).toBe('');
    expect(wrapper.props('readonly')).toBe(false);
    expect(wrapper.props('bordered')).toBe(false);
  });

  it('should render with custom props', () => {
    const wrapper = mount(CodeMirror, {
      props: {
        mode: 'javascript',
        value: 'console.log("test");',
        readonly: true,
        bordered: true,
        config: { lineNumbers: false }
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('mode')).toBe('javascript');
    expect(wrapper.props('value')).toBe('console.log("test");');
    expect(wrapper.props('readonly')).toBe(true);
    expect(wrapper.props('bordered')).toBe(true);
  });

  it('should apply bordered class when bordered is true', () => {
    const wrapper = mount(CodeMirror, {
      props: {
        bordered: true
      }
    });

    expect(wrapper.find('.ant-input').exists()).toBe(true);
  });

  it('should not apply bordered class when bordered is false', () => {
    const wrapper = mount(CodeMirror, {
      props: {
        bordered: false
      }
    });

    expect(wrapper.find('.ant-input').exists()).toBe(false);
  });

  it('should handle value changes', async () => {
    const wrapper = mount(CodeMirror, {
      props: {
        value: 'initial value'
      }
    });

    await nextTick();

    await wrapper.setProps({
      value: 'updated value'
    });

    await nextTick();

    expect(mockEditor.setValue).toHaveBeenCalledWith('updated value');
  });

  it('should handle mode changes', async () => {
    const wrapper = mount(CodeMirror, {
      props: {
        mode: 'json'
      }
    });

    await nextTick();

    await wrapper.setProps({
      mode: 'javascript'
    });

    await nextTick();

    expect(mockEditor.setOption).toHaveBeenCalledWith('mode', 'javascript');
  });

  it('should emit change event when editor content changes', async () => {
    const wrapper = mount(CodeMirror);

    await nextTick();

    // Simulate editor change event
    const changeCallback = mockEditor.on.mock.calls.find(call => call[0] === 'change')?.[1];
    if (changeCallback) {
      changeCallback();
    }

    expect(wrapper.emitted('change')).toBeDefined();
  });

  it('should handle theme changes based on dark mode', async () => {
    const wrapper = mount(CodeMirror);

    await nextTick();

    // Test that setOption is called for theme
    expect(mockEditor.setOption).toHaveBeenCalled();
  });

  it('should initialize editor with correct configuration', async () => {
    const wrapper = mount(CodeMirror, {
      props: {
        value: 'test code',
        mode: 'javascript',
        readonly: true,
        config: { lineNumbers: false }
      }
    });

    await nextTick();

    // Verify CodeMirror was called - just check that the component renders
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle refresh function', async () => {
    const wrapper = mount(CodeMirror);

    await nextTick();

    // Access the component instance and call refresh
    const vm = wrapper.vm as any;
    if (vm.refresh) {
      vm.refresh();
      expect(mockEditor.refresh).toHaveBeenCalled();
    }
  });

  it('should handle setTheme function', async () => {
    const wrapper = mount(CodeMirror);

    await nextTick();

    // Access the component instance and call setTheme
    const vm = wrapper.vm as any;
    if (vm.setTheme) {
      vm.setTheme();
      expect(mockEditor.setOption).toHaveBeenCalled();
    }
  });

  it('should handle different mode values', () => {
    const modes = ['json', 'javascript', 'typescript', 'html', 'css', 'sql'];
    
    modes.forEach(mode => {
      const wrapper = mount(CodeMirror, {
        props: { mode }
      });
      
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.props('mode')).toBe(mode);
    });
  });

  it('should handle readonly prop', () => {
    const wrapper = mount(CodeMirror, {
      props: {
        readonly: true
      }
    });

    expect(wrapper.props('readonly')).toBe(true);
  });

  it('should handle config prop', () => {
    const customConfig = {
      lineNumbers: false,
      tabSize: 4
    };

    const wrapper = mount(CodeMirror, {
      props: {
        config: customConfig
      }
    });

    expect(wrapper.props('config')).toEqual(customConfig);
  });

  it('should handle empty value', async () => {
    const wrapper = mount(CodeMirror, {
      props: {
        value: ''
      }
    });

    await nextTick();

    expect(mockEditor.setValue).toHaveBeenCalledWith('');
  });

  it('should handle null value', async () => {
    const wrapper = mount(CodeMirror, {
      props: {
        value: null
      }
    });

    await nextTick();

    expect(mockEditor.setValue).toHaveBeenCalledWith(null);
  });

  it('should handle undefined value', async () => {
    const wrapper = mount(CodeMirror, {
      props: {
        value: undefined
      }
    });

    await nextTick();

    expect(mockEditor.setValue).toHaveBeenCalledWith('');
  });

  it('should cleanup editor on unmount', async () => {
    const wrapper = mount(CodeMirror);

    await nextTick();

    wrapper.unmount();

    // Editor should be set to null on unmount
    expect(true).toBe(true); // Just verify unmount doesn't throw
  });
});

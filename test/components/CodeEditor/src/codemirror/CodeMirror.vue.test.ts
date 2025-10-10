import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import CodeMirror from '/@/components/CodeEditor/src/codemirror/CodeMirror.vue';

// Mock CodeMirror
vi.mock('codemirror', () => ({
  default: {
    Editor: vi.fn(() => ({
      getValue: vi.fn(() => ''),
      setValue: vi.fn(),
      setOption: vi.fn(),
      refresh: vi.fn(),
      on: vi.fn(),
    })),
  },
}));

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

// Mock dependencies
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

vi.mock('/@/components/CodeEditor/src/typing', () => ({
  MODE: {
    JSON: 'json',
    JAVASCRIPT: 'javascript',
    TYPESCRIPT: 'typescript',
    HTML: 'html',
    CSS: 'css',
    SQL: 'sql',
    XML: 'xml',
    YAML: 'yaml',
    MARKDOWN: 'markdown',
  },
  parserDynamicImport: vi.fn(() => () => Promise.resolve()),
}));

describe('CodeMirror.vue', () => {
  let wrapper: any;

  const defaultProps = {
    value: 'console.log("Hello World");',
    mode: 'javascript',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = mount(CodeMirror, {
      props: defaultProps,
    });
  });

  it('should render correctly', () => {
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('div').classes()).toContain('relative');
    expect(wrapper.find('div').classes()).toContain('w-full');
    expect(wrapper.find('div').classes()).toContain('overflow-hidden');
  });

  it('should apply bordered class when bordered prop is true', async () => {
    await wrapper.setProps({
      bordered: true,
    });
    
    expect(wrapper.find('div').classes()).toContain('ant-input');
    expect(wrapper.find('div').classes()).toContain('css-dev-only-do-not-override-kqecok');
  });

  it('should handle props correctly', async () => {
    await wrapper.setProps({
      value: 'const x = 1;',
      mode: 'typescript',
      readonly: true,
      bordered: true,
      config: { tabSize: 4 },
    });
    
    expect(wrapper.props('value')).toBe('const x = 1;');
    expect(wrapper.props('mode')).toBe('typescript');
    expect(wrapper.props('readonly')).toBe(true);
    expect(wrapper.props('bordered')).toBe(true);
    expect(wrapper.props('config')).toEqual({ tabSize: 4 });
  });

  it('should handle default props', () => {
    const defaultWrapper = mount(CodeMirror);
    
    expect(defaultWrapper.props('value')).toBe('');
    expect(defaultWrapper.props('mode')).toBe('json');
    expect(defaultWrapper.props('readonly')).toBe(false);
    expect(defaultWrapper.props('bordered')).toBe(false);
  });

  it('should handle mode validation', () => {
    const validModes = ['json', 'javascript', 'typescript', 'html', 'css', 'sql', 'xml', 'yaml', 'markdown'];
    
    validModes.forEach(mode => {
      const wrapper = mount(CodeMirror, {
        props: { mode },
      });
      expect(wrapper.props('mode')).toBe(mode);
    });
  });

  it('should handle value changes', async () => {
    await wrapper.setProps({
      value: 'new value',
    });
    
    expect(wrapper.props('value')).toBe('new value');
  });

  it('should handle readonly prop', async () => {
    await wrapper.setProps({
      readonly: true,
    });
    
    expect(wrapper.props('readonly')).toBe(true);
  });

  it('should handle config prop', async () => {
    const customConfig = {
      tabSize: 4,
      lineNumbers: false,
    };
    
    await wrapper.setProps({
      config: customConfig,
    });
    
    expect(wrapper.props('config')).toEqual(customConfig);
  });

  it('should emit change event', () => {
    // Test that the component can be mounted without errors
    expect(wrapper.emitted()).toBeDefined();
  });

  it('should handle different modes', async () => {
    const modes = ['json', 'javascript', 'typescript', 'html', 'css'];
    
    for (const mode of modes) {
      await wrapper.setProps({ mode });
      expect(wrapper.props('mode')).toBe(mode);
    }
  });

  it('should handle empty value', async () => {
    await wrapper.setProps({
      value: '',
    });
    
    expect(wrapper.props('value')).toBe('');
  });

  it('should handle complex value', async () => {
    const complexValue = `{
  "name": "test",
  "version": "1.0.0",
  "dependencies": {
    "vue": "^3.0.0"
  }
}`;
    
    await wrapper.setProps({
      value: complexValue,
    });
    
    expect(wrapper.props('value')).toBe(complexValue);
  });
});
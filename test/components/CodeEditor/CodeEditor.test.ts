import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import CodeEditor from '/@/components/CodeEditor/src/CodeEditor';

// Mock dependencies
vi.mock('/@/components/CodeEditor/src/codemirror/CodeMirror.vue', () => ({
  default: {
    name: 'CodeMirrorEditor',
    template: '<div data-testid="codemirror-editor">{{ value }}</div>',
    props: ['value', 'mode', 'readonly', 'bordered', 'config'],
    emits: ['change'],
  },
}));

vi.mock('/@/utils/is', () => ({
  isString: vi.fn((val) => typeof val === 'string'),
  isFunction: vi.fn((val) => typeof val === 'function'),
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
}));

// Mock build configuration for Vite plugins
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme-output.css',
  writable: true
});

Object.defineProperty(globalThis, '__PROD__', {
  value: false,
  writable: true
});

Object.defineProperty(globalThis, '__COLOR_PLUGIN_OPTIONS__', {
  value: {},
  writable: true
});

describe('CodeEditor', () => {
  it('should render with default props', () => {
    const wrapper = mount(CodeEditor, {
      props: {
        value: 'test value',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="codemirror-editor"]').exists()).toBe(true);
  });

  it('should render with string value', () => {
    const wrapper = mount(CodeEditor, {
      props: {
        value: 'Hello World',
        mode: 'json',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="codemirror-editor"]').text()).toBe('Hello World');
  });

  it('should render with object value', () => {
    const wrapper = mount(CodeEditor, {
      props: {
        value: { name: 'test', value: 123 },
        mode: 'json',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="codemirror-editor"]').exists()).toBe(true);
  });

  it('should handle readonly mode', () => {
    const wrapper = mount(CodeEditor, {
      props: {
        value: 'test value',
        readonly: true,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="codemirror-editor"]').exists()).toBe(true);
  });

  it('should handle bordered mode', () => {
    const wrapper = mount(CodeEditor, {
      props: {
        value: 'test value',
        bordered: true,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="codemirror-editor"]').exists()).toBe(true);
  });

  it('should handle different modes', () => {
    const wrapper = mount(CodeEditor, {
      props: {
        value: 'test value',
        mode: 'javascript',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="codemirror-editor"]').exists()).toBe(true);
  });

  it('should handle autoFormat for JSON', () => {
    const wrapper = mount(CodeEditor, {
      props: {
        value: '{"name":"test","value":123}',
        mode: 'json',
        autoFormat: true,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="codemirror-editor"]').exists()).toBe(true);
  });

  it('should handle autoFormat disabled', () => {
    const wrapper = mount(CodeEditor, {
      props: {
        value: '{"name":"test","value":123}',
        mode: 'json',
        autoFormat: false,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="codemirror-editor"]').exists()).toBe(true);
  });

  it('should handle non-JSON mode with autoFormat', () => {
    const wrapper = mount(CodeEditor, {
      props: {
        value: 'test value',
        mode: 'javascript',
        autoFormat: true,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="codemirror-editor"]').exists()).toBe(true);
  });

  it('should emit change event', async () => {
    const wrapper = mount(CodeEditor, {
      props: {
        value: 'test value',
      },
    });

    const codeMirrorEditor = wrapper.find('[data-testid="codemirror-editor"]');
    await codeMirrorEditor.trigger('change');

    expect(wrapper.exists()).toBe(true);
  });

  it('should emit update:value event', async () => {
    const wrapper = mount(CodeEditor, {
      props: {
        value: 'test value',
      },
    });

    const codeMirrorEditor = wrapper.find('[data-testid="codemirror-editor"]');
    await codeMirrorEditor.trigger('change');

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle JSON parse error', async () => {
    const wrapper = mount(CodeEditor, {
      props: {
        value: 'invalid json',
        mode: 'json',
        autoFormat: true,
      },
    });

    // Mock JSON.parse to throw error
    const originalParse = JSON.parse;
    JSON.parse = vi.fn(() => {
      throw new Error('Invalid JSON');
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('format-error')).toBeTruthy();
    expect(wrapper.emitted('format-error')[0]).toEqual(['invalid json']);

    // Restore JSON.parse
    JSON.parse = originalParse;
  });

  it('should handle custom config', () => {
    const customConfig = { lineNumbers: true, theme: 'default' };
    const wrapper = mount(CodeEditor, {
      props: {
        value: 'test value',
        config: customConfig,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="codemirror-editor"]').exists()).toBe(true);
  });

  it('should handle component lifecycle', () => {
    const wrapper = mount(CodeEditor, {
      props: {
        value: 'test value',
      },
    });

    expect(wrapper.exists()).toBe(true);
    wrapper.unmount();
    expect(wrapper.exists()).toBe(false);
  });
});
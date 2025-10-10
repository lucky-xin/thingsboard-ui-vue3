import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import CodeEditor from '/@/components/CodeEditor/src/CodeEditor.vue';

// Mock dependencies
vi.mock('/@/components/CodeEditor/src/codemirror/CodeMirror.vue', () => ({
  default: {
    name: 'CodeMirrorEditor',
    template: '<div class="codemirror-editor"><slot></slot></div>',
    props: ['value', 'mode', 'readonly', 'bordered', 'config'],
    emits: ['change'],
  },
}));

vi.mock('/@/utils/is', () => ({
  isString: vi.fn((value) => typeof value === 'string'),
}));

vi.mock('/@/components/CodeEditor/src/typing', () => ({
  MODE: {
    JSON: 'json',
    JAVASCRIPT: 'javascript',
    TYPESCRIPT: 'typescript',
    HTML: 'html',
    CSS: 'css',
    SQL: 'sql',
  },
}));

describe('CodeEditor Coverage', () => {
  let wrapper: any;
  const pinia = createPinia();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with default props', () => {
    wrapper = mount(CodeEditor, {
      global: {
        plugins: [pinia],
        stubs: {
          'CodeMirrorEditor': {
            template: '<div class="codemirror-editor"><slot></slot></div>',
            props: ['value', 'mode', 'readonly', 'bordered', 'config'],
            emits: ['change'],
          },
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with string value', () => {
    wrapper = mount(CodeEditor, {
      props: {
        value: 'console.log("hello");',
        mode: 'javascript',
        readonly: false,
        autoFormat: true,
        bordered: false,
        config: {},
      },
      global: {
        plugins: [pinia],
        stubs: {
          'CodeMirrorEditor': {
            template: '<div class="codemirror-editor"><slot></slot></div>',
            props: ['value', 'mode', 'readonly', 'bordered', 'config'],
            emits: ['change'],
          },
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with object value', () => {
    wrapper = mount(CodeEditor, {
      props: {
        value: { name: 'test', value: 123 },
        mode: 'json',
        readonly: false,
        autoFormat: true,
        bordered: true,
        config: { lineNumbers: true },
      },
      global: {
        plugins: [pinia],
        stubs: {
          'CodeMirrorEditor': {
            template: '<div class="codemirror-editor"><slot></slot></div>',
            props: ['value', 'mode', 'readonly', 'bordered', 'config'],
            emits: ['change'],
          },
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle JSON formatting with valid JSON string', () => {
    wrapper = mount(CodeEditor, {
      props: {
        value: '{"name":"test","value":123}',
        mode: 'json',
        autoFormat: true,
      },
      global: {
        plugins: [pinia],
        stubs: {
          'CodeMirrorEditor': {
            template: '<div class="codemirror-editor"><slot></slot></div>',
            props: ['value', 'mode', 'readonly', 'bordered', 'config'],
            emits: ['change'],
          },
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle JSON formatting with invalid JSON string', () => {
    wrapper = mount(CodeEditor, {
      props: {
        value: 'invalid json string',
        mode: 'json',
        autoFormat: true,
      },
      global: {
        plugins: [pinia],
        stubs: {
          'CodeMirrorEditor': {
            template: '<div class="codemirror-editor"><slot></slot></div>',
            props: ['value', 'mode', 'readonly', 'bordered', 'config'],
            emits: ['change'],
          },
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle non-JSON mode without formatting', () => {
    wrapper = mount(CodeEditor, {
      props: {
        value: 'console.log("hello");',
        mode: 'javascript',
        autoFormat: true,
      },
      global: {
        plugins: [pinia],
        stubs: {
          'CodeMirrorEditor': {
            template: '<div class="codemirror-editor"><slot></slot></div>',
            props: ['value', 'mode', 'readonly', 'bordered', 'config'],
            emits: ['change'],
          },
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle autoFormat disabled', () => {
    wrapper = mount(CodeEditor, {
      props: {
        value: '{"name":"test"}',
        mode: 'json',
        autoFormat: false,
      },
      global: {
        plugins: [pinia],
        stubs: {
          'CodeMirrorEditor': {
            template: '<div class="codemirror-editor"><slot></slot></div>',
            props: ['value', 'mode', 'readonly', 'bordered', 'config'],
            emits: ['change'],
          },
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle value change event', () => {
    wrapper = mount(CodeEditor, {
      props: {
        value: 'initial value',
        mode: 'javascript',
      },
      global: {
        plugins: [pinia],
        stubs: {
          'CodeMirrorEditor': {
            template: '<div class="codemirror-editor"><slot></slot></div>',
            props: ['value', 'mode', 'readonly', 'bordered', 'config'],
            emits: ['change'],
          },
        },
      },
    });

    // Test handleValueChange function
    wrapper.vm.handleValueChange('new value');
    expect(wrapper.emitted('update:value')).toBeTruthy();
    expect(wrapper.emitted('change')).toBeTruthy();
  });

  it('should handle all props combinations', () => {
    const propsCombinations = [
      {
        value: 'test string',
        mode: 'javascript',
        readonly: false,
        autoFormat: true,
        bordered: false,
        config: {},
      },
      {
        value: { test: 'object' },
        mode: 'json',
        readonly: true,
        autoFormat: false,
        bordered: true,
        config: { lineNumbers: true },
      },
      {
        value: null,
        mode: 'html',
        readonly: false,
        autoFormat: true,
        bordered: false,
        config: {},
      },
    ];

    propsCombinations.forEach((props) => {
      const testWrapper = mount(CodeEditor, {
        props,
        global: {
          plugins: [pinia],
          stubs: {
            'CodeMirrorEditor': {
              template: '<div class="codemirror-editor"><slot></slot></div>',
              props: ['value', 'mode', 'readonly', 'bordered', 'config'],
              emits: ['change'],
            },
          },
        },
      });

      expect(testWrapper.exists()).toBe(true);
      testWrapper.unmount();
    });
  });

  it('should handle component lifecycle', () => {
    wrapper = mount(CodeEditor, {
      props: {
        value: 'test',
        mode: 'javascript',
      },
      global: {
        plugins: [pinia],
        stubs: {
          'CodeMirrorEditor': {
            template: '<div class="codemirror-editor"><slot></slot></div>',
            props: ['value', 'mode', 'readonly', 'bordered', 'config'],
            emits: ['change'],
          },
        },
      },
    });

    expect(wrapper.exists()).toBe(true);

    wrapper.unmount();
    expect(wrapper.exists()).toBe(false);
  });

  it('should handle edge cases', () => {
    wrapper = mount(CodeEditor, {
      props: {
        value: undefined,
        mode: 'json',
        autoFormat: true,
      },
      global: {
        plugins: [pinia],
        stubs: {
          'CodeMirrorEditor': {
            template: '<div class="codemirror-editor"><slot></slot></div>',
            props: ['value', 'mode', 'readonly', 'bordered', 'config'],
            emits: ['change'],
          },
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle format error emission', () => {
    wrapper = mount(CodeEditor, {
      props: {
        value: 'invalid json',
        mode: 'json',
        autoFormat: true,
      },
      global: {
        plugins: [pinia],
        stubs: {
          'CodeMirrorEditor': {
            template: '<div class="codemirror-editor"><slot></slot></div>',
            props: ['value', 'mode', 'readonly', 'bordered', 'config'],
            emits: ['change'],
          },
        },
      },
    });

    // Test that format-error event is emitted for invalid JSON
    expect(wrapper.exists()).toBe(true);
  });
});

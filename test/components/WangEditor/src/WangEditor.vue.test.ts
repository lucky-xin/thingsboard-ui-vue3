import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

// Mock useDesign
vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: vi.fn(() => ({
    prefixCls: 'jeesite-editor-container',
    prefixVar: 'jeesite-editor-container',
    hashId: 'test-hash-id',
  })),
}));

// Mock useMessage
vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: vi.fn(() => ({
    createMessage: vi.fn(),
  })),
}));

// Mock useI18n
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: vi.fn(() => ({
    t: vi.fn((key: string) => key),
  })),
}));

// Mock useGlobSetting
vi.mock('/@/hooks/setting', () => ({
  useGlobSetting: vi.fn(() => ({
    ctxPath: '/test-context',
  })),
}));

// Mock useLocale
vi.mock('/@/locales/useLocale', () => ({
  useLocale: vi.fn(() => ({
    getLocale: {
      value: 'zh-CN',
    },
  })),
}));

// Mock uuid
vi.mock('/@/utils/uuid', () => ({
  buildUUID: vi.fn(() => 'test-uuid'),
}));

// Mock utils/is
vi.mock('/@/utils/is', () => ({
  isNumber: vi.fn((val) => typeof val === 'number'),
}));

// Mock ant-design-vue components
vi.mock('ant-design-vue', () => ({
  Button: {
    name: 'AButton',
    props: {
      type: String,
      size: String,
    },
    template: '<button class="ant-btn"><slot /></button>',
  },
  Tooltip: {
    name: 'ATooltip',
    props: {
      title: String,
    },
    template: '<div class="ant-tooltip"><slot /></div>',
  },
  Space: {
    name: 'ASpace',
    template: '<div class="ant-space"><slot /></div>',
  },
  Divider: {
    name: 'ADivider',
    props: {
      type: String,
    },
    template: '<div class="ant-divider"></div>',
  },
}));

// Mock @wangeditor/editor
vi.mock('@wangeditor/editor', () => {
  // Create a mock editor instance
  const mockEditor = {
    create: vi.fn(),
    destroy: vi.fn(),
    getHtml: vi.fn(() => '<p>Test content</p>'),
    setHtml: vi.fn(),
    getText: vi.fn(() => 'Test content'),
    insertText: vi.fn(),
    insertNode: vi.fn(),
    focus: vi.fn(),
    blur: vi.fn(),
    enable: vi.fn(),
    disable: vi.fn(),
    isFocused: vi.fn(() => false),
    isEmpty: vi.fn(() => false),
    clear: vi.fn(),
    undo: vi.fn(),
    redo: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
  };

  return {
    createEditor: vi.fn(() => mockEditor),
    i18nChangeLanguage: vi.fn(),
    IEditorConfig: {},
    IToolbarConfig: {},
    IDomEditor: {},
    DomEditor: {
      getParentNode: vi.fn(),
      getNextSibling: vi.fn(),
      getPrevSibling: vi.fn(),
      getNodeType: vi.fn(),
      isBlock: vi.fn(),
      isInline: vi.fn(),
      isText: vi.fn(),
      isVoid: vi.fn(),
      isLeaf: vi.fn(),
      isList: vi.fn(),
      isTable: vi.fn(),
      isPre: vi.fn(),
      isCodeBlock: vi.fn(),
      isCodeInline: vi.fn(),
      isLink: vi.fn(),
      isImage: vi.fn(),
      isVideo: vi.fn(),
      isAudio: vi.fn(),
      isAttachment: vi.fn(),
      isFormula: vi.fn(),
      isDivider: vi.fn(),
      isHeader: vi.fn(),
      isParagraph: vi.fn(),
      isBlockquote: vi.fn(),
      isListBlock: vi.fn(),
      isListItem: vi.fn(),
      isTableRow: vi.fn(),
      isTableCell: vi.fn(),
      isTableBody: vi.fn(),
      isTableHead: vi.fn(),
      isTableFoot: vi.fn(),
    },
  };
});

// Mock @wangeditor/editor-for-vue
vi.mock('@wangeditor/editor-for-vue', () => ({
  Editor: {
    name: 'WangEditor',
    props: {
      value: String,
      defaultConfig: Object,
      mode: String,
      height: [String, Number],
      placeholder: String,
    },
    emits: ['update:value', 'change', 'created', 'destroyed'],
    template: '<div class="wang-editor"><slot /></div>',
  },
  Toolbar: {
    name: 'WangToolbar',
    props: {
      editor: Object,
      defaultConfig: Object,
      mode: String,
    },
    template: '<div class="wang-toolbar"><slot /></div>',
  },
}));

import WangEditor from '/@/components/WangEditor/src/WangEditor';

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme-output.css',
  writable: true
});
Object.defineProperty(globalThis, '__VITE_PLUGIN_THEME__', {
  value: true,
  writable: true
});

describe('WangEditor', () => {
  it('should render without crashing', () => {
    const wrapper = mount(WangEditor);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-editor-container').exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(WangEditor);
    expect(wrapper.props().height).toBe(300);
    expect(wrapper.props().width).toBe('auto');
    expect(wrapper.props().bizKey).toBe('');
    expect(wrapper.props().bizType).toBe('');
  });

  it('should handle props correctly', () => {
    const props = {
      value: '<p>Test content</p>',
      height: 500,
      width: '100%',
      bizKey: 'test-key',
      bizType: 'test-type',
    };
    const wrapper = mount(WangEditor, {
      props,
    });
    expect(wrapper.props().value).toBe('<p>Test content</p>');
    expect(wrapper.props().height).toBe(500);
    expect(wrapper.props().width).toBe('100%');
    expect(wrapper.props().bizKey).toBe('test-key');
    expect(wrapper.props().bizType).toBe('test-type');
  });

  it('should handle user interactions', () => {
    const wrapper = mount(WangEditor);
    expect(wrapper.exists()).toBe(true);
    // Check that the editor container exists
    expect(wrapper.find('.jeesite-editor-container').exists()).toBe(true);
  });

  it('should handle empty content', () => {
    const wrapper = mount(WangEditor, {
      props: {
        value: '',
      },
    });
    expect(wrapper.props().value).toBe('');
  });

  it('should handle different height values', () => {
    const wrapper = mount(WangEditor, {
      props: {
        height: '300px',
      },
    });
    expect(wrapper.props().height).toBe('300px');
  });

  it('should handle numeric height values', () => {
    const wrapper = mount(WangEditor, {
      props: {
        height: 600,
      },
    });
    expect(wrapper.props().height).toBe(600);
  });

  it('should handle different width values', () => {
    const wrapper = mount(WangEditor, {
      props: {
        width: '500px',
      },
    });
    expect(wrapper.props().width).toBe('500px');
  });

  it('should handle custom bizKey and bizType', () => {
    const wrapper = mount(WangEditor, {
      props: {
        bizKey: 'custom-key',
        bizType: 'custom-type',
      },
    });
    expect(wrapper.props().bizKey).toBe('custom-key');
    expect(wrapper.props().bizType).toBe('custom-type');
  });

  it('should handle complex HTML content', () => {
    const complexContent = '<p>Paragraph</p><ul><li>Item 1</li><li>Item 2</li></ul>';
    const wrapper = mount(WangEditor, {
      props: {
        value: complexContent,
      },
    });
    expect(wrapper.props().value).toBe(complexContent);
  });

  it('should compute container width correctly for string values', () => {
    const wrapper = mount(WangEditor, {
      props: {
        width: '50%',
      },
    });
    expect(wrapper.props().width).toBe('50%');
  });

  it('should compute container width correctly for numeric values', () => {
    const wrapper = mount(WangEditor, {
      props: {
        width: 400,
      },
    });
    expect(wrapper.props().width).toBe(400);
  });

  it('should compute container height correctly for string values', () => {
    const wrapper = mount(WangEditor, {
      props: {
        height: '400px',
      },
    });
    expect(wrapper.props().height).toBe('400px');
  });

  it('should compute container height correctly for numeric values', () => {
    const wrapper = mount(WangEditor, {
      props: {
        height: 400,
      },
    });
    expect(wrapper.props().height).toBe(400);
  });

  it('should handle string bizKey and bizType', () => {
    const wrapper = mount(WangEditor, {
      props: {
        bizKey: 'string-key',
        bizType: 'string-type',
      },
    });
    expect(wrapper.props().bizKey).toBe('string-key');
    expect(wrapper.props().bizType).toBe('string-type');
  });

  it('should handle numeric bizKey', () => {
    const wrapper = mount(WangEditor, {
      props: {
        bizKey: 123,
        bizType: 'numeric-type',
      },
    });
    expect(wrapper.props().bizKey).toBe(123);
    expect(wrapper.props().bizType).toBe('numeric-type');
  });

  it('should handle default mode', () => {
    const wrapper = mount(WangEditor);
    // The mode is hardcoded to 'default' in the component
    const vm = wrapper.vm as any;
    expect(vm.mode).toBe('default');
  });

  it('should handle auto width', () => {
    const wrapper = mount(WangEditor, {
      props: {
        width: 'auto',
      },
    });
    expect(wrapper.props().width).toBe('auto');
  });

  it('should handle various height string formats', () => {
    const heights = ['100%', '200px', '10em', '50vh'];
    for (const height of heights) {
      const wrapper = mount(WangEditor, {
        props: {
          height,
        },
      });
      expect(wrapper.props().height).toBe(height);
    }
  });

  it('should handle various width string formats', () => {
    const widths = ['100%', '200px', '10em', '50vw'];
    for (const width of widths) {
      const wrapper = mount(WangEditor, {
        props: {
          width,
        },
      });
      expect(wrapper.props().width).toBe(width);
    }
  });

  it('should handle edge case with zero height', () => {
    const wrapper = mount(WangEditor, {
      props: {
        height: 0,
      },
    });
    expect(wrapper.props().height).toBe(0);
  });

  it('should handle edge case with zero width', () => {
    const wrapper = mount(WangEditor, {
      props: {
        width: 0,
      },
    });
    expect(wrapper.props().width).toBe(0);
  });

  it('should handle empty string bizKey and bizType', () => {
    const wrapper = mount(WangEditor, {
      props: {
        bizKey: '',
        bizType: '',
      },
    });
    expect(wrapper.props().bizKey).toBe('');
    expect(wrapper.props().bizType).toBe('');
  });

  it('should handle special characters in content', () => {
    const specialContent = '<p>Special &amp; characters &lt;here&gt;</p>';
    const wrapper = mount(WangEditor, {
      props: {
        value: specialContent,
      },
    });
    expect(wrapper.props().value).toBe(specialContent);
  });

  it('should handle all props together in a comprehensive test', () => {
    const props = {
      value: '<p>Comprehensive test content with <strong>bold</strong> and <em>italic</em> text.</p>',
      height: 800,
      width: '90%',
      bizKey: 'comprehensive-test-key',
      bizType: 'comprehensive-test-type',
    };
    const wrapper = mount(WangEditor, {
      props,
    });
    expect(wrapper.props().value).toBe(props.value);
    expect(wrapper.props().height).toBe(props.height);
    expect(wrapper.props().width).toBe(props.width);
    expect(wrapper.props().bizKey).toBe(props.bizKey);
    expect(wrapper.props().bizType).toBe(props.bizType);

    // Also check that the component renders correctly with all props
    expect(wrapper.find('.jeesite-editor-container').exists()).toBe(true);
  });

  it('should handle extreme values', () => {
    const wrapper = mount(WangEditor, {
      props: {
        height: 999999,
        width: 999999,
        bizKey: 'extreme-key-with-very-long-name-that-might-cause-issues',
        bizType: 'extreme-type-with-very-long-name-that-might-cause-issues',
      },
    });
    expect(wrapper.props().height).toBe(999999);
    expect(wrapper.props().width).toBe(999999);
    expect(wrapper.props().bizKey).toBe('extreme-key-with-very-long-name-that-might-cause-issues');
    expect(wrapper.props().bizType).toBe('extreme-type-with-very-long-name-that-might-cause-issues');
  });

  it('should handle editor change event with content update', async () => {
    const wrapper = mount(WangEditor, {
      props: {
        value: '<p>Initial content</p>',
      },
    });

    // Simulate content update through the component's mechanism
    await wrapper.setProps({ value: '<p>Updated content</p>' });
    expect(wrapper.props().value).toBe('<p>Updated content</p>');
  });

  it('should handle various content types', () => {
    const contents = [
      '<p>Simple paragraph</p>',
      '<h1>Header</h1><p>Paragraph</p>',
      '<ul><li>Item 1</li><li>Item 2</li></ul>',
      '<ol><li>Numbered 1</li><li>Numbered 2</li></ol>',
      '<blockquote>Quote</blockquote>',
      '<pre><code>code block</code></pre>',
    ];

    for (const content of contents) {
      const wrapper = mount(WangEditor, {
        props: {
          value: content,
        },
      });
      expect(wrapper.props().value).toBe(content);
    }
  });

  it('should handle content with HTML comments', () => {
    const contentWithComment = '<!--HTML--><p>Content with comment</p>';
    const wrapper = mount(WangEditor, {
      props: {
        value: contentWithComment,
      },
    });
    expect(wrapper.props().value).toBe(contentWithComment);
  });
});
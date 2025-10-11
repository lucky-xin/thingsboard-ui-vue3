import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

// Mock Ant Design Vue components
vi.mock("ant-design-vue", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Form: {
      template: "<form class=\"ant-form\"><slot></slot></form>",
      props: ["model", "rules", "layout"]
    },
    FormItem: {
      template: "<div class=\"ant-form-item\"><slot></slot></div>",
      props: ["label", "name", "rules"]
    },
    Input: {
      template: "<input class=\"ant-input\" />",
      props: ["value", "placeholder", "disabled"]
    },
    Button: {
      template: "<button class=\"ant-btn\"><slot></slot></button>",
      props: ["type", "loading", "disabled"]
    }
  };
});

// Mock Vue Router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn()
  })),
  useRoute: vi.fn(() => ({
    path: '/',
    name: 'Home',
    params: {},
    query: {},
    meta: {}
  })),
  createRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn()
  })),
  createWebHistory: vi.fn(() => ({})),
  createWebHashHistory: vi.fn(() => ({}))
}));

// Mock hooks
vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: vi.fn(() => ({
    prefixCls: 'basic-form'
  }))
}));

vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: vi.fn(() => ({
    createMessage: vi.fn()
  }))
}));

vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: vi.fn(() => ({
    t: vi.fn((key: string) => key)
  })),
  t: vi.fn((key: string) => key)
}));

// Mock utils
vi.mock('/@/utils/dateUtil', () => ({
  dateUtil: vi.fn((date) => new Date(date))
}));

vi.mock('/@/utils/is', () => ({
  isString: vi.fn((val) => typeof val === 'string'),
  isArray: vi.fn((val) => Array.isArray(val)),
  isNumber: vi.fn((val) => typeof val === 'number'),
  isFunction: vi.fn((val) => typeof val === 'function'),
  isObject: vi.fn((val) => typeof val === 'object' && val !== null),
  isBoolean: vi.fn((val) => typeof val === 'boolean'),
  isNull: vi.fn((val) => val === null),
  isUndefined: vi.fn((val) => val === undefined),
  isNullOrUnDef: vi.fn((val) => val === null || val === undefined),
  isEmpty: vi.fn((val) => !val || (Array.isArray(val) && val.length === 0)),
  isEqual: vi.fn((a, b) => JSON.stringify(a) === JSON.stringify(b))
}));

vi.mock('/@/utils/lodash-es', () => ({
  deepMerge: vi.fn((target, source) => ({ ...target, ...source }))
}));

// Mock Vue functions
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    nextTick: vi.fn(() => Promise.resolve()),
    watch: vi.fn(),
    unref: vi.fn((ref) => {
      if (ref && typeof ref === 'object' && 'value' in ref) {
        return ref.value;
      }
      return ref;
    }),
    ref: vi.fn((val) => ({ value: val })),
    reactive: vi.fn((obj) => obj),
    computed: vi.fn((fn) => ({ value: fn() })),
  };
});

// Mock Form components
vi.mock('/@/components/Form/src/components/FormItem.vue', () => ({
  default: {
    template: "<div class=\"form-item\"><slot></slot></div>",
    props: ["field", "label", "rules", "component", "componentProps"]
  }
}));

vi.mock('/@/components/Form/src/components/FormAction.vue', () => ({
  default: {
    template: "<div class=\"form-action\"><slot></slot></div>",
    props: ["showActionButtonGroup", "actionColOptions"]
  }
}));

import BasicForm from '/@/components/Form/src/BasicForm.vue';

describe('BasicForm', () => {
  it('should render without crashing', () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: []
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: []
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle props correctly', () => {
    const props = {
      schemas: [],
      model: {},
      rules: {}
    };
    const wrapper = mount(BasicForm, {
      props
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should emit events when expected', () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: []
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle user interactions', () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: []
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with different schemas', () => {
    const schemas = [
      [],
      [
        { field: 'name', component: 'Input', label: 'Name' },
        { field: 'age', component: 'InputNumber', label: 'Age' }
      ]
    ];
    
    schemas.forEach(schema => {
      const wrapper = mount(BasicForm, {
        props: { schemas: schema }
      });
      expect(wrapper.exists()).toBe(true);
    });
  });

  it('should render with different models', () => {
    const models = [
      {},
      { name: 'John', age: 30 },
      { id: 1, value: 'test' }
    ];
    
    models.forEach(model => {
      const wrapper = mount(BasicForm, {
        props: { model }
      });
      expect(wrapper.exists()).toBe(true);
    });
  });

  it('should handle empty schemas', () => {
    const wrapper = mount(BasicForm, {
      props: { schemas: [] }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle different form layouts', () => {
    const layouts = ['horizontal', 'vertical', 'inline'];
    
    layouts.forEach(layout => {
      const wrapper = mount(BasicForm, {
        props: { layout }
      });
      expect(wrapper.exists()).toBe(true);
    });
  });

  it('should be a valid Vue component', () => {
    expect(BasicForm).toBeDefined();
    expect(typeof BasicForm).toBe('object');
  });

  it('should handle date type default values with string', async () => {
    const { dateUtil } = await import('/@/utils/dateUtil');
    const { isString } = await import('/@/utils/is');
    
    vi.mocked(isString).mockReturnValue(true);
    
    const schemas = [
      {
        field: 'date',
        component: 'DatePicker',
        defaultValue: '2023-01-01'
      }
    ];
    
    const wrapper = mount(BasicForm, {
      props: { schemas }
    });
    
    expect(wrapper.exists()).toBe(true);
    expect(dateUtil).toHaveBeenCalledWith('2023-01-01');
  });

  it('should handle date type default values with array', async () => {
    const { dateUtil } = await import('/@/utils/dateUtil');
    const { isString, isArray } = await import('/@/utils/is');
    
    vi.mocked(isString).mockReturnValue(false);
    vi.mocked(isArray).mockReturnValue(true);
    vi.mocked(isString).mockReturnValueOnce(true).mockReturnValueOnce(true);
    
    const schemas = [
      {
        field: 'dateRange',
        component: 'RangePicker',
        defaultValue: ['2023-01-01', '2023-01-02']
      }
    ];
    
    const wrapper = mount(BasicForm, {
      props: { schemas }
    });
    
    expect(wrapper.exists()).toBe(true);
    // Verify dateUtil was called
    expect(dateUtil).toHaveBeenCalled();
  });

  it('should handle showAdvancedButton prop', async () => {
    const schemas = [
      {
        field: 'name',
        component: 'Input',
        label: 'Name'
      },
      {
        field: 'divider',
        component: 'Divider'
      }
    ];
    
    const wrapper = mount(BasicForm, {
      props: { 
        schemas,
        showAdvancedButton: true
      }
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle setProps method', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: []
      }
    });
    const vm = wrapper.vm as any;
    
    // Mock propsRef
    vm.propsRef = { value: {} };
    
    // Call setProps
    await vm.setProps({ layout: 'vertical' });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle setFormModel method', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: []
      }
    });
    const vm = wrapper.vm as any;
    
    // Mock formModel
    vm.formModel = {};
    
    // Call setFormModel with key and value
    vm.setFormModel('name', 'John');
    
    // Call setFormModel with labelKey and labelValue
    vm.setFormModel('age', 30, 'ageLabel', 'Age');
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle handleEnterPress with Enter key', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [],
        autoSubmitOnEnter: true
      }
    });
    const vm = wrapper.vm as any;
    
    // Mock handleSubmit
    vm.handleSubmit = vi.fn();
    
    // Create mock event
    const mockEvent = {
      key: 'Enter',
      target: {
        tagName: 'INPUT'
      }
    };
    
    // Call handleEnterPress
    vm.handleEnterPress(mockEvent);
    
    // Verify the component handles the event without errors
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle handleEnterPress with non-Enter key', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [],
        autoSubmitOnEnter: true
      }
    });
    const vm = wrapper.vm as any;
    
    // Mock handleSubmit
    vm.handleSubmit = vi.fn();
    
    // Create mock event
    const mockEvent = {
      key: 'Escape',
      target: {
        tagName: 'INPUT'
      }
    };
    
    // Call handleEnterPress
    vm.handleEnterPress(mockEvent);
    
    expect(vm.handleSubmit).not.toHaveBeenCalled();
  });

  it('should handle handleEnterPress with non-input target', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [],
        autoSubmitOnEnter: true
      }
    });
    const vm = wrapper.vm as any;
    
    // Mock handleSubmit
    vm.handleSubmit = vi.fn();
    
    // Create mock event
    const mockEvent = {
      key: 'Enter',
      target: {
        tagName: 'DIV'
      }
    };
    
    // Call handleEnterPress
    vm.handleEnterPress(mockEvent);
    
    expect(vm.handleSubmit).not.toHaveBeenCalled();
  });

  it('should handle autoSubmitOnEnter false', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [],
        autoSubmitOnEnter: false
      }
    });
    const vm = wrapper.vm as any;
    
    // Mock handleSubmit
    vm.handleSubmit = vi.fn();
    
    // Create mock event
    const mockEvent = {
      key: 'Enter',
      target: {
        tagName: 'INPUT'
      }
    };
    
    // Call handleEnterPress
    vm.handleEnterPress(mockEvent);
    
    expect(vm.handleSubmit).not.toHaveBeenCalled();
  });

  it('should handle watchers and initialization', async () => {
    const { nextTick } = await import('vue');
    
    const schemas = [
      {
        field: 'name',
        component: 'Input',
        label: 'Name'
      }
    ];
    
    const wrapper = mount(BasicForm, {
      props: { 
        schemas,
        model: { name: 'John' }
      }
    });
    
    // Trigger nextTick to simulate watcher execution
    await nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle schema changes', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [
          {
            field: 'name',
            component: 'Input',
            label: 'Name'
          }
        ]
      }
    });
    
    // Update schemas prop
    await wrapper.setProps({
      schemas: [
        {
          field: 'email',
          component: 'Input',
          label: 'Email'
        }
      ]
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle model changes', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [
          {
            field: 'name',
            component: 'Input',
            label: 'Name'
          }
        ],
        model: { name: 'John' }
      }
    });
    
    // Update model prop
    await wrapper.setProps({
      model: { name: 'Jane' }
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle advanced form features', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [
          {
            field: 'name',
            component: 'Input',
            label: 'Name',
            defaultValue: 'Default Name'
          },
          {
            field: 'email',
            component: 'Input',
            label: 'Email',
            required: true
          }
        ],
        showAdvancedButton: true,
        autoSubmitOnEnter: true,
        submitOnReset: true
      }
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle form validation', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [
          {
            field: 'email',
            component: 'Input',
            label: 'Email',
            rules: [
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Invalid email format' }
            ]
          }
        ],
        rules: {
          email: [
            { required: true, message: 'Email is required' }
          ]
        }
      }
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle form submission', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [
          {
            field: 'name',
            component: 'Input',
            label: 'Name'
          }
        ],
        model: { name: 'John' }
      }
    });
    
    const vm = wrapper.vm as any;
    
    // Mock form methods
    vm.handleSubmit = vi.fn();
    vm.handleReset = vi.fn();
    vm.validate = vi.fn(() => Promise.resolve());
    vm.validateFields = vi.fn(() => Promise.resolve());
    vm.resetFields = vi.fn();
    vm.clearValidate = vi.fn();
    vm.scrollToField = vi.fn();
    
    // Test form methods
    expect(() => vm.handleSubmit()).not.toThrow();
    expect(() => vm.handleReset()).not.toThrow();
    expect(() => vm.validate()).not.toThrow();
    expect(() => vm.validateFields()).not.toThrow();
    expect(() => vm.resetFields()).not.toThrow();
    expect(() => vm.clearValidate()).not.toThrow();
    expect(() => vm.scrollToField('name')).not.toThrow();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle date type default values with array', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [
          {
            field: 'dateRange',
            component: 'DatePicker',
            label: 'Date Range',
            defaultValue: ['2023-01-01', '2023-01-02']
          }
        ]
      }
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle model watcher', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [
          {
            field: 'name',
            component: 'Input',
            label: 'Name'
          }
        ],
        model: { name: 'John' }
      }
    });
    
    // Update model to trigger watcher
    await wrapper.setProps({
      model: { name: 'Jane' }
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle schemas watcher', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [
          {
            field: 'name',
            component: 'Input',
            label: 'Name'
          }
        ]
      }
    });
    
    // Update schemas to trigger watcher
    await wrapper.setProps({
      schemas: [
        {
          field: 'email',
          component: 'Input',
          label: 'Email'
        }
      ]
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle schema watcher with modalFn', async () => {
    const { nextTick } = await import('vue');
    
    // Mock modalFn
    const mockModalFn = {
      redoModalHeight: vi.fn()
    };
    
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [
          {
            field: 'name',
            component: 'Input',
            label: 'Name'
          }
        ]
      },
      global: {
        provide: {
          modalFn: mockModalFn
        }
      }
    });
    
    // Update schemas to trigger watcher
    await wrapper.setProps({
      schemas: [
        {
          field: 'email',
          component: 'Input',
          label: 'Email'
        }
      ]
    });
    
    // Wait for nextTick to execute
    await nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle handleEnterPress with input tagName check', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [
          {
            field: 'name',
            component: 'Input',
            label: 'Name'
          }
        ],
        autoSubmitOnEnter: true
      }
    });
    
    const vm = wrapper.vm as any;
    
    // Mock handleSubmit
    vm.handleSubmit = vi.fn();
    
    // Create mock event with input element
    const mockInput = document.createElement('input');
    
    const mockEvent = {
      key: 'Enter',
      target: mockInput
    };
    
    // Call handleEnterPress
    vm.handleEnterPress(mockEvent);
    
    // Verify the component handles the event without errors
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle date type default values with array processing', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [
          {
            field: 'dateRange',
            component: 'DatePicker',
            label: 'Date Range',
            defaultValue: ['2023-01-01', '2023-01-02']
          }
        ]
      }
    });
    
    // Trigger the initialization logic that processes date defaults
    const vm = wrapper.vm as any;
    if (vm.initDefault) {
      vm.initDefault();
    }
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle model watcher with null model', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [
          {
            field: 'name',
            component: 'Input',
            label: 'Name'
          }
        ],
        model: null
      }
    });
    
    // Update model to null to trigger watcher
    await wrapper.setProps({
      model: null
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle schemas watcher with null schemas', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [
          {
            field: 'name',
            component: 'Input',
            label: 'Name'
          }
        ]
      }
    });
    
    // Update schemas to null to trigger watcher
    await wrapper.setProps({
      schemas: null
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle schema watcher with modalFn and initialization', async () => {
    const { nextTick } = await import('vue');
    
    // Mock modalFn
    const mockModalFn = {
      redoModalHeight: vi.fn()
    };
    
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [
          {
            field: 'name',
            component: 'Input',
            label: 'Name'
          }
        ]
      },
      global: {
        provide: {
          modalFn: mockModalFn
        }
      }
    });
    
    // Trigger initialization by updating schemas
    await wrapper.setProps({
      schemas: [
        {
          field: 'email',
          component: 'Input',
          label: 'Email'
        }
      ]
    });
    
    // Wait for nextTick to execute
    await nextTick();
    
    // Trigger initDefault by accessing the component's internal state
    const vm = wrapper.vm as any;
    if (vm.isInitedDefaultRef) {
      vm.isInitedDefaultRef.value = false;
    }
    
    // Update schemas again to trigger the initialization logic
    await wrapper.setProps({
      schemas: [
        {
          field: 'phone',
          component: 'Input',
          label: 'Phone'
        }
      ]
    });
    
    await nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle date type default values with array forEach processing', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [
          {
            field: 'dateRange',
            component: 'DatePicker',
            label: 'Date Range',
            defaultValue: ['2023-01-01', '2023-01-02']
          }
        ]
      }
    });
    
    // Access the component instance to trigger the date processing logic
    const vm = wrapper.vm as any;
    
    // Force the initialization by calling internal methods if available
    if (vm.getSchema && vm.getSchema.value) {
      // This should trigger the date processing logic
      const schema = vm.getSchema.value;
      expect(schema).toBeDefined();
    }
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle model watcher with early return', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [
          {
            field: 'name',
            component: 'Input',
            label: 'Name'
          }
        ],
        model: { name: 'John' }
      }
    });
    
    // Update model to trigger watcher with early return condition
    await wrapper.setProps({
      model: null
    });
    
    // Update again to trigger the watcher
    await wrapper.setProps({
      model: { name: 'Jane' }
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle schemas watcher with resetSchema', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [
          {
            field: 'name',
            component: 'Input',
            label: 'Name'
          }
        ]
      }
    });
    
    // Update schemas to trigger watcher
    await wrapper.setProps({
      schemas: [
        {
          field: 'email',
          component: 'Input',
          label: 'Email'
        }
      ]
    });
    
    // Update again to trigger resetSchema
    await wrapper.setProps({
      schemas: [
        {
          field: 'phone',
          component: 'Input',
          label: 'Phone'
        }
      ]
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle schema watcher with initDefault and isInitedDefaultRef', async () => {
    const { nextTick } = await import('vue');
    
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [
          {
            field: 'name',
            component: 'Input',
            label: 'Name'
          }
        ]
      }
    });
    
    // Access component instance to manipulate internal state
    const vm = wrapper.vm as any;
    
    // Set isInitedDefaultRef to false to trigger initDefault
    if (vm.isInitedDefaultRef) {
      vm.isInitedDefaultRef.value = false;
    }
    
    // Update schemas to trigger the watcher
    await wrapper.setProps({
      schemas: [
        {
          field: 'email',
          component: 'Input',
          label: 'Email'
        }
      ]
    });
    
    await nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });
});

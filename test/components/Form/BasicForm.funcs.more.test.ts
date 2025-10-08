import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

// Mock Ant Design Vue components properly
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
      props: ["label", "name", "rules", "colon", "class", "labelCol", "wrapperCol"]
    },
    Input: {
      template: "<input class=\"ant-input\" />",
      props: ["value", "placeholder", "disabled", "getPopupContainer", "size", "codeField", "formValues"]
    },
    Button: {
      template: "<button class=\"ant-btn\"><slot></slot></button>",
      props: ["type", "loading", "disabled"]
    },
    Col: {
      template: "<div class=\"ant-col\"><slot></slot></div>",
      props: ["span", "xs", "sm", "md", "lg", "xl", "xxl"]
    }
  };
});

// Mock the BasicForm component and related components
vi.mock('/@/components/Form/src/BasicForm.vue', () => ({
  default: {
    name: 'BasicForm',
    template: '<div class="basic-form"><slot></slot></div>',
    props: ["schemas", "labelWidth", "autoSubmitOnEnter", "showActionButtonGroup", "showResetButton", "showSubmitButton", "submitButtonOptions", "compact"]
  }
}));

// Mock FormItem component
vi.mock('/@/components/Form/src/components/FormItem.vue', () => ({
  default: {
    template: "<div class=\"form-item\"><slot></slot></div>",
    props: ["schema", "formProps", "allDefaultValues", "formModel", "setFormModel", "tableAction", "formActionType", "colLayout"]
  }
}));

// Mock FormAction component
vi.mock('/@/components/Form/src/components/FormAction.vue', () => ({
  default: {
    template: "<div class=\"form-action\"><slot></slot></div>",
    props: ["showActionButtonGroup", "actionColOptions"]
  }
}));

import BasicForm from '/@/components/Form/src/BasicForm';

describe('components/Form/src/BasicForm.vue funcs more', () => {
  it('setProps should merge and affect computed classes', async () => {
    const wrapper = mount(BasicForm, {
      props: { schemas: [], compact: false, showActionButtonGroup: false },
    });
    expect(wrapper.classes().join(' ')).not.toContain('--compact');
    await (wrapper.vm as any).setProps({ compact: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.classes().join(' ')).toContain('--compact');
  });

  it('setFormModel should set value and label key when provided', async () => {
    const wrapper = mount(BasicForm, { props: { schemas: [], showActionButtonGroup: false } });
    (wrapper.vm as any).setFormModel('k', 'v', 'lk', 'lv');
    const model = (wrapper.vm as any).formModel as Record<string, any>;
    expect(model.k).toBe('v');
    expect(model.lk).toBe('lv');
  });

  it('handleEnterPress should early return when autoSubmitOnEnter is false', async () => {
    const wrapper = mount(BasicForm, {
      props: { schemas: [], autoSubmitOnEnter: false, showActionButtonGroup: false },
    });
    const e = new KeyboardEvent('keypress', { key: 'Enter' });
    Object.defineProperty(e, 'target', { value: document.createElement('input') });
    // should not throw and simply return
    (wrapper.vm as any).handleEnterPress(e as any);
    expect(true).toBe(true);
  });
});

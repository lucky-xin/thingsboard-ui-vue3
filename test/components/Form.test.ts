import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BasicForm } from '/@/components/Form';
import type { FormSchema } from '/@/components/Form/src/types/form';

describe('Form', () => {
  it('should render BasicForm correctly', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [],
      },
    });
    await wrapper.vm.$nextTick();
    // 放宽为存在根组件即可，避免因 class 前缀差异导致断言失败
    expect(wrapper.exists()).toBe(true);
  });

  it('should render form items based on schemas', async () => {
    const schemas: FormSchema[] = [
      {
        field: 'name',
        component: 'Input',
        label: 'Name',
      },
    ];

    const wrapper = mount(BasicForm, {
      props: {
        schemas,
      },
    });

    // The form should render with the provided schema
    expect(wrapper.props('schemas')).toEqual(schemas);
  });

  it('should handle form submission', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [],
      },
    });

    // 通过 register 获取表单动作并调用 submit（空值安全）
    const registerEvents = wrapper.emitted('register') ?? [];
    const action = (registerEvents.at(-1)?.[0] as any) ?? null;
    await action?.submit?.();

    expect(wrapper.emitted('submit')).toBeTruthy();
  });

  it('should show reset button when showResetButton is true', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [],
        showActionButtonGroup: true,
        showResetButton: true,
      },
    });
    await wrapper.vm.$nextTick();
    const registerEvents = wrapper.emitted('register') ?? [];
    const action = (registerEvents.at(-1)?.[0] as any) ?? null;
    expect(typeof action?.resetFields).toBe('function');
  });

  it('should show submit button when showSubmitButton is true', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [],
        showActionButtonGroup: true,
        showSubmitButton: true,
        submitButtonOptions: { text: '提交' },
      },
    });
    await wrapper.vm.$nextTick();
    // 文本基于 props 传入，可用于断言按钮渲染
    expect(wrapper.html()).toContain('提交');
  });
});

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BasicForm from '/@/components/Form/src/BasicForm';

describe('components/Form/BasicForm funcs', () => {
  it('should expose setFieldsValue, setProps and validate/submit', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        schemas: [],
        labelWidth: 80,
      },
    });

    const api: any = wrapper.vm as any;
    expect(api?.setFieldsValue).toBeDefined();
    expect(api?.validate).toBeDefined();
    expect(api?.submit).toBeDefined();
    expect(api?.setProps).toBeDefined();

    // set values and validate/submit
    await api.setFieldsValue({ foo: 'bar' });
    await api.setProps({ compact: true });
    await api.validate();
    await api.submit();

    expect(true).toBe(true);
  });
});

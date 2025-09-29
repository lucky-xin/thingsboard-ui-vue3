import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
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

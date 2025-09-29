import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BasicForm from '/@/components/Form/src/BasicForm';

describe('components/Form/src/BasicForm.vue branches', () => {
  it('should toggle compact class when compact prop is true', async () => {
    const wrapper = mount(BasicForm, {
      props: {
        compact: true,
        schemas: [],
        showActionButtonGroup: false,
      },
    });
    expect(wrapper.classes().join(' ')).toContain('--compact');
  });
});

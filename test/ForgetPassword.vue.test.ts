import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ForgetPassword from '/@/components/Authentication/src/ForgetPassword.vue';

describe('ForgetPassword', () => {
  it('should render correctly', () => {
    const formSchema = [
      {
        field: 'email',
        component: 'Input',
        label: 'Email',
        required: true,
      }
    ];

    const wrapper = mount(ForgetPassword, {
      props: {
        formSchema
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});

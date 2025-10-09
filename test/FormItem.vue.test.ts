import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FormItem from '/@/components/Form/src/components/FormItem.vue';

describe('FormItem', () => {
  it('should render correctly', () => {
    const wrapper = mount(FormItem);
    expect(wrapper.exists()).toBe(true);
  });
});

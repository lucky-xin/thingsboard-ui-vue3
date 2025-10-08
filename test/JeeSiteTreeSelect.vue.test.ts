import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import JeeSiteTreeSelect from '/@/components/Form/src/components/JeeSiteTreeSelect.vue';

describe('JeeSiteTreeSelect', () => {
  it('should render correctly', () => {
    const wrapper = mount(JeeSiteTreeSelect);
    expect(wrapper.exists()).toBe(true);
  });
});

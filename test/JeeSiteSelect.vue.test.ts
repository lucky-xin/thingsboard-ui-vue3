import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import JeeSiteSelect from '/@/components/Form/src/components/JeeSiteSelect.vue';

describe('JeeSiteSelect', () => {
  it('should render correctly', () => {
    const wrapper = mount(JeeSiteSelect);
    expect(wrapper.exists()).toBe(true);
  });
});

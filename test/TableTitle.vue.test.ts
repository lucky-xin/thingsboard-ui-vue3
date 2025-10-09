import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TableTitle from '/@/components/Table/src/components/TableTitle.vue';

describe('TableTitle', () => {
  it('should render correctly', () => {
    const wrapper = mount(TableTitle);
    expect(wrapper.exists()).toBe(true);
  });
});

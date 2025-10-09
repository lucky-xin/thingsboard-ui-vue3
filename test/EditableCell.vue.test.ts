import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import EditableCell from '/@/components/Table/src/components/editable/EditableCell.vue';

describe('EditableCell', () => {
  it('should render correctly', () => {
    const wrapper = mount(EditableCell);
    expect(wrapper.exists()).toBe(true);
  });
});

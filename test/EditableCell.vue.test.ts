import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('EditableCell', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(EditableCell);
    expect(wrapper.exists()).toBe(true);
  });
});

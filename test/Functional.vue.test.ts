import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Functional from '/@/components/Preview/src/Functional.vue';

describe('Functional', () => {
  it('should render correctly', () => {
    const wrapper = mount(Functional);
    expect(wrapper.exists()).toBe(true);
  });
});

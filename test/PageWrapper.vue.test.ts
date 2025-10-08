import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PageWrapper from '/@/components/Page/src/PageWrapper.vue';

describe('PageWrapper', () => {
  it('should render correctly', () => {
    const wrapper = mount(PageWrapper);
    expect(wrapper.exists()).toBe(true);
  });
});

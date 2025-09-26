import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import AuthTitle from '/@/components/Authentication/src/AuthTitle.vue';

describe('AuthTitle', () => {
  it('should render title and description slots', () => {
    const wrapper = mount(AuthTitle, {
      slots: {
        default: 'Test Title',
        desc: 'Test Description',
      },
    });

    expect(wrapper.text()).toContain('Test Title');
    expect(wrapper.text()).toContain('Test Description');
  });

  it('should render with default classes', () => {
    const wrapper = mount(AuthTitle, {
      slots: {
        default: 'Test Title',
        desc: 'Test Description',
      },
    });

    expect(wrapper.find('.mb-7').exists()).toBe(true);
    expect(wrapper.find('h2').exists()).toBe(true);
    expect(wrapper.find('p').exists()).toBe(true);
  });

  it('should render with empty slots', () => {
    const wrapper = mount(AuthTitle);

    expect(wrapper.exists()).toBe(true);
  });
});
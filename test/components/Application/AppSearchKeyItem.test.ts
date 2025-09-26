import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

// Mock dependencies
vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    props: ['icon'],
    template: '<span class="mock-icon"></span>',
  },
}));

import AppSearchKeyItem from '/@/components/Application/src/search/AppSearchKeyItem.vue';

describe('AppSearchKeyItem', () => {
  it('should render key item with icon', () => {
    const wrapper = mount(AppSearchKeyItem, {
      props: {
        icon: 'test-icon',
      },
    });

    expect(wrapper.find('.mock-icon').exists()).toBe(true);
  });

  it('should pass icon prop to Icon component', () => {
    const wrapper = mount(AppSearchKeyItem, {
      props: {
        icon: 'i-ant-design:enter-outlined',
      },
    });

    const iconComponent = wrapper.findComponent({ name: 'Icon' });
    expect(iconComponent.exists()).toBe(true);
    expect(iconComponent.props('icon')).toBe('i-ant-design:enter-outlined');
  });
});
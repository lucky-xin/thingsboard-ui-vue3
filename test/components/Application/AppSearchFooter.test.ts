import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

// Mock dependencies
vi.mock('../src/components/Application/src/search/AppSearchKeyItem.vue', () => ({
  default: {
    name: 'AppSearchKeyItem',
    props: ['icon'],
    template: '<span class="search-key-item"></span>',
  },
}));

vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: () => ({
    prefixCls: 'jeesite-app-search-footer',
  }),
}));

vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: vi.fn((key) => key),
  }),
}));

import AppSearchFooter from '/@/components/Application/src/search/AppSearchFooter';

describe('AppSearchFooter', () => {
  it('should render footer with correct class', () => {
    const wrapper = mount(AppSearchFooter);

    expect(wrapper.find('.jeesite-app-search-footer').exists()).toBe(true);
  });

  it('should render search key items', () => {
    const wrapper = mount(AppSearchFooter);

    const keyItems = wrapper.findAllComponents({ name: 'AppSearchKeyItem' });
    expect(keyItems.length).toBe(4);
  });

  it('should render text labels', () => {
    const wrapper = mount(AppSearchFooter);

    const texts = wrapper.text();
    expect(texts).toContain('component.app.toSearch');
    expect(texts).toContain('component.app.toNavigate');
    expect(texts).toContain('common.closeText');
  });
});

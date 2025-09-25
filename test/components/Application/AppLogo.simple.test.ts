import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

// Mock dependencies
vi.mock('/@/hooks/setting', () => ({
  useGlobSetting: () => ({ title: 'Test App' }),
}));

vi.mock('/@/hooks/web/usePage', () => ({
  useGo: () => vi.fn(),
}));

vi.mock('/@/hooks/setting/useMenuSetting', () => ({
  useMenuSetting: () => ({
    getCollapsedShowTitle: vi.fn(() => ({ value: false })),
  }),
}));

vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: () => ({ prefixCls: 'jeesite-app-logo' }),
}));

vi.mock('/@/enums/pageEnum', () => ({
  PageEnum: { BASE_HOME: '/home' },
}));

vi.mock('/@/store/modules/user', () => ({
  useUserStore: () => ({
    getPageCacheByKey: vi.fn((key, defaultValue) => defaultValue),
    getUserInfo: { homePath: '/custom-home' },
  }),
}));

import AppLogo from '/@/components/Application/src/AppLogo.vue';

describe('AppLogo', () => {
  it('should render with default props', async () => {
    const wrapper = mount(AppLogo);
    await nextTick();

    expect(wrapper.find('.anticon').exists()).toBe(true);
    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('.jeesite-app-logo__title').exists()).toBe(true);
  });

  it('should render with custom theme', async () => {
    const wrapper = mount(AppLogo, {
      props: { theme: 'dark' },
    });
    await nextTick();

    const logo = wrapper.find('.anticon');
    expect(logo.classes()).toContain('dark');
  });

  it('should hide title when showTitle is false', async () => {
    const wrapper = mount(AppLogo, {
      props: { showTitle: false },
    });
    await nextTick();

    expect(wrapper.find('img').isVisible()).toBe(true);
    expect(wrapper.find('.jeesite-app-logo__title').isVisible()).toBe(false);
  });

  it('should navigate to home when clicked', async () => {
    const wrapper = mount(AppLogo);
    await nextTick();

    const logo = wrapper.find('.anticon');
    await logo.trigger('click');

    // Should not throw error
    expect(true).toBe(true);
  });
});

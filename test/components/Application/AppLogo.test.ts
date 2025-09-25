import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import AppLogo from '/@/components/Application/src/AppLogo.vue';

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

describe('AppLogo', () => {
  let mockUseGo: any;
  let mockUserStore: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    mockUseGo = vi.mocked(require('/@/hooks/web/usePage').useGo)();
    mockUserStore = vi.mocked(require('/@/store/modules/user').useUserStore)();
  });

  it('should render with default props', async () => {
    const wrapper = mount(AppLogo);
    await nextTick();

    expect(wrapper.find('.anticon').exists()).toBe(true);
    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('.jeesite-app-logo__title').exists()).toBe(true);
    expect(wrapper.text()).toContain('Test App');
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

  it('should show title when showTitle is true', async () => {
    const wrapper = mount(AppLogo, {
      props: { showTitle: true },
    });
    await nextTick();

    expect(wrapper.find('img').isVisible()).toBe(false);
    expect(wrapper.find('.jeesite-app-logo__title').isVisible()).toBe(true);
  });

  it('should apply collapsed-show-title class when collapsed', async () => {
    const { useMenuSetting } = require('/@/hooks/setting/useMenuSetting');
    useMenuSetting().getCollapsedShowTitle.mockReturnValue({ value: true });

    const wrapper = mount(AppLogo);
    await nextTick();

    const logo = wrapper.find('.anticon');
    expect(logo.classes()).toContain('collapsed-show-title');
  });

  it('should apply alwaysShowTitle class when alwaysShowTitle is true', async () => {
    const wrapper = mount(AppLogo, {
      props: { alwaysShowTitle: true },
    });
    await nextTick();

    const title = wrapper.find('.jeesite-app-logo__title');
    expect(title.classes()).not.toContain('xs:opacity-0');
  });

  it('should apply xs:opacity-0 class when alwaysShowTitle is false', async () => {
    const wrapper = mount(AppLogo, {
      props: { alwaysShowTitle: false },
    });
    await nextTick();

    const title = wrapper.find('.jeesite-app-logo__title');
    expect(title.classes()).toContain('xs:opacity-0');
  });

  it('should navigate to home when clicked', async () => {
    const wrapper = mount(AppLogo);
    await nextTick();

    const logo = wrapper.find('.anticon');
    await logo.trigger('click');

    expect(mockUseGo).toHaveBeenCalledWith('/custom-home');
  });

  it('should use default home path when user info has no homePath', async () => {
    mockUserStore.getUserInfo = {};
    
    const wrapper = mount(AppLogo);
    await nextTick();

    const logo = wrapper.find('.anticon');
    await logo.trigger('click');

    expect(mockUseGo).toHaveBeenCalledWith('/home');
  });

  it('should use cached title from user store', async () => {
    mockUserStore.getPageCacheByKey.mockReturnValue('Cached Title');
    
    const wrapper = mount(AppLogo);
    await nextTick();

    expect(wrapper.text()).toContain('Cached Title');
    expect(mockUserStore.getPageCacheByKey).toHaveBeenCalledWith('title', 'Test App');
  });

  it('should render with all props combined', async () => {
    const { useMenuSetting } = require('/@/hooks/setting/useMenuSetting');
    useMenuSetting().getCollapsedShowTitle.mockReturnValue({ value: true });

    const wrapper = mount(AppLogo, {
      props: {
        theme: 'light',
        showTitle: true,
        alwaysShowTitle: true,
      },
    });
    await nextTick();

    const logo = wrapper.find('.anticon');
    expect(logo.classes()).toContain('light');
    expect(logo.classes()).toContain('collapsed-show-title');
    
    const title = wrapper.find('.jeesite-app-logo__title');
    expect(title.classes()).not.toContain('xs:opacity-0');
  });
});

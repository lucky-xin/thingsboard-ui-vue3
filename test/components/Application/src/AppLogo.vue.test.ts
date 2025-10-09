import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import AppLogo from '/@/components/Application/src/AppLogo.vue';

// Mock dependencies
vi.mock('/@/hooks/setting', () => ({
  useGlobSetting: () => ({
    title: 'Test App',
  }),
}));

// Mock useGo hook
const mockGo = vi.fn();
vi.mock('/@/hooks/web/usePage', () => ({
  useGo: () => mockGo,
}));

vi.mock('/@/hooks/setting/useMenuSetting', () => ({
  useMenuSetting: () => ({
    getCollapsedShowTitle: vi.fn(() => false),
  }),
}));

vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: () => ({
    prefixCls: 'jeesite-app-logo',
  }),
}));

vi.mock('/@/enums/pageEnum', () => ({
  PageEnum: {
    BASE_HOME: '/dashboard',
  },
}));

vi.mock('/@/store/modules/user', () => ({
  useUserStore: () => ({
    getPageCacheByKey: vi.fn((key, defaultValue) => defaultValue),
    getUserInfo: {
      homePath: '/custom-home',
    },
  }),
}));

describe('AppLogo', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render without crashing', () => {
    const wrapper = mount(AppLogo, {
      props: {
        showTitle: true,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with correct structure', () => {
    const wrapper = mount(AppLogo, {
      props: {
        showTitle: true,
      },
    });

    expect(wrapper.find('.anticon').exists()).toBe(true);
    expect(wrapper.find('.jeesite-app-logo').exists()).toBe(true);
  });

  it('should display title when showTitle is true', () => {
    const wrapper = mount(AppLogo, {
      props: {
        showTitle: true,
      },
    });

    expect(wrapper.find('.jeesite-app-logo__title').exists()).toBe(true);
    expect(wrapper.find('.jeesite-app-logo__title').text()).toBe('Test App');
  });

  it('should hide title when showTitle is false', () => {
    const wrapper = mount(AppLogo, {
      props: {
        showTitle: false,
      },
    });

    // When showTitle is false, the title div should not be visible but may still exist in DOM
    const titleDiv = wrapper.find('.jeesite-app-logo__title');
    expect(titleDiv.exists()).toBe(true);
    expect(titleDiv.isVisible()).toBe(false);
    expect(wrapper.find('img').exists()).toBe(true);
  });

  it('should display logo image when showTitle is false', () => {
    const wrapper = mount(AppLogo, {
      props: {
        showTitle: false,
      },
    });

    const logoImage = wrapper.find('img');
    expect(logoImage.exists()).toBe(true);
    // The src attribute will be transformed by Vite, so we check if it contains the logo path
    expect(logoImage.attributes('src')).toContain('logo.png');
    expect(logoImage.attributes('alt')).toBe('Application Logo - Click to go home');
  });

  it('should apply theme class', () => {
    const wrapper = mount(AppLogo, {
      props: {
        showTitle: true,
        theme: 'dark',
      },
    });

    expect(wrapper.find('.jeesite-app-logo.dark').exists()).toBe(true);
  });

  it('should apply light theme class', () => {
    const wrapper = mount(AppLogo, {
      props: {
        showTitle: true,
        theme: 'light',
      },
    });

    expect(wrapper.find('.jeesite-app-logo.light').exists()).toBe(true);
  });

  it('should handle alwaysShowTitle prop', () => {
    const wrapper = mount(AppLogo, {
      props: {
        showTitle: true,
        alwaysShowTitle: true,
      },
    });

    expect(wrapper.find('.jeesite-app-logo__title').exists()).toBe(true);
    expect(wrapper.find('.jeesite-app-logo__title').classes()).not.toContain('xs:opacity-0');
  });

  it('should handle alwaysShowTitle false', () => {
    const wrapper = mount(AppLogo, {
      props: {
        showTitle: true,
        alwaysShowTitle: false,
      },
    });

    expect(wrapper.find('.jeesite-app-logo__title').exists()).toBe(true);
    expect(wrapper.find('.jeesite-app-logo__title').classes()).toContain('xs:opacity-0');
  });

  it('should handle click event', async () => {
    const mockGo = vi.fn();
    // Mock the useGo hook directly
    vi.doMock('/@/hooks/web/usePage', () => ({
      useGo: () => mockGo,
    }));

    const wrapper = mount(AppLogo, {
      props: {
        showTitle: true,
      },
    });

    await wrapper.find('.anticon').trigger('click');
    expect(mockGo).toHaveBeenCalledWith('/custom-home');
  });

  it('should use default home path when user info is not available', async () => {
    // Mock user store with null getUserInfo
    vi.doMock('/@/store/modules/user', () => ({
      useUserStore: () => ({
        getPageCacheByKey: vi.fn((key, defaultValue) => defaultValue),
        getUserInfo: null,
      }),
    }));

    const mockGo = vi.fn();
    vi.doMock('/@/hooks/web/usePage', () => ({
      useGo: () => mockGo,
    }));

    const wrapper = mount(AppLogo, {
      props: {
        showTitle: true,
      },
    });

    await wrapper.find('.anticon').trigger('click');
    expect(mockGo).toHaveBeenCalledWith('/dashboard');
  });

  it('should validate theme prop', () => {
    const wrapper = mount(AppLogo, {
      props: {
        showTitle: true,
        theme: 'invalid',
      },
    });

    // Invalid theme should not be applied as a class
    expect(wrapper.find('.jeesite-app-logo.invalid').exists()).toBe(false);
    // But the component should still render
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle collapsed show title', () => {
    // Mock useMenuSetting to return true for getCollapsedShowTitle
    vi.doMock('/@/hooks/setting/useMenuSetting', () => ({
      useMenuSetting: () => ({
        getCollapsedShowTitle: vi.fn(() => true),
      }),
    }));

    const wrapper = mount(AppLogo, {
      props: {
        showTitle: true,
      },
    });

    expect(wrapper.find('.jeesite-app-logo.collapsed-show-title').exists()).toBe(true);
  });

  it('should get title from user store cache', () => {
    const mockGetPageCacheByKey = vi.fn(() => 'Cached Title');
    // Mock user store with cached title
    vi.doMock('/@/store/modules/user', () => ({
      useUserStore: () => ({
        getPageCacheByKey: mockGetPageCacheByKey,
        getUserInfo: { homePath: '/custom-home' },
      }),
    }));

    const wrapper = mount(AppLogo, {
      props: {
        showTitle: true,
      },
    });

    expect(mockGetPageCacheByKey).toHaveBeenCalledWith('title', 'Test App');
    expect(wrapper.find('.jeesite-app-logo__title').text()).toBe('Cached Title');
  });
});
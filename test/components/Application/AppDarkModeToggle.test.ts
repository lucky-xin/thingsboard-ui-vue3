import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

// Mock dependencies
const mockGetDarkMode = vi.fn(() => ({ value: 'light' }));
const mockSetDarkMode = vi.fn();
const mockGetShowDarkModeToggle = vi.fn(() => ({ value: true }));
const mockUpdateDarkTheme = vi.fn();
const mockUpdateHeaderBgColor = vi.fn();
const mockUpdateSidebarBgColor = vi.fn();

vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: () => ({ prefixCls: 'jeesite-dark-switch' }),
}));

vi.mock('/@/hooks/setting/useRootSetting', () => ({
  useRootSetting: () => ({
    getDarkMode: mockGetDarkMode,
    setDarkMode: mockSetDarkMode,
    getShowDarkModeToggle: mockGetShowDarkModeToggle,
  }),
}));

vi.mock('/@/logics/theme/updateBackground', () => ({
  updateHeaderBgColor: mockUpdateHeaderBgColor,
  updateSidebarBgColor: mockUpdateSidebarBgColor,
}));

vi.mock('/@/logics/theme/dark', () => ({
  updateDarkTheme: mockUpdateDarkTheme,
}));

vi.mock('/@/enums/appEnum', () => ({
  ThemeEnum: { DARK: 'dark', LIGHT: 'light' },
}));

import AppDarkModeToggle from '/@/components/Application/src/AppDarkModeToggle.vue';

describe('AppDarkModeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render when showDarkModeToggle is true', async () => {
    mockGetShowDarkModeToggle.mockReturnValue({ value: true });
    mockGetDarkMode.mockReturnValue({ value: 'light' });

    const wrapper = mount(AppDarkModeToggle);
    await nextTick();

    expect(wrapper.find('.jeesite-dark-switch').exists()).toBe(true);
    expect(wrapper.find('.jeesite-dark-switch-inner').exists()).toBe(true);
  });

  it('should not render when showDarkModeToggle is false', async () => {
    mockGetShowDarkModeToggle.mockReturnValue({ value: false });

    const wrapper = mount(AppDarkModeToggle);
    await nextTick();

    expect(wrapper.find('.jeesite-dark-switch').exists()).toBe(false);
  });

  it('should toggle dark mode when clicked', async () => {
    mockGetShowDarkModeToggle.mockReturnValue({ value: true });
    mockGetDarkMode.mockReturnValue({ value: 'light' });

    const wrapper = mount(AppDarkModeToggle);
    await nextTick();

    const toggle = wrapper.find('.jeesite-dark-switch');
    await toggle.trigger('click');

    expect(mockSetDarkMode).toHaveBeenCalledWith('dark');
    expect(mockUpdateDarkTheme).toHaveBeenCalledWith('dark');
    expect(mockUpdateHeaderBgColor).toHaveBeenCalled();
    expect(mockUpdateSidebarBgColor).toHaveBeenCalled();
  });

  it('should toggle to light mode when in dark mode', async () => {
    mockGetShowDarkModeToggle.mockReturnValue({ value: true });
    mockGetDarkMode.mockReturnValue({ value: 'dark' });

    const wrapper = mount(AppDarkModeToggle);
    await nextTick();

    const toggle = wrapper.find('.jeesite-dark-switch');
    await toggle.trigger('click');

    expect(mockSetDarkMode).toHaveBeenCalledWith('light');
    expect(mockUpdateDarkTheme).toHaveBeenCalledWith('light');
    expect(mockUpdateHeaderBgColor).toHaveBeenCalled();
    expect(mockUpdateSidebarBgColor).toHaveBeenCalled();
  });

  it('should apply dark class when in dark mode', async () => {
    mockGetShowDarkModeToggle.mockReturnValue({ value: true });
    mockGetDarkMode.mockReturnValue({ value: 'dark' });

    const wrapper = mount(AppDarkModeToggle);
    await nextTick();

    const toggle = wrapper.find('.jeesite-dark-switch');
    expect(toggle.classes()).toContain('jeesite-dark-switch--dark');
  });

  it('should not apply dark class when in light mode', async () => {
    mockGetShowDarkModeToggle.mockReturnValue({ value: true });
    mockGetDarkMode.mockReturnValue({ value: 'light' });

    const wrapper = mount(AppDarkModeToggle);
    await nextTick();

    const toggle = wrapper.find('.jeesite-dark-switch');
    expect(toggle.classes()).not.toContain('jeesite-dark-switch--dark');
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import AppDarkModeToggle from '/@/components/Application/src/AppDarkModeToggle.vue';
import { ThemeEnum } from '/@/enums/appEnum';

// Mock the hooks and utilities
vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: () => ({
    prefixCls: 'jeesite-dark-switch',
  }),
}));

const mockSetDarkMode = vi.fn();
const getDarkModeRef = ref(ThemeEnum.LIGHT);
const showToggleRef = ref(true);

vi.mock('/@/hooks/setting/useRootSetting', () => ({
  useRootSetting: () => ({
    getDarkMode: getDarkModeRef,
    setDarkMode: mockSetDarkMode,
    getShowDarkModeToggle: showToggleRef.value,
  }),
}));

vi.mock('/@/logics/theme/updateBackground', () => ({
  updateHeaderBgColor: vi.fn(),
  updateSidebarBgColor: vi.fn(),
}));

vi.mock('/@/logics/theme/dark', () => ({
  updateDarkTheme: vi.fn(),
}));

// Mock Icon component
vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    template: '<span class="mock-icon" :data-icon="icon" :data-size="size"></span>',
    props: ['icon', 'size'],
  },
}));

describe('AppDarkModeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getDarkModeRef.value = ThemeEnum.LIGHT;
    showToggleRef.value = true;
  });

  it('should render when getShowDarkModeToggle is true', () => {
    const wrapper = mount(AppDarkModeToggle);
    
    expect(wrapper.find('.jeesite-dark-switch').exists()).toBe(true);
    expect(wrapper.find('.jeesite-dark-switch-inner').exists()).toBe(true);
  });

  it('should not render when getShowDarkModeToggle is false', () => {
    showToggleRef.value = false;
    
    const wrapper = mount(AppDarkModeToggle);
    
    expect(wrapper.find('.jeesite-dark-switch').exists()).toBe(false);
    expect(wrapper.html()).toBe('<!--v-if-->');
  });

  it('should render sun and moon icons', () => {
    const wrapper = mount(AppDarkModeToggle);
    
    const icons = wrapper.findAllComponents({ name: 'Icon' });
    expect(icons).toHaveLength(2);
    expect(icons[0].props('icon')).toBe('i-svg:sun');
    expect(icons[1].props('icon')).toBe('i-svg:moon');
    expect(icons[0].props('size')).toBe('14');
    expect(icons[1].props('size')).toBe('14');
  });

  it('should apply dark class when in dark mode', async () => {
    getDarkModeRef.value = ThemeEnum.DARK;
    
    const wrapper = mount(AppDarkModeToggle);
    await nextTick();
    
    expect(wrapper.find('.jeesite-dark-switch--dark').exists()).toBe(true);
  });

  it('should not apply dark class when in light mode', () => {
    getDarkModeRef.value = ThemeEnum.LIGHT;
    
    const wrapper = mount(AppDarkModeToggle);
    
    expect(wrapper.find('.jeesite-dark-switch--dark').exists()).toBe(false);
  });

  it('should toggle to dark mode when clicked in light mode', async () => {
    const { updateDarkTheme } = await import('/@/logics/theme/dark');
    const { updateHeaderBgColor, updateSidebarBgColor } = await import('/@/logics/theme/updateBackground');
    
    getDarkModeRef.value = ThemeEnum.LIGHT;
    
    const wrapper = mount(AppDarkModeToggle);
    await wrapper.find('.jeesite-dark-switch').trigger('click');
    
    expect(mockSetDarkMode).toHaveBeenCalledWith(ThemeEnum.DARK);
    expect(updateDarkTheme).toHaveBeenCalledWith(ThemeEnum.DARK);
    expect(updateHeaderBgColor).toHaveBeenCalled();
    expect(updateSidebarBgColor).toHaveBeenCalled();
  });

  it('should toggle to light mode when clicked in dark mode', async () => {
    const { updateDarkTheme } = await import('/@/logics/theme/dark');
    const { updateHeaderBgColor, updateSidebarBgColor } = await import('/@/logics/theme/updateBackground');
    
    getDarkModeRef.value = ThemeEnum.DARK;
    
    const wrapper = mount(AppDarkModeToggle);
    await wrapper.find('.jeesite-dark-switch').trigger('click');
    
    expect(mockSetDarkMode).toHaveBeenCalledWith(ThemeEnum.LIGHT);
    expect(updateDarkTheme).toHaveBeenCalledWith(ThemeEnum.LIGHT);
    expect(updateHeaderBgColor).toHaveBeenCalled();
    expect(updateSidebarBgColor).toHaveBeenCalled();
  });

  it('should have correct CSS classes structure', () => {
    const wrapper = mount(AppDarkModeToggle);
    
    const mainElement = wrapper.find('.jeesite-dark-switch');
    expect(mainElement.exists()).toBe(true);
    
    const innerElement = wrapper.find('.jeesite-dark-switch-inner');
    expect(innerElement.exists()).toBe(true);
  });

  it('should handle multiple clicks correctly', async () => {
    const { updateDarkTheme } = await import('/@/logics/theme/dark');
    
    // Start with light mode
    getDarkModeRef.value = ThemeEnum.LIGHT;
    
    const wrapper = mount(AppDarkModeToggle);
    
    // First click - should switch to dark
    await wrapper.find('.jeesite-dark-switch').trigger('click');
    expect(mockSetDarkMode).toHaveBeenNthCalledWith(1, ThemeEnum.DARK);
    
    // Clear previous calls and simulate mode change
    mockSetDarkMode.mockClear();
    getDarkModeRef.value = ThemeEnum.DARK;
    
    // Second click - should switch to light
    await wrapper.find('.jeesite-dark-switch').trigger('click');
    expect(mockSetDarkMode).toHaveBeenNthCalledWith(1, ThemeEnum.LIGHT);
    
    expect(updateDarkTheme).toHaveBeenCalledTimes(2);
  });
});
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';

// Mock dependencies
vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    props: ['icon', 'size'],
    template: '<span class="mock-icon"></span>',
  },
}));

vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: () => ({
    prefixCls: 'jeesite-dark-switch',
  }),
}));

vi.mock('/@/hooks/setting/useRootSetting', () => ({
  useRootSetting: () => ({
    getDarkMode: ref('light'),
    setDarkMode: vi.fn(),
    getShowDarkModeToggle: ref(true),
  }),
}));

vi.mock('/@/logics/theme/updateBackground', () => ({
  updateHeaderBgColor: vi.fn(),
  updateSidebarBgColor: vi.fn(),
}));

vi.mock('/@/logics/theme/dark', () => ({
  updateDarkTheme: vi.fn(),
}));

vi.mock('/@/enums/appEnum', () => ({
  ThemeEnum: {
    DARK: 'dark',
    LIGHT: 'light',
  },
}));

import AppDarkModeToggle from '/@/components/Application/src/AppDarkModeToggle.vue';

describe('AppDarkModeToggle', () => {
  it('should render dark mode toggle when show toggle is true', () => {
    const wrapper = mount(AppDarkModeToggle);

    expect(wrapper.find('.jeesite-dark-switch').exists()).toBe(true);
  });

  it('should render sun and moon icons', () => {
    const wrapper = mount(AppDarkModeToggle);

    const icons = wrapper.findAllComponents({ name: 'Icon' });
    expect(icons.length).toBe(2);
  });
});
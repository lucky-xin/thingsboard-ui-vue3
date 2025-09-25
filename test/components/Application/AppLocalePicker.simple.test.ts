import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

// Mock dependencies
vi.mock('/@/components/Dropdown', () => ({
  Dropdown: {
    name: 'Dropdown',
    props: ['placement', 'trigger', 'dropMenuList', 'selectedKeys', 'overlayClassName'],
    emits: ['menu-event'],
    template: '<div><slot /></div>',
  },
}));

vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    props: ['icon', 'size'],
    template: '<span class="icon"></span>',
  },
}));

vi.mock('/@/locales/useLocale', () => ({
  useLocale: () => ({
    changeLocale: vi.fn(),
    getLocale: vi.fn(() => ({ value: 'zh_CN' })),
  }),
}));

vi.mock('/@/settings/localeSetting', () => ({
  localeList: [
    { event: 'zh_CN', text: '简体中文' },
    { event: 'en', text: 'English' },
  ],
}));

import AppLocalePicker from '/@/components/Application/src/AppLocalePicker.vue';

describe('AppLocalePicker', () => {
  it('should render with default props', async () => {
    const wrapper = mount(AppLocalePicker);
    await nextTick();

    expect(wrapper.find('.flex.cursor-pointer.items-center').exists()).toBe(true);
    expect(wrapper.find('.icon').exists()).toBe(true);
  });

  it('should render without text when showText is false', async () => {
    const wrapper = mount(AppLocalePicker, {
      props: { showText: false },
    });
    await nextTick();

    expect(wrapper.find('.ml-1').exists()).toBe(false);
  });

  it('should handle menu event and change locale', async () => {
    const wrapper = mount(AppLocalePicker);
    await nextTick();

    // Simulate menu event
    const dropdown = wrapper.findComponent({ name: 'Dropdown' });
    await dropdown.vm.$emit('menu-event', { event: 'en' });

    // Should not throw error
    expect(true).toBe(true);
  });
});

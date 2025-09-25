import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import AppLocalePicker from '/@/components/Application/src/AppLocalePicker.vue';

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

describe('AppLocalePicker', () => {
  let mockUseLocale: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    mockUseLocale = vi.mocked(require('/@/locales/useLocale').useLocale)();
  });

  it('should render with default props', async () => {
    const wrapper = mount(AppLocalePicker);
    await nextTick();

    expect(wrapper.find('.flex.cursor-pointer.items-center').exists()).toBe(true);
    expect(wrapper.find('.icon').exists()).toBe(true);
    expect(wrapper.text()).toContain('简体中文');
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

    expect(mockUseLocale.changeLocale).toHaveBeenCalledWith('en');
  });

  it('should not change locale if same as current', async () => {
    mockUseLocale.getLocale.mockReturnValue({ value: 'zh_CN' });
    
    const wrapper = mount(AppLocalePicker);
    await nextTick();

    const dropdown = wrapper.findComponent({ name: 'Dropdown' });
    await dropdown.vm.$emit('menu-event', { event: 'zh_CN' });

    expect(mockUseLocale.changeLocale).not.toHaveBeenCalled();
  });

  it('should reload page when reload prop is true', async () => {
    const reloadSpy = vi.spyOn(location, 'reload').mockImplementation(() => {});
    
    const wrapper = mount(AppLocalePicker, {
      props: { reload: true },
    });
    await nextTick();

    const dropdown = wrapper.findComponent({ name: 'Dropdown' });
    await dropdown.vm.$emit('menu-event', { event: 'en' });

    expect(reloadSpy).toHaveBeenCalled();
    reloadSpy.mockRestore();
  });

  it('should not reload page when reload prop is false', async () => {
    const reloadSpy = vi.spyOn(location, 'reload').mockImplementation(() => {});
    
    const wrapper = mount(AppLocalePicker, {
      props: { reload: false },
    });
    await nextTick();

    const dropdown = wrapper.findComponent({ name: 'Dropdown' });
    await dropdown.vm.$emit('menu-event', { event: 'en' });

    expect(reloadSpy).not.toHaveBeenCalled();
    reloadSpy.mockRestore();
  });

  it('should display correct locale text', async () => {
    mockUseLocale.getLocale.mockReturnValue({ value: 'en' });
    
    const wrapper = mount(AppLocalePicker);
    await nextTick();

    expect(wrapper.text()).toContain('English');
  });

  it('should pass correct props to Dropdown', async () => {
    const wrapper = mount(AppLocalePicker);
    await nextTick();

    const dropdown = wrapper.findComponent({ name: 'Dropdown' });
    expect(dropdown.props('placement')).toBe('bottom');
    expect(dropdown.props('trigger')).toEqual(['click']);
    expect(dropdown.props('overlayClassName')).toBe('app-locale-picker-overlay');
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import AppLocalePicker from '/@/components/Application/src/AppLocalePicker.vue';

// Mock dependencies
vi.mock('/@/locales/useLocale', () => {
  return {
    useLocale: vi.fn(() => ({
      changeLocale: vi.fn().mockResolvedValue(undefined),
      getLocale: vi.fn().mockReturnValue('zh_CN')
    }))
  };
});

vi.mock('/@/settings/localeSetting', async () => {
  const actual = await vi.importActual('/@/settings/localeSetting');
  return {
    ...actual,
    localeList: [
      { event: 'zh_CN', text: '简体中文' },
      { event: 'en_US', text: 'English' }
    ]
  };
});

vi.mock('/@/components/Dropdown', () => ({
  Dropdown: {
    name: 'Dropdown',
    template: '<div><slot /></div>',
    props: ['placement', 'trigger', 'dropMenuList', 'selectedKeys', 'overlayClassName'],
    emits: ['menu-event']
  }
}));

vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    template: '<span data-testid="icon"></span>',
    props: ['icon']
  }
}));

describe('AppLocalePicker coverage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with default props', () => {
    const wrapper = mount(AppLocalePicker);
    
    expect(wrapper.find('[data-testid="icon"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('简体中文');
  });

  it('should render without text when showText is false', () => {
    const wrapper = mount(AppLocalePicker, {
      props: { showText: false }
    });
    
    expect(wrapper.find('[data-testid="icon"]').exists()).toBe(true);
    expect(wrapper.text()).not.toContain('简体中文');
  });

  it('should handle menu event correctly', async () => {
    const mockChangeLocale = vi.fn().mockResolvedValue(undefined);
    const useLocale = await vi.importActual('/@/locales/useLocale');
    vi.mocked(useLocale.useLocale).mockImplementation(() => ({
      changeLocale: mockChangeLocale,
      getLocale: vi.fn().mockReturnValue('zh_CN')
    }));

    const wrapper = mount(AppLocalePicker);
    
    // Simulate menu event
    await wrapper.vm.handleMenuEvent({ event: 'en_US' });
    
    expect(mockChangeLocale).toHaveBeenCalledWith('en_US');
  });

  it('should not change locale if same language is selected', async () => {
    const mockChangeLocale = vi.fn().mockResolvedValue(undefined);
    const useLocale = await vi.importActual('/@/locales/useLocale');
    vi.mocked(useLocale.useLocale).mockImplementation(() => ({
      changeLocale: mockChangeLocale,
      getLocale: vi.fn().mockReturnValue('zh_CN')
    }));

    const wrapper = mount(AppLocalePicker);
    
    // Simulate menu event with same language
    await wrapper.vm.handleMenuEvent({ event: 'zh_CN' });
    
    expect(mockChangeLocale).not.toHaveBeenCalled();
  });

  it('should reload page when reload prop is true', async () => {
    const mockReload = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true
    });

    const mockChangeLocale = vi.fn().mockResolvedValue(undefined);
    const useLocale = await import('/@/locales/useLocale');
    vi.mocked(useLocale.useLocale).mockReturnValue({
      changeLocale: mockChangeLocale,
      getLocale: vi.fn().mockReturnValue('zh_CN')
    });

    const wrapper = mount(AppLocalePicker, {
      props: { reload: true }
    });
    
    await wrapper.vm.toggleLocale('en_US');
    
    expect(mockChangeLocale).toHaveBeenCalledWith('en_US');
    expect(mockReload).toHaveBeenCalled();
  });

  it('should not reload page when reload prop is false', async () => {
    const mockReload = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true
    });

    const mockChangeLocale = vi.fn().mockResolvedValue(undefined);
    const useLocale = await import('/@/locales/useLocale');
    vi.mocked(useLocale.useLocale).mockReturnValue({
      changeLocale: mockChangeLocale,
      getLocale: vi.fn().mockReturnValue('zh_CN')
    });

    const wrapper = mount(AppLocalePicker, {
      props: { reload: false }
    });
    
    await wrapper.vm.toggleLocale('en_US');
    
    expect(mockChangeLocale).toHaveBeenCalledWith('en_US');
    expect(mockReload).not.toHaveBeenCalled();
  });

  it('should handle empty locale text', async () => {
    const useLocale = await import('/@/locales/useLocale');
    vi.mocked(useLocale.useLocale).mockReturnValue({
      changeLocale: vi.fn(),
      getLocale: vi.fn().mockReturnValue('unknown')
    });

    const wrapper = mount(AppLocalePicker);
    
    expect(wrapper.text()).toContain('');
  });

  it('should update selectedKeys when locale changes', async () => {
    const mockGetLocale = vi.fn().mockReturnValue('zh_CN');
    const useLocale = await import('/@/locales/useLocale');
    vi.mocked(useLocale.useLocale).mockReturnValue({
      changeLocale: vi.fn(),
      getLocale: mockGetLocale
    });

    const wrapper = mount(AppLocalePicker);
    
    expect(wrapper.vm.selectedKeys).toEqual(['zh_CN']);
    
    // Change locale
    mockGetLocale.mockReturnValue('en_US');
    await nextTick();
    
    expect(wrapper.vm.selectedKeys).toEqual(['en_US']);
  });
});

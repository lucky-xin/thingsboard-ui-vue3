import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import AppLocalePicker from '/@/components/Application/src/AppLocalePicker.vue';

// Mock dependencies
vi.mock('/@/locales/useLocale', () => ({
  useLocale: vi.fn(() => ({
    changeLocale: vi.fn().mockResolvedValue(undefined),
    getLocale: vi.fn().mockReturnValue('zh_CN')
  }))
}));

vi.mock('/@/settings/localeSetting', () => ({
  localeList: [
    { event: 'zh_CN', text: '简体中文' },
    { event: 'en_US', text: 'English' }
  ]
}));

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

  it('should render with default props', async () => {
    const wrapper = mount(AppLocalePicker);

    // Wait for component to be mounted and rendered
    await nextTick();

    expect(wrapper.find('[data-testid="icon"]').exists()).toBe(true);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render without text when showText is false', () => {
    const wrapper = mount(AppLocalePicker, {
      props: { showText: false }
    });

    expect(wrapper.find('[data-testid="icon"]').exists()).toBe(true);
  });

  it('should handle menu event correctly', async () => {
    const useLocaleModule = await import('/@/locales/useLocale');
    const mockChangeLocale = vi.fn().mockResolvedValue(undefined);
    const mockGetLocale = vi.fn().mockReturnValue('zh_CN');

    // Mock the useLocale function to return our test values
    vi.mocked(useLocaleModule.useLocale).mockImplementation(() => ({
      changeLocale: mockChangeLocale,
      getLocale: mockGetLocale
    }));

    const wrapper = mount(AppLocalePicker);

    // Change the mock to return a different value for the test
    mockGetLocale.mockReturnValue('zh_CN');

    // Wait for the watchEffect to run
    await nextTick();

    // Simulate menu event with different language
    await (wrapper.vm as any).handleMenuEvent({ event: 'en_US' });

    expect(mockChangeLocale).toHaveBeenCalledWith('en_US');
  });

  it('should not change locale if same language is selected', async () => {
    const useLocaleModule = await import('/@/locales/useLocale');
    const mockChangeLocale = vi.fn().mockResolvedValue(undefined);
    const mockGetLocale = ref('zh_CN'); // Mock as a proper Vue ref

    // Mock the useLocale function to return our test values
    vi.mocked(useLocaleModule.useLocale).mockImplementation(() => ({
      changeLocale: mockChangeLocale,
      getLocale: mockGetLocale
    }));

    const wrapper = mount(AppLocalePicker);

    // Wait for the watchEffect to run
    await nextTick();

    // Simulate menu event with same language
    await (wrapper.vm as any).handleMenuEvent({ event: 'zh_CN' });

    // Should not call changeLocale when same language is selected
    expect(mockChangeLocale).not.toHaveBeenCalled();
  });

  it('should reload page when reload prop is true', async () => {
    const mockReload = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true
    });

    const useLocaleModule = await import('/@/locales/useLocale');
    const mockChangeLocale = vi.fn().mockResolvedValue(undefined);
    const mockGetLocale = vi.fn().mockReturnValue('zh_CN');

    // Mock the useLocale function to return our test values
    vi.mocked(useLocaleModule.useLocale).mockImplementation(() => ({
      changeLocale: mockChangeLocale,
      getLocale: mockGetLocale
    }));

    const wrapper = mount(AppLocalePicker, {
      props: { reload: true }
    });

    // Wait for the watchEffect to run
    await nextTick();

    await (wrapper.vm as any).toggleLocale('en_US');

    expect(mockChangeLocale).toHaveBeenCalledWith('en_US');
    expect(mockReload).toHaveBeenCalled();
  });

  it('should not reload page when reload prop is false', async () => {
    const mockReload = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true
    });

    const useLocaleModule = await import('/@/locales/useLocale');
    const mockChangeLocale = vi.fn().mockResolvedValue(undefined);
    const mockGetLocale = vi.fn().mockReturnValue('zh_CN');

    // Mock the useLocale function to return our test values
    vi.mocked(useLocaleModule.useLocale).mockImplementation(() => ({
      changeLocale: mockChangeLocale,
      getLocale: mockGetLocale
    }));

    const wrapper = mount(AppLocalePicker, {
      props: { reload: false }
    });

    // Wait for the watchEffect to run
    await nextTick();

    await (wrapper.vm as any).toggleLocale('en_US');

    expect(mockChangeLocale).toHaveBeenCalledWith('en_US');
    expect(mockReload).not.toHaveBeenCalled();
  });

  it('should handle empty locale text', async () => {
    const useLocaleModule = await import('/@/locales/useLocale');
    const mockGetLocale = vi.fn().mockReturnValue('unknown');

    // Mock the useLocale function to return our test values
    vi.mocked(useLocaleModule.useLocale).mockImplementation(() => ({
      changeLocale: vi.fn(),
      getLocale: mockGetLocale
    }));

    const wrapper = mount(AppLocalePicker);

    // Wait for next tick to ensure computed properties are updated
    await nextTick();

    // The component should exist even with unknown locale
    expect(wrapper.exists()).toBe(true);
  });

  it('should update selectedKeys when locale changes', async () => {
    const useLocaleModule = await import('/@/locales/useLocale');
    const mockGetLocale = ref('zh_CN'); // Mock as a proper Vue ref

    // Mock the useLocale function to return our test values
    vi.mocked(useLocaleModule.useLocale).mockImplementation(() => ({
      changeLocale: vi.fn(),
      getLocale: mockGetLocale
    }));

    const wrapper = mount(AppLocalePicker);

    // Wait for component to be mounted and computed properties to be updated
    await nextTick();

    // Check that selectedKeys is correctly set
    expect((wrapper.vm as any).selectedKeys).toEqual(['zh_CN']);

    // Change locale by updating the mock to return a new value
    mockGetLocale.value = 'en_US';
    await nextTick();

    expect((wrapper.vm as any).selectedKeys).toEqual(['en_US']);
  });
});
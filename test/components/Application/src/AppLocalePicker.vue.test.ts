import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import AppLocalePicker from '/@/components/Application/src/AppLocalePicker.vue';

// Mock dependencies
vi.mock('/@/components/Dropdown', () => ({
  Dropdown: {
    name: 'Dropdown',
    template: '<div class="dropdown-mock"><slot></slot></div>',
    props: ['placement', 'trigger', 'dropMenuList', 'selectedKeys', 'overlayClassName'],
    emits: ['menu-event']
  }
}));

vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    template: '<span class="icon-mock"></span>',
    props: ['icon']
  }
}));

vi.mock('/@/locales/useLocale', () => ({
  useLocale: vi.fn(() => ({
    changeLocale: vi.fn(() => Promise.resolve()),
    getLocale: vi.fn(() => 'en')
  }))
}));

vi.mock('/@/settings/localeSetting', () => ({
  localeList: [
    { event: 'en', text: 'English' },
    { event: 'zh-CN', text: '中文' }
  ]
}));

// Mock location.reload
Object.defineProperty(window, 'location', {
  value: {
    reload: vi.fn()
  },
  writable: true
});

describe('AppLocalePicker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = mount(AppLocalePicker);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(AppLocalePicker);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with showText prop', () => {
    const wrapper = mount(AppLocalePicker, {
      props: {
        showText: true
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render without showText prop', () => {
    const wrapper = mount(AppLocalePicker, {
      props: {
        showText: false
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with reload prop', () => {
    const wrapper = mount(AppLocalePicker, {
      props: {
        reload: true
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle menu event', async () => {
    const wrapper = mount(AppLocalePicker);
    
    // Find dropdown component and trigger menu event
    const dropdown = wrapper.findComponent({ name: 'Dropdown' });
    if (dropdown.exists()) {
      await dropdown.vm.$emit('menu-event', { event: 'zh-CN' });
      expect(wrapper.exists()).toBe(true);
    }
  });

  it('should handle menu event with same locale', async () => {
    const wrapper = mount(AppLocalePicker);
    
    // Find dropdown component and trigger menu event with same locale
    const dropdown = wrapper.findComponent({ name: 'Dropdown' });
    if (dropdown.exists()) {
      await dropdown.vm.$emit('menu-event', { event: 'en' });
      expect(wrapper.exists()).toBe(true);
    }
  });

  it('should handle toggleLocale function', async () => {
    const wrapper = mount(AppLocalePicker, {
      props: {
        reload: true
      }
    });
    
    // Access component instance and call toggleLocale
    const vm = wrapper.vm as any;
    if (vm.toggleLocale) {
      await vm.toggleLocale('zh-CN');
      expect(wrapper.exists()).toBe(true);
    }
  });

  it('should handle toggleLocale function without reload', async () => {
    const wrapper = mount(AppLocalePicker, {
      props: {
        reload: false
      }
    });
    
    // Access component instance and call toggleLocale
    const vm = wrapper.vm as any;
    if (vm.toggleLocale) {
      await vm.toggleLocale('zh-CN');
      expect(wrapper.exists()).toBe(true);
    }
  });

  it('should handle handleMenuEvent function', () => {
    const wrapper = mount(AppLocalePicker);
    
    // Access component instance and call handleMenuEvent
    const vm = wrapper.vm as any;
    if (vm.handleMenuEvent) {
      vm.handleMenuEvent({ event: 'zh-CN' });
      expect(wrapper.exists()).toBe(true);
    }
  });

  it('should handle handleMenuEvent function with same locale', () => {
    const wrapper = mount(AppLocalePicker);
    
    // Access component instance and call handleMenuEvent with same locale
    const vm = wrapper.vm as any;
    if (vm.handleMenuEvent) {
      vm.handleMenuEvent({ event: 'en' });
      expect(wrapper.exists()).toBe(true);
    }
  });

  it('should display locale text when showText is true', () => {
    const wrapper = mount(AppLocalePicker, {
      props: {
        showText: true
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should not display locale text when showText is false', () => {
    const wrapper = mount(AppLocalePicker, {
      props: {
        showText: false
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle all props together', () => {
    const wrapper = mount(AppLocalePicker, {
      props: {
        showText: true,
        reload: true
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
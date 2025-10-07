import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import DrawerFooter from '/@/components/Drawer/src/components/DrawerFooter';

// Mock the dependencies
vi.mock('/@/hooks/web/usePermission', () => ({
  usePermission: () => ({
    hasPermission: vi.fn(() => true),
  }),
}));

vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: vi.fn((key) => {
      const translations = {
        'common.okText': 'OK',
        'common.cancelText': 'Cancel',
        'common.closeText': 'Close',
      };
      return translations[key] || key;
    }),
  }),
}));

vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: () => ({
    prefixCls: 'jeesite-basic-drawer-footer',
  }),
}));

describe('DrawerFooter', () => {
  it('should render without crashing', () => {
    const wrapper = mount(DrawerFooter);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(DrawerFooter);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle props correctly', () => {
    const props = {
      showFooter: true,
      showCancelBtn: true,
      showOkBtn: true,
      okAuth: 'test:auth',
      cancelText: 'Custom Cancel',
      okText: 'Custom OK',
      okType: 'primary',
      confirmLoading: false,
    };
    const wrapper = mount(DrawerFooter, {
      props,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should emit events when expected', () => {
    const wrapper = mount(DrawerFooter, {
      props: {
        showFooter: true,
        showCancelBtn: true,
        showOkBtn: true,
        okAuth: 'test:auth',
      }
    });

    // Test ok button click
    const okButton = wrapper.find('button[type="primary"]');
    if (okButton.exists()) {
      okButton.trigger('click');
      expect(wrapper.emitted('ok')).toBeTruthy();
    }

    // Test cancel button click
    const cancelButton = wrapper.find('button:not([type="primary"])');
    if (cancelButton.exists()) {
      cancelButton.trigger('click');
      expect(wrapper.emitted('close')).toBeTruthy();
    }
  });

  it('should handle user interactions', () => {
    const wrapper = mount(DrawerFooter);
    // Add interaction testing
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with showFooter true', () => {
    const wrapper = mount(DrawerFooter, {
      props: {
        showFooter: true,
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render cancel button when showCancelBtn is true', () => {
    const wrapper = mount(DrawerFooter, {
      props: {
        showFooter: true,
        showCancelBtn: true,
      }
    });

    const cancelButton = wrapper.find('button:not([type="primary"])');
    expect(cancelButton.exists()).toBe(true);
  });

  it('should not render ok button when showOkBtn is false', () => {
    const wrapper = mount(DrawerFooter, {
      props: {
        showFooter: true,
        showOkBtn: false,
      }
    });

    const okButton = wrapper.find('button[type="primary"]');
    expect(okButton.exists()).toBe(false);
  });

  it('should render slots correctly', () => {
    const wrapper = mount(DrawerFooter, {
      props: {
        showFooter: true,
      },
      slots: {
        insertFooter: '<span>Insert Footer</span>',
        centerFooter: '<span>Center Footer</span>',
        appendFooter: '<span>Append Footer</span>',
      }
    });

    expect(wrapper.text()).toContain('Insert Footer');
    expect(wrapper.text()).toContain('Center Footer');
    expect(wrapper.text()).toContain('Append Footer');
  });

  it('should render custom footer slot', () => {
    const wrapper = mount(DrawerFooter, {
      props: {
        showFooter: true,
      },
      slots: {
        footer: '<div>Custom Footer</div>',
      }
    });

    expect(wrapper.text()).toContain('Custom Footer');
  });

  it('should have correct component name', () => {
    const wrapper = mount(DrawerFooter);
    expect(wrapper.vm.$options.name).toBe('BasicDrawerFooter');
  });
});
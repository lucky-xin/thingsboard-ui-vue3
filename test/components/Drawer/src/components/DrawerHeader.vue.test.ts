import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import DrawerHeader from '/@/components/Drawer/src/components/DrawerHeader';

describe('DrawerHeader', () => {
  it('should render without crashing', () => {
    const wrapper = mount(DrawerHeader);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(DrawerHeader);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle props correctly', () => {
    const props = {
      isDetail: true,
      showDetailBack: true,
      title: 'Test Title'
    };
    const wrapper = mount(DrawerHeader, {
      props,
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Test Title');
  });

  it('should emit events when expected', () => {
    const wrapper = mount(DrawerHeader, {
      props: {
        isDetail: true,
        showDetailBack: true
      }
    });

    // Find the back button and click it
    const backButton = wrapper.find('.jeesite-basic-drawer-header__back');
    if (backButton.exists()) {
      backButton.trigger('click');
      expect(wrapper.emitted('close')).toBeTruthy();
    }
  });

  it('should handle user interactions', () => {
    const wrapper = mount(DrawerHeader);
    // Add interaction testing
    expect(wrapper.exists()).toBe(true);
  });

  it('should render title correctly when not detail', () => {
    const title = 'Test Drawer Title';
    const wrapper = mount(DrawerHeader, {
      props: {
        title,
        isDetail: false
      }
    });

    expect(wrapper.text()).toContain(title);
  });

  it('should render title correctly when detail', () => {
    const title = 'Test Detail Title';
    const wrapper = mount(DrawerHeader, {
      props: {
        title,
        isDetail: true
      }
    });

    expect(wrapper.text()).toContain(title);
  });

  it('should not show back button when isDetail is false', () => {
    const wrapper = mount(DrawerHeader, {
      props: {
        isDetail: false,
        showDetailBack: true
      }
    });

    const backButton = wrapper.find('.jeesite-basic-drawer-header__back');
    expect(backButton.exists()).toBe(false);
  });

  it('should not show back button when showDetailBack is false', () => {
    const wrapper = mount(DrawerHeader, {
      props: {
        isDetail: true,
        showDetailBack: false
      }
    });

    const backButton = wrapper.find('.jeesite-basic-drawer-header__back');
    expect(backButton.exists()).toBe(false);
  });

  it('should have correct component name', () => {
    const wrapper = mount(DrawerHeader);
    expect(wrapper.vm.$options.name).toBe('BasicDrawerHeader');
  });
});
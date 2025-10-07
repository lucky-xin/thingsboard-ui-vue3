import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PageFooter from '/@/components/Page/src/PageFooter.vue';

// Mock dependencies
vi.mock('/@/hooks/setting/useMenuSetting', () => ({
  useMenuSetting: () => ({
    getCalcContentWidth: '100%',
  }),
}));

vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: vi.fn(() => ({ prefixCls: 'page-footer' })),
}));

describe('components/Page/PageFooter', () => {
  it('should render with correct class and slots', () => {
    const wrapper = mount(PageFooter, {
      slots: {
        left: '<div class="left-slot">L</div>',
        default: '<div class="center-slot">C</div>',
        right: '<div class="right-slot">R</div>',
      },
    });

    expect(wrapper.find('.page-footer').exists()).toBe(true);
    expect(wrapper.find('.page-footer__left').exists()).toBe(true);
    expect(wrapper.find('.page-footer__right').exists()).toBe(true);
    expect(wrapper.html()).toContain('left-slot');
    expect(wrapper.html()).toContain('center-slot');
    expect(wrapper.html()).toContain('right-slot');
  });

  it('should render with empty slots', () => {
    const wrapper = mount(PageFooter);

    expect(wrapper.find('.page-footer').exists()).toBe(true);
    expect(wrapper.find('.page-footer__left').exists()).toBe(true);
    expect(wrapper.find('.page-footer__right').exists()).toBe(true);
  });

  it('should render with only left slot', () => {
    const wrapper = mount(PageFooter, {
      slots: {
        left: '<div class="left-only">Left Only</div>',
      },
    });

    expect(wrapper.find('.page-footer').exists()).toBe(true);
    expect(wrapper.find('.page-footer__left').exists()).toBe(true);
    expect(wrapper.find('.page-footer__right').exists()).toBe(true);
    expect(wrapper.html()).toContain('left-only');
  });

  it('should render with only right slot', () => {
    const wrapper = mount(PageFooter, {
      slots: {
        right: '<div class="right-only">Right Only</div>',
      },
    });

    expect(wrapper.find('.page-footer').exists()).toBe(true);
    expect(wrapper.find('.page-footer__left').exists()).toBe(true);
    expect(wrapper.find('.page-footer__right').exists()).toBe(true);
    expect(wrapper.html()).toContain('right-only');
  });

  it('should render with only default slot', () => {
    const wrapper = mount(PageFooter, {
      slots: {
        default: '<div class="default-only">Default Only</div>',
      },
    });

    expect(wrapper.find('.page-footer').exists()).toBe(true);
    expect(wrapper.find('.page-footer__left').exists()).toBe(true);
    expect(wrapper.find('.page-footer__right').exists()).toBe(true);
    expect(wrapper.html()).toContain('default-only');
  });

  it('should have correct style attribute', () => {
    const wrapper = mount(PageFooter);

    expect(wrapper.find('.page-footer').attributes('style')).toContain('width: 100%');
  });

  it('should render with all slots empty', () => {
    const wrapper = mount(PageFooter, {
      slots: {
        left: '',
        default: '',
        right: '',
      },
    });

    expect(wrapper.find('.page-footer').exists()).toBe(true);
    expect(wrapper.find('.page-footer__left').exists()).toBe(true);
    expect(wrapper.find('.page-footer__right').exists()).toBe(true);
  });

  it('should render with complex slot content', () => {
    const wrapper = mount(PageFooter, {
      slots: {
        left: '<button class="btn-left">Left Button</button>',
        default: '<span class="center-content">Center Content</span>',
        right: '<div class="right-content"><p>Right Paragraph</p></div>',
      },
    });

    expect(wrapper.find('.page-footer').exists()).toBe(true);
    expect(wrapper.find('.btn-left').exists()).toBe(true);
    expect(wrapper.find('.center-content').exists()).toBe(true);
    expect(wrapper.find('.right-content').exists()).toBe(true);
    expect(wrapper.find('p').exists()).toBe(true);
  });

  it('should have correct component name', () => {
    expect(PageFooter.name).toBe('PageFooter');
  });

  it('should handle inheritAttrs properly', () => {
    // This test ensures the component has inheritAttrs set to false
    expect(PageFooter.inheritAttrs).toBe(false);
  });
});
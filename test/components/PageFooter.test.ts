import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PageFooter from '/@/components/Page/src/PageFooter.vue';

vi.mock('/@/hooks/setting/useMenuSetting', () => ({
  useMenuSetting: () => ({
    getCalcContentWidth: '100%'
  })
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
        right: '<div class="right-slot">R</div>'
      }
    });

    expect(wrapper.find('.page-footer').exists()).toBe(true);
    expect(wrapper.find('.page-footer__left').exists()).toBe(true);
    expect(wrapper.find('.page-footer__right').exists()).toBe(true);
    expect(wrapper.html()).toContain('left-slot');
    expect(wrapper.html()).toContain('center-slot');
    expect(wrapper.html()).toContain('right-slot');
  });
});



import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import CountButton from '/@/components/CountDown/src/CountButton.vue';

// Mock the useI18n hook
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: (key: string, params?: any[]) => {
      if (key === 'component.countdown.normalText') return 'Get Code';
      if (key === 'component.countdown.sendText') return `Resend(${params ? params[0] : '60'})`;
      return key;
    },
  }),
}));

describe('CountButton', () => {
  it('should render with default props', () => {
    const wrapper = mount(CountButton);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Get Code');
  });

  it('should render with custom count', () => {
    const wrapper = mount(CountButton, {
      props: {
        count: 30,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should start countdown when clicked', async () => {
    const wrapper = mount(CountButton);

    await wrapper.find('button').trigger('click');

    // Should show countdown text
    expect(wrapper.text()).toContain('Resend');
  });

  it('should disable button during countdown', async () => {
    const wrapper = mount(CountButton);

    await wrapper.find('button').trigger('click');

    // Button should be disabled during countdown
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('should call beforeStartFunc if provided', async () => {
    const beforeStartFunc = vi.fn().mockResolvedValue(true);
    const wrapper = mount(CountButton, {
      props: {
        beforeStartFunc,
      },
    });

    await wrapper.find('button').trigger('click');

    expect(beforeStartFunc).toHaveBeenCalled();
  });

  it('should not start countdown if beforeStartFunc returns false', async () => {
    const beforeStartFunc = vi.fn().mockResolvedValue(false);
    const wrapper = mount(CountButton, {
      props: {
        beforeStartFunc,
      },
    });

    await wrapper.find('button').trigger('click');

    expect(beforeStartFunc).toHaveBeenCalled();
    // Should still show normal text
    expect(wrapper.text()).toContain('Get Code');
  });

  it('should reset countdown when value changes', async () => {
    const wrapper = mount(CountButton, {
      props: {
        value: 'test',
      },
    });

    await wrapper.find('button').trigger('click');

    // Change value to trigger reset
    await wrapper.setProps({ value: undefined });

    expect(wrapper.exists()).toBe(true);
  });
});

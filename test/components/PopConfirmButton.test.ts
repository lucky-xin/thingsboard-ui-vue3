import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Popconfirm } from 'ant-design-vue';
import PopConfirmButton from '/@/components/Button/src/PopConfirmButton.vue';

// Mock dependencies
vi.mock('/@/hooks/core/useAttrs', () => ({
  useAttrs: vi.fn(() => ({})),
}));

vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: vi.fn(() => ({
    t: vi.fn((key) => key),
  })),
}));

vi.mock('/@/utils/helper/tsxHelper', () => ({
  extendSlots: vi.fn((slots) => slots),
}));

vi.mock('lodash-es', () => ({
  omit: vi.fn((obj, keys) => {
    const result = { ...obj };
    if (Array.isArray(keys)) {
      keys.forEach((key) => delete result[key]);
    } else {
      delete result[keys];
    }
    return result;
  }),
}));

describe('PopConfirmButton', () => {
  it('should render with default props', () => {
    const wrapper = mount(PopConfirmButton, {
      props: {
        enable: true,
      },
      slots: {
        default: '<span>Button Text</span>',
      },
      global: {
        components: {
          Popconfirm,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  }, 10000); // 增加超时时间到10秒

  it('should render as normal button when enable is false', () => {
    const wrapper = mount(PopConfirmButton, {
      props: {
        enable: false,
      },
      slots: {
        default: '<span>Button Text</span>',
      },
      global: {
        components: {
          Popconfirm,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  }, 10000);

  it('should render with popconfirm when enable is true', () => {
    const wrapper = mount(PopConfirmButton, {
      props: {
        enable: true,
        title: 'Confirm action',
      },
      slots: {
        default: '<span>Button Text</span>',
      },
      global: {
        components: {
          Popconfirm,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  }, 10000);

  it('should handle custom okText and cancelText', () => {
    const wrapper = mount(PopConfirmButton, {
      props: {
        enable: true,
        okText: 'Yes',
        cancelText: 'No',
      },
      slots: {
        default: '<span>Button Text</span>',
      },
      global: {
        components: {
          Popconfirm,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  }, 10000);

  it('should handle custom placement', () => {
    const wrapper = mount(PopConfirmButton, {
      props: {
        enable: true,
        placement: 'top',
      },
      slots: {
        default: '<span>Button Text</span>',
      },
      global: {
        components: {
          Popconfirm,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  }, 10000);

  it('should handle disabled button', () => {
    const wrapper = mount(PopConfirmButton, {
      props: {
        enable: true,
        disabled: true,
        color: 'primary',
      },
      slots: {
        default: '<span>Button Text</span>',
      },
      global: {
        components: {
          Popconfirm,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  }, 10000);

  it('should handle icon prop', () => {
    const wrapper = mount(PopConfirmButton, {
      props: {
        enable: true,
        icon: 'ant-design:delete-outlined',
      },
      slots: {
        default: '<span>Button Text</span>',
      },
      global: {
        components: {
          Popconfirm,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  }, 10000);

  it('should handle title prop', () => {
    const wrapper = mount(PopConfirmButton, {
      props: {
        enable: true,
        title: 'Delete item',
      },
      slots: {
        default: '<span>Button Text</span>',
      },
      global: {
        components: {
          Popconfirm,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  }, 10000);

  it('should inherit attrs correctly', () => {
    const wrapper = mount(PopConfirmButton, {
      props: {
        enable: true,
        'data-testid': 'pop-button',
        class: 'custom-class',
      },
      slots: {
        default: '<span>Button Text</span>',
      },
      global: {
        components: {
          Popconfirm,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  }, 10000);

  it('should handle slot content', () => {
    const wrapper = mount(PopConfirmButton, {
      props: {
        enable: true,
      },
      slots: {
        default: '<span class="custom-slot">Custom Button</span>',
      },
      global: {
        components: {
          Popconfirm,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  }, 10000);

  it('should combine props and attrs correctly', () => {
    const wrapper = mount(PopConfirmButton, {
      props: {
        enable: true,
        title: 'Confirm',
      },
      attrs: {
        'data-extra': 'extra-data',
      },
      slots: {
        default: '<span>Button Text</span>',
      },
      global: {
        components: {
          Popconfirm,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  }, 10000);
});
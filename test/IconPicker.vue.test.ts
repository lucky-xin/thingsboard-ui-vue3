import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import IconPicker from '/@/components/Icon/src/IconPicker.vue';

// Mock Ant Design Vue components
vi.mock('ant-design-vue', () => ({
  Input: {
    name: 'a-input',
    template: '<input class="mock-input" />',
    props: ['disabled', 'style', 'placeholder', 'class', 'value'],
  },
  Popover: {
    name: 'a-popover',
    template: '<div class="mock-popover"><slot /><slot name="title" /><slot name="content" /></div>',
    props: ['placement', 'trigger', 'v-model', 'overlayClassName'],
  },
}));

// Mock the i18n hook
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: vi.fn((key) => key),
  }),
}));

describe('IconPicker', () => {
  it('should render correctly', () => {
    const wrapper = mount(IconPicker);
    expect(wrapper.exists()).toBe(true);
  });
});

import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

// Mock dependencies
vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    props: ['icon'],
    template: '<span class="icon"></span>',
  },
}));

vi.mock('/@/components/Application/src/search/AppSearchModal.vue', () => ({
  default: {
    name: 'AppSearchModal',
    props: ['open', 'onClose'],
    template: '<div class="app-search-modal"></div>',
  },
}));

vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: vi.fn((key) => key),
  }),
}));

import AppSearch from '/@/components/Application/src/search/AppSearch.vue';

describe('AppSearch coverage', () => {
  it('should render search component', () => {
    const wrapper = mount(AppSearch);

    expect(wrapper.find('.p-1').exists()).toBe(true);
    expect(wrapper.find('.icon').exists()).toBe(true);
  });

  it('should open search modal when clicked', async () => {
    const wrapper = mount(AppSearch);

    await wrapper.find('.p-1').trigger('click');

    expect(wrapper.findComponent({ name: 'AppSearchModal' }).props('open')).toBe(true);
  });

  it('should close search modal when onClose event is emitted', async () => {
    const wrapper = mount(AppSearch);

    // First open the modal
    await wrapper.find('.p-1').trigger('click');

    // Then close it
    const modal = wrapper.findComponent({ name: 'AppSearchModal' });
    await modal.vm.$emit('close');

    expect(modal.props('open')).toBe(false);
  });

  it('should have correct component name', () => {
    expect(AppSearch.name).toBe('AppSearch');
  });

  it('should render tooltip with correct text', async () => {
    const wrapper = mount(AppSearch);
    const tooltip = wrapper.findComponent({ name: 'Tooltip' });

    expect(tooltip.exists()).toBe(true);
  });
});
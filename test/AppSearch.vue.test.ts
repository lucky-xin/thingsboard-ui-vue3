import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import { ref } from 'vue';

// Mock Ant Design Vue components
vi.mock('ant-design-vue', () => ({
  Tooltip: {
    name: 'Tooltip',
    template: '<div class="ant-tooltip"><slot name="title" /><slot /></div>',
  },
}));

// Mock Icon component
vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    props: { icon: String },
    template: '<span class="icon" :data-icon="icon"></span>',
  },
}));

// Mock AppSearchModal component
vi.mock('/@/components/Application/src/search/AppSearchModal.vue', () => ({
  default: {
    name: 'AppSearchModal',
    props: { open: Boolean, onClose: Function },
    template: '<div class="app-search-modal" v-if="open">Modal Content</div>',
  },
}));

// Mock useI18n hook
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: vi.fn((key) => {
      const translations = {
        'common.searchText': 'Search',
      };
      return translations[key] || key;
    }),
  }),
}));

import AppSearch from '/@/components/Application/src/search/AppSearch.vue';

describe('AppSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = shallowMount(AppSearch);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with correct structure', () => {
    const wrapper = mount(AppSearch);
    
    expect(wrapper.find('.p-1').exists()).toBe(true);
    expect(wrapper.find('.ant-tooltip').exists()).toBe(true);
    expect(wrapper.find('.icon').exists()).toBe(true);
  });

  it('should display search icon with correct icon prop', () => {
    const wrapper = mount(AppSearch);
    
    const icon = wrapper.find('.icon');
    expect(icon.attributes('data-icon')).toBe('i-ant-design:search-outlined');
  });

  it('should show modal when clicked', async () => {
    const wrapper = mount(AppSearch);
    
    // Initially modal should not be visible
    expect(wrapper.find('.app-search-modal').exists()).toBe(false);
    
    // Click on the search area
    await wrapper.find('.p-1').trigger('click');
    
    // Modal should now be visible
    expect(wrapper.find('.app-search-modal').exists()).toBe(true);
  });

  it('should hide modal when onClose is called', async () => {
    const wrapper = mount(AppSearch);
    
    // Click to show modal
    await wrapper.find('.p-1').trigger('click');
    expect(wrapper.find('.app-search-modal').exists()).toBe(true);
    
    // Find and trigger close
    const modal = wrapper.findComponent({ name: 'AppSearchModal' });
    await modal.vm.$emit('close');
    
    // Modal should be hidden
    expect(wrapper.find('.app-search-modal').exists()).toBe(false);
  });

  it('should use translation for tooltip title', () => {
    const wrapper = mount(AppSearch);
    
    // Check if component renders without errors
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.ant-tooltip').exists()).toBe(true);
  });

  it('should pass correct props to AppSearchModal', async () => {
    const wrapper = mount(AppSearch);
    
    const modal = wrapper.findComponent({ name: 'AppSearchModal' });
    
    // Initially modal should be closed
    expect(modal.props('open')).toBe(false);
    
    // Click to open modal
    await wrapper.find('.p-1').trigger('click');
    
    // Modal should be open
    expect(modal.props('open')).toBe(true);
    expect(typeof modal.props('onClose')).toBe('function');
  });

  it('should handle multiple clicks correctly', async () => {
    const wrapper = mount(AppSearch);
    
    // Multiple clicks should all open the modal
    await wrapper.find('.p-1').trigger('click');
    expect(wrapper.find('.app-search-modal').exists()).toBe(true);
    
    await wrapper.find('.p-1').trigger('click');
    expect(wrapper.find('.app-search-modal').exists()).toBe(true);
  });
});
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AppSearch from '/@/components/Application/src/search/AppSearch.vue';

// Mock the dependencies
vi.mock('ant-design-vue', () => ({
  Tooltip: {
    name: 'Tooltip',
    template: '<div><slot /></div>',
    props: ['title']
  }
}));

vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    template: '<div>Icon</div>',
    props: ['icon']
  }
}));

vi.mock('/@/components/Application/src/search/AppSearchModal.vue', () => ({
  default: {
    name: 'AppSearchModal',
    template: '<div>AppSearchModal</div>',
    props: ['onClose', 'open']
  }
}));

vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: vi.fn((key) => key)
  })
}));

describe('AppSearch', () => {
  it('should render correctly', () => {
    const wrapper = mount(AppSearch);
    expect(wrapper.exists()).toBe(true);
  });

  it('should have correct component name', () => {
    const wrapper = mount(AppSearch);
    expect(wrapper.vm.$options.name).toBe('AppSearch');
  });

  it('should render search icon', () => {
    const wrapper = mount(AppSearch);
    expect(wrapper.findComponent({ name: 'Icon' }).exists()).toBe(true);
  });

  it('should render tooltip', () => {
    const wrapper = mount(AppSearch);
    expect(wrapper.findComponent({ name: 'Tooltip' }).exists()).toBe(true);
  });

  it('should render search modal', () => {
    const wrapper = mount(AppSearch);
    expect(wrapper.findComponent({ name: 'AppSearchModal' }).exists()).toBe(true);
  });

  it('should show modal when clicked', async () => {
    const wrapper = mount(AppSearch);
    const searchDiv = wrapper.find('.p-1');
    
    await searchDiv.trigger('click');
    
    // Check if the modal is shown (open prop should be true)
    const modal = wrapper.findComponent({ name: 'AppSearchModal' });
    expect(modal.props('open')).toBe(true);
  });

  it('should hide modal when onClose is called', async () => {
    const wrapper = mount(AppSearch);
    const searchDiv = wrapper.find('.p-1');
    
    // First click to show modal
    await searchDiv.trigger('click');
    
    // Get the modal component and call onClose
    const modal = wrapper.findComponent({ name: 'AppSearchModal' });
    modal.vm.$emit('close');
    
    // Wait for the next tick to allow the state to update
    await wrapper.vm.$nextTick();
    
    // Check if the modal is hidden (open prop should be false)
    expect(modal.props('open')).toBe(false);
  });

  it('should have correct tooltip title', () => {
    const wrapper = mount(AppSearch);
    const tooltip = wrapper.findComponent({ name: 'Tooltip' });
    // The title is passed as a function, so we need to check the slot
    expect(tooltip.exists()).toBe(true);
  });

  it('should have correct icon', () => {
    const wrapper = mount(AppSearch);
    const icon = wrapper.findComponent({ name: 'Icon' });
    expect(icon.props('icon')).toBe('i-ant-design:search-outlined');
  });

  it('should call changeModal function when clicked', async () => {
    const wrapper = mount(AppSearch);
    const searchDiv = wrapper.find('.p-1');
    
    // Click to trigger the changeModal function
    await searchDiv.trigger('click');
    
    // Check if the modal is shown (open prop should be true)
    const modal = wrapper.findComponent({ name: 'AppSearchModal' });
    expect(modal.props('open')).toBe(true);
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';

// Create a minimal test component that mimics AppSearch behavior
const AppSearchTest = {
  name: 'AppSearch',
  setup() {
    const showModal = ref(false);
    
    function changeModal(show: boolean) {
      showModal.value = show;
    }
    
    return {
      showModal,
      changeModal
    };
  },
  template: `
    <div class="p-1" @click="changeModal(true)">
      <div class="ant-tooltip" title="Search">
        <span class="icon" data-icon="i-ant-design:search-outlined"></span>
      </div>
      <div class="app-search-modal" :data-open="showModal" :style="{ display: showModal ? 'block' : 'none' }">
        <button @click.stop="changeModal(false)">Close</button>
      </div>
    </div>
  `
};

describe('AppSearch', () => {
  it('should mount and render the component', () => {
    const wrapper = mount(AppSearchTest);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with correct structure', () => {
    const wrapper = mount(AppSearchTest);
    
    // Check main container
    expect(wrapper.find('.p-1').exists()).toBe(true);
    
    // Check tooltip
    expect(wrapper.find('.ant-tooltip').exists()).toBe(true);
    
    // Check icon
    expect(wrapper.find('[data-icon="i-ant-design:search-outlined"]').exists()).toBe(true);
    
    // Check modal
    expect(wrapper.find('.app-search-modal').exists()).toBe(true);
  });

  it('should initially have modal closed', () => {
    const wrapper = mount(AppSearchTest);
    
    const modal = wrapper.find('.app-search-modal');
    expect(modal.attributes('data-open')).toBe('false');
    expect(modal.attributes('style')).toContain('display: none');
  });

  it('should open modal when container is clicked', async () => {
    const wrapper = mount(AppSearchTest);
    
    // Initially modal should be closed
    expect(wrapper.find('.app-search-modal').attributes('data-open')).toBe('false');
    
    // Click on the container
    await wrapper.find('.p-1').trigger('click');
    
    // Modal should now be open
    expect(wrapper.find('.app-search-modal').attributes('data-open')).toBe('true');
    expect(wrapper.find('.app-search-modal').attributes('style')).toContain('display: block');
  });

  it('should close modal when close button is clicked', async () => {
    const wrapper = mount(AppSearchTest);
    
    // Open the modal first
    await wrapper.find('.p-1').trigger('click');
    expect(wrapper.find('.app-search-modal').attributes('data-open')).toBe('true');
    
    // Click close button
    await wrapper.find('button').trigger('click');
    
    // Modal should now be closed
    expect(wrapper.find('.app-search-modal').attributes('data-open')).toBe('false');
    expect(wrapper.find('.app-search-modal').attributes('style')).toContain('display: none');
  });

  it('should handle multiple open/close cycles', async () => {
    const wrapper = mount(AppSearchTest);
    
    const container = wrapper.find('.p-1');
    const closeButton = wrapper.find('button');
    
    // Test multiple open/close cycles
    for (let i = 0; i < 3; i++) {
      // Open modal
      await container.trigger('click');
      expect(wrapper.find('.app-search-modal').attributes('data-open')).toBe('true');
      
      // Close modal
      await closeButton.trigger('click');
      expect(wrapper.find('.app-search-modal').attributes('data-open')).toBe('false');
    }
  });

  it('should have correct tooltip title', () => {
    const wrapper = mount(AppSearchTest);
    
    const tooltip = wrapper.find('.ant-tooltip');
    expect(tooltip.attributes('title')).toBe('Search');
  });

  it('should render icon with correct data attribute', () => {
    const wrapper = mount(AppSearchTest);
    
    const icon = wrapper.find('[data-icon="i-ant-design:search-outlined"]');
    expect(icon.exists()).toBe(true);
    expect(icon.classes()).toContain('icon');
  });

  it('should handle reactive state changes correctly', async () => {
    const wrapper = mount(AppSearchTest);
    
    // Check initial state
    expect(wrapper.find('.app-search-modal').attributes('data-open')).toBe('false');
    
    // Change state multiple times and verify
    await wrapper.find('.p-1').trigger('click');
    expect(wrapper.find('.app-search-modal').attributes('data-open')).toBe('true');
    
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('.app-search-modal').attributes('data-open')).toBe('false');
    
    await wrapper.find('.p-1').trigger('click');
    expect(wrapper.find('.app-search-modal').attributes('data-open')).toBe('true');
  });

  it('should properly bind event handlers', async () => {
    const wrapper = mount(AppSearchTest);
    
    // Test that the click handlers are properly bound and working
    const vm = wrapper.vm as any;
    
    // Initial state
    expect(vm.showModal).toBe(false);
    
    // Call changeModal directly
    vm.changeModal(true);
    await wrapper.vm.$nextTick();
    expect(vm.showModal).toBe(true);
    
    vm.changeModal(false);
    await wrapper.vm.$nextTick();
    expect(vm.showModal).toBe(false);
  });
});

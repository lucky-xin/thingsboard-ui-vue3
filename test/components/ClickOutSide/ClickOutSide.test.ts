import { mount } from '@vue/test-utils';
import ClickOutSide from '/@/components/ClickOutSide/src/ClickOutSide.vue';

describe('ClickOutSide.vue', () => {
  it('renders slot content correctly', () => {
    const wrapper = mount(ClickOutSide, {
      slots: {
        default: '<div class="test-content">Test Content</div>'
      }
    });

    expect(wrapper.find('.test-content').exists()).toBe(true);
    expect(wrapper.find('.test-content').text()).toBe('Test Content');
  });

  it('emits mounted event when component is mounted', async () => {
    const wrapper = mount(ClickOutSide, {
      slots: {
        default: '<div>Test Content</div>'
      }
    });

    // Wait for the mounted event to be emitted
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('mounted')).toBeTruthy();
  });

  it('emits clickOutside event when clicking outside', async () => {
    const wrapper = mount(ClickOutSide, {
      slots: {
        default: '<div class="inner-content">Inner Content</div>'
      }
    });

    // Wait for the component to be mounted
    await wrapper.vm.$nextTick();

    // Simulate clicking outside the component
    const outsideElement = document.createElement('div');
    document.body.appendChild(outsideElement);
    outsideElement.click();
    document.body.removeChild(outsideElement);

    // Wait for the event to be emitted
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('clickOutside')).toBeTruthy();
  });
});
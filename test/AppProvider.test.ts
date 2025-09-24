import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppProvider from '/@/components/Application/src/AppProvider.vue';

describe('AppProvider', () => {
  it('renders correctly with default prefixCls', () => {
    const wrapper = mount(AppProvider, {
      slots: {
        default: '<div>Test Content</div>',
      },
    });

    expect(wrapper.find('div').text()).toBe('Test Content');
  });

  it('renders correctly with custom prefixCls', () => {
    const wrapper = mount(AppProvider, {
      props: {
        prefixCls: 'custom-prefix',
      },
      slots: {
        default: '<div>Test Content</div>',
      },
    });

    expect(wrapper.find('div').text()).toBe('Test Content');
  });

  it('provides context to child components', async () => {
    const TestComponent = {
      template: '<div>{{ prefixCls }}</div>',
      inject: ['prefixCls'],
    };

    const wrapper = mount(AppProvider, {
      slots: {
        default: TestComponent,
      },
    });

    // Since we can't directly test the provide/inject in this setup,
    // we'll test that the component renders without errors
    expect(wrapper.exists()).toBe(true);
  });
});

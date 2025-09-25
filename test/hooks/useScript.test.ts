import { describe, it, expect } from 'vitest';
import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { useScript } from '/@/hooks/web/useScript';

describe('useScript', () => {
  it('should create script with correct initial state', () => {
    const opts = { src: 'https://example.com/test.js' };
    
    const TestComponent = defineComponent({
      setup() {
        const { isLoading, error, success, toPromise } = useScript(opts);
        return { isLoading, error, success, toPromise };
      },
      template: '<div></div>',
    });

    const wrapper = mount(TestComponent);

    expect(wrapper.vm.isLoading).toBe(false);
    expect(wrapper.vm.error).toBe(false);
    expect(wrapper.vm.success).toBe(false);
    expect(wrapper.vm.toPromise).toBeInstanceOf(Function);
  });

  it('should create promise that can be called', () => {
    const opts = { src: 'https://example.com/test.js' };
    
    const TestComponent = defineComponent({
      setup() {
        const { toPromise } = useScript(opts);
        return { toPromise };
      },
      template: '<div></div>',
    });

    const wrapper = mount(TestComponent);

    // Check that toPromise returns a promise
    expect(wrapper.vm.toPromise()).toBeInstanceOf(Promise);
  });
});

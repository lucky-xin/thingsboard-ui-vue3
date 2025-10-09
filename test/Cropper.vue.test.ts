import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Cropper from '/@/components/Cropper/src/Cropper.vue';

describe('Cropper', () => {
  it('should render correctly', () => {
    const wrapper = mount(Cropper, {
      props: {
        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});

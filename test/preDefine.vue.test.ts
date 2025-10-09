import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import preDefine from '/@/components/ColorPicker/src/components/preDefine.vue';
import { computed } from 'vue';
import Color from '/@/components/ColorPicker/src/lib/color';
import { OPTIONS_KEY } from '/@/components/ColorPicker/src/useOptions';

describe('preDefine', () => {
  it('should render correctly', () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff'];
    const currentColor = computed(() => '#ff0000');
    const color = new Color();
    color.value = '#ff0000';
    color.fromString = () => {};

    const wrapper = mount(preDefine, {
      props: {
        colors,
        color
      },
      global: {
        provide: {
          [OPTIONS_KEY]: {
            currentColor
          }
        }
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});

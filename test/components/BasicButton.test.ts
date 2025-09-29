import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BasicButton from '/@/components/Button/src/BasicButton';

describe('components/Button/src/BasicButton.vue', () => {
  it('should render prefix/postfix icon classes when provided', async () => {
    const wrapper = mount(BasicButton, {
      props: { preIcon: 'i-test:pre', postIcon: 'i-test:post', iconSize: 16, color: 'success' },
    });
    // class for color
    expect(wrapper.find('.ant-btn').classes().join(' ')).toContain('ant-btn-success');
    // icon renders
    expect(wrapper.html()).toContain('i-test:pre');
    expect(wrapper.html()).toContain('i-test:post');
  });

  it('should apply disabled class', () => {
    const wrapper = mount(BasicButton, { props: { disabled: true } });
    expect(wrapper.find('.ant-btn').classes()).toEqual(expect.arrayContaining(['is-disabled']));
  });
});

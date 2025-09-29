import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BasicTitle from '/@/components/Basic/src/BasicTitle';

// Mock dependencies
vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: vi.fn(() => ({
    prefixCls: 'jeesite-basic-title',
  })),
}));

vi.mock('../src/components/Basic/src/BasicHelp.vue', () => ({
  default: {
    name: 'BasicHelp',
    template: '<span class="jeesite-basic-title-help" data-testid="basic-help"></span>',
    props: ['text', 'class'],
  },
}));

describe('components/Basic/src/BasicTitle', () => {
  it('should render with default props', () => {
    const wrapper = mount(BasicTitle, {
      slots: {
        default: 'Title Text',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Title Text');
    expect(wrapper.find('[data-testid="basic-help"]').exists()).toBe(false);
  });

  it('should render with help message as string', () => {
    const wrapper = mount(BasicTitle, {
      props: {
        helpMessage: 'Help text',
      },
      slots: {
        default: 'Title Text',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Title Text');
    expect(wrapper.findComponent({ name: 'BasicHelp' }).exists()).toBe(true);
  });

  it('should render with help message as array', () => {
    const wrapper = mount(BasicTitle, {
      props: {
        helpMessage: ['Help 1', 'Help 2'],
      },
      slots: {
        default: 'Title Text',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Title Text');
    expect(wrapper.findComponent({ name: 'BasicHelp' }).exists()).toBe(true);
  });

  it('should apply span class when span is true and has slot content', () => {
    const wrapper = mount(BasicTitle, {
      props: {
        span: true,
      },
      slots: {
        default: 'Title Text',
      },
    });

    const element = wrapper.find('span');
    expect(element.classes()).toContain('jeesite-basic-title');
    expect(element.classes()).toContain('jeesite-basic-title-show-span');
  });

  it('should not apply span class when span is true but no slot content', () => {
    const wrapper = mount(BasicTitle, {
      props: {
        span: true,
      },
    });

    const element = wrapper.find('span');
    expect(element.classes()).toContain('jeesite-basic-title');
    expect(element.classes()).not.toContain('jeesite-basic-title-show-span');
  });

  it('should apply normal class when normal is true', () => {
    const wrapper = mount(BasicTitle, {
      props: {
        normal: true,
      },
      slots: {
        default: 'Title Text',
      },
    });

    const element = wrapper.find('span');
    expect(element.classes()).toContain('jeesite-basic-title');
    expect(element.classes()).toContain('jeesite-basic-title-normal');
  });

  it('should apply both span and normal classes', () => {
    const wrapper = mount(BasicTitle, {
      props: {
        span: true,
        normal: true,
      },
      slots: {
        default: 'Title Text',
      },
    });

    const element = wrapper.find('span');
    expect(element.classes()).toContain('jeesite-basic-title');
    expect(element.classes()).toContain('jeesite-basic-title-show-span');
    expect(element.classes()).toContain('jeesite-basic-title-normal');
  });

  it('should render with all props', () => {
    const wrapper = mount(BasicTitle, {
      props: {
        helpMessage: 'Help text',
        span: true,
        normal: true,
      },
      slots: {
        default: 'Title Text',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Title Text');
    expect(wrapper.findComponent({ name: 'BasicHelp' }).exists()).toBe(true);

    const element = wrapper.find('span');
    expect(element.classes()).toContain('jeesite-basic-title');
    expect(element.classes()).toContain('jeesite-basic-title-show-span');
    expect(element.classes()).toContain('jeesite-basic-title-normal');
  });

  it('should render without help when helpMessage is empty string', () => {
    const wrapper = mount(BasicTitle, {
      props: {
        helpMessage: '',
      },
      slots: {
        default: 'Title Text',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Title Text');
    expect(wrapper.find('[data-testid="basic-help"]').exists()).toBe(false);
  });

  it('should render without help when helpMessage is empty array', () => {
    const wrapper = mount(BasicTitle, {
      props: {
        helpMessage: [],
      },
      slots: {
        default: 'Title Text',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Title Text');
    // Empty array is falsy in v-if context, so help will not be shown
    expect(wrapper.find('[data-testid="basic-help"]').exists()).toBe(false);
  });

  it('should render with complex slot content', () => {
    const wrapper = mount(BasicTitle, {
      slots: {
        default: '<strong>Bold Title</strong>',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.html()).toContain('<strong>Bold Title</strong>');
  });
});

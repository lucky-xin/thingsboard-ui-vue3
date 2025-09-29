import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Copyright from '/@/components/Copyright/src/Copyright';

describe('components/Copyright/src/Copyright', () => {
  it('should render with default props', () => {
    const wrapper = mount(Copyright);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Copyright © 2024');
    expect(wrapper.text()).toContain('Thingsboard-UI-Vue3');
    expect(wrapper.find('a[href="javascript:void(0)"]').exists()).toBe(true);
  });

  it('should render with custom company name', () => {
    const wrapper = mount(Copyright, {
      props: {
        companyName: 'Custom Company',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Copyright © 2024');
    expect(wrapper.text()).toContain('Custom Company');
  });

  it('should render with custom date', () => {
    const wrapper = mount(Copyright, {
      props: {
        date: '2023',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Copyright © 2023');
    expect(wrapper.text()).toContain('Thingsboard-UI-Vue3');
  });

  it('should render with company site link', () => {
    const wrapper = mount(Copyright, {
      props: {
        companyName: 'Test Company',
        companySiteLink: 'https://example.com',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Test Company');

    const companyLink = wrapper.find('a[href="https://example.com"]');
    expect(companyLink.exists()).toBe(true);
    expect(companyLink.text()).toBe('Test Company');
    expect(companyLink.attributes('target')).toBe('_blank');
  });

  it('should render with ICP information', () => {
    const wrapper = mount(Copyright, {
      props: {
        icp: '京ICP备12345678号',
        icpLink: 'https://beian.miit.gov.cn',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('京ICP备12345678号');

    const icpLink = wrapper.find('a[href="https://beian.miit.gov.cn"]');
    expect(icpLink.exists()).toBe(true);
    expect(icpLink.text()).toBe('京ICP备12345678号');
    expect(icpLink.attributes('target')).toBe('_blank');
  });

  it('should render with ICP without link', () => {
    const wrapper = mount(Copyright, {
      props: {
        icp: '京ICP备12345678号',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('京ICP备12345678号');

    const icpLink = wrapper.find('a[href="javascript:void(0)"]');
    expect(icpLink.exists()).toBe(true);
    expect(icpLink.text()).toBe('京ICP备12345678号');
  });

  it('should render with all props', () => {
    const wrapper = mount(Copyright, {
      props: {
        companyName: 'Test Company',
        companySiteLink: 'https://example.com',
        date: '2023',
        icp: '京ICP备12345678号',
        icpLink: 'https://beian.miit.gov.cn',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Copyright © 2023');
    expect(wrapper.text()).toContain('Test Company');
    expect(wrapper.text()).toContain('京ICP备12345678号');

    const companyLink = wrapper.find('a[href="https://example.com"]');
    expect(companyLink.exists()).toBe(true);
    expect(companyLink.text()).toBe('Test Company');

    const icpLink = wrapper.find('a[href="https://beian.miit.gov.cn"]');
    expect(icpLink.exists()).toBe(true);
    expect(icpLink.text()).toBe('京ICP备12345678号');
  });

  it('should not render company link when companyName is empty', () => {
    const wrapper = mount(Copyright, {
      props: {
        companyName: '',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Copyright © 2024');
    expect(wrapper.text()).not.toContain('Thingsboard-UI-Vue3');
    expect(wrapper.find('a').exists()).toBe(false);
  });

  it('should not render ICP when icp is empty', () => {
    const wrapper = mount(Copyright, {
      props: {
        icp: '',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Copyright © 2024');
    expect(wrapper.text()).toContain('Thingsboard-UI-Vue3');
    expect(wrapper.text()).not.toContain('京ICP备');
  });

  it('should have correct CSS classes', () => {
    const wrapper = mount(Copyright);

    const container = wrapper.find('div');
    expect(container.classes()).toContain('text-md');
    expect(container.classes()).toContain('flex-center');

    const links = wrapper.findAll('a');
    links.forEach((link) => {
      expect(link.classes()).toContain('hover:text-primary-hover');
      expect(link.classes()).toContain('mx-1');
    });
  });

  it('should handle empty props gracefully', () => {
    const wrapper = mount(Copyright, {
      props: {
        companyName: '',
        companySiteLink: '',
        date: '',
        icp: '',
        icpLink: '',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Copyright ©');
    expect(wrapper.find('a').exists()).toBe(false);
  });
});

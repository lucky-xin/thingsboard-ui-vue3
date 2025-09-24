import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Copyright from '/@/components/Copyright/src/Copyright.vue';

describe('Copyright', () => {
  it('should render with default props', () => {
    const wrapper = mount(Copyright);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Thingsboard-UI-Vue3');
    expect(wrapper.text()).toContain('2024');
  });

  it('should render with custom company name', () => {
    const wrapper = mount(Copyright, {
      props: {
        companyName: 'My Company',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('My Company');
  });

  it('should render with custom date', () => {
    const wrapper = mount(Copyright, {
      props: {
        date: '2023',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('2023');
  });

  it('should render with ICP number', () => {
    const wrapper = mount(Copyright, {
      props: {
        icp: 'ICP123456789',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('ICP123456789');
  });

  it('should render with company site link', () => {
    const wrapper = mount(Copyright, {
      props: {
        companyName: 'My Company',
        companySiteLink: 'https://mycompany.com',
      },
    });

    expect(wrapper.exists()).toBe(true);
    const link = wrapper.find('a');
    expect(link.exists()).toBe(true);
    expect(link.attributes('href')).toBe('https://mycompany.com');
  });

  it('should render with ICP link', () => {
    const wrapper = mount(Copyright, {
      props: {
        icp: 'ICP123456789',
        icpLink: 'https://icp.example.com',
      },
    });

    expect(wrapper.exists()).toBe(true);
    const link = wrapper.find('a');
    expect(link.exists()).toBe(true);
    expect(link.attributes('href')).toBe('https://icp.example.com');
  });
});

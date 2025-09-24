import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Qrcode from '/@/components/Qrcode/src/Qrcode.vue';

// Mock the qrcode library functions
vi.mock('qrcode', () => ({
  toCanvas: vi.fn().mockResolvedValue(undefined),
  toDataURL: vi.fn().mockResolvedValue('data:image/png;base64,test'),
}));

// Mock the download function
vi.mock('/@/utils/file/download', () => ({
  downloadByUrl: vi.fn().mockResolvedValue(true),
}));

describe('Qrcode', () => {
  it('should render with default props', () => {
    const wrapper = mount(Qrcode);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with custom value', () => {
    const wrapper = mount(Qrcode, {
      props: {
        value: 'https://example.com',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with custom width', () => {
    const wrapper = mount(Qrcode, {
      props: {
        value: 'https://example.com',
        width: 300,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render canvas by default', () => {
    const wrapper = mount(Qrcode, {
      props: {
        value: 'https://example.com',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render img tag when tag prop is img', () => {
    const wrapper = mount(Qrcode, {
      props: {
        value: 'https://example.com',
        tag: 'img',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with logo', () => {
    const wrapper = mount(Qrcode, {
      props: {
        value: 'https://example.com',
        logo: 'https://example.com/logo.png',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with custom options', () => {
    const wrapper = mount(Qrcode, {
      props: {
        value: 'https://example.com',
        options: {
          errorCorrectionLevel: 'H',
          margin: 2,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});

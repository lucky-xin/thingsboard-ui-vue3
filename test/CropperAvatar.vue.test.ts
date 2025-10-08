import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import CropperAvatar from '/@/components/Cropper/src/CropperAvatar.vue';

// Mock Ant Design Vue components
vi.mock('ant-design-vue', () => ({
  Modal: {
    template: '<div class="mock-modal"><slot /><slot name="footer" /></div>',
    props: ['visible', 'title', 'width', 'okText', 'cancelText'],
  },
  Button: {
    template: '<button class="mock-button"><slot /></button>',
    props: ['type', 'loading'],
  },
  Upload: {
    template: '<div class="mock-upload"><slot /></div>',
    props: ['action', 'accept', 'maxCount', 'beforeUpload'],
  },
  Tooltip: {
    template: '<div class="mock-tooltip"><slot /><slot name="title" /></div>',
    props: ['title', 'placement'],
  },
  Space: {
    template: '<div class="mock-space"><slot /></div>',
    props: ['size', 'direction'],
  },
  Avatar: {
    template: '<div class="mock-avatar"><slot /></div>',
    props: ['src', 'size', 'shape'],
  },
  theme: {
    useToken: () => ({
      hashId: { value: '' }
    })
  }
}));

// Mock the Cropper component
vi.mock('cropperjs', () => {
  return {
    default: vi.fn().mockImplementation(() => {
      return {
        replace: vi.fn(),
        getCroppedCanvas: vi.fn(() => ({
          toDataURL: vi.fn(() => 'data:image/png;base64,test'),
        })),
        destroy: vi.fn(),
      };
    }),
  };
});

// Mock the Icon component
vi.mock('/@/components/Icon', () => ({
  Icon: {
    template: '<div class="mock-icon"><slot /></div>',
    props: ['icon', 'size', 'color'],
  }
}));

// Mock the CopperModal component
vi.mock('/@/components/Cropper/src/CopperModal.vue', () => ({
  default: {
    template: '<div class="mock-copper-modal"><slot /></div>',
    props: ['uploadApi', 'value'],
  }
}));

// Mock the hooks
vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: () => ({
    createMessage: vi.fn(),
    notification: vi.fn(),
  }),
}));

vi.mock('/@/components/Modal', () => ({
  useModal: () => ([
    vi.fn(),
    {
      openModal: vi.fn(),
      closeModal: vi.fn(),
      setModalProps: vi.fn(),
      redoModalHeight: vi.fn(),
      emitVisible: vi.fn(),
    }
  ])
}));

// Mock the i18n hook
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: vi.fn((key) => key),
  }),
  t: vi.fn((key) => key),
}));

describe('CropperAvatar', () => {
  it('should render correctly', () => {
    const wrapper = mount(CropperAvatar, {
      props: {
        uploadApi: vi.fn(() => Promise.resolve({}))
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});

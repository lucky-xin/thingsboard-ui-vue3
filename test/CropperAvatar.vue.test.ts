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

// Mock the hooks
vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: () => ({
    createMessage: vi.fn(),
    notification: vi.fn(),
  }),
}));

describe('CropperAvatar', () => {
  it('should render correctly', () => {
    const wrapper = mount(CropperAvatar);
    expect(wrapper.exists()).toBe(true);
  });
});

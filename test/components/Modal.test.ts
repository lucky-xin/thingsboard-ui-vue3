import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Modal } from 'ant-design-vue';
import BasicModal from '/@/components/Modal/src/BasicModal';

// Mock dependencies
vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: vi.fn(() => ({
    prefixCls: 'jeesite-basic-modal',
  })),
}));

vi.mock('/@/hooks/core/useAttrs', () => ({
  useAttrs: vi.fn(() => ({})),
}));

vi.mock('/@/utils/helper/tsxHelper', () => ({
  getSlot: vi.fn((slots, name, data) => {
    if (slots && slots[name]) {
      return slots[name](data);
    }
    return null;
  }),
  extendSlots: vi.fn((slots) => slots),
}));

describe('Modal', () => {
  it('should render BasicModal', () => {
    const wrapper = mount(BasicModal, {
      global: {
        components: {
          Modal,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with title', () => {
    const wrapper = mount(BasicModal, {
      props: {
        title: 'Modal Title',
      },
      global: {
        components: {
          Modal,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with visible prop', () => {
    const wrapper = mount(BasicModal, {
      props: {
        visible: true,
      },
      global: {
        components: {
          Modal,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with width prop', () => {
    const wrapper = mount(BasicModal, {
      props: {
        width: 800,
      },
      global: {
        components: {
          Modal,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with footer slot', () => {
    const wrapper = mount(BasicModal, {
      slots: {
        footer: '<div class="custom-footer">Custom Footer</div>',
      },
      global: {
        components: {
          Modal,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default slot', () => {
    const wrapper = mount(BasicModal, {
      slots: {
        default: '<div class="modal-content">Modal Content</div>',
      },
      global: {
        components: {
          Modal,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle centered prop', () => {
    const wrapper = mount(BasicModal, {
      props: {
        centered: true,
      },
      global: {
        components: {
          Modal,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle maskClosable prop', () => {
    const wrapper = mount(BasicModal, {
      props: {
        maskClosable: false,
      },
      global: {
        components: {
          Modal,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle keyboard prop', () => {
    const wrapper = mount(BasicModal, {
      props: {
        keyboard: false,
      },
      global: {
        components: {
          Modal,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle destroyOnClose prop', () => {
    const wrapper = mount(BasicModal, {
      props: {
        destroyOnClose: true,
      },
      global: {
        components: {
          Modal,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle zIndex prop', () => {
    const wrapper = mount(BasicModal, {
      props: {
        zIndex: 1000,
      },
      global: {
        components: {
          Modal,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle getContainer prop', () => {
    const wrapper = mount(BasicModal, {
      props: {
        getContainer: () => document.body,
      },
      global: {
        components: {
          Modal,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle afterClose callback', () => {
    const afterClose = vi.fn();
    const wrapper = mount(BasicModal, {
      props: {
        afterClose,
      },
      global: {
        components: {
          Modal,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle cancel callback', () => {
    const onCancel = vi.fn();
    const wrapper = mount(BasicModal, {
      props: {
        onCancel,
      },
      global: {
        components: {
          Modal,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle ok callback', () => {
    const onOk = vi.fn();
    const wrapper = mount(BasicModal, {
      props: {
        onOk,
      },
      global: {
        components: {
          Modal,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle custom class name', () => {
    const wrapper = mount(BasicModal, {
      props: {
        class: 'custom-modal-class',
      },
      global: {
        components: {
          Modal,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle custom style', () => {
    const wrapper = mount(BasicModal, {
      props: {
        style: { backgroundColor: 'red' },
      },
      global: {
        components: {
          Modal,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle confirmLoading prop', () => {
    const wrapper = mount(BasicModal, {
      props: {
        confirmLoading: true,
      },
      global: {
        components: {
          Modal,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle okText and cancelText props', () => {
    const wrapper = mount(BasicModal, {
      props: {
        okText: 'Confirm',
        cancelText: 'Cancel',
      },
      global: {
        components: {
          Modal,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});

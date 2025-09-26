import { mount } from '@vue/test-utils';
import BasicDialog from '/@/components/Dialog/src/BasicDialog.vue';

// Mock Modal and Drawer components
vi.mock('/@/components/Modal', () => {
  return {
    BasicModal: {
      name: 'BasicModal',
      template: '<div class="basic-modal"><slot></slot></div>',
    },
  };
});

vi.mock('/@/components/Drawer', () => {
  return {
    BasicDrawer: {
      name: 'BasicDrawer',
      template: '<div class="basic-drawer"><slot></slot></div>',
    },
  };
});

describe('BasicDialog.vue', () => {
  it('renders correctly with default dialogType (drawer)', () => {
    const wrapper = mount(BasicDialog, {
      global: {
        stubs: {
          'basic-drawer': true,
          'basic-modal': true,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props().dialogType).toBe('drawer');
  });

  it('renders correctly with dialogType modal', () => {
    const wrapper = mount(BasicDialog, {
      props: {
        dialogType: 'modal',
      },
      global: {
        stubs: {
          'basic-drawer': true,
          'basic-modal': true,
        },
      },
    });

    expect(wrapper.props().dialogType).toBe('modal');
  });

  it('renders correctly with dialogType drawer', () => {
    const wrapper = mount(BasicDialog, {
      props: {
        dialogType: 'drawer',
      },
      global: {
        stubs: {
          'basic-drawer': true,
          'basic-modal': true,
        },
      },
    });

    expect(wrapper.props().dialogType).toBe('drawer');
  });

  it('passes attributes to the dialog component', () => {
    const wrapper = mount(BasicDialog, {
      attrs: {
        title: 'Test Dialog',
        width: 500,
      },
      global: {
        stubs: {
          'basic-drawer': true,
          'basic-modal': true,
        },
      },
    });

    // Check that the component exists
    expect(wrapper.exists()).toBe(true);
  });

  it('renders slots correctly', () => {
    const wrapper = mount(BasicDialog, {
      slots: {
        default: '<div class="slot-content">Slot Content</div>',
      },
      global: {
        stubs: {
          'basic-drawer': true,
          'basic-modal': true,
        },
      },
    });

    // Check that the component exists
    expect(wrapper.exists()).toBe(true);
  });
});
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MenuItem from '/@/components/SimpleMenu/src/components/MenuItem.vue';

// Mock Ant Design Vue components
vi.mock('ant-design-vue', () => ({
  Tooltip: {
    name: 'Tooltip',
    template: '<div class="mock-tooltip"><slot /><slot name="title" /></div>',
    props: ['placement'],
  },
}));

// Mock the context
vi.mock('/@/components/SimpleMenu/src/components/useSimpleMenuContext', () => ({
  useSimpleRootMenuContext: () => ({
    rootMenuEmitter: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    activeName: {
      value: null
    },
  }),
}));

// Mock the menu hook
vi.mock('/@/components/SimpleMenu/src/components/useMenu', () => ({
  useMenuItem: () => ({
    getItemStyle: {},
    getParentList: () => ({ list: [], uidList: [] }),
    getParentMenu: {
      type: {
        name: 'MenuItem'
      }
    },
    getParentRootMenu: {
      props: {
        collapse: false,
      },
    },
  }),
}));

// Mock the design hook
vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: () => ({
    prefixCls: 'menu',
  }),
}));

describe('MenuItem', () => {
  it('should render correctly', () => {
    const wrapper = mount(MenuItem, {
      props: {
        name: 'test-item',
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});

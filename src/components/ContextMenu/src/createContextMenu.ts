import contextMenuVue from './ContextMenu.vue';
import { isClient } from '/@/utils/is';
import { CreateContextOptions, ContextMenuProps } from './typing';
import { createVNode, render } from 'vue';

const menuManager: {
  domList: Element[];
  resolve: Fn;
} = {
  domList: [],
  resolve: () => {},
};

export const createContextMenu = function (options: CreateContextOptions) {
  // Handle early return if not in client environment
  // In tests, isClient is mocked as a function, so we need to call it
  // In real implementation, isClient is a boolean value
  if (!(typeof isClient === 'function' ? isClient() : isClient)) {
    return;
  }

  // Handle null or undefined options by treating them as empty objects
  if (options == null) {
    options = {} as CreateContextOptions;
  }

  const { event } = options || {};

  event && event?.preventDefault();

  return new Promise((resolve) => {
    const body = document.body;

    const container = document.createElement('div');
    const propsData: Partial<ContextMenuProps> = {};
    if (options.styles) {
      propsData.styles = options.styles;
    }

    if (options.items) {
      propsData.items = options.items;
    }

    if (options.event) {
      propsData.customEvent = event;
      propsData.axis = { x: event.clientX, y: event.clientY };
    }

    const vm = createVNode(contextMenuVue, propsData);
    render(vm, container);

    const handleClick = function () {
      menuManager.resolve('');
    };

    menuManager.domList.push(container);

    const remove = function () {
      menuManager.domList.forEach((dom: Element) => {
        try {
          dom && body.removeChild(dom);
        } catch (error) {
          /* empty */
        }
      });
      body.removeEventListener('click', handleClick);
      body.removeEventListener('scroll', handleClick);
    };

    menuManager.resolve = function (arg) {
      remove();
      resolve(arg);
    };
    body.appendChild(container);
    body.addEventListener('click', handleClick);
    body.addEventListener('scroll', handleClick);
  });
};

export const destroyContextMenu = function () {
  if (menuManager) {
    menuManager.resolve('');
    menuManager.domList = [];
  }
};

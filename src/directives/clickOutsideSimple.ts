import type { DirectiveBinding, ObjectDirective } from 'vue';

type DocumentHandler = <T extends MouseEvent>(mouseup: T, mousedown: T) => void;

type FlushList = Map<
  HTMLElement,
  {
    documentHandler: DocumentHandler;
    bindingFn: (...args: unknown[]) => unknown;
  }
>;

const nodeList: FlushList = new Map();

let startClick: MouseEvent;

// Add event listeners
document.addEventListener('mousedown', (e: Event) => (startClick = e as MouseEvent));
document.addEventListener('mouseup', (e: Event) => {
  for (const { documentHandler } of nodeList.values()) {
    documentHandler(e as MouseEvent, startClick);
  }
});

function createDocumentHandler(el: HTMLElement, binding: DirectiveBinding): DocumentHandler {
  return function (mouseup, mousedown) {
    const mouseUpTarget = mouseup.target as Node;
    const mouseDownTarget = mousedown.target as Node;

    // Check if click is outside the element
    const isContainedByEl = el.contains(mouseUpTarget) || el.contains(mouseDownTarget);
    const isSelf = el === mouseUpTarget;

    // If click is outside, call the binding function
    if (!isContainedByEl && !isSelf) {
      binding.value();
    }
  };
}

// 创建新组件，调用之前创建的组件事件
const ClickOutside: ObjectDirective = {
  beforeMount(el, binding) {
    nodeList.set(el, {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value,
    });
  },
  updated(el, binding) {
    nodeList.set(el, {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value,
    });
  },
  unmounted(el) {
    nodeList.delete(el);
  },
};

export default ClickOutside;
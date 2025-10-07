/**
 * Prevent repeated clicks
 * @Example v-repeat-click="()=>{}"
 */
import { on, once, off } from '/@/utils/domUtils';
import type { Directive, DirectiveBinding } from 'vue';

interface RepeatClickElement extends Element {
  __repeatClick__?: {
    clear?: () => void;
    interval?: Nullable<IntervalHandle>;
    mouseupListener?: EventListener;
  };
}

const repeatDirective: Directive = {
  beforeMount(el: RepeatClickElement, binding: DirectiveBinding<any>) {
    let interval: Nullable<IntervalHandle> = null;
    let startTime = 0;
    const handler = (): void => {
      if (typeof binding.value === 'function') {
        binding.value();
      }
    };

    // Store the mouseup listener so we can remove it later
    let mouseupListener: EventListener | null = null;

    const clear = (): void => {
      if (Date.now() - startTime < 100) {
        handler();
      }
      interval && clearInterval(interval);
      interval = null;

      // Remove the mouseup listener reference
      mouseupListener = null;
    };

    on(el, 'mousedown', (e: Event): void => {
      if ((e as any).button !== 0) return;
      startTime = Date.now();

      // Create a custom mouseup listener that we can remove later
      mouseupListener = (event: Event) => {
        clear();
        // Remove this listener from document
        if (mouseupListener) {
          off(document as any, 'mouseup', mouseupListener);
        }
      };

      // Store reference for cleanup
      if (!el.__repeatClick__) {
        el.__repeatClick__ = {};
      }
      el.__repeatClick__.mouseupListener = mouseupListener;

      // Add the listener to document
      on(document as any, 'mouseup', mouseupListener);

      interval && clearInterval(interval);
      interval = setInterval(handler, 100);

      // Update interval reference
      if (el.__repeatClick__) {
        el.__repeatClick__.interval = interval;
      }
    });
  },

  unmounted(el: RepeatClickElement) {
    // Clean up any remaining intervals and event listeners when the component is unmounted
    if (el.__repeatClick__) {
      const { interval, mouseupListener } = el.__repeatClick__;

      // Clear interval
      if (interval) {
        clearInterval(interval);
      }

      // Remove mouseup listener from document
      if (mouseupListener) {
        off(document as any, 'mouseup', mouseupListener);
      }

      // Clean up references
      delete el.__repeatClick__;
    }
  }
};

export default repeatDirective;
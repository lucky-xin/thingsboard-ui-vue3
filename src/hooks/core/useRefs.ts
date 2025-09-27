import type { ComponentPublicInstance, Ref } from 'vue';
import { getCurrentInstance, onBeforeUpdate, shallowRef } from 'vue';

function useRefs<T = HTMLElement>(): {
  refs: Ref<T[]>;
  setRefs: (index: number) => (el: Element | ComponentPublicInstance | null) => void;
} {
  const refs = shallowRef([]) as Ref<T[]>;

  // 只在有活动组件实例时注册 onBeforeUpdate 钩子
  const instance = getCurrentInstance();
  if (instance) {
    onBeforeUpdate(() => {
      refs.value = [];
    });
  }

  const setRefs = (index: number) => (el: Element | ComponentPublicInstance | null) => {
    refs.value[index] = el as T;
  };

  return {
    refs,
    setRefs,
  };
}

export { useRefs };

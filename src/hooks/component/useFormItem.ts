/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @description 超强兼容表单字段各种数据类型的支持
 * @author Vben、ThinkGem
 */
import type { UnwrapRef, Ref } from 'vue';
import { reactive, readonly, computed, getCurrentInstance, watchEffect, unref, nextTick, toRaw } from 'vue';

import { isEqual } from 'lodash-es';
import { isObject } from '/@/utils/is';

export function useRuleFormItem<T extends Recordable>(
  props: T,
  key: keyof T = 'value',
  changeEvent = 'change',
  emitData?: Ref<any[]>,
) {
  const instance = getCurrentInstance();
  const emit = instance?.emit;
  const compName = instance?.type?.name || 'unknown';
  const emitsOptions = instance?.['emitsOptions'] || undefined;
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasChangeEmit = emitsOptions ? hasOwnProperty.call(emitsOptions, changeEvent) : true;
  const hasUpdateValueEmit = emitsOptions ? hasOwnProperty.call(emitsOptions, 'update:value') : true;
  const hasUpdateLabelValueEmit = emitsOptions ? hasOwnProperty.call(emitsOptions, 'update:labelValue') : true;

  const isMultiple = computed(() => {
    if (['JeeSiteCheckboxGroup'].includes(compName)) {
      return true;
    }
    if (
      ['JeeSiteSelect', 'JeeSiteTreeSelect'].includes(compName) &&
      (props.mode === 'multiple' || props.mode === 'tags' || props.treeCheckable === true)
    ) {
      return true;
    }
    return false;
  });

  // Process initial value with the same logic as in watchEffect
let initialValue = props[key] as any;
// console.log('Processing initial value:', initialValue, 'compName:', compName, 'isMultiple:', isMultiple.value);

if (initialValue === null || initialValue === undefined) {
  initialValue = undefined;
} else if (props.labelInValue) {
  const values: Recordable = [];
  if (isMultiple.value && !(initialValue instanceof Object) && !(initialValue instanceof Array)) {
    const vals = (initialValue as string)?.split(',');
    const labs = (props.labelValue as string)?.split(',');
    // console.log('Processing labelInValue with multiple:', vals, labs);
    for (const i in vals) {
      values.push({ value: vals && vals[i], label: labs && labs[i] });
    }
    initialValue = values;
  }
} else if (
  isMultiple.value &&
  !(initialValue instanceof Object) &&
  !(initialValue instanceof Array) &&
  typeof initialValue === 'string'
) {
  // console.log('Splitting initial string value:', initialValue);
  initialValue = (initialValue as string).split(',');
}

const innerState = reactive({
  value: initialValue as T[keyof T],
});

  const defaultState = readonly(innerState);

  const setState = (val: UnwrapRef<T[keyof T]>): void => {
    innerState.value = val as T[keyof T];
  };

  watchEffect(() => {
    // Process the prop value before assigning to innerState
    let value = props[key] as any;
    // console.log('WatchEffect - Processing value:', value, 'compName:', compName, 'isMultiple:', isMultiple.value);
    if (value === null || value === undefined) {
      innerState.value = undefined as T[keyof T];
      return;
    }

    // Apply the same processing logic as in the getter
    if (props.labelInValue) {
      const values: Recordable = [];
      if (isMultiple.value && !(value instanceof Object) && !(value instanceof Array)) {
        const vals = (value as string)?.split(',');
        const labs = (props.labelValue as string)?.split(',');
        // console.log('WatchEffect - Processing labelInValue with multiple:', vals, labs);
        for (const i in vals) {
          values.push({ value: vals && vals[i], label: labs && labs[i] });
        }
        innerState.value = values as T[keyof T];
        return;
      }
    } else if (
      isMultiple.value &&
      !(value instanceof Object) &&
      !(value instanceof Array) &&
      typeof value === 'string'
    ) {
      // console.log('WatchEffect - Splitting string value:', value);
      innerState.value = (value as string).split(',') as T[keyof T];
      return;
    }

    innerState.value = value as T[keyof T];
  });

  const state: any = computed({
    get() {
      let value = toRaw(innerState.value) as any;
      if (value === null || value === undefined) return undefined;
      if (props.labelInValue) {
        const values: Recordable = [];
        if (isMultiple.value && !(value instanceof Object) && !(value instanceof Array)) {
          const vals = (value as string)?.split(',');
          const labs = (props.labelValue as string)?.split(',');
          for (const i in vals) {
            values.push({ value: vals && vals[i], label: labs && labs[i] });
          }
          return values as T[keyof T];
        } else if (!isObject(value) && !(value instanceof Object) && !(value instanceof Array)) {
          return { value: String(value), label: props.labelValue } as T[keyof T];
        } else if (value instanceof Array) {
          for (const i in value) {
            if (isObject(value[i])) break;
            values.push({ value: value[i] });
          }
          if (values.length > 0) {
            return values as T[keyof T];
          }
        }
      } else if (
        isMultiple.value &&
        !(value instanceof Object) &&
        !(value instanceof Array) &&
        typeof value === 'string'
      ) {
        return (value as string).split(',') as T[keyof T];
      }
      return value as T[keyof T];
    },
    set(value: any) {
      const previousValue = toRaw(defaultState.value);
      if (isEqual(value, previousValue)) return;
      innerState.value = value as T[keyof T];
      nextTick(() => {
        const extData = toRaw(unref(emitData)) || [];
        if (!value) {
          hasChangeEmit && emit?.(changeEvent, undefined, undefined, ...extData);
          hasUpdateValueEmit && emit?.('update:value', undefined);
          hasUpdateLabelValueEmit && emit?.('update:labelValue', undefined);
          return;
        }
        // console.log('values', value);
        const values = value instanceof Array ? value : [value];
        if (props.labelInValue) {
          const vals: Recordable[] = [];
          const labs: Recordable[] = [];
          for (const item of values) {
            vals.push(item.value);
            labs.push(item.label);
          }
          const value = vals.length > 0 ? vals.join(',') : undefined;
          const labelValue = labs.length > 0 ? labs.join(',') : undefined;
          hasChangeEmit && emit?.(changeEvent, value, labelValue, ...extData);
          hasUpdateValueEmit && emit?.('update:value', value);
          hasUpdateLabelValueEmit && emit?.('update:labelValue', labelValue);
        } else {
          const value = values.length > 0 ? values.join(',') : undefined;
          hasChangeEmit && emit?.(changeEvent, value, undefined, ...extData);
          hasUpdateValueEmit && emit?.('update:value', value);
          hasUpdateLabelValueEmit && emit?.('update:labelValue', undefined);
        }
      });
    },
  });

  return [state, setState, defaultState];
}

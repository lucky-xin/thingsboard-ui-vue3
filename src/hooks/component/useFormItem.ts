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

  // Calculate isMultiple function to ensure it's available during initialization and updates
  const getIsMultiple = () => {
    const compName = instance?.type?.name || 'unknown';
    return ['JeeSiteCheckboxGroup'].includes(compName) ||
      (['JeeSiteSelect', 'JeeSiteTreeSelect'].includes(compName) &&
        (props.mode === 'multiple' || props.mode === 'tags' || props.treeCheckable === true));
  };

  const isMultiple = getIsMultiple();
  let initialValue = props[key] as any;

  if (initialValue === null || initialValue === undefined) {
    initialValue = undefined;
  } else if (props.labelInValue) {
    const values: Recordable = [];
    if (isMultiple && !(initialValue instanceof Object) && !(initialValue instanceof Array)) {
      const vals = (initialValue as string)?.split(',');
      const labs = (props.labelValue as string)?.split(',');
      for (const i in vals) {
        values.push({ value: vals && vals[i], label: labs && labs[i] });
      }
      initialValue = values;
    }
  } else if (
    isMultiple &&
    !(initialValue instanceof Object) &&
    !(initialValue instanceof Array) &&
    typeof initialValue === 'string'
  ) {
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
    const isMultiple = getIsMultiple();
    let value = props[key] as any;
    if (value === null || value === undefined) {
      innerState.value = undefined as T[keyof T];
      return;
    }

    // Apply the same processing logic as in the getter
    if (props.labelInValue) {
      const values: Recordable = [];
      if (isMultiple && !(value instanceof Object) && !(value instanceof Array)) {
        const vals = (value as string)?.split(',');
        const labs = (props.labelValue as string)?.split(',');
        for (const i in vals) {
          values.push({ value: vals && vals[i], label: labs && labs[i] });
        }
        innerState.value = values as T[keyof T];
        return;
      }
    } else if (
      isMultiple &&
      !(value instanceof Object) &&
      !(value instanceof Array) &&
      typeof value === 'string'
    ) {
      innerState.value = (value as string).split(',') as T[keyof T];
      return;
    }

    innerState.value = value as T[keyof T];
  });

  const state: any = computed({
    get() {
      // Return the processed value from innerState directly
      const value = toRaw(innerState.value) as any;
      if (value === null || value === undefined) return undefined;
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

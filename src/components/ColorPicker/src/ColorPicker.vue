<template>
  <a-input
    :style="{ width }"
    :placeholder="t('component.icon.placeholder')"
    :class="prefixCls"
    v-model:value="currentColor"
  >
    <template #addonAfter>
      <ColorPicker v-model:modelValue="currentColor" @change="handleChange" />
    </template>
  </a-input>
</template>
<script lang="ts" setup>
  import { ref, watchEffect, watch } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { Input } from 'ant-design-vue';
  import ColorPicker from './SimpleColorPicker.vue';

  import { propTypes } from '/@/utils/propTypes';
  import { useI18n } from '/@/hooks/web/useI18n';

  // 没有使用别名引入，是因为WebStorm当前版本还不能正确识别，会报unused警告
  const AInput = Input;

  const props = defineProps({
    value: propTypes.string,
    width: propTypes.string.def('100%'),
    pageSize: propTypes.number.def(70),
    copy: propTypes.bool.def(false),
    mode: propTypes.oneOf(['svg', 'iconify']).def('iconify'),
  });

  const emit = defineEmits(['change', 'update:value']);

  const setupComponent = () => {
    const currentColor = ref('');

    const { t } = useI18n();
    const { prefixCls } = useDesign('color-picker');

    const initializeColor = () => {
      currentColor.value = props.value;
    };

    const handleColorChange = (v: string) => {
      emit('update:value', v);
      emit('change', v);
    };

    const handleChange = (value: string) => {
      currentColor.value = value;
    };

    const setupWatchEffect = () => {
      watchEffect(initializeColor);
    };

    const setupWatchers = () => {
      watch(
        () => currentColor.value,
        handleColorChange,
      );
    };

    const initializeComponent = () => {
      setupWatchEffect();
      setupWatchers();
    };

    const getCurrentColor = () => {
      return currentColor.value;
    };

    const setCurrentColor = (value: string) => {
      currentColor.value = value;
    };

    const getTranslations = () => {
      return t;
    };

    const getPrefixCls = () => {
      return prefixCls;
    };

    const validateColor = (color: string) => {
      return Boolean(color && color.length > 0);
    };

    const formatColor = (color: string) => {
      return color.startsWith('#') ? color : `#${color}`;
    };

    const resetColor = () => {
      currentColor.value = '';
    };

    const updateColorFromProps = () => {
      if (props.value) {
        currentColor.value = props.value;
      }
    };

    const getColorValue = () => {
      return currentColor.value || props.value || '';
    };

    const setColorValue = (value: string) => {
      currentColor.value = value;
      emit('update:value', value);
      emit('change', value);
    };

    const clearColor = () => {
      currentColor.value = '';
      emit('update:value', '');
      emit('change', '');
    };

    const isColorValid = (color: string) => {
      return /^#[0-9A-F]{6}$/i.test(color);
    };

    initializeComponent();

    return {
      currentColor,
      t,
      prefixCls,
      initializeColor,
      handleColorChange,
      handleChange,
      setupWatchEffect,
      setupWatchers,
      initializeComponent,
      getCurrentColor,
      setCurrentColor,
      getTranslations,
      getPrefixCls,
      validateColor,
      formatColor,
      resetColor,
      updateColorFromProps,
      getColorValue,
      setColorValue,
      clearColor,
      isColorValid,
    };
  };

  const {
    currentColor,
    t,
    prefixCls,
    initializeColor,
    handleColorChange,
    handleChange,
    setupWatchEffect,
    setupWatchers,
    initializeComponent,
    getCurrentColor,
    setCurrentColor,
    getTranslations,
    getPrefixCls,
    validateColor,
    formatColor,
    resetColor,
    updateColorFromProps,
    getColorValue,
    setColorValue,
    clearColor,
    isColorValid,
  } = setupComponent();
</script>

<style lang="less">
  @prefix-cls: ~'jeesite-color-picker';

  .@{prefix-cls} {
    .ant-input-group-addon {
      padding: 0 !important;
    }

    .ant3-color-picker {
      height: 31px;
      padding: 0;
      border: 0;
      display: block;

      .el-color-picker__color {
        border: 0;
      }

      .el-color-picker__color-inner {
        border: 0;
        border-radius: 0 6px 6px 0;
        line-height: 31px;
      }
    }
  }
</style>

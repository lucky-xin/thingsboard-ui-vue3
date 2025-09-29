<template>
  <Tooltip
    :overlay-class-name="`${prefixCls}__wrap`"
    :title="tooltipTitle"
    :auto-adjust-overflow="true"
    :overlay-style="overlayStyle"
    :placement="placement"
    :get-popup-container="getPopupContainer"
  >
    <span :class="prefixCls">
      <slot>
        <Icon icon="i-ant-design:question-circle-outlined" />
      </slot>
    </span>
  </Tooltip>
</template>

<script lang="ts">
  import type { CSSProperties, PropType } from 'vue';
  import { defineComponent, computed, unref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { getPopupContainer } from '/@/utils';
  import { isString, isArray } from '/@/utils/is';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { Icon } from '/@/components/Icon';

  const props = {
    /**
     * Help text max-width
     * @default: 600px
     */
    maxWidth: { type: String, default: '600px' },
    /**
     * Whether to display the serial number
     * @default: false
     */
    showIndex: { type: Boolean },
    /**
     * Help text font color
     * @default: #ffffff
     */
    color: { type: String, default: '#ffffff' },
    /**
     * Help text font size
     * @default: 14px
     */
    fontSize: { type: String, default: '14px' },
    /**
     * Help text list
     */
    placement: { type: String, default: 'right' },
    /**
     * Help text list
     */
    text: { type: [Array, String] as PropType<string[] | string> },
  };

  export default defineComponent({
    name: 'BasicHelp',
    components: { Icon, Tooltip },
    props,
    setup(props) {
      const { prefixCls } = useDesign('basic-help');

      const tooltipStyle = computed((): CSSProperties => ({ color: props.color, fontSize: props.fontSize }));

      const overlayStyle = computed((): CSSProperties => ({ maxWidth: props.maxWidth }));

      const tooltipTitle = computed(() => {
        const textList = props.text;

        if (isString(textList)) {
          return `<p>${textList}</p>`;
        }

        if (isArray(textList)) {
          return textList.map((text, index) => {
            const prefix = props.showIndex ? `${index + 1}. ` : '';
            return `<p>${prefix}${text}</p>`;
          }).join('');
        }
        return '';
      });

      return {
        prefixCls,
        tooltipStyle,
        overlayStyle,
        tooltipTitle,
        getPopupContainer,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'jeesite-basic-help';

  .@{prefix-cls} {
    display: inline-block;
    font-size: 13px;
    color: @text-color-help-dark;
    vertical-align: middle;
    cursor: pointer;

    &:hover {
      color: @primary-color;
    }

    &__wrap {
      p {
        margin-bottom: 0;
      }
    }
  }

  .ant-form-item-label .@{prefix-cls} {
    vertical-align: baseline;
    margin-left: -7px;
    margin-right: -4px;
    opacity: 0.8;
  }
</style>

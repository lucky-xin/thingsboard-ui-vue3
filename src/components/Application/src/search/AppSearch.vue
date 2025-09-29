<template>
  <div class="p-1" @click="changeModal(true)">
    <Tooltip>
      <template #title>{{ t('common.searchText') }}</template>
      <Icon icon="i-ant-design:search-outlined" />
    </Tooltip>
    <AppSearchModal :open="showModal" @close="changeModal(false)" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import AppSearchModal from './AppSearchModal.vue';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'AppSearch',
    components: {
      Tooltip,
      Icon,
      AppSearchModal,
    },
    setup() {
      const showModal = ref(false);
      const { t } = useI18n();

      function changeModal(show: boolean) {
        showModal.value = show;
      }

      return {
        showModal,
        t,
        changeModal,
      };
    },
  });
</script>

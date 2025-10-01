import { describe, it, expect, vi } from 'vitest';
import { ref, computed } from 'vue';

// Mock useDesign
vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: vi.fn(() => ({
    prefixCls: 'basic-table',
  })),
}));

// Mock useMessage
vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: vi.fn(() => ({
    createMessage: vi.fn(),
  })),
}));

// Mock useI18n
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: vi.fn(() => ({
    t: vi.fn((key: string) => key),
  })),
  t: vi.fn((key: string) => key), // Add global t export
}));

// Mock TableFooter
vi.mock('/@/components/Table/src/components/TableFooter.vue', () => ({
  default: {
    name: 'TableFooter',
  },
}));

// Mock useEventListener
vi.mock('/@/hooks/event/useEventListener', () => ({
  useEventListener: vi.fn(),
}));

describe('useTableFooter', () => {
  it('should export useTableFooter hook', async () => {
    const module = await import('/@/components/Table/src/hooks/useTableFooter');

    expect(module).toBeDefined();
    expect(module.useTableFooter).toBeDefined();
    expect(typeof module.useTableFooter).toBe('function');
  });

  it('should be a valid hook module', async () => {
    const module = await import('/@/components/Table/src/hooks/useTableFooter');

    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  it('should export table utilities', async () => {
    const module = await import('/@/components/Table/src/hooks/useTableFooter');

    // Check that module has exports
    const exportKeys = Object.keys(module);
    expect(exportKeys.length).toBeGreaterThan(0);
  });

  it('should return undefined footer props when showSummary is false', async () => {
    const { useTableFooter } = await import('/@/components/Table/src/hooks/useTableFooter');

    const propsRef = computed(() => ({
      showSummary: false,
      summaryFunc: undefined,
      summaryData: undefined,
    }));

    const scrollRef = computed(() => ({}));
    const tableRef = ref(null);
    const getDataSourceRef = ref([]);

    const { getFooterProps } = useTableFooter(propsRef, scrollRef, tableRef, getDataSourceRef);

    expect(getFooterProps.value).toBeUndefined();
  });

  it('should return footer props when showSummary is true and data is not empty', async () => {
    const { useTableFooter } = await import('/@/components/Table/src/hooks/useTableFooter');

    const propsRef = computed(() => ({
      showSummary: true,
      summaryFunc: vi.fn(),
      summaryData: [],
    }));

    const scrollRef = computed(() => ({}));
    const tableRef = ref({
      $el: {
        querySelector: vi.fn(() => ({
          scrollLeft: 0,
        })),
      },
    });
    const getDataSourceRef = ref([{ id: 1 }]);

    const { getFooterProps } = useTableFooter(propsRef, scrollRef, tableRef, getDataSourceRef);

    // Since showSummary is true and data is not empty, it should return a function
    expect(getFooterProps.value).toBeDefined();
    expect(typeof getFooterProps.value).toBe('function');
  });

  it('should return undefined footer props when data is empty', async () => {
    const { useTableFooter } = await import('/@/components/Table/src/hooks/useTableFooter');

    const propsRef = computed(() => ({
      showSummary: true,
      summaryFunc: vi.fn(),
      summaryData: [],
    }));

    const scrollRef = computed(() => ({}));
    const tableRef = ref(null);
    const getDataSourceRef = ref([]);

    const { getFooterProps } = useTableFooter(propsRef, scrollRef, tableRef, getDataSourceRef);

    expect(getFooterProps.value).toBeUndefined();
  });
});
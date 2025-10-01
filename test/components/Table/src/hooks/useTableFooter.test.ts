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

  it('should handle empty data source correctly', async () => {
    const { useTableFooter } = await import('/@/components/Table/src/hooks/useTableFooter');

    const propsRef = computed(() => ({
      showSummary: true,
      summaryFunc: vi.fn(),
      summaryData: [],
    }));

    const scrollRef = computed(() => ({}));
    const tableRef = ref({});
    const getDataSourceRef = ref([]);

    const { getFooterProps } = useTableFooter(propsRef, scrollRef, tableRef, getDataSourceRef);

    // When data is empty, should return undefined
    expect(getFooterProps.value).toBeUndefined();
  });

  it('should handle getDataSourceRef with undefined value', async () => {
    const { useTableFooter } = await import('/@/components/Table/src/hooks/useTableFooter');

    const propsRef = computed(() => ({
      showSummary: true,
      summaryFunc: vi.fn(),
      summaryData: [],
    }));

    const scrollRef = computed(() => ({}));
    const tableRef = ref(null);
    const getDataSourceRef = ref(undefined);

    const { getFooterProps } = useTableFooter(propsRef, scrollRef, tableRef, getDataSourceRef);

    // When getDataSourceRef is undefined, should return undefined
    expect(getFooterProps.value).toBeUndefined();
  });

  it('should handle scroll event when table element exists', async () => {
    const { useTableFooter } = await import('/@/components/Table/src/hooks/useTableFooter');
    const { useEventListener } = await import('/@/hooks/event/useEventListener');

    // Mock useEventListener to capture the listener function
    const mockUseEventListener = vi.mocked(useEventListener);
    mockUseEventListener.mockClear();

    const propsRef = computed(() => ({
      showSummary: true,
      summaryFunc: vi.fn(),
      summaryData: [],
    }));

    const scrollRef = computed(() => ({}));

    // Create a mock table element with querySelector methods
    const mockFooterElement = {
      scrollLeft: 0,
    };

    const mockBodyElement = {
      scrollLeft: 100,
    };

    const tableRef = ref({
      $el: {
        querySelector: vi.fn((selector) => {
          if (selector === '.ant-table-content') {
            return mockBodyElement;
          } else if (selector === '.ant-table-footer .ant-table-content') {
            return mockFooterElement;
          }
          return null;
        }),
      },
    });

    const getDataSourceRef = ref([{ id: 1 }]);

    useTableFooter(propsRef, scrollRef, tableRef, getDataSourceRef);

    // Wait for nextTick to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    // Check if useEventListener was called
    expect(mockUseEventListener).toHaveBeenCalled();

    // Get the listener function that was passed to useEventListener
    const callArgs = mockUseEventListener.mock.calls[0];
    const listener = callArgs[0].listener;

    // Call the listener function to test the scroll handling
    listener();

    // Check if the scrollLeft was updated
    expect(mockFooterElement.scrollLeft).toBe(100);
  });

  it('should handle scroll event when footer element is missing', async () => {
    const { useTableFooter } = await import('/@/components/Table/src/hooks/useTableFooter');
    const { useEventListener } = await import('/@/hooks/event/useEventListener');

    // Reset mock
    vi.clearAllMocks();

    const propsRef = computed(() => ({
      showSummary: true,
      summaryFunc: vi.fn(),
      summaryData: [],
    }));

    const scrollRef = computed(() => ({}));

    // Create a mock table element where footer element is missing
    const tableRef = ref({
      $el: {
        querySelector: vi.fn((selector) => {
          if (selector === '.ant-table-content') {
            return { scrollLeft: 100 };
          } else if (selector === '.ant-table-footer .ant-table-content') {
            return null; // Footer element is missing
          }
          return null;
        }),
      },
    });

    const getDataSourceRef = ref([{ id: 1 }]);

    useTableFooter(propsRef, scrollRef, tableRef, getDataSourceRef);

    // Wait for nextTick to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    // Check if useEventListener was called
    if (vi.mocked(useEventListener).mock.calls.length > 0) {
      // Get the listener function that was passed to useEventListener
      const callArgs = vi.mocked(useEventListener).mock.calls[0];
      const listener = callArgs[0].listener;

      // Call the listener function - should not throw an error
      expect(() => listener()).not.toThrow();
    }
  });

  it('should handle scroll event when body element is missing', async () => {
    const { useTableFooter } = await import('/@/components/Table/src/hooks/useTableFooter');
    const { useEventListener } = await import('/@/hooks/event/useEventListener');

    // Reset mock
    vi.clearAllMocks();

    const propsRef = computed(() => ({
      showSummary: true,
      summaryFunc: vi.fn(),
      summaryData: [],
    }));

    const scrollRef = computed(() => ({}));

    // Create a mock table element where body element is missing
    const mockFooterElement = {
      scrollLeft: 0,
    };

    const tableRef = ref({
      $el: {
        querySelector: vi.fn((selector) => {
          if (selector === '.ant-table-content') {
            return null; // Body element is missing
          } else if (selector === '.ant-table-footer .ant-table-content') {
            return mockFooterElement;
          }
          return null;
        }),
      },
    });

    const getDataSourceRef = ref([{ id: 1 }]);

    useTableFooter(propsRef, scrollRef, tableRef, getDataSourceRef);

    // Wait for nextTick to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    // Check if useEventListener was called
    if (vi.mocked(useEventListener).mock.calls.length > 0) {
      // Get the listener function that was passed to useEventListener
      const callArgs = vi.mocked(useEventListener).mock.calls[0];
      const listener = callArgs[0].listener;

      // Call the listener function - should not throw an error
      expect(() => listener()).not.toThrow();
    }
  });

  it('should not call useEventListener when tableEl is null', async () => {
    const { useTableFooter } = await import('/@/components/Table/src/hooks/useTableFooter');
    const { useEventListener } = await import('/@/hooks/event/useEventListener');

    // Reset mock
    vi.clearAllMocks();

    const propsRef = computed(() => ({
      showSummary: true,
      summaryFunc: vi.fn(),
      summaryData: [],
    }));

    const scrollRef = computed(() => ({}));
    const tableRef = ref(null); // Table element is null
    const getDataSourceRef = ref([{ id: 1 }]);

    useTableFooter(propsRef, scrollRef, tableRef, getDataSourceRef);

    // Wait for nextTick to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    // When tableEl is null, useEventListener should not be called
    expect(useEventListener).not.toHaveBeenCalled();
  });

  it('should call useEventListener with null el when bodyDom is null', async () => {
    const { useTableFooter } = await import('/@/components/Table/src/hooks/useTableFooter');
    const { useEventListener } = await import('/@/hooks/event/useEventListener');

    // Reset mock
    vi.clearAllMocks();

    const propsRef = computed(() => ({
      showSummary: true,
      summaryFunc: vi.fn(),
      summaryData: [],
    }));

    const scrollRef = computed(() => ({}));

    // Create a mock table element where bodyDom is null
    const tableRef = ref({
      $el: {
        querySelector: vi.fn((selector) => {
          if (selector === '.ant-table-content') {
            return null; // Body element is null
          }
          return { scrollLeft: 0 };
        }),
      },
    });

    const getDataSourceRef = ref([{ id: 1 }]);

    useTableFooter(propsRef, scrollRef, tableRef, getDataSourceRef);

    // Wait for nextTick to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    // When bodyDom is null, useEventListener should still be called but with null el
    expect(useEventListener).toHaveBeenCalled();

    // Get the call args and check that el is null
    const callArgs = vi.mocked(useEventListener).mock.calls[0];
    expect(callArgs[0].el).toBeNull();
  });
});
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, computed } from 'vue';
import { useTableScroll } from '/@/components/Table/src/hooks/useTableScroll';
import type { BasicTableProps, TableRowSelection, BasicColumn } from '/@/components/Table/src/types/table';

// Mock dependencies
vi.mock('/@/utils/domUtils', () => ({
  getViewportOffset: vi.fn(() => ({ bottomIncludeBody: 500 })),
}));

vi.mock('/@/utils/is', () => ({
  isBoolean: vi.fn(),
}));

vi.mock('/@/hooks/event/useWindowSizeFn', () => ({
  useWindowSizeFn: vi.fn(),
}));

vi.mock('/@/components/Modal', () => ({
  useModalContext: vi.fn(() => ({
    redoModalHeight: vi.fn(),
  })),
}));

vi.mock('/@/hooks/core/onMountedOrActivated', () => ({
  onMountedOrActivated: vi.fn(),
}));

vi.mock('@vueuse/core', () => ({
  useDebounceFn: vi.fn((fn) => fn),
  useResizeObserver: vi.fn(),
  useScroll: vi.fn(() => ({
    refY: ref(0),
  })),
}));

vi.mock('/@/hooks/event/useScroll', () => ({
  useScroll: vi.fn(() => ({
    refY: ref(0),
  })),
}));

describe('useTableScroll', () => {
  let propsRef: any;
  let tableRef: any;
  let columnsRef: any;
  let rowSelectionRef: any;
  let getDataSourceRef: any;
  let wrapRef: any;
  let formRef: any;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock props
    propsRef = computed(() => ({
      canResize: true,
      scroll: {},
      resizeHeightOffset: 0,
      pagination: true,
      maxHeight: 1000,
      minHeight: 100,
      isCanResizeParent: false,
      useSearchForm: true,
    }));

    // Mock table ref
    tableRef = ref({
      $el: {
        classList: {
          contains: vi.fn(() => false),
          add: vi.fn(),
          remove: vi.fn(),
        },
        querySelector: vi.fn(),
        closest: vi.fn(),
        offsetHeight: 100,
        offsetWidth: 800,
      },
    });

    // Mock columns
    columnsRef = computed(() => [
      { width: '100px', defaultHidden: false },
      { width: '200px', defaultHidden: false },
      { defaultHidden: true },
    ]);

    // Mock row selection
    rowSelectionRef = computed(() => null);

    // Mock data source
    getDataSourceRef = ref([
      { id: 1, name: 'Test 1' },
      { id: 2, name: 'Test 2' },
    ]);

    // Mock wrap ref
    wrapRef = ref({
      offsetHeight: 600,
    });

    // Mock form ref
    formRef = ref({
      $el: {
        offsetHeight: 50,
      },
    });
  });

  describe('Basic functionality', () => {
    it('should return getScrollRef and redoHeight', () => {
      const result = useTableScroll(
        propsRef,
        tableRef,
        columnsRef,
        rowSelectionRef,
        getDataSourceRef,
        wrapRef,
        formRef,
      );

      expect(result).toHaveProperty('getScrollRef');
      expect(result).toHaveProperty('redoHeight');
      expect(typeof result.redoHeight).toBe('function');
    });

    it('should calculate scroll ref with basic props', () => {
      const { getScrollRef } = useTableScroll(
        propsRef,
        tableRef,
        columnsRef,
        rowSelectionRef,
        getDataSourceRef,
        wrapRef,
        formRef,
      );

      expect(getScrollRef.value).toHaveProperty('x');
      expect(getScrollRef.value).toHaveProperty('y');
      expect(getScrollRef.value).toHaveProperty('scrollToFirstRowOnChange');
    });
  });

  describe('getCanResize computed', () => {
    it('should return true when canResize is true and no scroll.y', () => {
      propsRef = computed(() => ({
        canResize: true,
        scroll: {},
      }));

      const { getScrollRef } = useTableScroll(
        propsRef,
        tableRef,
        columnsRef,
        rowSelectionRef,
        getDataSourceRef,
        wrapRef,
        formRef,
      );

      expect(getScrollRef.value.y).toBeDefined();
    });

    it('should return false when canResize is false', () => {
      propsRef = computed(() => ({
        canResize: false,
        scroll: {},
      }));

      const { getScrollRef } = useTableScroll(
        propsRef,
        tableRef,
        columnsRef,
        rowSelectionRef,
        getDataSourceRef,
        wrapRef,
        formRef,
      );

      expect(getScrollRef.value.y).toBeUndefined();
    });

    it('should return false when scroll.y exists', () => {
      propsRef = computed(() => ({
        canResize: true,
        scroll: { y: 400 },
      }));

      const { getScrollRef } = useTableScroll(
        propsRef,
        tableRef,
        columnsRef,
        rowSelectionRef,
        getDataSourceRef,
        wrapRef,
        formRef,
      );

      expect(getScrollRef.value.y).toBe(400);
    });
  });

  describe('calcTableHeight', () => {
    it('should handle table element not found', () => {
      tableRef.value = null;

      const { redoHeight } = useTableScroll(
        propsRef,
        tableRef,
        columnsRef,
        rowSelectionRef,
        getDataSourceRef,
        wrapRef,
        formRef,
      );

      expect(() => redoHeight()).not.toThrow();
    });

    it('should handle table element without $el', () => {
      tableRef.value = {};

      const { redoHeight } = useTableScroll(
        propsRef,
        tableRef,
        columnsRef,
        rowSelectionRef,
        getDataSourceRef,
        wrapRef,
        formRef,
      );

      expect(() => redoHeight()).not.toThrow();
    });

    it('should handle body element not found', () => {
      const mockQuerySelector = vi.fn((selector) => {
        if (selector === '.ant-table-body') return null;
        return { style: { display: 'flex' } };
      });

      tableRef.value = {
        $el: {
          classList: {
            contains: vi.fn(() => false),
            add: vi.fn(),
            remove: vi.fn(),
          },
          querySelector: mockQuerySelector,
          closest: vi.fn(),
          offsetHeight: 100,
          offsetWidth: 800,
        },
      };

      const { redoHeight } = useTableScroll(
        propsRef,
        tableRef,
        columnsRef,
        rowSelectionRef,
        getDataSourceRef,
        wrapRef,
        formRef,
      );

      expect(() => redoHeight()).not.toThrow();
    });

    it('should handle head element not found', () => {
      const mockQuerySelector = vi.fn((selector) => {
        if (selector === '.ant-table-thead') return null;
        if (selector === '.ant-table-body') return {
          scrollHeight: 200,
          clientHeight: 100,
          scrollWidth: 200,
          clientWidth: 100,
          style: {},
          scrollTop: 0,
        };
        return { style: { display: 'flex' } };
      });

      tableRef.value = {
        $el: {
          classList: {
            contains: vi.fn(() => false),
            add: vi.fn(),
            remove: vi.fn(),
          },
          querySelector: mockQuerySelector,
          closest: vi.fn(),
          offsetHeight: 100,
          offsetWidth: 800,
        },
      };

      const { redoHeight } = useTableScroll(
        propsRef,
        tableRef,
        columnsRef,
        rowSelectionRef,
        getDataSourceRef,
        wrapRef,
        formRef,
      );

      expect(() => redoHeight()).not.toThrow();
    });

    it('should handle pagination element', () => {
      const mockQuerySelector = vi.fn((selector) => {
        if (selector === '.ant-pagination') return { style: {} };
        if (selector === '.ant-table-body') return {
          scrollHeight: 200,
          clientHeight: 100,
          scrollWidth: 200,
          clientWidth: 100,
          style: {},
          scrollTop: 0,
        };
        if (selector === '.ant-table-thead') return { offsetHeight: 50 };
        return null;
      });

      tableRef.value = {
        $el: {
          classList: {
            contains: vi.fn(() => false),
            add: vi.fn(),
            remove: vi.fn(),
          },
          querySelector: mockQuerySelector,
          closest: vi.fn(),
          offsetHeight: 100,
          offsetWidth: 800,
        },
      };

      const { redoHeight } = useTableScroll(
        propsRef,
        tableRef,
        columnsRef,
        rowSelectionRef,
        getDataSourceRef,
        wrapRef,
        formRef,
      );

      expect(() => redoHeight()).not.toThrow();
    });

    it('should handle scrollbar visibility', () => {
      const mockQuerySelector = vi.fn((selector) => {
        if (selector === '.ant-table-body') return {
          scrollHeight: 200,
          clientHeight: 100,
          scrollWidth: 200,
          clientWidth: 100,
          style: {},
          scrollTop: 0,
        };
        if (selector === '.ant-table-thead') return { offsetHeight: 50 };
        return null;
      });

      const mockClassList = {
        contains: vi.fn(() => false),
        add: vi.fn(),
        remove: vi.fn(),
      };

      tableRef.value = {
        $el: {
          classList: mockClassList,
          querySelector: mockQuerySelector,
          closest: vi.fn(),
          offsetHeight: 100,
          offsetWidth: 800,
        },
      };

      const { redoHeight } = useTableScroll(
        propsRef,
        tableRef,
        columnsRef,
        rowSelectionRef,
        getDataSourceRef,
        wrapRef,
        formRef,
      );

      expect(() => redoHeight()).not.toThrow();
    });

    it('should handle footer elements', async () => {
      const { isBoolean } = await import('/@/utils/is');
      vi.mocked(isBoolean).mockReturnValue(false);

      const mockQuerySelector = vi.fn((selector) => {
        if (selector === '.ant-table-body') return {
          scrollHeight: 200,
          clientHeight: 100,
          scrollWidth: 200,
          clientWidth: 100,
          style: {},
          scrollTop: 0,
        };
        if (selector === '.ant-table-thead') return { offsetHeight: 50 };
        if (selector === '.ant-table-footer') return { offsetHeight: 30 };
        if (selector === '.ant-table-summary') return { offsetHeight: 20 };
        return null;
      });

      tableRef.value = {
        $el: {
          classList: {
            contains: vi.fn(() => false),
            add: vi.fn(),
            remove: vi.fn(),
          },
          querySelector: mockQuerySelector,
          closest: vi.fn(),
          offsetHeight: 100,
          offsetWidth: 800,
        },
      };

      const { redoHeight } = useTableScroll(
        propsRef,
        tableRef,
        columnsRef,
        rowSelectionRef,
        getDataSourceRef,
        wrapRef,
        formRef,
      );

      expect(() => redoHeight()).not.toThrow();
    });

    it('should handle isCanResizeParent true', () => {
      propsRef = computed(() => ({
        canResize: true,
        scroll: {},
        resizeHeightOffset: 0,
        pagination: true,
        maxHeight: 1000,
        minHeight: 100,
        isCanResizeParent: true,
        useSearchForm: true,
      }));

      const mockQuerySelector = vi.fn((selector) => {
        if (selector === '.ant-table-body') return {
          scrollHeight: 200,
          clientHeight: 100,
          scrollWidth: 200,
          clientWidth: 100,
          style: {},
          scrollTop: 0,
        };
        if (selector === '.ant-table-thead') return { offsetHeight: 50 };
        if (selector === '.ant-table-title') return { offsetHeight: 40 };
        return null;
      });

      tableRef.value = {
        $el: {
          classList: {
            contains: vi.fn(() => false),
            add: vi.fn(),
            remove: vi.fn(),
          },
          querySelector: mockQuerySelector,
          closest: vi.fn(),
          offsetHeight: 100,
          offsetWidth: 800,
        },
      };

      const { redoHeight } = useTableScroll(
        propsRef,
        tableRef,
        columnsRef,
        rowSelectionRef,
        getDataSourceRef,
        wrapRef,
        formRef,
      );

      expect(() => redoHeight()).not.toThrow();
    });

    it('should handle empty data source', () => {
      getDataSourceRef.value = [];

      const mockQuerySelector = vi.fn((selector) => {
        if (selector === '.ant-table-body') return {
          scrollHeight: 200,
          clientHeight: 100,
          scrollWidth: 200,
          clientWidth: 100,
          style: {},
          scrollTop: 0,
        };
        if (selector === '.ant-table-thead') return { offsetHeight: 50 };
        if (selector === '.ant-table-expanded-row-fixed') return { style: {} };
        return null;
      });

      tableRef.value = {
        $el: {
          classList: {
            contains: vi.fn(() => false),
            add: vi.fn(),
            remove: vi.fn(),
          },
          querySelector: mockQuerySelector,
          closest: vi.fn(),
          offsetHeight: 100,
          offsetWidth: 800,
        },
      };

      const { redoHeight } = useTableScroll(
        propsRef,
        tableRef,
        columnsRef,
        rowSelectionRef,
        getDataSourceRef,
        wrapRef,
        formRef,
      );

      expect(() => redoHeight()).not.toThrow();
    });

    it('should handle minHeight constraint', () => {
      propsRef = computed(() => ({
        canResize: true,
        scroll: {},
        resizeHeightOffset: 0,
        pagination: true,
        maxHeight: 1000,
        minHeight: 500,
        isCanResizeParent: false,
        useSearchForm: true,
      }));

      const mockQuerySelector = vi.fn((selector) => {
        if (selector === '.ant-table-body') return {
          scrollHeight: 200,
          clientHeight: 100,
          scrollWidth: 200,
          clientWidth: 100,
          style: {},
          scrollTop: 0,
        };
        if (selector === '.ant-table-thead') return { offsetHeight: 50 };
        return null;
      });

      tableRef.value = {
        $el: {
          classList: {
            contains: vi.fn(() => false),
            add: vi.fn(),
            remove: vi.fn(),
          },
          querySelector: mockQuerySelector,
          closest: vi.fn(),
          offsetHeight: 100,
          offsetWidth: 800,
        },
      };

      const { redoHeight } = useTableScroll(
        propsRef,
        tableRef,
        columnsRef,
        rowSelectionRef,
        getDataSourceRef,
        wrapRef,
        formRef,
      );

      expect(() => redoHeight()).not.toThrow();
    });

    it('should handle maxHeight constraint', () => {
      propsRef = computed(() => ({
        canResize: true,
        scroll: {},
        resizeHeightOffset: 0,
        pagination: true,
        maxHeight: 200,
        minHeight: 100,
        isCanResizeParent: false,
        useSearchForm: true,
      }));

      const mockQuerySelector = vi.fn((selector) => {
        if (selector === '.ant-table-body') return {
          scrollHeight: 200,
          clientHeight: 100,
          scrollWidth: 200,
          clientWidth: 100,
          style: {},
          scrollTop: 0,
        };
        if (selector === '.ant-table-thead') return { offsetHeight: 50 };
        return null;
      });

      tableRef.value = {
        $el: {
          classList: {
            contains: vi.fn(() => false),
            add: vi.fn(),
            remove: vi.fn(),
          },
          querySelector: mockQuerySelector,
          closest: vi.fn(),
          offsetHeight: 100,
          offsetWidth: 800,
        },
      };

      const { redoHeight } = useTableScroll(
        propsRef,
        tableRef,
        columnsRef,
        rowSelectionRef,
        getDataSourceRef,
        wrapRef,
        formRef,
      );

      expect(() => redoHeight()).not.toThrow();
    });
  });

  describe('redoTableWidth', () => {
    it('should calculate table width', () => {
      const { getScrollRef } = useTableScroll(
        propsRef,
        tableRef,
        columnsRef,
        rowSelectionRef,
        getDataSourceRef,
        wrapRef,
        formRef,
      );

      expect(getScrollRef.value).toHaveProperty('x');
    });

    it('should handle table ref without $el', () => {
      tableRef.value = {};

      const { getScrollRef } = useTableScroll(
        propsRef,
        tableRef,
        columnsRef,
        rowSelectionRef,
        getDataSourceRef,
        wrapRef,
        formRef,
      );

      expect(getScrollRef.value).toHaveProperty('x');
    });
  });

  describe('getScrollRef computed', () => {
    it('should calculate width from columns', () => {
      columnsRef = computed(() => [
        { width: '100px', defaultHidden: false },
        { width: '200px', defaultHidden: false },
        { width: '150px', defaultHidden: false },
      ]);

      const { getScrollRef } = useTableScroll(
        propsRef,
        tableRef,
        columnsRef,
        rowSelectionRef,
        getDataSourceRef,
        wrapRef,
        formRef,
      );

      expect(getScrollRef.value).toHaveProperty('x');
    });

    it('should handle columns without width', () => {
      columnsRef = computed(() => [
        { defaultHidden: false },
        { defaultHidden: false },
      ]);

      const { getScrollRef } = useTableScroll(
        propsRef,
        tableRef,
        columnsRef,
        rowSelectionRef,
        getDataSourceRef,
        wrapRef,
        formRef,
      );

      expect(getScrollRef.value).toHaveProperty('x');
    });

    it('should handle hidden columns', () => {
      columnsRef = computed(() => [
        { width: '100px', defaultHidden: true },
        { width: '200px', defaultHidden: false },
      ]);

      const { getScrollRef } = useTableScroll(
        propsRef,
        tableRef,
        columnsRef,
        rowSelectionRef,
        getDataSourceRef,
        wrapRef,
        formRef,
      );

      expect(getScrollRef.value).toHaveProperty('x');
    });

    it('should handle scroll prop override', () => {
      propsRef = computed(() => ({
        canResize: true,
        scroll: { x: 1000, y: 500 },
        resizeHeightOffset: 0,
        pagination: true,
        maxHeight: 1000,
        minHeight: 100,
        isCanResizeParent: false,
        useSearchForm: true,
      }));

      const { getScrollRef } = useTableScroll(
        propsRef,
        tableRef,
        columnsRef,
        rowSelectionRef,
        getDataSourceRef,
        wrapRef,
        formRef,
      );

      expect(getScrollRef.value.x).toBe(1000);
      expect(getScrollRef.value.y).toBe(500);
    });
  });
});

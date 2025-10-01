import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, computed } from 'vue';
import * as module from '/@/components/Table/src/hooks/usePagination';

// Mock dependencies
vi.mock('/@/utils/is', () => ({
  isBoolean: vi.fn((val) => typeof val === 'boolean'),
}));

vi.mock('/@/components/Table/src/const', () => ({
  PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: ['10', '20', '50', '100'],
}));

vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: vi.fn((key, params) => {
      if (key === 'component.table.total') {
        return `Total ${params.total} items`;
      }
      return key;
    }),
  }),
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

describe('usePagination', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should export usePagination hook', async () => {
    const module = await import('/@/components/Table/src/hooks/usePagination');

    expect(module).toBeDefined();
    expect(module.usePagination).toBeDefined();
    expect(typeof module.usePagination).toBe('function');
  });

  it('should be a valid hook module', async () => {
    const module = await import('/@/components/Table/src/hooks/usePagination');

    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  it('should export additional utilities', async () => {
    const module = await import('/@/components/Table/src/hooks/usePagination');

    // Check that module has exports
    const exportKeys = Object.keys(module);
    expect(exportKeys.length).toBeGreaterThan(0);
  });

  it('should return correct functions and properties', () => {
    const refProps = computed(() => ({}));

    const result = module.usePagination(refProps);

    expect(result).toHaveProperty('getPagination');
    expect(result).toHaveProperty('getPaginationInfo');
    expect(result).toHaveProperty('setShowPagination');
    expect(result).toHaveProperty('getShowPagination');
    expect(result).toHaveProperty('setPagination');

    expect(typeof result.getPagination).toBe('function');
    expect(typeof result.getPaginationInfo).toBe('object');
    expect(typeof result.setShowPagination).toBe('function');
    expect(typeof result.getShowPagination).toBe('function');
    expect(typeof result.setPagination).toBe('function');
  });

  it('should handle pagination with default values', () => {
    const refProps = computed(() => ({}));

    const { getPaginationInfo } = module.usePagination(refProps);

    const paginationInfo = getPaginationInfo.value;
    expect(paginationInfo).toBeDefined();
    expect(paginationInfo).not.toBe(false);
    expect(typeof paginationInfo).toBe('object');

    if (typeof paginationInfo === 'object' && paginationInfo !== null) {
      expect(paginationInfo.current).toBe(1);
      expect(paginationInfo.size).toBe('small');
      expect(paginationInfo.defaultPageSize).toBe(10);
      expect(paginationInfo.showSizeChanger).toBe(true);
      expect(paginationInfo.pageSizeOptions).toEqual(['10', '20', '50', '100']);
      expect(paginationInfo.showQuickJumper).toBe(true);
    }
  });

  it('should handle pagination with custom config', () => {
    const refProps = computed(() => ({
      pagination: {
        current: 2,
        pageSize: 20,
        showSizeChanger: false,
      },
    }));

    const { getPaginationInfo } = module.usePagination(refProps);

    const paginationInfo = getPaginationInfo.value;
    expect(paginationInfo).toBeDefined();
    expect(paginationInfo).not.toBe(false);
    expect(typeof paginationInfo).toBe('object');

    if (typeof paginationInfo === 'object' && paginationInfo !== null) {
      expect(paginationInfo.current).toBe(2);
      expect(paginationInfo.pageSize).toBe(20);
      expect(paginationInfo.showSizeChanger).toBe(false);
    }
  });

  it('should handle pagination disabled', () => {
    const refProps = computed(() => ({
      pagination: false,
    }));

    const { getPaginationInfo } = module.usePagination(refProps);

    const paginationInfo = getPaginationInfo.value;
    expect(paginationInfo).toBe(false);
  });

  it('should handle setShowPagination correctly', () => {
    const refProps = computed(() => ({}));

    const { getShowPagination, setShowPagination, getPaginationInfo } = module.usePagination(refProps);

    // Initially should show pagination
    expect(getShowPagination()).toBe(true);
    expect(getPaginationInfo.value).not.toBe(false);

    // Hide pagination
    setShowPagination(false);
    expect(getShowPagination()).toBe(false);
    expect(getPaginationInfo.value).toBe(false);

    // Show pagination again
    setShowPagination(true);
    expect(getShowPagination()).toBe(true);
    expect(getPaginationInfo.value).not.toBe(false);
  });

  it('should handle setPagination correctly', () => {
    const refProps = computed(() => ({}));

    const { getPagination, setPagination } = module.usePagination(refProps);

    // Get initial pagination
    const initialPagination = getPagination();
    expect(initialPagination).toBeDefined();
    expect(initialPagination).not.toBe(false);

    // Set new pagination config
    setPagination({
      current: 3,
      pageSize: 30,
    });

    // Get updated pagination
    const updatedPagination = getPagination();
    expect(updatedPagination).toBeDefined();
    expect(updatedPagination).not.toBe(false);

    if (typeof updatedPagination === 'object' && updatedPagination !== null) {
      expect(updatedPagination.current).toBe(3);
      expect(updatedPagination.pageSize).toBe(30);
    }
  });

  it('should handle pagination with total items', () => {
    const refProps = computed(() => ({
      pagination: {
        total: 100,
      },
    }));

    const { getPaginationInfo } = module.usePagination(refProps);

    const paginationInfo = getPaginationInfo.value;
    expect(paginationInfo).toBeDefined();
    expect(paginationInfo).not.toBe(false);
    expect(typeof paginationInfo).toBe('object');

    if (typeof paginationInfo === 'object' && paginationInfo !== null && 'total' in paginationInfo) {
      expect(paginationInfo.total).toBe(100);
    }
  });

  it('should handle pagination config changes via watch', async () => {
    const paginationConfig = ref({
      pagination: {
        current: 1,
        pageSize: 10,
      },
    });

    const refProps = computed(() => paginationConfig.value);

    const { getPaginationInfo } = module.usePagination(refProps);

    // Initial pagination
    let paginationInfo = getPaginationInfo.value;
    expect(paginationInfo).toBeDefined();
    expect(paginationInfo).not.toBe(false);

    if (typeof paginationInfo === 'object' && paginationInfo !== null) {
      expect(paginationInfo.current).toBe(1);
      expect(paginationInfo.pageSize).toBe(10);
    }

    // Update pagination config
    paginationConfig.value = {
      pagination: {
        current: 2,
        pageSize: 20,
      },
    };

    // Wait for next tick to allow watchers to run
    await new Promise(resolve => setTimeout(resolve, 0));

    // Updated pagination
    paginationInfo = getPaginationInfo.value;
    expect(paginationInfo).toBeDefined();
    expect(paginationInfo).not.toBe(false);

    if (typeof paginationInfo === 'object' && paginationInfo !== null) {
      expect(paginationInfo.current).toBe(2);
      expect(paginationInfo.pageSize).toBe(20);
    }
  });

  it('should handle showTotal function correctly', () => {
    const refProps = computed(() => ({
      pagination: {
        total: 150,
      },
    }));

    const { getPaginationInfo } = module.usePagination(refProps);

    const paginationInfo = getPaginationInfo.value;
    expect(paginationInfo).toBeDefined();
    expect(paginationInfo).not.toBe(false);
    expect(typeof paginationInfo).toBe('object');

    if (typeof paginationInfo === 'object' && paginationInfo !== null && 'showTotal' in paginationInfo) {
      const showTotal = paginationInfo.showTotal as (total: number) => string;
      expect(typeof showTotal).toBe('function');
      const result = showTotal(150);
      expect(result).toBe('Total 150 items');
    }
  });
});
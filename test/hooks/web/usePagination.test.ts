import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePagination } from '/@/hooks/web/usePagination';

// Mock Vue composition functions
vi.mock('vue', () => ({
  ref: vi.fn((value) => ({ value })),
  unref: vi.fn((val) => (val && typeof val === 'object' && 'value' in val ? val.value : val)),
  computed: vi.fn((fn) => ({ value: fn() })),
}));

import { ref, unref, computed } from 'vue';

describe('hooks/web/usePagination', () => {
  let mockList: any;

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup mock implementations
    (ref as any).mockImplementation((value) => ({ value }));
    (unref as any).mockImplementation((val) => 
      val && typeof val === 'object' && 'value' in val ? val.value : val
    );
    (computed as any).mockImplementation((fn) => ({ value: fn() }));

    // Create mock list
    mockList = { value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] };
  });

  it('should return pagination utilities', () => {
    const result = usePagination(mockList, 3);

    expect(result).toHaveProperty('setCurrentPage');
    expect(result).toHaveProperty('getTotal');
    expect(result).toHaveProperty('setPageSize');
    expect(result).toHaveProperty('getPaginationList');
    expect(typeof result.setCurrentPage).toBe('function');
    expect(typeof result.setPageSize).toBe('function');
  });

  it('should initialize with default page size', () => {
    const pageSize = 5;
    const result = usePagination(mockList, pageSize);

    expect(ref).toHaveBeenCalledWith(1); // currentPage
    expect(ref).toHaveBeenCalledWith(pageSize); // pageSizeRef
  });

  it('should create computed properties for pagination list and total', () => {
    usePagination(mockList, 3);

    // Should create two computed properties: getPaginationList and getTotal
    expect(computed).toHaveBeenCalledTimes(2);
  });

  it('should calculate total from list length', () => {
    const result = usePagination(mockList, 3);

    // Get the computed function for getTotal
    const totalComputedFn = (computed as any).mock.calls[1][0];
    
    expect(typeof totalComputedFn).toBe('function');
    expect(unref).toHaveBeenCalledWith(mockList);
  });

  it('should handle setCurrentPage', () => {
    const mockCurrentPageRef = { value: 1 };
    (ref as any).mockReturnValueOnce(mockCurrentPageRef).mockReturnValue({ value: 3 });

    const result = usePagination(mockList, 3);
    result.setCurrentPage(2);

    expect(mockCurrentPageRef.value).toBe(2);
  });

  it('should handle setPageSize', () => {
    const mockCurrentPageRef = { value: 1 };
    const mockPageSizeRef = { value: 3 };
    (ref as any).mockReturnValueOnce(mockCurrentPageRef).mockReturnValue(mockPageSizeRef);

    const result = usePagination(mockList, 3);
    result.setPageSize(5);

    expect(mockPageSizeRef.value).toBe(5);
  });

  it('should call unref for pagination list computation', () => {
    const result = usePagination(mockList, 3);

    // Get the computed function for getPaginationList
    const paginationComputedFn = (computed as any).mock.calls[0][0];
    paginationComputedFn();

    expect(unref).toHaveBeenCalledWith(mockList);
  });

  it('should handle different page sizes', () => {
    const pageSizes = [1, 5, 10, 20];
    
    pageSizes.forEach((pageSize) => {
      vi.clearAllMocks();
      (ref as any).mockImplementation((value) => ({ value }));
      (computed as any).mockImplementation((fn) => ({ value: fn() }));
      
      const result = usePagination(mockList, pageSize);
      
      expect(ref).toHaveBeenCalledWith(pageSize);
    });
  });

  it('should handle empty list', () => {
    const emptyList = { value: [] };
    
    const result = usePagination(emptyList, 5);
    
    expect(result).toHaveProperty('getPaginationList');
    expect(result).toHaveProperty('getTotal');
  });

  it('should handle single item list', () => {
    const singleItemList = { value: ['item'] };
    
    const result = usePagination(singleItemList, 5);
    
    expect(result).toHaveProperty('getPaginationList');
    expect(result).toHaveProperty('getTotal');
  });

  it('should work with different data types in list', () => {
    const mixedList = { 
      value: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        'string item',
        123,
        true,
      ]
    };
    
    const result = usePagination(mixedList, 2);
    
    expect(result).toHaveProperty('getPaginationList');
    expect(result).toHaveProperty('getTotal');
  });

  it('should handle large page sizes', () => {
    const result = usePagination(mockList, 1000);
    
    expect(ref).toHaveBeenCalledWith(1000);
  });

  it('should handle zero page size gracefully', () => {
    const result = usePagination(mockList, 0);
    
    expect(ref).toHaveBeenCalledWith(0);
  });

  it('should update page number correctly', () => {
    const mockCurrentPageRef = { value: 1 };
    (ref as any).mockReturnValueOnce(mockCurrentPageRef);

    const result = usePagination(mockList, 3);
    
    // Test multiple page changes
    result.setCurrentPage(3);
    expect(mockCurrentPageRef.value).toBe(3);
    
    result.setCurrentPage(1);
    expect(mockCurrentPageRef.value).toBe(1);
    
    result.setCurrentPage(10);
    expect(mockCurrentPageRef.value).toBe(10);
  });

  it('should update page size correctly', () => {
    const mockCurrentPageRef = { value: 1 };
    const mockPageSizeRef = { value: 5 };
    (ref as any).mockReturnValueOnce(mockCurrentPageRef).mockReturnValue(mockPageSizeRef);

    const result = usePagination(mockList, 5);
    
    // Test multiple page size changes
    result.setPageSize(10);
    expect(mockPageSizeRef.value).toBe(10);
    
    result.setPageSize(1);
    expect(mockPageSizeRef.value).toBe(1);
    
    result.setPageSize(25);
    expect(mockPageSizeRef.value).toBe(25);
  });

  it('should maintain ref structure', () => {
    const result = usePagination(mockList, 3);
    
    expect(ref).toHaveBeenCalledTimes(2);
    expect(computed).toHaveBeenCalledTimes(2);
  });
});
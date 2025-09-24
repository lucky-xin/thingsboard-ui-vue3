import { describe, it, expect } from 'vitest';
import { ref } from 'vue';
import { usePagination } from '/@/hooks/web/usePagination';

describe('usePagination', () => {
  it('should create pagination with correct initial state', () => {
    const list = ref([1, 2, 3, 4, 5]);
    const pageSize = 2;
    const { setCurrentPage, getTotal, setPageSize, getPaginationList } = usePagination(list, pageSize);

    expect(getTotal.value).toBe(5);
    expect(getPaginationList.value).toEqual([1, 2]);
    expect(setCurrentPage).toBeInstanceOf(Function);
    expect(setPageSize).toBeInstanceOf(Function);
  });

  it('should paginate correctly with first page', () => {
    const list = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const pageSize = 3;
    const { getPaginationList } = usePagination(list, pageSize);

    expect(getPaginationList.value).toEqual([1, 2, 3]);
  });

  it('should paginate correctly with second page', () => {
    const list = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const pageSize = 3;
    const { setCurrentPage, getPaginationList } = usePagination(list, pageSize);

    setCurrentPage(2);
    expect(getPaginationList.value).toEqual([4, 5, 6]);
  });

  it('should paginate correctly with last page', () => {
    const list = ref([1, 2, 3, 4, 5]);
    const pageSize = 2;
    const { setCurrentPage, getPaginationList } = usePagination(list, pageSize);

    setCurrentPage(3);
    expect(getPaginationList.value).toEqual([5]);
  });

  it('should handle empty list', () => {
    const list = ref([]);
    const pageSize = 2;
    const { getTotal, getPaginationList } = usePagination(list, pageSize);

    expect(getTotal.value).toBe(0);
    expect(getPaginationList.value).toEqual([]);
  });

  it('should handle list smaller than page size', () => {
    const list = ref([1, 2]);
    const pageSize = 5;
    const { getTotal, getPaginationList } = usePagination(list, pageSize);

    expect(getTotal.value).toBe(2);
    expect(getPaginationList.value).toEqual([1, 2]);
  });

  it('should change page size', () => {
    const list = ref([1, 2, 3, 4, 5, 6, 7, 8]);
    const pageSize = 2;
    const { setPageSize, getPaginationList } = usePagination(list, pageSize);

    expect(getPaginationList.value).toEqual([1, 2]);

    setPageSize(4);
    expect(getPaginationList.value).toEqual([1, 2, 3, 4]);
  });

  it('should handle page size larger than list', () => {
    const list = ref([1, 2, 3]);
    const pageSize = 2;
    const { setCurrentPage, setPageSize, getPaginationList } = usePagination(list, pageSize);

    setCurrentPage(2);
    expect(getPaginationList.value).toEqual([3]);

    setPageSize(10);
    // When page size is increased, we're still on page 2, so we get items from offset (2-1)*10 = 10
    // Since the list only has 3 items, and we start from index 10, we get an empty array
    expect(getPaginationList.value).toEqual([]);
  });
});

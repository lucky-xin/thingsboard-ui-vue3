import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, nextTick } from 'vue';
import { useMenuSearch } from '/@/components/Application/src/search/useMenuSearch';
import type { SearchResult } from '/@/components/Application/src/search/useMenuSearch';

// Mock dependencies
vi.mock('/@/router/menus', () => ({
  getMenus: vi.fn(() => Promise.resolve([
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: 'dashboard',
      hideMenu: false,
      children: [],
      meta: {}
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: 'settings',
      hideMenu: false,
      children: [
        {
          name: 'User Settings',
          path: '/settings/user',
          icon: 'user',
          hideMenu: false,
          children: [],
          meta: {}
        }
      ],
      meta: {}
    }
  ]))
}));

vi.mock('lodash-es', () => ({
  cloneDeep: vi.fn((obj) => JSON.parse(JSON.stringify(obj)))
}));

vi.mock('/@/utils/helper/treeHelper', () => ({
  filter: vi.fn((arr, fn) => arr.filter(fn)),
  forEach: vi.fn((arr, fn) => arr.forEach(fn))
}));

vi.mock('/@/hooks/web/usePage', () => ({
  useGo: vi.fn(() => vi.fn(() => Promise.resolve()))
}));

vi.mock('/@/hooks/event/useScrollTo', () => ({
  useScrollTo: vi.fn(() => ({
    start: vi.fn()
  }))
}));

vi.mock('@vueuse/core', () => ({
  onKeyStroke: vi.fn(),
  useDebounceFn: vi.fn((fn) => fn)
}));

vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: vi.fn(() => ({
    t: vi.fn((key) => key)
  }))
}));

describe('useMenuSearch', () => {
  let refs: any;
  let scrollWrap: any;
  let emit: any;

  beforeEach(() => {
    vi.clearAllMocks();
    refs = ref([]);
    scrollWrap = ref(null);
    emit = vi.fn();
  });


  describe('useMenuSearch hook', () => {
    it('should return expected properties', () => {
      const result = useMenuSearch(refs, scrollWrap, emit);
      
      expect(result).toHaveProperty('handleSearch');
      expect(result).toHaveProperty('searchResult');
      expect(result).toHaveProperty('keyword');
      expect(result).toHaveProperty('activeIndex');
      expect(result).toHaveProperty('handleMouseenter');
      expect(result).toHaveProperty('handleEnter');
      expect(result).toHaveProperty('handleUp');
      expect(result).toHaveProperty('handleDown');
      expect(result).toHaveProperty('handleClose');
      expect(result).toHaveProperty('handleScroll');
    });

    it('should initialize with default values', () => {
      const result = useMenuSearch(refs, scrollWrap, emit);
      
      expect(result.searchResult.value).toEqual([]);
      expect(result.keyword.value).toBe('');
      expect(result.activeIndex.value).toBe(-1);
    });

    it('should handle search with empty keyword', () => {
      const result = useMenuSearch(refs, scrollWrap, emit);
      
      const mockEvent = {
        stopPropagation: vi.fn(),
        target: { value: '' }
      };
      
      result.handleSearch(mockEvent);
      
      expect(result.searchResult.value).toEqual([]);
      expect(result.keyword.value).toBe('');
    });

    it('should handle search with valid keyword', async () => {
      const result = useMenuSearch(refs, scrollWrap, emit);
      
      // Wait for menu list to be initialized
      await nextTick();
      
      const mockEvent = {
        stopPropagation: vi.fn(),
        target: { value: 'Dashboard' }
      };
      
      result.handleSearch(mockEvent);
      
      expect(result.keyword.value).toBe('Dashboard');
      expect(result.searchResult.value.length).toBeGreaterThan(0);
      expect(result.activeIndex.value).toBe(0);
    });

    it('should handle mouse enter event', () => {
      const result = useMenuSearch(refs, scrollWrap, emit);
      
      const mockEvent = {
        target: {
          dataset: { index: '2' }
        }
      };
      
      result.handleMouseenter(mockEvent);
      
      expect(result.activeIndex.value).toBe(2);
    });

    it('should handle up arrow key', () => {
      const result = useMenuSearch(refs, scrollWrap, emit);
      
      // Set up some search results
      result.searchResult.value = [
        { name: 'Test 1', path: '/test1' },
        { name: 'Test 2', path: '/test2' },
        { name: 'Test 3', path: '/test3' }
      ];
      result.activeIndex.value = 1;
      
      result.handleUp();
      
      expect(result.activeIndex.value).toBe(0);
    });

    it('should handle up arrow key at beginning', () => {
      const result = useMenuSearch(refs, scrollWrap, emit);
      
      // Set up some search results
      result.searchResult.value = [
        { name: 'Test 1', path: '/test1' },
        { name: 'Test 2', path: '/test2' }
      ];
      result.activeIndex.value = 0;
      
      result.handleUp();
      
      expect(result.activeIndex.value).toBe(1);
    });

    it('should handle down arrow key', () => {
      const result = useMenuSearch(refs, scrollWrap, emit);
      
      // Set up some search results
      result.searchResult.value = [
        { name: 'Test 1', path: '/test1' },
        { name: 'Test 2', path: '/test2' },
        { name: 'Test 3', path: '/test3' }
      ];
      result.activeIndex.value = 1;
      
      result.handleDown();
      
      expect(result.activeIndex.value).toBe(2);
    });

    it('should handle down arrow key at end', () => {
      const result = useMenuSearch(refs, scrollWrap, emit);
      
      // Set up some search results
      result.searchResult.value = [
        { name: 'Test 1', path: '/test1' },
        { name: 'Test 2', path: '/test2' }
      ];
      result.activeIndex.value = 1;
      
      result.handleDown();
      
      expect(result.activeIndex.value).toBe(0);
    });

    it('should handle enter key with valid selection', async () => {
      const result = useMenuSearch(refs, scrollWrap, emit);
      
      // Set up search results
      result.searchResult.value = [
        { name: 'Test 1', path: '/test1' },
        { name: 'Test 2', path: '/test2' }
      ];
      result.activeIndex.value = 0;
      
      await result.handleEnter();
      
      expect(emit).toHaveBeenCalledWith('close');
    });

    it('should handle enter key with no results', async () => {
      const result = useMenuSearch(refs, scrollWrap, emit);
      
      result.searchResult.value = [];
      result.activeIndex.value = -1;
      
      await result.handleEnter();
      
      expect(emit).not.toHaveBeenCalled();
    });

    it('should handle close', () => {
      const result = useMenuSearch(refs, scrollWrap, emit);
      
      result.handleClose();
      
      expect(result.searchResult.value).toEqual([]);
      expect(emit).toHaveBeenCalledWith('close');
    });

    it('should handle scroll with valid refs', () => {
      const result = useMenuSearch(refs, scrollWrap, emit);
      
      // Set up refs
      const mockElement = {
        offsetTop: 100,
        offsetHeight: 50
      };
      refs.value = [mockElement, mockElement, mockElement];
      scrollWrap.value = {
        offsetHeight: 200
      };
      result.activeIndex.value = 1;
      
      result.handleScroll();
      
      // Should not throw error
      expect(true).toBe(true);
    });

    it('should handle scroll with empty refs', () => {
      const result = useMenuSearch(refs, scrollWrap, emit);
      
      refs.value = [];
      result.activeIndex.value = 0;
      
      result.handleScroll();
      
      // Should not throw error
      expect(true).toBe(true);
    });

    it('should handle scroll with no scrollWrap', () => {
      const result = useMenuSearch(refs, scrollWrap, emit);
      
      refs.value = [{ offsetTop: 100, offsetHeight: 50 }];
      scrollWrap.value = null;
      result.activeIndex.value = 0;
      
      result.handleScroll();
      
      // Should not throw error
      expect(true).toBe(true);
    });
  });
});

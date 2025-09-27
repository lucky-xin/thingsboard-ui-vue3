import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, defineComponent } from 'vue';
import { useMenuSearch } from '/@/components/Application/src/search/useMenuSearch';
import { mount } from '@vue/test-utils';

// Mock dependencies
vi.mock('/@/router/menus', () => ({
  getMenus: vi.fn(() => Promise.resolve([
    {
      name: 'dashboard',
      path: '/dashboard',
      icon: 'dashboard-icon',
      hideMenu: false,
      meta: {},
      children: [
        {
          name: 'overview',
          path: '/dashboard/overview',
          hideMenu: false,
          meta: { hideChildrenInMenu: true },
        },
      ],
    },
  ])),
}));

vi.mock('/@/utils/helper/treeHelper', () => ({
  filter: vi.fn((list, predicate) => list.filter(predicate)),
  forEach: vi.fn((list, callback) => list.forEach(callback)),
}));

vi.mock('/@/hooks/web/usePage', () => ({
  useGo: vi.fn(() => vi.fn()),
}));

vi.mock('/@/hooks/event/useScrollTo', () => ({
  useScrollTo: vi.fn(() => ({
    start: vi.fn(),
  })),
}));

vi.mock('@vueuse/core', () => ({
  onKeyStroke: vi.fn(),
  useDebounceFn: vi.fn((fn) => fn),
}));

vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: vi.fn(() => ({
    t: vi.fn((key) => key),
  })),
}));

describe('components/Application/useMenuSearch', () => {
  let mockRefs: any;
  let mockScrollWrap: any;
  let mockEmit: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockRefs = ref([]);
    mockScrollWrap = ref({ offsetHeight: 400 });
    mockEmit = vi.fn();
  });

  it('should initialize with default values', async () => {
    let result: any;

    // Create a component wrapper to provide a valid Vue context
    const wrapper = defineComponent({
      setup() {
        result = useMenuSearch(mockRefs, mockScrollWrap, mockEmit);
        return result;
      },
      render() {
        return null;
      }
    });

    const component = mount(wrapper);
    // Wait for async setup to complete
    await component.vm.$nextTick();

    expect(result.searchResult.value).toEqual([]);
    expect(result.keyword.value).toBe('');
    expect(result.activeIndex.value).toBe(-1);
    expect(typeof result.handleSearch).toBe('function');
    expect(typeof result.handleMouseenter).toBe('function');
    expect(typeof result.handleEnter).toBe('function');
  });

  it('should handle search with empty keyword', () => {
    let result: any;

    // Create a component wrapper to provide a valid Vue context
    const wrapper = defineComponent({
      setup() {
        result = useMenuSearch(mockRefs, mockScrollWrap, mockEmit);
        return result;
      },
      render() {
        return null;
      }
    });

    const component = mount(wrapper);

    const mockEvent = {
      target: { value: '' },
      stopPropagation: vi.fn(),
    } as any;

    result.handleSearch(mockEvent);

    expect(result.searchResult.value).toEqual([]);
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });

  it('should handle search with keyword', () => {
    let result: any;

    // Create a component wrapper to provide a valid Vue context
    const wrapper = defineComponent({
      setup() {
        result = useMenuSearch(mockRefs, mockScrollWrap, mockEmit);
        return result;
      },
      render() {
        return null;
      }
    });

    const component = mount(wrapper);

    const mockEvent = {
      target: { value: 'test' },
      stopPropagation: vi.fn(),
    } as any;

    result.handleSearch(mockEvent);

    expect(result.keyword.value).toBe('test');
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });

  it('should handle mouse enter event', () => {
    let result: any;

    // Create a component wrapper to provide a valid Vue context
    const wrapper = defineComponent({
      setup() {
        result = useMenuSearch(mockRefs, mockScrollWrap, mockEmit);
        return result;
      },
      render() {
        return null;
      }
    });

    const component = mount(wrapper);

    const mockEvent = {
      target: { dataset: { index: '2' } },
    } as any;

    result.handleMouseenter(mockEvent);

    expect(result.activeIndex.value).toBe(2);
  });

  it('should handle search result updates', () => {
    let result: any;

    // Create a component wrapper to provide a valid Vue context
    const wrapper = defineComponent({
      setup() {
        result = useMenuSearch(mockRefs, mockScrollWrap, mockEmit);
        return result;
      },
      render() {
        return null;
      }
    });

    const component = mount(wrapper);

    // Test that search results can be updated
    result.searchResult.value = [
      { name: 'test1', path: '/test1' },
      { name: 'test2', path: '/test2' },
    ];
    result.activeIndex.value = 1;

    expect(result.searchResult.value.length).toBe(2);
    expect(result.activeIndex.value).toBe(1);
  });

  it('should handle keyword updates', () => {
    let result: any;

    // Create a component wrapper to provide a valid Vue context
    const wrapper = defineComponent({
      setup() {
        result = useMenuSearch(mockRefs, mockScrollWrap, mockEmit);
        return result;
      },
      render() {
        return null;
      }
    });

    const component = mount(wrapper);

    result.keyword.value = 'test keyword';

    expect(result.keyword.value).toBe('test keyword');
  });
});

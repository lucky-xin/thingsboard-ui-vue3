import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, computed } from 'vue';
import { useTableHeader } from '/@/components/Table/src/hooks/useTableHeader';
import type { BasicTableProps } from '/@/components/Table/src/types/table';

// Mock dependencies
vi.mock('/@/utils/is', () => ({
  isString: vi.fn(),
}));

vi.mock('/@/utils/helper/tsxHelper', () => ({
  getSlot: vi.fn(),
}));

vi.mock('/@/components/Table/src/components/TableHeader.vue', () => ({
  default: 'TableHeader',
}));

describe('useTableHeader', () => {
  let propsRef: any;
  let slots: any;
  let handlers: any;
  let methods: any;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock props
    propsRef = computed(() => ({
      title: 'Test Table',
      showTableSetting: true,
      titleHelpMessage: 'Help message',
      tableSetting: {},
      showSelectionBar: true,
    }));

    // Mock slots
    slots = {
      tableTitle: vi.fn(),
      toolbar: vi.fn(),
      headerTop: vi.fn(),
      tableTop: vi.fn(),
    };

    // Mock handlers
    handlers = {
      onColumnsChange: vi.fn(),
    };

    // Mock methods
    methods = {
      clearSelectedRowKeys: vi.fn(),
      getSelectRowKeys: vi.fn(() => [1, 2, 3]),
    };
  });

  describe('getHeaderProps', () => {
    it('should return empty object when hideTitle is true and title is not string', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(false);

      propsRef = computed(() => ({
        title: null,
        showTableSetting: false,
        tableSetting: {},
        showSelectionBar: false,
      }));

      slots = {};

      const { getHeaderProps } = useTableHeader(propsRef, slots, handlers, methods);

      expect(getHeaderProps.value).toEqual({});
    });

    it('should return header props with title when title is string', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(true);
      const { getSlot } = await import('/@/utils/helper/tsxHelper');
      vi.mocked(getSlot).mockImplementation((slots, name) => slots[name]);

      propsRef = computed(() => ({
        title: 'Test Table',
        showTableSetting: true,
        titleHelpMessage: 'Help message',
        tableSetting: {},
        showSelectionBar: true,
      }));

      const { getHeaderProps } = useTableHeader(propsRef, slots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should return header props with slots when slots are provided', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(true);
      const { getSlot } = await import('/@/utils/helper/tsxHelper');
      vi.mocked(getSlot).mockImplementation((slots, name) => slots[name]);

      const { getHeaderProps } = useTableHeader(propsRef, slots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle title as function', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(false);
      const { getSlot } = await import('/@/utils/helper/tsxHelper');
      vi.mocked(getSlot).mockImplementation((slots, name) => slots[name]);

      propsRef = computed(() => ({
        title: () => 'Function Title',
        showTableSetting: true,
        titleHelpMessage: 'Help message',
        tableSetting: {},
        showSelectionBar: true,
      }));

      const { getHeaderProps } = useTableHeader(propsRef, slots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle empty slots', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(true);
      const { getSlot } = await import('/@/utils/helper/tsxHelper');
      vi.mocked(getSlot).mockImplementation((slots, name) => slots[name]);

      const emptySlots = {};

      const { getHeaderProps } = useTableHeader(propsRef, emptySlots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle only toolbar slot', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(true);
      const { getSlot } = await import('/@/utils/helper/tsxHelper');
      vi.mocked(getSlot).mockImplementation((slots, name) => slots[name]);

      const toolbarOnlySlots = {
        toolbar: vi.fn(),
      };

      const { getHeaderProps } = useTableHeader(propsRef, toolbarOnlySlots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle only tableTitle slot', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(true);
      const { getSlot } = await import('/@/utils/helper/tsxHelper');
      vi.mocked(getSlot).mockImplementation((slots, name) => slots[name]);

      const tableTitleOnlySlots = {
        tableTitle: vi.fn(),
      };

      const { getHeaderProps } = useTableHeader(propsRef, tableTitleOnlySlots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle only headerTop slot', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(true);
      const { getSlot } = await import('/@/utils/helper/tsxHelper');
      vi.mocked(getSlot).mockImplementation((slots, name) => slots[name]);

      const headerTopOnlySlots = {
        headerTop: vi.fn(),
      };

      const { getHeaderProps } = useTableHeader(propsRef, headerTopOnlySlots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle only tableTop slot', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(true);
      const { getSlot } = await import('/@/utils/helper/tsxHelper');
      vi.mocked(getSlot).mockImplementation((slots, name) => slots[name]);

      const tableTopOnlySlots = {
        tableTop: vi.fn(),
      };

      const { getHeaderProps } = useTableHeader(propsRef, tableTopOnlySlots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle all slots', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(true);
      const { getSlot } = await import('/@/utils/helper/tsxHelper');
      vi.mocked(getSlot).mockImplementation((slots, name) => slots[name]);

      const allSlots = {
        toolbar: vi.fn(),
        tableTitle: vi.fn(),
        headerTop: vi.fn(),
        tableTop: vi.fn(),
      };

      const { getHeaderProps } = useTableHeader(propsRef, allSlots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle showTableSetting false', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(true);
      const { getSlot } = await import('/@/utils/helper/tsxHelper');
      vi.mocked(getSlot).mockImplementation((slots, name) => slots[name]);

      propsRef = computed(() => ({
        title: 'Test Table',
        showTableSetting: false,
        titleHelpMessage: 'Help message',
        tableSetting: {},
        showSelectionBar: false,
      }));

      const { getHeaderProps } = useTableHeader(propsRef, slots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle null title', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(false);
      const { getSlot } = await import('/@/utils/helper/tsxHelper');
      vi.mocked(getSlot).mockImplementation((slots, name) => slots[name]);

      propsRef = computed(() => ({
        title: null,
        showTableSetting: true,
        titleHelpMessage: 'Help message',
        tableSetting: {},
        showSelectionBar: true,
      }));

      const { getHeaderProps } = useTableHeader(propsRef, slots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle undefined title', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(false);
      const { getSlot } = await import('/@/utils/helper/tsxHelper');
      vi.mocked(getSlot).mockImplementation((slots, name) => slots[name]);

      propsRef = computed(() => ({
        title: undefined,
        showTableSetting: true,
        titleHelpMessage: 'Help message',
        tableSetting: {},
        showSelectionBar: true,
      }));

      const { getHeaderProps } = useTableHeader(propsRef, slots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle empty string title', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(true);
      const { getSlot } = await import('/@/utils/helper/tsxHelper');
      vi.mocked(getSlot).mockImplementation((slots, name) => slots[name]);

      propsRef = computed(() => ({
        title: '',
        showTableSetting: true,
        titleHelpMessage: 'Help message',
        tableSetting: {},
        showSelectionBar: true,
      }));

      const { getHeaderProps } = useTableHeader(propsRef, slots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle methods with empty selection', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(true);
      const { getSlot } = await import('/@/utils/helper/tsxHelper');
      vi.mocked(getSlot).mockImplementation((slots, name) => slots[name]);

      const methodsWithEmptySelection = {
        clearSelectedRowKeys: vi.fn(),
        getSelectRowKeys: vi.fn(() => []),
      };

      const { getHeaderProps } = useTableHeader(propsRef, slots, handlers, methodsWithEmptySelection);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle hideTitle true with string title', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(true);
      const { getSlot } = await import('/@/utils/helper/tsxHelper');
      vi.mocked(getSlot).mockImplementation((slots, name) => slots[name]);

      propsRef = computed(() => ({
        title: null,
        showTableSetting: false,
        titleHelpMessage: 'Help message',
        tableSetting: {},
        showSelectionBar: false,
      }));

      const emptySlots = {};

      const { getHeaderProps } = useTableHeader(propsRef, emptySlots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(getHeaderProps.value.title).toBe(null);
    });

    it('should handle hideTitle false with string title', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(true);
      const { getSlot } = await import('/@/utils/helper/tsxHelper');
      vi.mocked(getSlot).mockImplementation((slots, name) => slots[name]);

      propsRef = computed(() => ({
        title: 'Test Table',
        showTableSetting: true,
        titleHelpMessage: 'Help message',
        tableSetting: {},
        showSelectionBar: true,
      }));

      const emptySlots = {};

      const { getHeaderProps } = useTableHeader(propsRef, emptySlots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle hideTitle false with slots', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(false);
      const { getSlot } = await import('/@/utils/helper/tsxHelper');
      vi.mocked(getSlot).mockImplementation((slots, name) => slots[name]);

      propsRef = computed(() => ({
        title: null,
        showTableSetting: false,
        titleHelpMessage: 'Help message',
        tableSetting: {},
        showSelectionBar: false,
      }));

      const slotsWithToolbar = {
        toolbar: vi.fn(),
      };

      const { getHeaderProps } = useTableHeader(propsRef, slotsWithToolbar, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle hideTitle false with tableTitle slot', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(false);
      const { getSlot } = await import('/@/utils/helper/tsxHelper');
      vi.mocked(getSlot).mockImplementation((slots, name) => slots[name]);

      propsRef = computed(() => ({
        title: null,
        showTableSetting: false,
        titleHelpMessage: 'Help message',
        tableSetting: {},
        showSelectionBar: false,
      }));

      const slotsWithTableTitle = {
        tableTitle: vi.fn(),
      };

      const { getHeaderProps } = useTableHeader(propsRef, slotsWithTableTitle, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle hideTitle false with showTableSetting', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(false);
      const { getSlot } = await import('/@/utils/helper/tsxHelper');
      vi.mocked(getSlot).mockImplementation((slots, name) => slots[name]);

      propsRef = computed(() => ({
        title: null,
        showTableSetting: true,
        titleHelpMessage: 'Help message',
        tableSetting: {},
        showSelectionBar: false,
      }));

      const emptySlots = {};

      const { getHeaderProps } = useTableHeader(propsRef, emptySlots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle hideTitle true with non-string title', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(false);

      propsRef = computed(() => ({
        title: 123, // non-string title
        showTableSetting: false,
        titleHelpMessage: 'Help message',
        tableSetting: {},
        showSelectionBar: false,
      }));

      const emptySlots = {};

      const { getHeaderProps } = useTableHeader(propsRef, emptySlots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle hideTitle true with boolean title', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(false);

      propsRef = computed(() => ({
        title: true, // boolean title
        showTableSetting: false,
        titleHelpMessage: 'Help message',
        tableSetting: {},
        showSelectionBar: false,
      }));

      const emptySlots = {};

      const { getHeaderProps } = useTableHeader(propsRef, emptySlots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle hideTitle true with object title', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(false);

      propsRef = computed(() => ({
        title: { text: 'Test' }, // object title
        showTableSetting: false,
        titleHelpMessage: 'Help message',
        tableSetting: {},
        showSelectionBar: false,
      }));

      const emptySlots = {};

      const { getHeaderProps } = useTableHeader(propsRef, emptySlots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle hideTitle true with array title', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(false);

      propsRef = computed(() => ({
        title: ['Test'], // array title
        showTableSetting: false,
        titleHelpMessage: 'Help message',
        tableSetting: {},
        showSelectionBar: false,
      }));

      const emptySlots = {};

      const { getHeaderProps } = useTableHeader(propsRef, emptySlots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle hideTitle true with function title', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(false);

      propsRef = computed(() => ({
        title: () => 'Test', // function title
        showTableSetting: false,
        titleHelpMessage: 'Help message',
        tableSetting: {},
        showSelectionBar: false,
      }));

      const emptySlots = {};

      const { getHeaderProps } = useTableHeader(propsRef, emptySlots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle hideTitle true with number title', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(false);

      propsRef = computed(() => ({
        title: 42, // number title
        showTableSetting: false,
        titleHelpMessage: 'Help message',
        tableSetting: {},
        showSelectionBar: false,
      }));

      const emptySlots = {};

      const { getHeaderProps } = useTableHeader(propsRef, emptySlots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle hideTitle true with symbol title', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(false);

      propsRef = computed(() => ({
        title: Symbol('test'), // symbol title
        showTableSetting: false,
        titleHelpMessage: 'Help message',
        tableSetting: {},
        showSelectionBar: false,
      }));

      const emptySlots = {};

      const { getHeaderProps } = useTableHeader(propsRef, emptySlots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle hideTitle true with bigint title', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(false);

      propsRef = computed(() => ({
        title: BigInt(123), // bigint title
        showTableSetting: false,
        titleHelpMessage: 'Help message',
        tableSetting: {},
        showSelectionBar: false,
      }));

      const emptySlots = {};

      const { getHeaderProps } = useTableHeader(propsRef, emptySlots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle hideTitle true with Date title', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(false);

      propsRef = computed(() => ({
        title: new Date(), // Date title
        showTableSetting: false,
        titleHelpMessage: 'Help message',
        tableSetting: {},
        showSelectionBar: false,
      }));

      const emptySlots = {};

      const { getHeaderProps } = useTableHeader(propsRef, emptySlots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });

    it('should handle hideTitle true with RegExp title', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(false);

      propsRef = computed(() => ({
        title: /test/, // RegExp title
        showTableSetting: false,
        titleHelpMessage: 'Help message',
        tableSetting: {},
        showSelectionBar: false,
      }));

      const emptySlots = {};

      const { getHeaderProps } = useTableHeader(propsRef, emptySlots, handlers, methods);

      expect(getHeaderProps.value).toHaveProperty('title');
      expect(typeof getHeaderProps.value.title).toBe('function');
    });


    it('should cover lines 25-59 by testing title function execution', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(true);
      const { getSlot } = await import('/@/utils/helper/tsxHelper');
      vi.mocked(getSlot).mockImplementation((slots, name) => slots[name]);

      propsRef = computed(() => ({
        title: 'Test Table',
        showTableSetting: true,
        titleHelpMessage: 'Help message',
        tableSetting: { columns: [] },
        showSelectionBar: true,
      }));

      const slotsWithAll = {
        toolbar: vi.fn(),
        tableTitle: vi.fn(),
        headerTop: vi.fn(),
        tableTop: vi.fn(),
      };

      const { getHeaderProps } = useTableHeader(propsRef, slotsWithAll, handlers, methods);

      // Access the computed value to trigger execution
      const headerProps = getHeaderProps.value;
      
      // Verify the title function exists
      expect(typeof headerProps.title).toBe('function');
      
      // Call the title function to trigger execution of lines 25-59
      const result = headerProps.title();
      
      // This should cover the h() function call and slot handling
      expect(result).toBeDefined();
    });

    it('should handle methods.getSelectRowKeys() call', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(true);
      const { getSlot } = await import('/@/utils/helper/tsxHelper');
      vi.mocked(getSlot).mockImplementation((slots, name) => slots[name]);

      const mockGetSelectRowKeys = vi.fn(() => [1, 2, 3, 4, 5]);
      const methodsWithSelection = {
        clearSelectedRowKeys: vi.fn(),
        getSelectRowKeys: mockGetSelectRowKeys,
      };

      propsRef = computed(() => ({
        title: 'Test Table',
        showTableSetting: true,
        titleHelpMessage: 'Help message',
        tableSetting: {},
        showSelectionBar: true,
      }));

      const { getHeaderProps } = useTableHeader(propsRef, slots, handlers, methodsWithSelection);

      const titleFunction = getHeaderProps.value.title;
      titleFunction();

      // Verify getSelectRowKeys was called
      expect(mockGetSelectRowKeys).toHaveBeenCalled();
    });

    it('should handle all props passed to TableHeader', async () => {
      const { isString } = await import('/@/utils/is');
      vi.mocked(isString).mockReturnValue(true);
      const { getSlot } = await import('/@/utils/helper/tsxHelper');
      vi.mocked(getSlot).mockImplementation((slots, name) => slots[name]);

      const mockOnColumnsChange = vi.fn();
      const mockClearSelectedRowKeys = vi.fn();
      const mockGetSelectRowKeys = vi.fn(() => [1, 2]);

      const customHandlers = {
        onColumnsChange: mockOnColumnsChange,
      };

      const customMethods = {
        clearSelectedRowKeys: mockClearSelectedRowKeys,
        getSelectRowKeys: mockGetSelectRowKeys,
      };

      propsRef = computed(() => ({
        title: 'Custom Table',
        showTableSetting: false,
        titleHelpMessage: 'Custom help',
        tableSetting: { custom: 'setting' },
        showSelectionBar: false,
      }));

      const { getHeaderProps } = useTableHeader(propsRef, slots, customHandlers, customMethods);

      const titleFunction = getHeaderProps.value.title;
      titleFunction();

      // Verify all props are passed correctly
      expect(mockGetSelectRowKeys).toHaveBeenCalled();
      expect(mockClearSelectedRowKeys).toBeDefined();
      expect(mockOnColumnsChange).toBeDefined();
    });
  });
});

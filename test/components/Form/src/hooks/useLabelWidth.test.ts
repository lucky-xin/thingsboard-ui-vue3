import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import { useItemLabelWidth } from '/@/components/Form/src/hooks/useLabelWidth';
import { computed, unref } from 'vue';
import { isNumber } from '/@/utils/is';

// Mock Vue functions
vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    computed: vi.fn((fn) => fn()),
    unref: vi.fn((val) => val.value || val),
  };
});

// Mock utils
vi.mock('/@/utils/is', () => ({
  isNumber: vi.fn(),
}));

describe('components/Form/src/hooks/useLabelWidth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(isNumber).mockReturnValue(false);
  });

  describe('useItemLabelWidth', () => {
    it('should return default labelCol and wrapperCol when no labelWidth is set', () => {
      const schemaItemRef = ref({
        itemProps: {},
        labelWidth: undefined,
        disabledLabelWidth: false,
      });
      
      const propsRef = ref({
        labelWidth: undefined,
        labelCol: undefined,
        wrapperCol: undefined,
      });

      const result = useItemLabelWidth(schemaItemRef, propsRef);

      expect(result.labelCol.style.textAlign).toBe('left');
      expect(result.wrapperCol).toEqual({});
    });

    it('should return default labelCol and wrapperCol when disabledLabelWidth is true', () => {
      const schemaItemRef = ref({
        itemProps: {},
        labelWidth: '100px',
        disabledLabelWidth: true,
      });
      
      const propsRef = ref({
        labelWidth: '200px',
        labelCol: undefined,
        wrapperCol: undefined,
      });

      const result = useItemLabelWidth(schemaItemRef, propsRef);

      expect(result.labelCol.style.textAlign).toBe('left');
      expect(result.wrapperCol).toEqual({});
    });

    it('should use schemaItem labelWidth when set', () => {
      const schemaItemRef = ref({
        itemProps: {},
        labelWidth: '150px',
        disabledLabelWidth: false,
      });
      
      const propsRef = ref({
        labelWidth: '200px',
        labelCol: undefined,
        wrapperCol: undefined,
      });

      const result = useItemLabelWidth(schemaItemRef, propsRef);

      expect(result.labelCol.style.width).toBe('150px');
      expect(result.wrapperCol.style.width).toBe('calc(100% - 150px)');
    });

    it('should use global labelWidth when schemaItem labelWidth is not set', () => {
      const schemaItemRef = ref({
        itemProps: {},
        labelWidth: undefined,
        disabledLabelWidth: false,
      });
      
      const propsRef = ref({
        labelWidth: '200px',
        labelCol: undefined,
        wrapperCol: undefined,
      });

      const result = useItemLabelWidth(schemaItemRef, propsRef);

      expect(result.labelCol.style.width).toBe('200px');
      expect(result.wrapperCol.style.width).toBe('calc(100% - 200px)');
    });

    it('should convert number labelWidth to pixel string', () => {
      vi.mocked(isNumber).mockReturnValue(true);
      
      const schemaItemRef = ref({
        itemProps: {},
        labelWidth: 150,
        disabledLabelWidth: false,
      });
      
      const propsRef = ref({
        labelWidth: undefined,
        labelCol: undefined,
        wrapperCol: undefined,
      });

      const result = useItemLabelWidth(schemaItemRef, propsRef);

      expect(result.labelCol.style.width).toBe('150px');
      expect(result.wrapperCol.style.width).toBe('calc(100% - 150px)');
    });

    it('should merge global and item labelCol', () => {
      const schemaItemRef = ref({
        itemProps: {
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        },
        labelWidth: '150px',
        disabledLabelWidth: false,
      });
      
      const propsRef = ref({
        labelWidth: undefined,
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      });

      const result = useItemLabelWidth(schemaItemRef, propsRef);

      expect(result.labelCol.span).toBe(6);
      expect(result.wrapperCol.span).toBe(18);
    });

    it('should use global labelCol when item labelCol is not set', () => {
      const schemaItemRef = ref({
        itemProps: {},
        labelWidth: '150px',
        disabledLabelWidth: false,
      });
      
      const propsRef = ref({
        labelWidth: undefined,
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      });

      const result = useItemLabelWidth(schemaItemRef, propsRef);

      expect(result.labelCol.span).toBe(8);
      expect(result.wrapperCol.span).toBe(16);
    });

    it('should handle empty itemProps', () => {
      const schemaItemRef = ref({
        itemProps: undefined,
        labelWidth: '150px',
        disabledLabelWidth: false,
      });
      
      const propsRef = ref({
        labelWidth: undefined,
        labelCol: undefined,
        wrapperCol: undefined,
      });

      const result = useItemLabelWidth(schemaItemRef, propsRef);

      expect(result.labelCol.style.width).toBe('150px');
      expect(result.wrapperCol.style.width).toBe('calc(100% - 150px)');
    });

    it('should handle undefined itemProps', () => {
      const schemaItemRef = ref({
        labelWidth: '150px',
        disabledLabelWidth: false,
      });
      
      const propsRef = ref({
        labelWidth: undefined,
        labelCol: undefined,
        wrapperCol: undefined,
      });

      const result = useItemLabelWidth(schemaItemRef, propsRef);

      expect(result.labelCol.style.width).toBe('150px');
      expect(result.wrapperCol.style.width).toBe('calc(100% - 150px)');
    });

    it('should handle zero labelWidth', () => {
      const schemaItemRef = ref({
        itemProps: {},
        labelWidth: 0,
        disabledLabelWidth: false,
      });
      
      const propsRef = ref({
        labelWidth: undefined,
        labelCol: undefined,
        wrapperCol: undefined,
      });

      const result = useItemLabelWidth(schemaItemRef, propsRef);

      expect(result.labelCol.style.textAlign).toBe('left');
      expect(result.wrapperCol).toEqual({});
    });

    it('should handle empty string labelWidth', () => {
      const schemaItemRef = ref({
        itemProps: {},
        labelWidth: '',
        disabledLabelWidth: false,
      });
      
      const propsRef = ref({
        labelWidth: undefined,
        labelCol: undefined,
        wrapperCol: undefined,
      });

      const result = useItemLabelWidth(schemaItemRef, propsRef);

      expect(result.labelCol.style.textAlign).toBe('left');
      expect(result.wrapperCol).toEqual({});
    });

    it('should handle complex labelCol and wrapperCol merging', () => {
      const schemaItemRef = ref({
        itemProps: {
          labelCol: { span: 6, offset: 2 },
          wrapperCol: { span: 18, offset: 0 },
        },
        labelWidth: '150px',
        disabledLabelWidth: false,
      });
      
      const propsRef = ref({
        labelWidth: undefined,
        labelCol: { span: 8, offset: 1 },
        wrapperCol: { span: 16, offset: 1 },
      });

      const result = useItemLabelWidth(schemaItemRef, propsRef);

      expect(result.labelCol.span).toBe(6);
      expect(result.labelCol.offset).toBe(2);
      expect(result.wrapperCol.span).toBe(18);
      expect(result.wrapperCol.offset).toBe(0);
    });

    it('should handle string labelWidth without conversion', () => {
      vi.mocked(isNumber).mockReturnValue(false);
      
      const schemaItemRef = ref({
        itemProps: {},
        labelWidth: '150px',
        disabledLabelWidth: false,
      });
      
      const propsRef = ref({
        labelWidth: undefined,
        labelCol: undefined,
        wrapperCol: undefined,
      });

      const result = useItemLabelWidth(schemaItemRef, propsRef);

      expect(result.labelCol.style.width).toBe('150px');
      expect(result.wrapperCol.style.width).toBe('calc(100% - 150px)');
    });
  });
});

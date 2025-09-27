import { describe, it, expect } from 'vitest';
import { basicProps } from '/@/components/Form/src/props';

describe('components/Form/src/props', () => {
  describe('basicProps', () => {
    it('should have correct prop definitions', () => {
      expect(basicProps.model).toBeDefined();
      expect(basicProps.model.type).toBe(Object);
      expect(basicProps.model.default).toEqual({});
      
      expect(basicProps.enctype).toBeDefined();
      expect(basicProps.enctype.type).toBe(String);
      expect(basicProps.enctype.default).toBe('json');
      
      expect(basicProps.labelWidth).toBeDefined();
      expect(basicProps.labelWidth.type).toBeDefined();
      expect(basicProps.labelWidth.default).toBe(0);
      
      expect(basicProps.fieldMapToTime).toBeDefined();
      expect(basicProps.fieldMapToTime.type).toBe(Array);
      expect(basicProps.fieldMapToTime.default()).toEqual([]);
      
      expect(basicProps.compact).toBeDefined();
      expect(basicProps.compact.type).toBe(Boolean);
      
      expect(basicProps.schemas).toBeDefined();
      expect(basicProps.schemas.type).toBeDefined();
      expect(basicProps.schemas.default()).toEqual([]);
      
      expect(basicProps.mergeDynamicData).toBeDefined();
      expect(basicProps.mergeDynamicData.type).toBe(Object);
      expect(basicProps.mergeDynamicData.default).toBeNull();
      
      expect(basicProps.baseRowStyle).toBeDefined();
      expect(basicProps.baseRowStyle.type).toBe(Object);
      
      expect(basicProps.baseColProps).toBeDefined();
      expect(basicProps.baseColProps.type).toBe(Object);
      
      expect(basicProps.autoSetPlaceHolder).toBeDefined();
      expect(basicProps.autoSetPlaceHolder.type).toBe(Boolean);
      expect(basicProps.autoSetPlaceHolder.default).toBe(true);
      
      expect(basicProps.autoSubmitOnEnter).toBeDefined();
      expect(basicProps.autoSubmitOnEnter.type).toBe(Boolean);
      expect(basicProps.autoSubmitOnEnter.default).toBe(true);
      
      expect(basicProps.submitOnReset).toBeDefined();
      expect(basicProps.submitOnReset.type).toBe(Boolean);
      
      expect(basicProps.size).toBeDefined();
      expect(basicProps.size.type).toBeDefined();
      expect(basicProps.size.default).toBe('default');
      
      expect(basicProps.disabled).toBeDefined();
      expect(basicProps.disabled.type).toBe(Boolean);
    });

    it('should support multiple types for labelWidth', () => {
      const labelWidthProp = basicProps.labelWidth;
      expect(labelWidthProp.type).toBeDefined();
      expect(labelWidthProp.default).toBe(0);
    });

    it('should support array type for schemas', () => {
      const schemasProp = basicProps.schemas;
      expect(schemasProp.type).toBeDefined();
      expect(schemasProp.default()).toEqual([]);
    });

    it('should support array type for fieldMapToTime', () => {
      const fieldMapToTimeProp = basicProps.fieldMapToTime;
      expect(fieldMapToTimeProp.type).toBe(Array);
      expect(fieldMapToTimeProp.default()).toEqual([]);
    });

    it('should support object type for model', () => {
      const modelProp = basicProps.model;
      expect(modelProp.type).toBe(Object);
      expect(modelProp.default).toEqual({});
    });

    it('should support object type for mergeDynamicData', () => {
      const mergeDynamicDataProp = basicProps.mergeDynamicData;
      expect(mergeDynamicDataProp.type).toBe(Object);
      expect(mergeDynamicDataProp.default).toBeNull();
    });

    it('should support object type for baseRowStyle', () => {
      const baseRowStyleProp = basicProps.baseRowStyle;
      expect(baseRowStyleProp.type).toBe(Object);
    });

    it('should support object type for baseColProps', () => {
      const baseColPropsProp = basicProps.baseColProps;
      expect(baseColPropsProp.type).toBe(Object);
    });

    it('should support string type for enctype', () => {
      const enctypeProp = basicProps.enctype;
      expect(enctypeProp.type).toBe(String);
      expect(enctypeProp.default).toBe('json');
    });

    it('should support string type for size', () => {
      const sizeProp = basicProps.size;
      expect(sizeProp.type).toBeDefined();
      expect(sizeProp.default).toBe('default');
    });

    it('should have correct default values', () => {
      expect(basicProps.model.default).toEqual({});
      expect(basicProps.enctype.default).toBe('json');
      expect(basicProps.labelWidth.default).toBe(0);
      expect(basicProps.fieldMapToTime.default()).toEqual([]);
      expect(basicProps.schemas.default()).toEqual([]);
      expect(basicProps.mergeDynamicData.default).toBeNull();
      expect(basicProps.autoSetPlaceHolder.default).toBe(true);
      expect(basicProps.autoSubmitOnEnter.default).toBe(true);
      expect(basicProps.size.default).toBe('default');
    });

    it('should support boolean props', () => {
      expect(basicProps.compact.type).toBe(Boolean);
      expect(basicProps.autoSetPlaceHolder.type).toBe(Boolean);
      expect(basicProps.autoSubmitOnEnter.type).toBe(Boolean);
      expect(basicProps.submitOnReset.type).toBe(Boolean);
      expect(basicProps.disabled.type).toBe(Boolean);
    });

    it('should support oneOf type for size', () => {
      const sizeProp = basicProps.size;
      expect(sizeProp.type).toBeDefined();
      expect(sizeProp.default).toBe('default');
    });
  });
});

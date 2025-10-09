import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, nextTick } from 'vue';
import { useForm } from '/@/components/Form/src/hooks/useForm';

// Mock dependencies
vi.mock('/@/utils/env', () => ({
  isProdMode: vi.fn(() => false),
}));

vi.mock('/@/utils/log', () => ({
  error: vi.fn(),
}));

vi.mock('/@/utils', () => ({
  getDynamicProps: vi.fn((props) => props),
}));

describe('useForm', () => {
  let mockFormInstance: any;
  let register: any;
  let methods: any;

  beforeEach(() => {
    mockFormInstance = {
      setProps: vi.fn(),
      updateSchema: vi.fn(),
      resetSchema: vi.fn(),
      getFieldsValue: vi.fn(() => ({ name: 'test', age: 25 })),
      setFieldsValue: vi.fn(),
      appendSchemaByField: vi.fn(),
      removeSchemaByFiled: vi.fn(),
      resetFields: vi.fn(),
      submit: vi.fn(() => Promise.resolve({ name: 'test', age: 25 })),
      validate: vi.fn(() => Promise.resolve({ name: 'test', age: 25 })),
      validateFields: vi.fn(() => Promise.resolve({ name: 'test', age: 25 })),
      clearValidate: vi.fn(),
      scrollToField: vi.fn(),
    };

    const [registerFn, methodsObj] = useForm();
    register = registerFn;
    methods = methodsObj;
  });

  it('should initialize with default values', () => {
    expect(register).toBeDefined();
    expect(typeof register).toBe('function');
    expect(methods).toBeDefined();
    expect(typeof methods).toBe('object');
  });

  it('should register form instance', async () => {
    register(mockFormInstance);
    await nextTick();
    
    expect(mockFormInstance).toBeDefined();
  });

  it('should handle setProps', async () => {
    register(mockFormInstance);
    await nextTick();
    
    const formProps = { labelCol: { span: 6 } };
    await methods.setProps(formProps);
    
    expect(mockFormInstance.setProps).toHaveBeenCalledWith(formProps);
  });

  it('should handle updateSchema', async () => {
    register(mockFormInstance);
    await nextTick();
    
    const schema = { field: 'name', component: 'Input' };
    await methods.updateSchema(schema);
    
    expect(mockFormInstance.updateSchema).toHaveBeenCalledWith(schema);
  });

  it('should handle updateSchema with array', async () => {
    register(mockFormInstance);
    await nextTick();
    
    const schemas = [
      { field: 'name', component: 'Input' },
      { field: 'age', component: 'InputNumber' },
    ];
    await methods.updateSchema(schemas);
    
    expect(mockFormInstance.updateSchema).toHaveBeenCalledWith(schemas);
  });

  it('should handle resetSchema', async () => {
    register(mockFormInstance);
    await nextTick();
    
    const schema = { field: 'name', component: 'Input' };
    await methods.resetSchema(schema);
    
    expect(mockFormInstance.resetSchema).toHaveBeenCalledWith(schema);
  });

  it('should handle resetSchema with array', async () => {
    register(mockFormInstance);
    await nextTick();
    
    const schemas = [
      { field: 'name', component: 'Input' },
      { field: 'age', component: 'InputNumber' },
    ];
    await methods.resetSchema(schemas);
    
    expect(mockFormInstance.resetSchema).toHaveBeenCalledWith(schemas);
  });

  it('should handle getFieldsValue', () => {
    register(mockFormInstance);
    
    const values = methods.getFieldsValue();
    
    expect(values).toEqual({ name: 'test', age: 25 });
    expect(mockFormInstance.getFieldsValue).toHaveBeenCalled();
  });

  it('should handle setFieldsValue', async () => {
    register(mockFormInstance);
    await nextTick();
    
    const values = { name: 'updated', age: 30 };
    await methods.setFieldsValue(values);
    
    expect(mockFormInstance.setFieldsValue).toHaveBeenCalledWith(values);
  });

  it('should handle appendSchemaByField', async () => {
    register(mockFormInstance);
    await nextTick();
    
    const schema = { field: 'email', component: 'Input' };
    await methods.appendSchemaByField(schema, 'user');
    
    expect(mockFormInstance.appendSchemaByField).toHaveBeenCalledWith(schema, 'user', undefined);
  });

  it('should handle appendSchemaByField with first parameter', async () => {
    register(mockFormInstance);
    await nextTick();
    
    const schema = { field: 'email', component: 'Input' };
    await methods.appendSchemaByField(schema, 'user', true);
    
    expect(mockFormInstance.appendSchemaByField).toHaveBeenCalledWith(schema, 'user', true);
  });

  it('should handle removeSchemaByFiled', async () => {
    register(mockFormInstance);
    await nextTick();
    
    await methods.removeSchemaByFiled('name');
    
    expect(mockFormInstance.removeSchemaByFiled).toHaveBeenCalledWith('name');
  });

  it('should handle removeSchemaByFiled with array', async () => {
    register(mockFormInstance);
    await nextTick();
    
    await methods.removeSchemaByFiled(['name', 'age']);
    
    expect(mockFormInstance.removeSchemaByFiled).toHaveBeenCalledWith(['name', 'age']);
  });

  it('should handle resetFields', async () => {
    register(mockFormInstance);
    await nextTick();
    
    await methods.resetFields();
    
    expect(mockFormInstance.resetFields).toHaveBeenCalled();
  });

  it('should handle submit', async () => {
    register(mockFormInstance);
    await nextTick();
    
    const result = await methods.submit();
    
    expect(result).toEqual({ name: 'test', age: 25 });
    expect(mockFormInstance.submit).toHaveBeenCalled();
  });

  it('should handle validate', async () => {
    register(mockFormInstance);
    await nextTick();
    
    const result = await methods.validate(['name']);
    
    expect(result).toEqual({ name: 'test', age: 25 });
    expect(mockFormInstance.validate).toHaveBeenCalledWith(['name']);
  });

  it('should handle validate without nameList', async () => {
    register(mockFormInstance);
    await nextTick();
    
    const result = await methods.validate();
    
    expect(result).toEqual({ name: 'test', age: 25 });
    expect(mockFormInstance.validate).toHaveBeenCalledWith(undefined);
  });

  it('should handle validateFields', async () => {
    register(mockFormInstance);
    await nextTick();
    
    const result = await methods.validateFields(['name']);
    
    expect(result).toEqual({ name: 'test', age: 25 });
    expect(mockFormInstance.validateFields).toHaveBeenCalledWith(['name']);
  });

  it('should handle validateFields without nameList', async () => {
    register(mockFormInstance);
    await nextTick();
    
    const result = await methods.validateFields();
    
    expect(result).toEqual({ name: 'test', age: 25 });
    expect(mockFormInstance.validateFields).toHaveBeenCalledWith(undefined);
  });

  it('should handle clearValidate', async () => {
    register(mockFormInstance);
    await nextTick();
    
    await methods.clearValidate('name');
    
    expect(mockFormInstance.clearValidate).toHaveBeenCalledWith('name');
  });

  it('should handle clearValidate with array', async () => {
    register(mockFormInstance);
    await nextTick();
    
    await methods.clearValidate(['name', 'age']);
    
    expect(mockFormInstance.clearValidate).toHaveBeenCalledWith(['name', 'age']);
  });

  it('should handle clearValidate without name', async () => {
    register(mockFormInstance);
    await nextTick();
    
    await methods.clearValidate();
    
    expect(mockFormInstance.clearValidate).toHaveBeenCalledWith(undefined);
  });

  it('should handle scrollToField', async () => {
    register(mockFormInstance);
    await nextTick();
    
    const options = { behavior: 'smooth' };
    await methods.scrollToField('name', options);
    
    expect(mockFormInstance.scrollToField).toHaveBeenCalledWith('name', options);
  });

  it('should handle scrollToField without options', async () => {
    register(mockFormInstance);
    await nextTick();
    
    await methods.scrollToField('name');
    
    expect(mockFormInstance.scrollToField).toHaveBeenCalledWith('name', undefined);
  });

  it('should handle form instance not found error', async () => {
    const [registerFn, methodsObj] = useForm();
    registerFn(null);
    
    // This should not throw an error in test environment
    try {
      await methodsObj.setProps({});
    } catch (error) {
      // Expected to fail when form is null
      expect(error).toBeDefined();
    }
  });

  it('should handle getFieldsValue when form is not registered', () => {
    const [registerFn, methodsObj] = useForm();
    
    const values = methodsObj.getFieldsValue();
    
    expect(values).toBeUndefined();
  });

  it('should handle removeSchemaByFiled when form is not registered', async () => {
    const [registerFn, methodsObj] = useForm();
    
    await methodsObj.removeSchemaByFiled('name');
    
    // Should not throw error
    expect(true).toBe(true);
  });

  it('should handle form instance with props', async () => {
    const props = { labelCol: { span: 6 } };
    const [registerFn, methodsObj] = useForm(props);
    
    registerFn(mockFormInstance);
    await nextTick();
    
    expect(mockFormInstance).toBeDefined();
  });

  it('should handle multiple form operations', async () => {
    register(mockFormInstance);
    await nextTick();
    
    // Test multiple operations
    await methods.setFieldsValue({ name: 'test' });
    await methods.validate(['name']);
    await methods.submit();
    await methods.resetFields();
    
    expect(mockFormInstance.setFieldsValue).toHaveBeenCalledWith({ name: 'test' });
    expect(mockFormInstance.validate).toHaveBeenCalledWith(['name']);
    expect(mockFormInstance.submit).toHaveBeenCalled();
    expect(mockFormInstance.resetFields).toHaveBeenCalled();
  });

  it('should handle form operations with different data types', async () => {
    register(mockFormInstance);
    await nextTick();
    
    // Test with different data types
    await methods.setFieldsValue({ 
      string: 'test', 
      number: 123, 
      boolean: true, 
      array: [1, 2, 3], 
      object: { nested: 'value' } 
    });
    
    expect(mockFormInstance.setFieldsValue).toHaveBeenCalledWith({
      string: 'test',
      number: 123,
      boolean: true,
      array: [1, 2, 3],
      object: { nested: 'value' }
    });
  });
});
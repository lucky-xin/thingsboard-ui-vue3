import { describe, it, expect, vi } from 'vitest';

// Mock form hooks
vi.mock('/@/components/Form/src/hooks/useComponentRegister', () => ({
  useComponentRegister: vi.fn(),
}));

vi.mock('/@/components/Form/src/hooks/useForm', () => ({
  useForm: vi.fn(),
}));

// Test Form component index exports
describe('Form/index', () => {
  it('should export BasicForm component', async () => {
    const { BasicForm } = await import('/@/components/Form');
    
    expect(BasicForm).toBeDefined();
    expect(typeof BasicForm).toBe('object');
  });

  it('should export form hooks', async () => {
    const { useComponentRegister, useForm } = await import('/@/components/Form');
    
    expect(useComponentRegister).toBeDefined();
    expect(useForm).toBeDefined();
    expect(typeof useComponentRegister).toBe('function');
    expect(typeof useForm).toBe('function');
  });

  it('should export form components', async () => {
    const {
      Select,
      TreeSelect,
      RadioGroup,
      RadioButtonGroup,
      CheckboxGroup,
      FormGroup
    } = await import('/@/components/Form');
    
    expect(Select).toBeDefined();
    expect(TreeSelect).toBeDefined();
    expect(RadioGroup).toBeDefined();
    expect(RadioButtonGroup).toBeDefined();
    expect(CheckboxGroup).toBeDefined();
    expect(FormGroup).toBeDefined();
  });

  it('should export typing definitions', async () => {
    // This tests that the typing exports don't throw errors
    const exports = await import('/@/components/Form');
    
    expect(exports).toBeDefined();
    expect(exports.BasicForm).toBeDefined();
  });

  it('should have correct exports count', async () => {
    const exports = await import('/@/components/Form');
    const exportKeys = Object.keys(exports);
    
    // Should export: BasicForm, hooks, and form components
    expect(exportKeys.length).toBeGreaterThanOrEqual(8);
    expect(exportKeys).toContain('BasicForm');
    expect(exportKeys).toContain('useForm');
    expect(exportKeys).toContain('useComponentRegister');
    expect(exportKeys).toContain('Select');
    expect(exportKeys).toContain('TreeSelect');
    expect(exportKeys).toContain('RadioGroup');
    expect(exportKeys).toContain('RadioButtonGroup');
    expect(exportKeys).toContain('CheckboxGroup');
    expect(exportKeys).toContain('FormGroup');
  });

  it('should have valid Vue components', async () => {
    const { BasicForm, Select, TreeSelect, FormGroup } = await import('/@/components/Form');
    
    expect(typeof BasicForm).toBe('object');
    expect(typeof Select).toBe('object');
    expect(typeof TreeSelect).toBe('object');
    expect(typeof FormGroup).toBe('object');
  });

  it('should export form components with proper structure', async () => {
    const { Select, TreeSelect, RadioGroup } = await import('/@/components/Form');
    
    // Form components should be Vue components
    expect(Select).toHaveProperty('__name');
    expect(TreeSelect).toHaveProperty('__name');
    expect(RadioGroup).toHaveProperty('__name');
  });
});
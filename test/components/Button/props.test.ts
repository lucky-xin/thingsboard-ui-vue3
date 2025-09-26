import { describe, it, expect } from 'vitest';
import { buttonProps } from '/@/components/Button/src/props';

describe('components/Button/props', () => {
  it('should define buttonProps with correct types', () => {
    expect(buttonProps).toBeDefined();
    expect(typeof buttonProps).toBe('object');
  });

  it('should have color prop with validator', () => {
    expect(buttonProps.color).toBeDefined();
    expect(buttonProps.color.type).toBe(String);
    expect(buttonProps.color.validator).toBeInstanceOf(Function);

    // Test validator function
    const validator = buttonProps.color.validator;
    expect(validator('error')).toBe(true);
    expect(validator('warning')).toBe(true);
    expect(validator('success')).toBe(true);
    expect(validator('')).toBe(true);
    expect(validator('invalid')).toBe(false);
  });

  it('should have loading prop as Boolean', () => {
    expect(buttonProps.loading).toBeDefined();
    expect(buttonProps.loading.type).toBe(Boolean);
  });

  it('should have disabled prop as Boolean', () => {
    expect(buttonProps.disabled).toBeDefined();
    expect(buttonProps.disabled.type).toBe(Boolean);
  });

  it('should have preIcon prop as String', () => {
    expect(buttonProps.preIcon).toBeDefined();
    expect(buttonProps.preIcon.type).toBe(String);
  });

  it('should have postIcon prop as String', () => {
    expect(buttonProps.postIcon).toBeDefined();
    expect(buttonProps.postIcon.type).toBe(String);
  });

  it('should have iconSize prop with default value', () => {
    expect(buttonProps.iconSize).toBeDefined();
    expect(buttonProps.iconSize.type).toBe(Number);
    expect(buttonProps.iconSize.default).toBe(14);
  });

  it('should have onClick prop as Function', () => {
    expect(buttonProps.onClick).toBeDefined();
    expect(buttonProps.onClick.type).toBe(Function);
    expect(buttonProps.onClick.default).toBe(null);
  });
});

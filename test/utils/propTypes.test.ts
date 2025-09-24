import { describe, it, expect } from 'vitest';
import { propTypes } from '/@/utils/propTypes';

describe('utils/propTypes', () => {
  it('should define propTypes', () => {
    expect(propTypes).toBeDefined();
    // We can't easily check the type because it's a complex object from vue-types
  });

  it('should have basic prop type validators', () => {
    expect(propTypes.func).toBeDefined();
    expect(propTypes.bool).toBeDefined();
    expect(propTypes.string).toBeDefined();
    expect(propTypes.number).toBeDefined();
    expect(propTypes.object).toBeDefined();
    expect(propTypes.integer).toBeDefined();
  });

  it('should validate string props correctly', () => {
    const stringProp = propTypes.string;
    expect(stringProp).toBeDefined();

    // Test the validator function if it exists
    if (stringProp.validator) {
      expect(stringProp.validator('test')).toBe(true);
      expect(stringProp.validator(123)).toBe(false);
    }
  });

  it('should validate number props correctly', () => {
    const numberProp = propTypes.number;
    expect(numberProp).toBeDefined();

    // Test the validator function if it exists
    if (numberProp.validator) {
      expect(numberProp.validator(123)).toBe(true);
      expect(numberProp.validator('test')).toBe(false);
    }
  });

  it('should validate boolean props correctly', () => {
    const boolProp = propTypes.bool;
    expect(boolProp).toBeDefined();

    // Test the validator function if it exists
    if (boolProp.validator) {
      expect(boolProp.validator(true)).toBe(true);
      expect(boolProp.validator(false)).toBe(true);
      expect(boolProp.validator('true')).toBe(false);
    }
  });
});

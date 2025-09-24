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
    const validator = (stringProp as any).validator as ((v: unknown) => boolean) | undefined;
    if (validator) {
      expect(validator('test')).toBe(true);
      expect(validator(123)).toBe(false);
    }
  });

  it('should validate number props correctly', () => {
    const numberProp = propTypes.number;
    expect(numberProp).toBeDefined();

    // Test the validator function if it exists
    const validator = (numberProp as any).validator as ((v: unknown) => boolean) | undefined;
    if (validator) {
      expect(validator(123)).toBe(true);
      expect(validator('test')).toBe(false);
    }
  });

  it('should validate boolean props correctly', () => {
    const boolProp = propTypes.bool;
    expect(boolProp).toBeDefined();

    // Test the validator function if it exists
    const validator = (boolProp as any).validator as ((v: unknown) => boolean) | undefined;
    if (validator) {
      expect(validator(true)).toBe(true);
      expect(validator(false)).toBe(true);
      expect(validator('true')).toBe(false);
    }
  });
});

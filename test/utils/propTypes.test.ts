import { describe, it, expect } from 'vitest';
import { propTypes } from '/@/utils/propTypes';

describe('utils/propTypes', () => {
  it('should export propTypes object', () => {
    expect(propTypes).toBeDefined();
    expect(typeof propTypes).toBe('function');
  });

  it('should have func property', () => {
    expect(propTypes.func).toBeDefined();
  });

  it('should have bool property', () => {
    expect(propTypes.bool).toBeDefined();
  });

  it('should have string property', () => {
    expect(propTypes.string).toBeDefined();
  });

  it('should have number property', () => {
    expect(propTypes.number).toBeDefined();
  });

  it('should have object property', () => {
    expect(propTypes.object).toBeDefined();
  });

  it('should have integer property', () => {
    expect(propTypes.integer).toBeDefined();
  });

  it('should have style property', () => {
    expect(propTypes.style).toBeDefined();
  });

  it('should have VNodeChild property', () => {
    expect(propTypes.VNodeChild).toBeDefined();
  });

  it('should be able to create validators', () => {
    const stringValidator = propTypes.string;
    expect(stringValidator).toBeDefined();
    
    const boolValidator = propTypes.bool;
    expect(boolValidator).toBeDefined();
    
    const numberValidator = propTypes.number;
    expect(numberValidator).toBeDefined();
  });

  it('should have all expected properties', () => {
    const expectedProps = ['func', 'bool', 'string', 'number', 'object', 'integer', 'style', 'VNodeChild'];
    
    expectedProps.forEach(prop => {
      expect(propTypes).toHaveProperty(prop);
    });
  });
});
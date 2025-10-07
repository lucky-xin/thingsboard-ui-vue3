import { describe, it, expect, vi } from 'vitest';

// Mock dependencies
vi.mock('/@/utils/propTypes', () => ({
  propTypes: {
    bool: {
      def: vi.fn((value) => ({ type: Boolean, default: value })),
    },
    string: {
      def: vi.fn((value) => ({ type: String, default: value })),
    },
    number: {
      def: vi.fn((value) => ({ type: Number, default: value })),
    },
    func: {
      def: vi.fn((value) => ({ type: Function, default: value })),
    },
  },
}));

import { buttonProps } from '/@/components/Button/src/props';
import { propTypes } from '/@/utils/propTypes';

const mockPropTypes = vi.mocked(propTypes);

describe('Button props coverage', () => {
  it('should define buttonProps with correct structure', () => {
    expect(buttonProps).toBeDefined();
    expect(typeof buttonProps).toBe('object');
  });

  it('should have color prop configured', () => {
    expect(buttonProps.color).toBeDefined();
    expect(buttonProps.color.type).toBe(String);
    expect(typeof buttonProps.color.validator).toBe('function');

    // Test validator
    const validator = buttonProps.color.validator as (v: string) => boolean;
    expect(validator('error')).toBe(true);
    expect(validator('warning')).toBe(true);
    expect(validator('success')).toBe(true);
    expect(validator('')).toBe(true);
    expect(validator('unknown')).toBe(false);
  });

  it('should have loading prop configured', () => {
    expect(buttonProps.loading).toBeDefined();
    expect(buttonProps.loading.type).toBe(Boolean);
  });

  it('should have disabled prop configured', () => {
    expect(buttonProps.disabled).toBeDefined();
    expect(buttonProps.disabled.type).toBe(Boolean);
  });

  it('should have preIcon prop configured', () => {
    expect(buttonProps.preIcon).toBeDefined();
    expect(buttonProps.preIcon.type).toBe(String);
  });

  it('should have postIcon prop configured', () => {
    expect(buttonProps.postIcon).toBeDefined();
    expect(buttonProps.postIcon.type).toBe(String);
  });

  it('should have iconSize prop configured', () => {
    expect(buttonProps.iconSize).toBeDefined();
    expect(buttonProps.iconSize.type).toBe(Number);
    expect(buttonProps.iconSize.default).toBe(14);
  });

  it('should have onClick prop configured', () => {
    expect(buttonProps.onClick).toBeDefined();
    expect(typeof buttonProps.onClick.type).toBe('function');
    expect(buttonProps.onClick.default).toBeNull();
  });

  it('should verify all props are defined', () => {
    const expectedProps = ['color', 'loading', 'disabled', 'preIcon', 'postIcon', 'iconSize', 'onClick'];
    expectedProps.forEach((propName) => {
      expect(buttonProps[propName]).toBeDefined();
    });
  });

  it('should test color validator with all valid values', () => {
    const validator = buttonProps.color.validator as (v: string) => boolean;
    const validValues = ['error', 'warning', 'success', ''];
    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });
  });

  it('should test color validator with invalid values', () => {
    const validator = buttonProps.color.validator as (v: string) => boolean;
    const invalidValues = ['primary', 'secondary', 'danger', 'info', 'unknown'];
    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });
});
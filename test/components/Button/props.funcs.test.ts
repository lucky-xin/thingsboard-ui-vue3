import { describe, it, expect } from 'vitest';
import { buttonProps } from '/@/components/Button/src/props';

describe('components/Button/src/props.ts funcs coverage', () => {
  it('color validator should accept allowed values and reject others', () => {
    const validator = (buttonProps as any).color.validator as (v: string) => boolean;
    expect(validator('error')).toBe(true);
    expect(validator('warning')).toBe(true);
    expect(validator('success')).toBe(true);
    expect(validator('')).toBe(true);
    expect(validator('primary')).toBe(false);
  });

  it('iconSize default and onClick default', () => {
    expect((buttonProps as any).iconSize.default).toBe(14);
    expect((buttonProps as any).onClick.default).toBe(null);
  });
});

import { describe, it, expect } from 'vitest';
import { buttonProps } from '/@/components/Button/src/props';

describe('components/Button/src/props', () => {
  it('should expose expected prop keys and defaults', () => {
    expect(Object.keys(buttonProps)).toEqual(
      expect.arrayContaining(['color', 'loading', 'disabled', 'preIcon', 'postIcon', 'iconSize', 'onClick']),
    );
    // default icon size
    expect((buttonProps as any).iconSize.default).toBe(14);
    // onClick default
    expect((buttonProps as any).onClick.default).toBe(null);
  });

  it('should validate color correctly', () => {
    const validator = (buttonProps as any).color.validator as (v: string) => boolean;
    expect(validator('error')).toBe(true);
    expect(validator('warning')).toBe(true);
    expect(validator('success')).toBe(true);
    expect(validator('')).toBe(true);
    expect(validator('unknown')).toBe(false);
  });
});

import { describe, it, expect } from 'vitest';
import { buttonProps } from '/@/components/Button/src/props';

describe('components/Button/src/props', () => {
  it('should validate color prop correctly', () => {
    const validator = (buttonProps as any).color.validator as (v: string) => boolean;
    expect(validator('error')).toBe(true);
    expect(validator('warning')).toBe(true);
    expect(validator('success')).toBe(true);
    expect(validator('')).toBe(true);
    expect(validator('primary')).toBe(false);
  });

  it('should provide default iconSize', () => {
    expect((buttonProps as any).iconSize.default).toBe(14);
  });

  it('should have onClick default null', () => {
    expect((buttonProps as any).onClick.default).toBe(null);
  });
});

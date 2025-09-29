import { describe, it, expect } from 'vitest';
import { basicProps } from '/@/components/Form/src/props';

describe('components/Form/props basicProps', () => {
  it('should have default values for booleans and enums', () => {
    expect(basicProps.autoSetPlaceHolder.default).toBe(true);
    expect(basicProps.autoSubmitOnEnter.default).toBe(true);
    expect(basicProps.size.default).toBe('default');
    expect(basicProps.showActionButtonGroup.default).toBe(false);
    expect(basicProps.showResetButton.default).toBe(true);
    expect(basicProps.showSubmitButton.default).toBe(true);
    expect(basicProps.rulesMessageJoinLabel.default).toBe(true);
    expect(basicProps.validateTrigger.default).toBe('blur');
    expect(basicProps.autoAdvancedLine.default).toBe(1);
    expect(basicProps.alwaysShowLines.default).toBe(1);
    expect(basicProps.colon.default).toBe(true);
  });

  it('should format date by default transformDateFunc', () => {
    const m = { format: (fmt: string) => (fmt ? 'formatted' : '') } as any;
    // @ts-ignore
    const fn = basicProps.transformDateFunc.default as (d: any) => any;
    expect(fn(m)).toBe('formatted');
    expect(fn(null)).toBeNull();
  });
});

import { describe, it, expect } from 'vitest';

describe('StrengthMeter/index', () => {
  it('should export StrengthMeter component', async () => {
    const { StrengthMeter } = await import('/@/components/StrengthMeter/index');
    expect(StrengthMeter).toBeDefined();
  });
});
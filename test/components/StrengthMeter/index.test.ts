import { describe, it, expect } from 'vitest';

describe('StrengthMeter/index', () => {
  it('should export StrengthMeter component', async () => {
    const module = await import('/@/components/StrengthMeter/index');
    
    expect(module).toBeDefined();
    expect(module.StrengthMeter).toBeDefined();
  });

  it('should be valid Vue component', async () => {
    const module = await import('/@/components/StrengthMeter/index');
    const { StrengthMeter } = module;
    
    expect(typeof StrengthMeter).toBe('object');
  });

  it('should export only StrengthMeter', async () => {
    const module = await import('/@/components/StrengthMeter/index');
    const exports = Object.keys(module);
    
    expect(exports).toEqual(['StrengthMeter']);
  });

  it('should have component structure', async () => {
    const module = await import('/@/components/StrengthMeter/index');
    const { StrengthMeter } = module;
    
    expect(StrengthMeter).toBeDefined();
    expect(typeof StrengthMeter).toBe('object');
  });
});
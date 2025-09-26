import { describe, it, expect } from 'vitest';

describe('utils/lib/echarts', () => {
  it('should export ECharts utilities', async () => {
    const module = await import('/@/utils/lib/echarts');
    
    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  it('should export echarts utilities', async () => {
    const module = await import('/@/utils/lib/echarts');
    
    // Check that module has some exports
    const exportKeys = Object.keys(module);
    expect(exportKeys.length).toBeGreaterThan(0);
  });

  it('should be a valid echarts module', async () => {
    const module = await import('/@/utils/lib/echarts');
    
    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });
});
import { describe, it, expect } from 'vitest';

describe('hooks/useAppInject', () => {
  it('should export useAppInject hook', async () => {
    const module = await import('/@/hooks/web/useAppInject');
    
    expect(module).toBeDefined();
    expect(module.useAppInject).toBeDefined();
    expect(typeof module.useAppInject).toBe('function');
  });

  it('should be a valid hook module', async () => {
    const module = await import('/@/hooks/web/useAppInject');
    
    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });
});
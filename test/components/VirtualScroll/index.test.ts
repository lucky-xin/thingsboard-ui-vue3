import { describe, it, expect } from 'vitest';

describe('VirtualScroll/index', () => {
  it('should import module without error', async () => {
    const module = await import('/@/components/VirtualScroll/index');
    
    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  it('should export component', async () => {
    const module = await import('/@/components/VirtualScroll/index');
    
    // VirtualScroll exports VScroll
    expect(module.VScroll).toBeDefined();
  });
});
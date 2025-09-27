import { describe, it, expect } from 'vitest';

// Test VirtualScroll component index exports without mocks to get real coverage
describe('VirtualScroll/index coverage', () => {
  it('should export VScroll component', async () => {
    const module = await import('/@/components/VirtualScroll');
    
    expect(module.VScroll).toBeDefined();
  });

  it('should have correct component structure', async () => {
    const { VScroll } = await import('/@/components/VirtualScroll');
    
    // Check that component is wrapped with withInstall
    expect(VScroll).toHaveProperty('install');
  });

  it('should be valid Vue component', async () => {
    const { VScroll } = await import('/@/components/VirtualScroll');
    
    expect(typeof VScroll).toBe('object');
  });

  it('should be importable as named export', async () => {
    const { VScroll } = await import('/@/components/VirtualScroll');
    
    expect(VScroll).toBeDefined();
  });

  it('should export only expected components', async () => {
    const module = await import('/@/components/VirtualScroll');
    const exportKeys = Object.keys(module);
    
    expect(exportKeys).toContain('VScroll');
    expect(exportKeys).toHaveLength(1);
  });
});
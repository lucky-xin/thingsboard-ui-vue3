import { describe, it, expect } from 'vitest';

// Test Time component index exports without mocks to get real coverage
describe('Time/index coverage', () => {
  it('should export Time component', async () => {
    const module = await import('/@/components/Time');
    
    expect(module.Time).toBeDefined();
  }, 10000); // Increase timeout to 10 seconds

  it('should have correct component structure', async () => {
    const { Time } = await import('/@/components/Time');
    
    // Check that component is wrapped with withInstall
    expect(Time).toHaveProperty('install');
  });

  it('should be valid Vue component', async () => {
    const { Time } = await import('/@/components/Time');
    
    expect(typeof Time).toBe('object');
  });

  it('should be importable as named export', async () => {
    const { Time } = await import('/@/components/Time');
    
    expect(Time).toBeDefined();
  });

  it('should export only expected components', async () => {
    const module = await import('/@/components/Time');
    const exportKeys = Object.keys(module);
    
    expect(exportKeys).toContain('Time');
    expect(exportKeys).toHaveLength(1);
  });
});


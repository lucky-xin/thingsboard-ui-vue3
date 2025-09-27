import { describe, it, expect } from 'vitest';

// Test CardList component index exports without mocks to get real coverage
describe('CardList/index coverage', () => {
  it('should export CardList component', async () => {
    const module = await import('/@/components/CardList');
    
    expect(module.CardList).toBeDefined();
  });

  it('should have correct component structure', async () => {
    const { CardList } = await import('/@/components/CardList');
    
    // Check that component is wrapped with withInstall
    expect(CardList).toHaveProperty('install');
  });

  it('should be valid Vue component', async () => {
    const { CardList } = await import('/@/components/CardList');
    
    expect(typeof CardList).toBe('object');
  });

  it('should be importable as named export', async () => {
    const { CardList } = await import('/@/components/CardList');
    
    expect(CardList).toBeDefined();
  });

  it('should export only expected components', async () => {
    const module = await import('/@/components/CardList');
    const exportKeys = Object.keys(module);
    
    expect(exportKeys).toContain('CardList');
    expect(exportKeys).toHaveLength(1);
  });
});
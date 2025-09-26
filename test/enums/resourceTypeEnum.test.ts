import { describe, it, expect } from 'vitest';

describe('enums/resourceTypeEnum', () => {
  it('should export resource type enums', async () => {
    const module = await import('/@/enums/resourceTypeEnum');
    
    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  it('should export ResourceType', async () => {
    const module = await import('/@/enums/resourceTypeEnum');
    
    expect(module.ResourceType).toBeDefined();
    expect(typeof module.ResourceType).toBe('object');
  });

  it('should be a valid enum module', async () => {
    const module = await import('/@/enums/resourceTypeEnum');
    
    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });
});
import { describe, it, expect } from 'vitest';

describe('utils/event/index', () => {
  it('should export event utilities', async () => {
    const module = await import('/@/utils/event/index');
    
    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  it('should export addResizeListener function', async () => {
    const module = await import('/@/utils/event/index');
    
    expect(module.addResizeListener).toBeDefined();
    expect(typeof module.addResizeListener).toBe('function');
  });

  it('should export removeResizeListener function', async () => {
    const module = await import('/@/utils/event/index');
    
    expect(module.removeResizeListener).toBeDefined();
    expect(typeof module.removeResizeListener).toBe('function');
  });

  it('should export triggerResize function', async () => {
    const module = await import('/@/utils/event/index');
    
    expect(module.triggerResize).toBeDefined();
    expect(typeof module.triggerResize).toBe('function');
  });
});

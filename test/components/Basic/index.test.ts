import { describe, it, expect, vi } from 'vitest';

// Mock withInstall utility
vi.mock('/@/utils', () => ({
  withInstall: vi.fn((component) => ({
    ...component,
    install: vi.fn(),
  })),
}));

// Test Basic component index exports
describe('Basic/index', () => {
  it('should export BasicArrow, BasicTitle, and BasicHelp components with withInstall', async () => {
    const { BasicArrow, BasicTitle, BasicHelp } = await import('/@/components/Basic');
    
    expect(BasicArrow).toBeDefined();
    expect(BasicTitle).toBeDefined();
    expect(BasicHelp).toBeDefined();
    expect(BasicArrow.install).toBeDefined();
    expect(BasicTitle.install).toBeDefined();
    expect(BasicHelp.install).toBeDefined();
  });

  it('should have install method for all components', async () => {
    const { BasicArrow, BasicTitle, BasicHelp } = await import('/@/components/Basic');
    
    expect(BasicArrow.install).toBeDefined();
    expect(BasicTitle.install).toBeDefined();
    expect(BasicHelp.install).toBeDefined();
    expect(typeof BasicArrow.install).toBe('function');
    expect(typeof BasicTitle.install).toBe('function');
    expect(typeof BasicHelp.install).toBe('function');
  });

  it('should install components correctly', async () => {
    const { BasicArrow, BasicTitle, BasicHelp } = await import('/@/components/Basic');
    const mockApp = {
      component: vi.fn(),
    };
    
    BasicArrow.install(mockApp as any);
    BasicTitle.install(mockApp as any);
    BasicHelp.install(mockApp as any);
    
    expect(mockApp.component).toHaveBeenCalledTimes(3);
  });

  it('should have correct component names', async () => {
    const { BasicArrow, BasicTitle, BasicHelp } = await import('/@/components/Basic');
    
    expect(BasicArrow).toHaveProperty('__name');
    expect(BasicTitle).toHaveProperty('__name');
    expect(BasicHelp).toHaveProperty('__name');
  });

  it('should export all three basic components', async () => {
    const exports = await import('/@/components/Basic');
    const exportKeys = Object.keys(exports);
    
    expect(exportKeys).toEqual(['BasicArrow', 'BasicTitle', 'BasicHelp']);
  });

  it('should be valid Vue components', async () => {
    const { BasicArrow, BasicTitle, BasicHelp } = await import('/@/components/Basic');
    
    expect(BasicArrow).toBeDefined();
    expect(BasicTitle).toBeDefined();
    expect(BasicHelp).toBeDefined();
    expect(typeof BasicArrow).toBe('object');
    expect(typeof BasicTitle).toBe('object');
    expect(typeof BasicHelp).toBe('object');
  });

  it('should export components with proper structure', async () => {
    const { BasicArrow, BasicTitle, BasicHelp } = await import('/@/components/Basic');
    
    // Components should have install method from withInstall
    expect(BasicArrow.install).toBeInstanceOf(Function);
    expect(BasicTitle.install).toBeInstanceOf(Function);
    expect(BasicHelp.install).toBeInstanceOf(Function);
  });
});
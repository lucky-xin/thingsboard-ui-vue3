import { describe, it, expect, vi } from 'vitest';

// Mock withInstall utility
vi.mock('/@/utils', () => ({
  withInstall: vi.fn((component) => {
    const mockComponent = {
      ...component,
      install: vi.fn((app, name) => {
        app.component(name || component.name || 'MockComponent', component);
      }),
    };
    return mockComponent;
  }),
  deepMerge: vi.fn((target, source) => ({ ...target, ...source })),
}));

// Mock modal hooks
vi.mock('/@/components/Modal/src/hooks/useModalContext', () => ({
  useModalContext: vi.fn(),
}));

vi.mock('/@/components/Modal/src/hooks/useModal', () => ({
  useModal: vi.fn(),
  useModalInner: vi.fn(),
}));

// Test Modal component index exports
describe('Modal/index', () => {
  it('should export BasicModal component with withInstall', async () => {
    const { BasicModal } = await import('/@/components/Modal');

    expect(BasicModal).toBeDefined();
    expect(BasicModal.install).toBeDefined();
  });

  it('should export modal hooks', async () => {
    const { useModalContext, useModal, useModalInner } = await import('/@/components/Modal');

    expect(useModalContext).toBeDefined();
    expect(useModal).toBeDefined();
    expect(useModalInner).toBeDefined();
    expect(typeof useModalContext).toBe('function');
    expect(typeof useModal).toBe('function');
    expect(typeof useModalInner).toBe('function');
  });

  it('should have install method for BasicModal', async () => {
    const { BasicModal } = await import('/@/components/Modal');

    expect(BasicModal.install).toBeDefined();
    expect(typeof BasicModal.install).toBe('function');
  });

  it('should install component correctly', async () => {
    const { BasicModal } = await import('/@/components/Modal');
    const mockApp = {
      component: vi.fn(),
    };

    BasicModal.install(mockApp as any, 'TestBasicModal');
    expect(mockApp.component).toHaveBeenCalledWith('TestBasicModal', expect.any(Object));
  });

  it('should export typing definitions', async () => {
    // This tests that the typing exports don't throw errors
    const exports = await import('/@/components/Modal');

    expect(exports).toBeDefined();
    expect(exports.BasicModal).toBeDefined();
  });

  it('should have correct exports count', async () => {
    const exports = await import('/@/components/Modal');
    const exportKeys = Object.keys(exports);

    // Should export: BasicModal, hooks, and typing exports
    expect(exportKeys).toContain('BasicModal');
    expect(exportKeys).toContain('useModalContext');
    expect(exportKeys).toContain('useModal');
    expect(exportKeys).toContain('useModalInner');
    expect(exportKeys.length).toBeGreaterThanOrEqual(4);
  });

  it('should be valid Vue component', async () => {
    const { BasicModal } = await import('/@/components/Modal');

    expect(BasicModal).toBeDefined();
    expect(typeof BasicModal).toBe('object');
  });

  it('should export component with proper structure', async () => {
    const { BasicModal } = await import('/@/components/Modal');

    // Component should have install method from withInstall
    expect(BasicModal.install).toBeInstanceOf(Function);
  });
});

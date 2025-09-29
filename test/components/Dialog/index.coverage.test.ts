import { describe, it, expect } from 'vitest';

// Test Dialog component index exports without mocks to get real coverage
describe('Dialog/index coverage', () => {
  it('should export BasicDialog component and BasicDialogInstance type', async () => {
    const { BasicDialog, BasicDialogInstance } = await import('/@/components/Dialog');

    expect(BasicDialog).toBeDefined();
    expect(BasicDialogInstance).toBeDefined();
  });

  it('should have install method for BasicDialog component', async () => {
    const { BasicDialog } = await import('/@/components/Dialog');

    expect(BasicDialog.install).toBeDefined();
    expect(typeof BasicDialog.install).toBe('function');
  });

  it('should install component correctly', async () => {
    const { BasicDialog } = await import('/@/components/Dialog');
    const mockApp = {
      component: vi.fn(),
    };

    BasicDialog.install(mockApp as any);

    expect(mockApp.component).toHaveBeenCalledTimes(1);
  });

  it('should export all expected components and types', async () => {
    const exports = await import('/@/components/Dialog');
    const exportKeys = Object.keys(exports);

    expect(exportKeys).toContain('BasicDialog');
    expect(exportKeys).toContain('BasicDialogInstance');
  });

  it('should be valid Vue component', async () => {
    const { BasicDialog } = await import('/@/components/Dialog');

    expect(BasicDialog).toBeDefined();
    expect(typeof BasicDialog).toBe('object');
  });

  it('should export component with proper structure', async () => {
    const { BasicDialog } = await import('/@/components/Dialog');

    // Component should have install method from withInstall
    expect(BasicDialog.install).toBeInstanceOf(Function);
  });

  it('should work with withInstall utility', async () => {
    const { BasicDialog } = await import('/@/components/Dialog');

    // Test that withInstall was applied correctly
    expect(BasicDialog).toHaveProperty('install');

    // Test that install method works
    const mockApp = { component: vi.fn() };
    BasicDialog.install(mockApp as any);

    expect(mockApp.component).toHaveBeenCalledTimes(1);
  });

  it('should have correct component name', async () => {
    const { BasicDialog } = await import('/@/components/Dialog');

    expect(BasicDialog).toHaveProperty('__name');
  });

  it('should export type definition', async () => {
    const { BasicDialogInstance } = await import('/@/components/Dialog');

    // Type should be defined (though we can't test its actual type at runtime)
    expect(BasicDialogInstance).toBeDefined();
  });
});

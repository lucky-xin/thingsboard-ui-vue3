import { describe, it, expect, vi } from 'vitest';

// Mock withInstall utility
const mockWithInstall = vi.fn((component) => ({
  ...component,
  install: vi.fn(),
}));

vi.mock('/@/utils', () => ({
  withInstall: mockWithInstall,
}));

// Mock BasicDialog.vue component
vi.mock('/@/components/Dialog/src/BasicDialog.vue', () => ({
  default: {
    name: 'BasicDialog',
    template: '<div class="mock-basic-dialog"><slot /></div>',
  },
}));

describe('components/Dialog/index', () => {
  it('should export BasicDialog component with install method', async () => {
    const { BasicDialog } = await import('/@/components/Dialog/index');
    
    expect(BasicDialog).toBeDefined();
    expect(BasicDialog.name).toBe('BasicDialog');
    expect(BasicDialog.install).toBeDefined();
    expect(typeof BasicDialog.install).toBe('function');
  });

  it('should export BasicDialogInstance type', async () => {
    const dialogModule = await import('/@/components/Dialog/index');
    
    // Check that the type export exists (types don't exist at runtime)
    expect(dialogModule).toHaveProperty('BasicDialogInstance');
  });

  it('should have all expected exports', async () => {
    const dialogModule = await import('/@/components/Dialog/index');
    
    expect(dialogModule.BasicDialog).toBeDefined();
    expect(dialogModule).toHaveProperty('BasicDialogInstance');
  });
});
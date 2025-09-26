import { describe, it, expect, vi } from 'vitest';

// Mock withInstall utility
vi.mock('/@/utils', () => ({
  withInstall: vi.fn((component) => ({
    ...component,
    install: vi.fn(),
  })),
}));

// Mock button props
vi.mock('/@/components/Button/src/props', () => ({
  buttonProps: {
    type: { type: String, default: 'default' },
    size: { type: String, default: 'middle' },
    loading: { type: Boolean, default: false },
  },
}));

// Test Button component index exports
describe('Button/index', () => {
  it('should export Button and PopConfirmButton components with withInstall', async () => {
    const { Button, PopConfirmButton } = await import('/@/components/Button');
    
    expect(Button).toBeDefined();
    expect(PopConfirmButton).toBeDefined();
    expect(Button.install).toBeDefined();
    expect(PopConfirmButton.install).toBeDefined();
  });

  it('should have install method for Button', async () => {
    const { Button } = await import('/@/components/Button');
    
    expect(Button.install).toBeDefined();
    expect(typeof Button.install).toBe('function');
  });

  it('should have install method for PopConfirmButton', async () => {
    const { PopConfirmButton } = await import('/@/components/Button');
    
    expect(PopConfirmButton.install).toBeDefined();
    expect(typeof PopConfirmButton.install).toBe('function');
  });

  it('should install components correctly', async () => {
    const { Button, PopConfirmButton } = await import('/@/components/Button');
    const mockApp = {
      component: vi.fn(),
    };
    
    Button.install(mockApp as any);
    PopConfirmButton.install(mockApp as any);
    
    expect(mockApp.component).toHaveBeenCalledTimes(2);
  });

  it('should have correct component names', async () => {
    const { Button, PopConfirmButton } = await import('/@/components/Button');
    
    expect(Button).toHaveProperty('__name');
    expect(PopConfirmButton).toHaveProperty('__name');
  });

  it('should export Button and PopConfirmButton only', async () => {
    const exports = await import('/@/components/Button');
    const exportKeys = Object.keys(exports);
    
    expect(exportKeys).toEqual(['Button', 'PopConfirmButton']);
  });

  it('should be valid Vue components', async () => {
    const { Button, PopConfirmButton } = await import('/@/components/Button');
    
    expect(Button).toBeDefined();
    expect(PopConfirmButton).toBeDefined();
    expect(typeof Button).toBe('object');
    expect(typeof PopConfirmButton).toBe('object');
  });

  it('should export components with proper structure', async () => {
    const { Button, PopConfirmButton } = await import('/@/components/Button');
    
    // Components should have install method from withInstall
    expect(Button.install).toBeInstanceOf(Function);
    expect(PopConfirmButton.install).toBeInstanceOf(Function);
  });
});
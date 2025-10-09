import { describe, it, expect, vi } from 'vitest';

// Mock withInstall utility
const mockWithInstall = vi.fn((component) => ({
  ...component,
  install: vi.fn(),
}));

vi.mock('/@/utils', () => ({
  withInstall: mockWithInstall,
}));

// Mock Authority.vue component
vi.mock('/@/components/Authority/src/Authority.vue', () => ({
  default: {
    name: 'Authority',
    template: '<div class="mock-authority"><slot /></div>',
  },
}));

describe('components/Authority/index', () => {
  it('should export Authority component with install method', async () => {
    const { Authority } = await import('/@/components/Authority/index');
    
    expect(Authority).toBeDefined();
    expect(Authority.name).toBe('Authority');
    expect(Authority.install).toBeDefined();
    expect(typeof Authority.install).toBe('function');
  });

  it('should have correct component structure', async () => {
    const { Authority } = await import('/@/components/Authority/index');
    
    expect(Authority).toHaveProperty('name');
    expect(Authority).toHaveProperty('template');
    expect(Authority).toHaveProperty('install');
  });

  it('should be wrapped by withInstall utility', async () => {
    const { Authority } = await import('/@/components/Authority/index');
    
    // Verify that the component has the install method added by withInstall
    expect(Authority.install).toBeDefined();
    expect(typeof Authority.install).toBe('function');
  });
});
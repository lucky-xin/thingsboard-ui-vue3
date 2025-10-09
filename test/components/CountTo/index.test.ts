import { describe, it, expect, vi } from 'vitest';

// Mock withInstall utility
const mockWithInstall = vi.fn((component) => ({
  ...component,
  install: vi.fn(),
}));

vi.mock('/@/utils', () => ({
  withInstall: mockWithInstall,
}));

// Mock CountTo.vue component
vi.mock('/@/components/CountTo/src/CountTo.vue', () => ({
  default: {
    name: 'CountTo',
    template: '<div class="mock-count-to"><slot /></div>',
  },
}));

describe('components/CountTo/index', () => {
  it('should export CountTo component with install method', async () => {
    const { CountTo } = await import('/@/components/CountTo/index');
    
    expect(CountTo).toBeDefined();
    expect(CountTo.name).toBe('CountTo');
    expect(CountTo.install).toBeDefined();
    expect(typeof CountTo.install).toBe('function');
  });

  it('should have correct component structure', async () => {
    const { CountTo } = await import('/@/components/CountTo/index');
    
    expect(CountTo).toHaveProperty('name');
    expect(CountTo).toHaveProperty('template');
    expect(CountTo).toHaveProperty('install');
  });

  it('should be wrapped by withInstall utility', async () => {
    const { CountTo } = await import('/@/components/CountTo/index');
    
    // Verify that the component has the install method added by withInstall
    expect(CountTo.install).toBeDefined();
    expect(typeof CountTo.install).toBe('function');
  });
});
import { describe, it, expect, vi } from 'vitest';

// Mock withInstall utility
const mockWithInstall = vi.fn((component) => ({
  ...component,
  install: vi.fn(),
}));

vi.mock('/@/utils', () => ({
  withInstall: mockWithInstall,
}));

// Mock CardList.vue component
vi.mock('/@/components/CardList/src/CardList.vue', () => ({
  default: {
    name: 'CardList',
    template: '<div class="mock-card-list"><slot /></div>',
  },
}));

describe('components/CardList/index', () => {
  it('should export CardList component with install method', async () => {
    const { CardList } = await import('/@/components/CardList/index');
    
    expect(CardList).toBeDefined();
    expect(CardList.name).toBe('CardList');
    expect(CardList.install).toBeDefined();
    expect(typeof CardList.install).toBe('function');
  });

  it('should have correct component structure', async () => {
    const { CardList } = await import('/@/components/CardList/index');
    
    expect(CardList).toHaveProperty('name');
    expect(CardList).toHaveProperty('template');
    expect(CardList).toHaveProperty('install');
  });

  it('should be wrapped by withInstall utility', async () => {
    const { CardList } = await import('/@/components/CardList/index');
    
    // Verify that the component has the install method added by withInstall
    expect(CardList.install).toBeDefined();
    expect(typeof CardList.install).toBe('function');
  });
});
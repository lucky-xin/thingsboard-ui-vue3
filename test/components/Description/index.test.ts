import { describe, it, expect, vi } from 'vitest';

// Mock withInstall utility
const mockWithInstall = vi.fn((component) => ({
  ...component,
  install: vi.fn(),
}));

vi.mock('/@/utils', () => ({
  withInstall: mockWithInstall,
}));

// Mock Description.vue component
vi.mock('/@/components/Description/src/Description.vue', () => ({
  default: {
    name: 'Description',
    template: '<div class="mock-description"><slot /></div>',
  },
}));

// Mock typing exports
vi.mock('/@/components/Description/src/typing', () => ({
  DescriptionProps: {},
  DescriptionItemProps: {},
}));

// Mock useDescription hook
vi.mock('/@/components/Description/src/useDescription', () => ({
  useDescription: vi.fn(),
}));

describe('components/Description/index', () => {
  it('should export Description component with install method', async () => {
    const { Description } = await import('/@/components/Description/index');
    
    expect(Description).toBeDefined();
    expect(Description.name).toBe('Description');
    expect(Description.install).toBeDefined();
    expect(typeof Description.install).toBe('function');
  });

  it('should export useDescription hook', async () => {
    const { useDescription } = await import('/@/components/Description/index');
    
    expect(useDescription).toBeDefined();
    expect(typeof useDescription).toBe('function');
  });

  it('should have all expected exports', async () => {
    const descriptionModule = await import('/@/components/Description/index');
    
    expect(descriptionModule.Description).toBeDefined();
    expect(descriptionModule.useDescription).toBeDefined();
  });
});
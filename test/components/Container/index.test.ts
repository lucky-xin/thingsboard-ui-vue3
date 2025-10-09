import { describe, it, expect, vi } from 'vitest';

// Mock withInstall utility
const mockWithInstall = vi.fn((component) => ({
  ...component,
  install: vi.fn(),
}));

vi.mock('/@/utils', () => ({
  withInstall: mockWithInstall,
}));

// Mock Vue components
vi.mock('/@/components/Container/src/collapse/CollapseContainer.vue', () => ({
  default: {
    name: 'CollapseContainer',
    template: '<div class="mock-collapse-container"><slot /></div>',
  },
}));

vi.mock('/@/components/Container/src/ScrollContainer.vue', () => ({
  default: {
    name: 'ScrollContainer',
    template: '<div class="mock-scroll-container"><slot /></div>',
  },
}));

vi.mock('/@/components/Container/src/LazyContainer.vue', () => ({
  default: {
    name: 'LazyContainer',
    template: '<div class="mock-lazy-container"><slot /></div>',
  },
}));

// Mock typing exports
vi.mock('/@/components/Container/src/typing', () => ({
  ContainerProps: {},
  ScrollContainerProps: {},
  LazyContainerProps: {},
}));

describe('components/Container/index', () => {
  it('should export CollapseContainer component with install method', async () => {
    const { CollapseContainer } = await import('/@/components/Container/index');
    
    expect(CollapseContainer).toBeDefined();
    expect(CollapseContainer.name).toBe('CollapseContainer');
    expect(CollapseContainer.install).toBeDefined();
    expect(typeof CollapseContainer.install).toBe('function');
  });

  it('should export ScrollContainer component with install method', async () => {
    const { ScrollContainer } = await import('/@/components/Container/index');
    
    expect(ScrollContainer).toBeDefined();
    expect(ScrollContainer.name).toBe('ScrollContainer');
    expect(ScrollContainer.install).toBeDefined();
    expect(typeof ScrollContainer.install).toBe('function');
  });

  it('should export LazyContainer component with install method', async () => {
    const { LazyContainer } = await import('/@/components/Container/index');
    
    expect(LazyContainer).toBeDefined();
    expect(LazyContainer.name).toBe('LazyContainer');
    expect(LazyContainer.install).toBeDefined();
    expect(typeof LazyContainer.install).toBe('function');
  });

  it('should have all expected component exports', async () => {
    const containerModule = await import('/@/components/Container/index');
    
    expect(containerModule.CollapseContainer).toBeDefined();
    expect(containerModule.ScrollContainer).toBeDefined();
    expect(containerModule.LazyContainer).toBeDefined();
  });
});
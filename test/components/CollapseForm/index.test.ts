import { describe, it, expect, vi } from 'vitest';

// Mock CollapseForm.vue component
vi.mock('/@/components/CollapseForm/src/CollapseForm.vue', () => ({
  default: {
    name: 'CollapseForm',
    template: '<div class="mock-collapse-form"><slot /></div>',
  },
}));

describe('components/CollapseForm/index', () => {
  it('should export CollapseForm component', async () => {
    const { CollapseForm } = await import('/@/components/CollapseForm/index');
    
    expect(CollapseForm).toBeDefined();
    expect(CollapseForm.name).toBe('CollapseForm');
  });

  it('should have correct component structure', async () => {
    const { CollapseForm } = await import('/@/components/CollapseForm/index');
    
    expect(CollapseForm).toHaveProperty('name');
    expect(CollapseForm).toHaveProperty('template');
  });

  it('should export CollapseForm as named export', async () => {
    const collapseFormModule = await import('/@/components/CollapseForm/index');
    
    expect(collapseFormModule.CollapseForm).toBeDefined();
    expect(collapseFormModule.CollapseForm.name).toBe('CollapseForm');
  });
});
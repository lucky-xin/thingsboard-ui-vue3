import { describe, it, expect } from 'vitest';
import { CollapseForm } from '/@/components/CollapseForm';

describe('CollapseForm/index', () => {
  it('should export CollapseForm component', () => {
    expect(CollapseForm).toBeDefined();
    expect(typeof CollapseForm).toBe('object');
  });

  it('should have component name or __name', () => {
    expect(CollapseForm.name || CollapseForm.__name).toBeTruthy();
  });

  it('should be a Vue component', () => {
    // Vue 3 components have either setup, render, or template
    expect(CollapseForm.setup || CollapseForm.render || CollapseForm.template).toBeTruthy();
  });

  it('should be importable from index', async () => {
    const module = await import('/@/components/CollapseForm');
    expect(module.CollapseForm).toBeDefined();
    expect(module.CollapseForm).toBe(CollapseForm);
  });
});
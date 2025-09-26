import { describe, it, expect } from 'vitest';

describe('CollapseForm/index', () => {
  it('should export CollapseForm component', async () => {
    const { CollapseForm } = await import('/@/components/CollapseForm/index');
    expect(CollapseForm).toBeDefined();
  });
});
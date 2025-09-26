import { describe, it, expect } from 'vitest';

describe('Container/index', () => {
  it('should export CollapseContainer component', async () => {
    const { CollapseContainer } = await import('/@/components/Container/index');
    expect(CollapseContainer).toBeDefined();
  });

  it('should export ScrollContainer component', async () => {
    const { ScrollContainer } = await import('/@/components/Container/index');
    expect(ScrollContainer).toBeDefined();
  });

  it('should export LazyContainer component', async () => {
    const { LazyContainer } = await import('/@/components/Container/index');
    expect(LazyContainer).toBeDefined();
  });
});
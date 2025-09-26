import { describe, it, expect } from 'vitest';

describe('VirtualScroll/index', () => {
  it('should export VirtualScroll component', async () => {
    const { VirtualScroll } = await import('/@/components/VirtualScroll/index');
    expect(VirtualScroll).toBeDefined();
  });
});
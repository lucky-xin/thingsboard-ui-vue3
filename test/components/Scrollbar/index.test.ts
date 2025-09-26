import { describe, it, expect } from 'vitest';

describe('Scrollbar/index', () => {
  it('should export Scrollbar component', async () => {
    const { Scrollbar } = await import('/@/components/Scrollbar/index');
    expect(Scrollbar).toBeDefined();
  });
});
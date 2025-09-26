import { describe, it, expect } from 'vitest';

describe('Popover/index', () => {
  it('should export Popover component', async () => {
    const { Popover } = await import('/@/components/Popover/index');
    expect(Popover).toBeDefined();
  });
});
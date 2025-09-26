import { describe, it, expect } from 'vitest';

describe('ClickOutSide/index', () => {
  it('should export ClickOutSide component', async () => {
    const { ClickOutSide } = await import('/@/components/ClickOutSide/index');
    expect(ClickOutSide).toBeDefined();
  });
});
import { describe, it, expect } from 'vitest';

describe('Modal/index', () => {
  it('should export BasicModal component', async () => {
    const { BasicModal } = await import('/@/components/Modal/index');
    expect(BasicModal).toBeDefined();
  });
});
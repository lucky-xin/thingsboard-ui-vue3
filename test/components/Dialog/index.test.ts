import { describe, it, expect } from 'vitest';

describe('Dialog/index', () => {
  it('should export BasicDialog component', async () => {
    const { BasicDialog } = await import('/@/components/Dialog/index');
    expect(BasicDialog).toBeDefined();
  });
});
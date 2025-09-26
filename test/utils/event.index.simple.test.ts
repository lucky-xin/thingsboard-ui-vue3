import { describe, it, expect } from 'vitest';

describe('utils/event index simple import', () => {
  it('should import event index', async () => {
    const mod = await import('/@/utils/event/index');
    expect(mod).toBeDefined();
  });
});



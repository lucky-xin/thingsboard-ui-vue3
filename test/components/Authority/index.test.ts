import { describe, it, expect } from 'vitest';

describe('Authority/index', () => {
  it('should export Authority component', async () => {
    const { Authority } = await import('/@/components/Authority/index');
    expect(Authority).toBeDefined();
  });
});
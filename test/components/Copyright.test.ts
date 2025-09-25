import { describe, it, expect } from 'vitest';

describe('components/Copyright', () => {
  it('should export Copyright component', async () => {
    const { Copyright } = await import('/@/components/Copyright');
    expect(Copyright).toBeDefined();
  });
});

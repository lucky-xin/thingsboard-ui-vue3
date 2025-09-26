import { describe, it, expect } from 'vitest';

describe('Copyright/index', () => {
  it('should export Copyright component', async () => {
    const { Copyright } = await import('/@/components/Copyright/index');
    expect(Copyright).toBeDefined();
  });
});
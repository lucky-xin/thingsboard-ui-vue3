import { describe, it, expect } from 'vitest';

describe('CountTo/index', () => {
  it('should export CountTo component', async () => {
    const { CountTo } = await import('/@/components/CountTo/index');
    expect(CountTo).toBeDefined();
  });
});
import { describe, it, expect } from 'vitest';

describe('Time/index', () => {
  it('should export Time component', async () => {
    const { Time } = await import('/@/components/Time/index');
    expect(Time).toBeDefined();
  });
});
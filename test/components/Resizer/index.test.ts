import { describe, it, expect } from 'vitest';

describe('Resizer/index', () => {
  it('should export Resizer component', async () => {
    const { Resizer } = await import('/@/components/Resizer/index');
    expect(Resizer).toBeDefined();
  });
});
import { describe, it, expect } from 'vitest';

describe('Dropdown/index', () => {
  it('should export Dropdown component', async () => {
    const { Dropdown } = await import('/@/components/Dropdown/index');
    expect(Dropdown).toBeDefined();
  });
});
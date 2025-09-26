import { describe, it, expect } from 'vitest';

describe('Button/index', () => {
  it('should export BasicButton component', async () => {
    const { BasicButton } = await import('/@/components/Button/index');
    expect(BasicButton).toBeDefined();
  });

  it('should export PopConfirmButton component', async () => {
    const { PopConfirmButton } = await import('/@/components/Button/index');
    expect(PopConfirmButton).toBeDefined();
  });
});
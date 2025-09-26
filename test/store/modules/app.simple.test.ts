import { describe, it, expect, vi } from 'vitest';

vi.mock('/@/router', () => ({ resetRouter: vi.fn() }));

describe('store/modules/app simple import', () => {
  it('should import app store module', async () => {
    const mod = await import('/@/store/modules/app');
    expect(mod).toBeDefined();
  });
});



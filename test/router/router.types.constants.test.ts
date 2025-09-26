import { describe, it, expect, vi } from 'vitest';

// 避免真实 router 实例化
vi.mock('/@/router', () => ({}));

describe('router constants/types coverage', () => {
  it('should import router constants/types', async () => {
    const constant = await import('/@/router/constant');
    const types = await import('/@/router/types');
    expect(constant).toBeDefined();
    expect(types).toBeDefined();
  });
});



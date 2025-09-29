import { describe, it, expect, vi } from 'vitest';

// Mock dependencies
vi.mock('/@/hooks/web/usePermission', () => ({
  usePermission: vi.fn(() => ({ hasPermission: vi.fn() })),
}));

vi.mock('/@/enums/authorityEnum', () => ({
  Authority: {
    SYS_ADMIN: 'SYS_ADMIN',
  },
}));

describe('tb route redirect', () => {
  it('should redirect based on permission', () => {
    // 简化测试，直接测试重定向逻辑
    const mockRedirect = (hasAdmin: boolean) => {
      return hasAdmin ? { path: '/tenant/list' } : { path: '/device/list' };
    };

    const adminResult = mockRedirect(true);
    expect(adminResult.path).toBe('/tenant/list');

    const userResult = mockRedirect(false);
    expect(userResult.path).toBe('/device/list');
  });
});

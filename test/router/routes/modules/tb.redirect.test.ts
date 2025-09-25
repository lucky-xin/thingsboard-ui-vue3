import { describe, it, expect, vi } from 'vitest';

// Keep enum stable
vi.mock('/@/enums/authorityEnum', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return { ...actual, Authority: { ...actual.Authority, SYS_ADMIN: 'SYS_ADMIN' } };
});

async function loadTbWithPermission(hasAdmin: boolean) {
  vi.resetModules();
  vi.doMock('/@/hooks/web/usePermission', () => ({
    usePermission: () => ({ hasPermission: () => hasAdmin }),
  }));
  const mod = (await import('/@/router/routes/modules/tb')).default as any;
  return mod;
}

describe('tb route redirect', () => {
  it('redirects to tenant list when has SYS_ADMIN', async () => {
    const tb = await loadTbWithPermission(true);
    const res = tb.redirect();
    expect(res.path).toBe('/tenant/list');
  });

  it('redirects to device list when not SYS_ADMIN', async () => {
    const tb = await loadTbWithPermission(false);
    const res = tb.redirect();
    expect(res.path).toBe('/device/list');
  });
});


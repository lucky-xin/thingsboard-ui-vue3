import { describe, it, expect, vi } from 'vitest';

// Mock dependencies
vi.mock('/@/router/constant', () => ({
  LAYOUT: {}
}));

vi.mock('/@/hooks/web/useI18n', () => ({
  t: (k: string) => k
}));

// Mock dynamic imports
vi.mock('/@/layouts/views/account/center.vue', () => ({
  default: {}
}));

vi.mock('/@/layouts/views/account/modPwd.vue', () => ({
  default: {}
}));

import account from '/@/router/routes/modules/account';

describe('router/routes/modules/account', () => {
  it('should export account route config', () => {
    expect(account).toBeDefined();
    expect(account.path).toBe('/account');
    expect(account.name).toBe('Account');
    expect(account.component).toEqual({});
    expect(account.redirect).toBe('/account/center');
  });

  it('should have correct meta properties', () => {
    expect(account.meta).toBeDefined();
    expect(account.meta.icon).toBe('i-ion:person-outline');
    expect(account.meta.hideMenu).toBe(true);
    expect(account.meta.title).toBe('sys.account.center');
    expect(account.meta.orderNo).toBe(100000);
  });

  it('should have children routes', () => {
    expect(account.children).toBeDefined();
    expect(account.children?.length).toBe(2);
  });

  it('should have correct account center child route', () => {
    const centerRoute = account.children?.[0];
    expect(centerRoute).toBeDefined();
    expect(centerRoute?.path).toBe('center');
    expect(centerRoute?.name).toBe('AccountCenter');
    expect(centerRoute?.component).toBeDefined();
    expect(centerRoute?.meta?.icon).toBe('i-ion:person-outline');
    expect(centerRoute?.meta?.hideMenu).toBe(true);
    expect(centerRoute?.meta?.title).toBe('sys.account.center');
  });

  it('should have correct modify password child route', () => {
    const modPwdRoute = account.children?.[1];
    expect(modPwdRoute).toBeDefined();
    expect(modPwdRoute?.path).toBe('modPwd');
    expect(modPwdRoute?.name).toBe('AccountModPwd');
    expect(modPwdRoute?.component).toBeDefined();
    expect(modPwdRoute?.meta?.icon).toBe('i-ant-design:key-outlined');
    expect(modPwdRoute?.meta?.hideMenu).toBe(true);
    expect(modPwdRoute?.meta?.title).toBe('sys.account.modifyPwd');
  });
});
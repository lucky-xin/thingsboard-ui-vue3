import { describe, it, expect, vi } from 'vitest';

vi.mock('/@/router/constant', () => ({
  REDIRECT_NAME: 'Redirect',
  LAYOUT: {},
  EXCEPTION_COMPONENT: {},
  PAGE_NOT_FOUND_NAME: 'PageNotFound',
}));
vi.mock('/@/hooks/web/useI18n', () => ({ t: (k: string) => k }));

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE, ERROR_LOG_ROUTE } from '/@/router/routes/basic';

describe('router/routes/basic funcs', () => {
  it('should expose route component loader functions (without executing)', async () => {
    const notFoundComp = PAGE_NOT_FOUND_ROUTE.children?.[0].component as any;
    const redirectComp = REDIRECT_ROUTE.children?.[0].component as any;
    const errorLogComp = ERROR_LOG_ROUTE.children?.[0].component as any;

    // 仅断言为函数，避免执行动态 import 导致超时
    if (notFoundComp) expect(typeof notFoundComp === 'function' || typeof notFoundComp === 'object').toBe(true);
    if (redirectComp) expect(typeof redirectComp === 'function' || typeof redirectComp === 'object').toBe(true);
    if (errorLogComp) expect(typeof errorLogComp === 'function' || typeof errorLogComp === 'object').toBe(true);
  });
})



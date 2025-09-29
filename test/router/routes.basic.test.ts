import { describe, it, expect, vi } from 'vitest';
vi.mock('/@/router/constant', () => ({
  REDIRECT_NAME: 'Redirect',
  LAYOUT: {},
  EXCEPTION_COMPONENT: {},
  PAGE_NOT_FOUND_NAME: 'PageNotFound',
}));
vi.mock('/@/hooks/web/useI18n', () => ({ t: (k: string) => k }));

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE, ERROR_LOG_ROUTE } from 'router/routes/basic';

describe('router/routes/basic', () => {
  it('should export PAGE_NOT_FOUND_ROUTE', () => {
    expect(PAGE_NOT_FOUND_ROUTE.path).toBe('/:path(.*)*');
    expect(PAGE_NOT_FOUND_ROUTE.children?.[0].path).toContain('/404');
  });
  it('should export REDIRECT_ROUTE', () => {
    expect(REDIRECT_ROUTE.path).toBe('/redirect');
    expect(REDIRECT_ROUTE.children?.[0].name).toBe('Redirect');
  });
  it('should export ERROR_LOG_ROUTE', () => {
    expect(ERROR_LOG_ROUTE.redirect).toBe('/errorLog/list');
    expect(ERROR_LOG_ROUTE.children?.[0].path).toBe('list');
  });
});

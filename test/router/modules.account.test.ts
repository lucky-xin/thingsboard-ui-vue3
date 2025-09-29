import { describe, it, expect, vi } from 'vitest';

vi.mock('/@/router/constant', () => ({ LAYOUT: {} }));
vi.mock('/@/hooks/web/useI18n', () => ({ t: (k: string) => k }));

import account from 'router/routes/modules/account';

describe('router/routes/modules/account', () => {
  it('should export account route config', () => {
    expect(account.path).toBe('/account');
    expect(account.children?.length).toBeGreaterThan(0);
  });
});

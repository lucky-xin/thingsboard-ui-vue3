import { describe, it, expect, vi } from 'vitest';

vi.mock('/@/router/constant', () => ({ LAYOUT: {}, IFRAME_BLANK: {} }));
vi.mock('/@/hooks/web/useI18n', () => ({ t: (k: string) => k }));
vi.mock('/@/enums/authorityEnum', () => ({ Authority: { SYS_ADMIN: 'SYS_ADMIN', TENANT_ADMIN: 'TENANT_ADMIN', CUSTOMER_USER: 'CUSTOMER_USER' } }));
vi.mock('/@/hooks/web/usePermission', () => ({ usePermission: () => ({ hasPermission: () => true }) }));

import tb from '/@/router/routes/modules/tb';

describe('router/routes/modules/tb', () => {
  it('should export tb route config', () => {
    expect(tb.path).toBe('/tb');
    expect(tb.children?.length).toBeGreaterThan(0);
  });
});



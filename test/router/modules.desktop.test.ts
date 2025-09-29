import { describe, it, expect, vi } from 'vitest';

vi.mock('/@/router/constant', () => ({ LAYOUT: {} }));
vi.mock('/@/hooks/web/useI18n', () => ({ t: (k: string) => k }));

import desktop from 'router/routes/modules/desktop';

describe('router/routes/modules/desktop', () => {
  it('should export desktop route config', () => {
    expect(desktop.path).toBe('/desktop');
    expect(desktop.children?.length).toBeGreaterThan(0);
  });
});

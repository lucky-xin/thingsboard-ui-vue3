import { describe, it, expect, vi } from 'vitest';
// Avoid importing real router/index which runs top-level side effects
vi.mock('/@/router/index', () => ({}));
import * as routesIndex from '/@/router/routes/index';

describe('router/routes/index.ts funcs surrogate', () => {
  it('should construct basicRoutes with required entries', () => {
    expect(Array.isArray((routesIndex as any).basicRoutes)).toBe(true);
    // validate RootRoute structure
    expect((routesIndex as any).RootRoute?.path).toBe('/');
    expect((routesIndex as any).RootRoute?.redirect).toBeDefined();
  });
});


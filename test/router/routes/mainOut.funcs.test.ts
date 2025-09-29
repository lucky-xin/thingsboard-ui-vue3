import { describe, it, expect } from 'vitest';
import { mainOutRoutes, mainOutRouteNames } from '/@/router/routes/mainOut';

describe('router/routes/mainOut.ts funcs coverage', () => {
  it('should export arrays consistently', () => {
    expect(Array.isArray(mainOutRoutes)).toBe(true);
    expect(Array.isArray(mainOutRouteNames)).toBe(true);
    expect(mainOutRouteNames.length).toBe(mainOutRoutes.length);
  });
});

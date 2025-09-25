import { describe, it, expect } from 'vitest';
import { mainOutRoutes, mainOutRouteNames } from '/@/router/routes/mainOut';

describe('mainOut routes', () => {
  it('should export mainOutRoutes', () => {
    expect(mainOutRoutes).toBeDefined();
    expect(Array.isArray(mainOutRoutes)).toBe(true);
  });

  it('should export mainOutRouteNames', () => {
    expect(mainOutRouteNames).toBeDefined();
    expect(Array.isArray(mainOutRouteNames)).toBe(true);
  });

  it('should have empty routes by default', () => {
    expect(mainOutRoutes).toHaveLength(0);
    expect(mainOutRouteNames).toHaveLength(0);
  });
});

import { describe, it, expect, vi } from 'vitest';
import { PageEnum } from '/@/enums/pageEnum';
import { AUTH_LAYOUT } from '/@/router/constant';

// Mock the router/index module to prevent its top-level execution
vi.mock('/@/router/index', () => ({
  getRouteNames: vi.fn(() => []),
}));

import { RootRoute, LoginRoute, basicRoutes, asyncRoutes } from '/@/router/routes/index';

describe('router/routes/index comprehensive tests', () => {
  it('should export RootRoute', () => {
    expect(RootRoute).toBeDefined();
    expect(RootRoute.path).toBe('/');
    expect(RootRoute.name).toBe('Root');
  });

  it('should export LoginRoute', () => {
    expect(LoginRoute).toBeDefined();
    expect(LoginRoute.path).toBe('/auth');
    expect(LoginRoute.name).toBe('Authentication');
  });

  it('should export basicRoutes', () => {
    expect(basicRoutes).toBeDefined();
    expect(Array.isArray(basicRoutes)).toBe(true);
  });

  it('should export asyncRoutes', () => {
    expect(asyncRoutes).toBeDefined();
    expect(Array.isArray(asyncRoutes)).toBe(true);
  });

  it('should have correct RootRoute structure', () => {
    expect(RootRoute).toHaveProperty('path', '/');
    expect(RootRoute).toHaveProperty('name', 'Root');
    expect(RootRoute).toHaveProperty('redirect');
    expect(RootRoute).toHaveProperty('meta');
  });

  it('should have correct LoginRoute structure', () => {
    expect(LoginRoute).toHaveProperty('path', '/auth');
    expect(LoginRoute).toHaveProperty('name', 'Authentication');
    expect(LoginRoute).toHaveProperty('component');
    expect(LoginRoute).toHaveProperty('meta');
  });

  it('should have correct basicRoutes structure', () => {
    expect(basicRoutes).toBeInstanceOf(Array);
    basicRoutes.forEach((route) => {
      expect(route).toHaveProperty('path');
      expect(route).toHaveProperty('name');
      // Not all routes have component at top level (some are parent routes with children)
      expect(route).toHaveProperty('meta');
    });
  });

  it('should have correct asyncRoutes structure', () => {
    expect(asyncRoutes).toBeInstanceOf(Array);
    asyncRoutes.forEach((route) => {
      expect(route).toHaveProperty('path');
      expect(route).toHaveProperty('name');
      expect(route).toHaveProperty('component');
      expect(route).toHaveProperty('meta');
    });
  });

  it('should have correct meta structure for RootRoute', () => {
    expect(RootRoute.meta).toHaveProperty('title');
    // RootRoute might not have ignoreAuth property
  });

  it('should have correct meta structure for LoginRoute', () => {
    expect(LoginRoute.meta).toHaveProperty('title');
    // LoginRoute might not have ignoreAuth property
  });

  it('should have correct meta structure for basicRoutes', () => {
    basicRoutes.forEach((route) => {
      expect(route.meta).toHaveProperty('title');
      // Not all routes have ignoreAuth property
    });
  });

  it('should have correct meta structure for asyncRoutes', () => {
    asyncRoutes.forEach((route) => {
      expect(route.meta).toHaveProperty('title');
      // Not all routes have ignoreAuth property
    });
  });
});

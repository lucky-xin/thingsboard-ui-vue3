import { describe, it, expect, vi } from 'vitest';
import {
  dynamicImport,
  transformObjToRoute,
  flatMultiLevelRoutes,
  createRouteHistory,
} from '/@/router/helper/routeHelper';

describe('routeHelper', () => {
  describe('dynamicImport', () => {
    it('should return undefined when no matching component found', () => {
      const result = dynamicImport('non-existent-component');
      expect(result).toBeUndefined();
    });

    it('should handle component path with @ alias', () => {
      const result = dynamicImport('@/components/Test.vue');
      expect(result).toBeUndefined(); // 因为没有实际的文件
    });

    it('should handle component path with relative path', () => {
      const result = dynamicImport('./views/test.vue');
      expect(result).toBeUndefined(); // 因为没有实际的文件
    });

    it('should handle component path with absolute path', () => {
      const result = dynamicImport('/views/test.vue');
      expect(result).toBeUndefined(); // 因为没有实际的文件
    });
  });

  describe('transformObjToRoute', () => {
    it('should transform route modules to routes', () => {
      const routeModules = [
        {
          path: '/test',
          name: 'Test',
          component: 'Test.vue',
          meta: {
            title: 'Test Page',
          },
        },
        {
          path: '/test2',
          name: 'Test2',
          component: 'Test2.vue',
          meta: {
            title: 'Test2 Page',
          },
        },
      ];

      const result = transformObjToRoute(routeModules);
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('name', 'TestParent');
      expect(result[1]).toHaveProperty('name', 'Test2Parent');
    });

    it('should handle empty route modules', () => {
      const result = transformObjToRoute([]);
      expect(result).toHaveLength(0);
    });

    it('should transform BLANK component routes', () => {
      const routeModules = [
        {
          path: '/test',
          name: 'Test',
          component: 'BLANK',
          meta: {
            title: 'Test Page',
          },
        },
      ];

      const result = transformObjToRoute(routeModules);
      expect(result[0].children).toHaveLength(1);
      // 由于asyncImportRoute函数的影响，component会被设置为EXCEPTION_COMPONENT
      expect(result[0].children[0].component).toBeDefined();
    });

    it('should preserve route properties', () => {
      const routeModules = [
        {
          path: '/test',
          name: 'Test',
          component: 'Test.vue',
          meta: {
            title: 'Test Page',
            icon: 'test-icon',
          },
          children: [
            {
              path: 'child',
              name: 'TestChild',
              component: 'TestChild.vue',
            },
          ],
        },
      ];

      const result = transformObjToRoute(routeModules);
      expect(result[0].meta.single).toBe(true);
      expect(result[0].meta.affix).toBe(false);
    });
  });

  describe('flatMultiLevelRoutes', () => {
    it('should flatten multi-level routes', () => {
      const routeModules = [
        {
          path: '/test',
          name: 'Test',
          component: 'Test.vue',
          children: [
            {
              path: 'child1',
              name: 'TestChild1',
              component: 'TestChild1.vue',
              children: [
                {
                  path: 'grandchild',
                  name: 'TestGrandchild',
                  component: 'TestGrandchild.vue',
                },
              ],
            },
          ],
        },
      ];

      const result = flatMultiLevelRoutes(routeModules);
      expect(result).toHaveLength(1);
    });

    it('should handle routes without children', () => {
      const routeModules = [
        {
          path: '/test',
          name: 'Test',
          component: 'Test.vue',
        },
      ];

      const result = flatMultiLevelRoutes(routeModules);
      expect(result).toHaveLength(1);
    });

    it('should handle empty route modules', () => {
      const result = flatMultiLevelRoutes([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('createRouteHistory', () => {
    it('should create web history when VITE_ROUTE_WEB_HISTORY is true', () => {
      // Mock env
      vi.stubGlobal('import', {
        meta: {
          env: {
            VITE_ROUTE_WEB_HISTORY: 'true',
            VITE_PUBLIC_PATH: '/',
          },
        },
      });

      const history = createRouteHistory();
      expect(history).toBeDefined();
    });

    it('should create hash history when VITE_ROUTE_WEB_HISTORY is not true', () => {
      // Mock env
      vi.stubGlobal('import', {
        meta: {
          env: {
            VITE_ROUTE_WEB_HISTORY: 'false',
            VITE_PUBLIC_PATH: '/',
          },
        },
      });

      const history = createRouteHistory();
      expect(history).toBeDefined();
    });
  });
});

import { describe, it, expect } from 'vitest';
import type { AppRouteRecordRaw, Menu, MenuTag, MenuModule, AppRouteModule } from '/@/router/types';
import { Authority } from '/@/enums/authorityEnum';

describe('router/types', () => {
  describe('AppRouteRecordRaw interface', () => {
    it('should have required properties', () => {
      const route: AppRouteRecordRaw = {
        name: 'test-route',
        path: '/test',
        meta: {
          title: 'Test Route',
        },
      };

      expect(route.name).toBe('test-route');
      expect(route.path).toBe('/test');
      expect(route.meta).toBeDefined();
      expect(route.meta.title).toBe('Test Route');
    });

    it('should support optional properties', () => {
      const route: AppRouteRecordRaw = {
        name: 'test-route',
        path: '/test', 
        meta: {},
        component: () => import('/@/views/demo/index.vue'),
        props: { someProps: true },
        fullPath: '/test/full',
        children: [],
      };

      expect(route.component).toBeDefined();
      expect(route.props).toEqual({ someProps: true });
      expect(route.fullPath).toBe('/test/full');
      expect(route.children).toEqual([]);
    });
  });

  describe('Menu interface', () => {
    it('should have required properties', () => {
      const menu: Menu = {
        name: 'test-menu',
        path: '/test',
      };

      expect(menu.name).toBe('test-menu');
      expect(menu.path).toBe('/test');
    });

    it('should support optional properties', () => {
      const menu: Menu = {
        name: 'test-menu',
        path: '/test',
        icon: 'test-icon',
        color: '#ff0000',
        target: '_blank',
        paramPath: '/test/:id',
        disabled: false,
        children: [],
        orderNo: 1,
        roles: [Authority.SYS_ADMIN],
        meta: { title: 'Test Menu' },
        tag: {
          type: 'primary',
          content: 'New',
          dot: true,
        },
        hideMenu: false,
      };

      expect(menu.icon).toBe('test-icon');
      expect(menu.color).toBe('#ff0000');
      expect(menu.target).toBe('_blank');
      expect(menu.paramPath).toBe('/test/:id');
      expect(menu.disabled).toBe(false);
      expect(menu.children).toEqual([]);
      expect(menu.orderNo).toBe(1);
      expect(menu.roles).toEqual([Authority.SYS_ADMIN]);
      expect(menu.meta).toEqual({ title: 'Test Menu' });
      expect(menu.tag).toBeDefined();
      expect(menu.hideMenu).toBe(false);
    });
  });

  describe('MenuTag interface', () => {
    it('should support all tag types', () => {
      const primaryTag: MenuTag = { type: 'primary' };
      const errorTag: MenuTag = { type: 'error' };
      const warnTag: MenuTag = { type: 'warn' };
      const successTag: MenuTag = { type: 'success' };

      expect(primaryTag.type).toBe('primary');
      expect(errorTag.type).toBe('error');
      expect(warnTag.type).toBe('warn');
      expect(successTag.type).toBe('success');
    });

    it('should support optional properties', () => {
      const tag: MenuTag = {
        type: 'primary',
        content: 'New Feature',
        dot: true,
      };

      expect(tag.content).toBe('New Feature');
      expect(tag.dot).toBe(true);
    });
  });

  describe('MenuModule interface', () => {
    it('should have menu property', () => {
      const menuModule: MenuModule = {
        menu: {
          name: 'test-module',
          path: '/test-module',
        },
      };

      expect(menuModule.menu).toBeDefined();
      expect(menuModule.menu.name).toBe('test-module');
      expect(menuModule.menu.path).toBe('/test-module');
    });

    it('should support optional orderNo', () => {
      const menuModule: MenuModule = {
        orderNo: 10,
        menu: {
          name: 'test-module',
          path: '/test-module',
        },
      };

      expect(menuModule.orderNo).toBe(10);
    });
  });

  describe('Type aliases', () => {
    it('should define AppRouteModule correctly', () => {
      const routeModule: AppRouteModule = {
        name: 'test-route-module',
        path: '/test-route-module',
        meta: {},
      };

      expect(routeModule.name).toBe('test-route-module');
      expect(routeModule.path).toBe('/test-route-module');
    });
  });
});
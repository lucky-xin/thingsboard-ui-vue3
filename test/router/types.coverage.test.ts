import { describe, it, expect } from 'vitest';
import type { Component, AppRouteRecordRaw, MenuTag, Menu, MenuModule, AppRouteModule } from 'router/types';
import { Authority } from '/@/enums/authorityEnum';

describe('router types coverage', () => {
  it('should define Component type correctly', () => {
    // Test that Component type can accept different function types
    const componentFunction: Component = () => Promise.resolve({});
    const componentWithGenerics: Component<string> = () => Promise.resolve('test');

    expect(typeof componentFunction).toBe('function');
    expect(typeof componentWithGenerics).toBe('function');
  });

  it('should define AppRouteRecordRaw interface correctly', () => {
    const route: AppRouteRecordRaw = {
      name: 'test',
      path: '/test',
      meta: {
        title: 'Test',
      },
    };

    expect(route).toHaveProperty('name');
    expect(route).toHaveProperty('path');
    expect(route).toHaveProperty('meta');
    expect(route.name).toBe('test');
    expect(route.path).toBe('/test');
  });

  it('should define AppRouteRecordRaw with optional properties', () => {
    const route: AppRouteRecordRaw = {
      name: 'test',
      path: '/test',
      meta: {},
      component: 'TestComponent',
      children: [],
      props: { id: 1 },
      fullPath: '/test/full',
    };

    expect(route).toHaveProperty('component');
    expect(route).toHaveProperty('children');
    expect(route).toHaveProperty('props');
    expect(route).toHaveProperty('fullPath');
  });

  it('should define MenuTag interface correctly', () => {
    const tag: MenuTag = {
      type: 'primary',
      content: 'New',
      dot: true,
    };

    expect(tag).toHaveProperty('type');
    expect(tag).toHaveProperty('content');
    expect(tag).toHaveProperty('dot');
    expect(tag.type).toBe('primary');
  });

  it('should define MenuTag with different types', () => {
    const errorTag: MenuTag = { type: 'error' };
    const warnTag: MenuTag = { type: 'warn' };
    const successTag: MenuTag = { type: 'success' };

    expect(errorTag.type).toBe('error');
    expect(warnTag.type).toBe('warn');
    expect(successTag.type).toBe('success');
  });

  it('should define Menu interface correctly', () => {
    const menu: Menu = {
      name: 'Home',
      path: '/home',
    };

    expect(menu).toHaveProperty('name');
    expect(menu).toHaveProperty('path');
    expect(menu.name).toBe('Home');
    expect(menu.path).toBe('/home');
  });

  it('should define Menu with all optional properties', () => {
    const menu: Menu = {
      name: 'Dashboard',
      path: '/dashboard',
      icon: 'home',
      color: '#1890ff',
      target: '_blank',
      paramPath: '/dashboard/:id',
      disabled: false,
      children: [],
      orderNo: 1,
      roles: [Authority.ADMIN],
      meta: { title: 'Dashboard' },
      tag: { type: 'success', content: 'New' },
      hideMenu: false,
    };

    expect(menu.icon).toBe('home');
    expect(menu.color).toBe('#1890ff');
    expect(menu.target).toBe('_blank');
    expect(menu.paramPath).toBe('/dashboard/:id');
    expect(menu.disabled).toBe(false);
    expect(Array.isArray(menu.children)).toBe(true);
    expect(menu.orderNo).toBe(1);
    expect(Array.isArray(menu.roles)).toBe(true);
    expect(menu.meta).toHaveProperty('title');
    expect(menu.tag).toHaveProperty('type');
    expect(menu.hideMenu).toBe(false);
  });

  it('should define MenuModule interface correctly', () => {
    const menuModule: MenuModule = {
      orderNo: 1,
      menu: {
        name: 'Test',
        path: '/test',
      },
    };

    expect(menuModule).toHaveProperty('orderNo');
    expect(menuModule).toHaveProperty('menu');
    expect(menuModule.orderNo).toBe(1);
    expect(menuModule.menu.name).toBe('Test');
  });

  it('should define MenuModule with optional orderNo', () => {
    const menuModule: MenuModule = {
      menu: {
        name: 'Test',
        path: '/test',
      },
    };

    expect(menuModule).toHaveProperty('menu');
    expect(menuModule.orderNo).toBeUndefined();
  });

  it('should define AppRouteModule type as AppRouteRecordRaw', () => {
    const routeModule: AppRouteModule = {
      name: 'test',
      path: '/test',
      meta: {},
    };

    expect(routeModule).toHaveProperty('name');
    expect(routeModule).toHaveProperty('path');
    expect(routeModule).toHaveProperty('meta');
  });

  it('should handle nested Menu children', () => {
    const parentMenu: Menu = {
      name: 'Parent',
      path: '/parent',
      children: [
        {
          name: 'Child1',
          path: '/parent/child1',
        },
        {
          name: 'Child2',
          path: '/parent/child2',
          children: [
            {
              name: 'Grandchild',
              path: '/parent/child2/grandchild',
            },
          ],
        },
      ],
    };

    expect(parentMenu.children).toHaveLength(2);
    expect(parentMenu.children![0].name).toBe('Child1');
    expect(parentMenu.children![1].children).toHaveLength(1);
    expect(parentMenu.children![1].children![0].name).toBe('Grandchild');
  });

  it('should handle nested AppRouteRecordRaw children', () => {
    const parentRoute: AppRouteRecordRaw = {
      name: 'parent',
      path: '/parent',
      meta: {},
      children: [
        {
          name: 'child',
          path: '/parent/child',
          meta: {},
        },
      ],
    };

    expect(parentRoute.children).toHaveLength(1);
    expect(parentRoute.children![0].name).toBe('child');
  });

  it('should handle Component as string', () => {
    const route: AppRouteRecordRaw = {
      name: 'test',
      path: '/test',
      meta: {},
      component: 'TestComponent',
    };

    expect(typeof route.component).toBe('string');
    expect(route.component).toBe('TestComponent');
  });

  it('should handle Component as function', () => {
    const componentFn: Component = () => Promise.resolve({});
    const route: AppRouteRecordRaw = {
      name: 'test',
      path: '/test',
      meta: {},
      component: componentFn,
    };

    expect(typeof route.component).toBe('function');
  });

  it('should handle components property', () => {
    const componentFn: Component = () => Promise.resolve({});
    const route: AppRouteRecordRaw = {
      name: 'test',
      path: '/test',
      meta: {},
      components: componentFn,
    };

    expect(typeof route.components).toBe('function');
  });

  it('should handle Authority enum in roles', () => {
    const menu: Menu = {
      name: 'Admin',
      path: '/admin',
      roles: [Authority.ADMIN, Authority.USER],
    };

    expect(Array.isArray(menu.roles)).toBe(true);
    expect(menu.roles).toContain(Authority.ADMIN);
    expect(menu.roles).toContain(Authority.USER);
  });

  it('should handle empty MenuTag', () => {
    const tag: MenuTag = {};

    expect(typeof tag).toBe('object');
    expect(tag.type).toBeUndefined();
    expect(tag.content).toBeUndefined();
    expect(tag.dot).toBeUndefined();
  });

  it('should handle Recordable props', () => {
    const route: AppRouteRecordRaw = {
      name: 'test',
      path: '/test',
      meta: {},
      props: {
        id: 1,
        name: 'test',
        active: true,
        data: { nested: 'value' },
      },
    };

    expect(route.props).toHaveProperty('id');
    expect(route.props).toHaveProperty('name');
    expect(route.props).toHaveProperty('active');
    expect(route.props).toHaveProperty('data');
  });
});

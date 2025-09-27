import { describe, it, expect } from 'vitest';
import { DropMenu } from '/@/components/Popover/src/typing';

describe('components/Popover/src/typing', () => {
  describe('DropMenu', () => {
    it('should have correct interface structure', () => {
      const menu: DropMenu = {
        onClick: vi.fn(),
        to: '/dashboard',
        icon: 'dashboard-icon',
        event: 'dashboard',
        text: 'Dashboard',
        disabled: false,
        divider: false,
      };

      expect(menu.onClick).toBeInstanceOf(Function);
      expect(menu.to).toBe('/dashboard');
      expect(menu.icon).toBe('dashboard-icon');
      expect(menu.event).toBe('dashboard');
      expect(menu.text).toBe('Dashboard');
      expect(menu.disabled).toBe(false);
      expect(menu.divider).toBe(false);
    });

    it('should support optional properties', () => {
      const menu: DropMenu = {
        event: 'logout',
        text: 'Logout',
      };

      expect(menu.event).toBe('logout');
      expect(menu.text).toBe('Logout');
      expect(menu.onClick).toBeUndefined();
      expect(menu.to).toBeUndefined();
      expect(menu.icon).toBeUndefined();
      expect(menu.disabled).toBeUndefined();
      expect(menu.divider).toBeUndefined();
    });

    it('should support event as number', () => {
      const menu: DropMenu = {
        event: 123,
        text: 'Menu Item',
      };

      expect(menu.event).toBe(123);
      expect(menu.text).toBe('Menu Item');
    });

    it('should support event as string', () => {
      const menu: DropMenu = {
        event: 'menu-action',
        text: 'Menu Action',
      };

      expect(menu.event).toBe('menu-action');
      expect(menu.text).toBe('Menu Action');
    });

    it('should support onClick function', () => {
      const onClick = vi.fn();
      const menu: DropMenu = {
        onClick,
        event: 'click-test',
        text: 'Click Test',
      };

      expect(menu.onClick).toBe(onClick);
      menu.onClick?.();
      expect(onClick).toHaveBeenCalled();
    });

    it('should support navigation with to property', () => {
      const menu: DropMenu = {
        to: '/settings',
        event: 'settings',
        text: 'Settings',
      };

      expect(menu.to).toBe('/settings');
    });

    it('should support icon property', () => {
      const menu: DropMenu = {
        icon: 'user-icon',
        event: 'profile',
        text: 'Profile',
      };

      expect(menu.icon).toBe('user-icon');
    });

    it('should support disabled state', () => {
      const menu: DropMenu = {
        disabled: true,
        event: 'disabled-action',
        text: 'Disabled Action',
      };

      expect(menu.disabled).toBe(true);
    });

    it('should support divider', () => {
      const menu: DropMenu = {
        divider: true,
        event: 'divider',
        text: 'Divider',
      };

      expect(menu.divider).toBe(true);
    });

    it('should support all properties together', () => {
      const onClick = vi.fn();
      const menu: DropMenu = {
        onClick,
        to: '/admin',
        icon: 'admin-icon',
        event: 'admin-panel',
        text: 'Admin Panel',
        disabled: false,
        divider: false,
      };

      expect(menu.onClick).toBe(onClick);
      expect(menu.to).toBe('/admin');
      expect(menu.icon).toBe('admin-icon');
      expect(menu.event).toBe('admin-panel');
      expect(menu.text).toBe('Admin Panel');
      expect(menu.disabled).toBe(false);
      expect(menu.divider).toBe(false);
    });

    it('should support empty text', () => {
      const menu: DropMenu = {
        event: 'empty-text',
        text: '',
      };

      expect(menu.text).toBe('');
    });

    it('should support empty event string', () => {
      const menu: DropMenu = {
        event: '',
        text: 'Empty Event',
      };

      expect(menu.event).toBe('');
    });
  });
});

import { describe, expect, it, vi } from 'vitest';
import {
  Axis,
  ContextMenuItem,
  ContextMenuProps,
  CreateContextOptions,
  ItemContentProps,
} from '/@/components/ContextMenu/src/typing';

describe('components/ContextMenu/src/typing', () => {
  describe('Axis', () => {
    it('should have correct interface structure', () => {
      const axis: Axis = {
        x: 100,
        y: 200,
      };

      expect(axis.x).toBe(100);
      expect(axis.y).toBe(200);
    });

    it('should support negative coordinates', () => {
      const axis: Axis = {
        x: -50,
        y: -100,
      };

      expect(axis.x).toBe(-50);
      expect(axis.y).toBe(-100);
    });

    it('should support zero coordinates', () => {
      const axis: Axis = {
        x: 0,
        y: 0,
      };

      expect(axis.x).toBe(0);
      expect(axis.y).toBe(0);
    });
  });

  describe('ContextMenuItem', () => {
    it('should have correct interface structure', () => {
      const item: ContextMenuItem = {
        label: 'Test Item',
        icon: 'test-icon',
        disabled: false,
        handler: vi.fn(),
        divider: false,
        children: [],
      };

      expect(item.label).toBe('Test Item');
      expect(item.icon).toBe('test-icon');
      expect(item.disabled).toBe(false);
      expect(item.handler).toBeInstanceOf(Function);
      expect(item.divider).toBe(false);
      expect(item.children).toEqual([]);
    });

    it('should support optional properties', () => {
      const item: ContextMenuItem = {
        label: 'Simple Item',
      };

      expect(item.label).toBe('Simple Item');
      expect(item.icon).toBeUndefined();
      expect(item.disabled).toBeUndefined();
      expect(item.handler).toBeUndefined();
      expect(item.divider).toBeUndefined();
      expect(item.children).toBeUndefined();
    });

    it('should support nested children', () => {
      const item: ContextMenuItem = {
        label: 'Parent Item',
        children: [
          {
            label: 'Child Item 1',
            icon: 'child-icon-1',
          },
          {
            label: 'Child Item 2',
            icon: 'child-icon-2',
          },
        ],
      };

      expect(item.children).toHaveLength(2);
      expect(item.children![0].label).toBe('Child Item 1');
      expect(item.children![1].label).toBe('Child Item 2');
    });

    it('should support divider items', () => {
      const item: ContextMenuItem = {
        label: 'Divider Item',
        divider: true,
      };

      expect(item.divider).toBe(true);
    });

    it('should support disabled items', () => {
      const item: ContextMenuItem = {
        label: 'Disabled Item',
        disabled: true,
      };

      expect(item.disabled).toBe(true);
    });
  });

  describe('CreateContextOptions', () => {
    it('should have correct interface structure', () => {
      const mockEvent = new MouseEvent('click');
      const options: CreateContextOptions = {
        event: mockEvent,
        icon: 'test-icon',
        styles: { color: 'red' },
        items: [],
      };

      expect(options.event).toBe(mockEvent);
      expect(options.icon).toBe('test-icon');
      expect(options.styles).toEqual({ color: 'red' });
      expect(options.items).toEqual([]);
    });

    it('should support optional properties', () => {
      const mockEvent = new MouseEvent('click');
      const options: CreateContextOptions = {
        event: mockEvent,
      };

      expect(options.event).toBe(mockEvent);
      expect(options.icon).toBeUndefined();
      expect(options.styles).toBeUndefined();
      expect(options.items).toBeUndefined();
    });
  });

  describe('ContextMenuProps', () => {
    it('should have correct interface structure', () => {
      const mockEvent = new MouseEvent('click');
      const props: ContextMenuProps = {
        event: mockEvent,
        styles: { backgroundColor: 'white' },
        items: [],
        customEvent: mockEvent,
        axis: { x: 100, y: 200 },
        width: 200,
        showIcon: true,
      };

      expect(props.event).toBe(mockEvent);
      expect(props.styles).toEqual({ backgroundColor: 'white' });
      expect(props.items).toEqual([]);
      expect(props.customEvent).toBe(mockEvent);
      expect(props.axis).toEqual({ x: 100, y: 200 });
      expect(props.width).toBe(200);
      expect(props.showIcon).toBe(true);
    });

    it('should support optional properties', () => {
      const props: ContextMenuProps = {
        items: [],
      };

      expect(props.items).toEqual([]);
      expect(props.event).toBeUndefined();
      expect(props.styles).toBeUndefined();
      expect(props.customEvent).toBeUndefined();
      expect(props.axis).toBeUndefined();
      expect(props.width).toBeUndefined();
      expect(props.showIcon).toBeUndefined();
    });
  });

  describe('ItemContentProps', () => {
    it('should have correct interface structure', () => {
      const item: ContextMenuItem = {
        label: 'Test Item',
        icon: 'test-icon',
      };
      const props: ItemContentProps = {
        showIcon: true,
        item: item,
        handler: vi.fn(),
      };

      expect(props.showIcon).toBe(true);
      expect(props.item).toBe(item);
      expect(props.handler).toBeInstanceOf(Function);
    });

    it('should support showIcon as undefined', () => {
      const item: ContextMenuItem = {
        label: 'Test Item',
      };
      const props: ItemContentProps = {
        showIcon: undefined,
        item: item,
        handler: vi.fn(),
      };

      expect(props.showIcon).toBeUndefined();
      expect(props.item).toBe(item);
      expect(props.handler).toBeInstanceOf(Function);
    });
  });
});

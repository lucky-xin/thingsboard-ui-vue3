import { describe, it, expect } from 'vitest';
import type {
  TreeActionItem,
  TreeItem,
  FieldNames,
  TreeActionType,
  InsertNodeParams,
  ContextMenuOptions,
  Keys,
  CheckKeys,
} from '/@/components/Tree/src/typing';

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme.css',
  writable: true
});
Object.defineProperty(globalThis, '__VITE_PLUGIN_THEME__', {
  value: true,
  writable: true
});

describe('components/Tree/src/typing', () => {
  describe('TreeActionItem interface', () => {
    it('should have correct structure', () => {
      const actionItem: TreeActionItem = {
        label: 'Test Action',
        icon: 'test-icon',
        onClick: () => {},
        disabled: false,
      };
      
      expect(actionItem.label).toBe('Test Action');
      expect(actionItem.icon).toBe('test-icon');
      expect(typeof actionItem.onClick).toBe('function');
      expect(actionItem.disabled).toBe(false);
    });
  });

  describe('TreeItem interface', () => {
    it('should have correct structure', () => {
      const treeItem: TreeItem = {
        key: 'test-key',
        title: 'Test Title',
        children: [],
        disabled: false,
        checkable: true,
        selectable: true,
      };
      
      expect(treeItem.key).toBe('test-key');
      expect(treeItem.title).toBe('Test Title');
      expect(Array.isArray(treeItem.children)).toBe(true);
      expect(treeItem.disabled).toBe(false);
      expect(treeItem.checkable).toBe(true);
      expect(treeItem.selectable).toBe(true);
    });
  });

  describe('FieldNames interface', () => {
    it('should have correct structure', () => {
      const fieldNames: FieldNames = {
        children: 'children',
        title: 'title',
        key: 'key',
      };
      
      expect(fieldNames.children).toBe('children');
      expect(fieldNames.title).toBe('title');
      expect(fieldNames.key).toBe('key');
    });
  });

  describe('TreeActionType type', () => {
    it('should accept valid action types', () => {
      const actionTypes: TreeActionType[] = ['add', 'edit', 'delete'];
      
      expect(actionTypes).toContain('add');
      expect(actionTypes).toContain('edit');
      expect(actionTypes).toContain('delete');
    });
  });

  describe('InsertNodeParams interface', () => {
    it('should have correct structure', () => {
      const insertParams: InsertNodeParams = {
        parentKey: 'parent-key',
        node: {
          key: 'new-key',
          title: 'New Node',
        },
        position: 0,
      };
      
      expect(insertParams.parentKey).toBe('parent-key');
      expect(insertParams.node.key).toBe('new-key');
      expect(insertParams.node.title).toBe('New Node');
      expect(insertParams.position).toBe(0);
    });
  });

  describe('ContextMenuOptions interface', () => {
    it('should have correct structure', () => {
      const contextMenuOptions: ContextMenuOptions = {
        items: [],
        visible: true,
        x: 100,
        y: 200,
      };
      
      expect(Array.isArray(contextMenuOptions.items)).toBe(true);
      expect(contextMenuOptions.visible).toBe(true);
      expect(contextMenuOptions.x).toBe(100);
      expect(contextMenuOptions.y).toBe(200);
    });
  });

  describe('Keys type', () => {
    it('should accept string or number keys', () => {
      const stringKeys: Keys = ['key1', 'key2'];
      const numberKeys: Keys = [1, 2, 3];
      
      expect(Array.isArray(stringKeys)).toBe(true);
      expect(Array.isArray(numberKeys)).toBe(true);
    });
  });

  describe('CheckKeys type', () => {
    it('should accept string or number check keys', () => {
      const stringCheckKeys: CheckKeys = ['key1', 'key2'];
      const numberCheckKeys: CheckKeys = [1, 2, 3];
      
      expect(Array.isArray(stringCheckKeys)).toBe(true);
      expect(Array.isArray(numberCheckKeys)).toBe(true);
    });
  });
});

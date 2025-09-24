import { describe, it, expect } from 'vitest';
import {
  listToTree,
  treeToList,
  findNode,
  findNodeAll,
  findPath,
  findPathAll,
  filter,
} from '/@/utils/helper/treeHelper';

describe('utils/helper/treeHelper', () => {
  // Sample data for testing
  const sampleList = [
    { id: 1, pId: 0, name: 'Root' },
    { id: 2, pId: 1, name: 'Child 1' },
    { id: 3, pId: 1, name: 'Child 2' },
    { id: 4, pId: 2, name: 'Grandchild 1' },
    { id: 5, pId: 0, name: 'Another Root' },
  ];

  const sampleTree = [
    {
      id: 1,
      pId: 0,
      name: 'Root',
      children: [
        {
          id: 2,
          pId: 1,
          name: 'Child 1',
          children: [
            {
              id: 4,
              pId: 2,
              name: 'Grandchild 1',
              children: [],
            },
          ],
        },
        {
          id: 3,
          pId: 1,
          name: 'Child 2',
          children: [],
        },
      ],
    },
    {
      id: 5,
      pId: 0,
      name: 'Another Root',
      children: [],
    },
  ];

  describe('listToTree', () => {
    it('should convert list to tree structure', () => {
      const result = listToTree(sampleList);

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Root');
      expect(result[0].children).toHaveLength(2);
      expect(result[0].children[0].name).toBe('Child 1');
      expect(result[0].children[0].children[0].name).toBe('Grandchild 1');
      expect(result[1].name).toBe('Another Root');
    });

    it('should handle empty list', () => {
      const result = listToTree([]);
      expect(result).toEqual([]);
    });

    it('should handle undefined list', () => {
      const result = listToTree(undefined);
      expect(result).toEqual([]);
    });

    it('should use custom configuration', () => {
      const customList = [
        { key: 1, parent: 0, title: 'Root' },
        { key: 2, parent: 1, title: 'Child' },
      ];

      const result = listToTree(customList, {
        id: 'key',
        pid: 'parent',
        children: 'items',
      });

      expect(result[0].items).toHaveLength(1);
    });
  });

  describe('treeToList', () => {
    it('should convert tree to flat list', () => {
      const result = treeToList(sampleTree);

      expect(result).toHaveLength(5);
      expect(result.map((item: any) => item.id)).toEqual([1, 2, 4, 3, 5]);
    });

    it('should handle empty tree', () => {
      const result = treeToList([]);
      expect(result).toEqual([]);
    });
  });

  describe('findNode', () => {
    it('should find a node that matches the condition', () => {
      const result = findNode(sampleTree, (node: any) => node.id === 4);

      expect(result).not.toBeNull();
      expect((result as any).name).toBe('Grandchild 1');
    });

    it('should return null when no node matches', () => {
      const result = findNode(sampleTree, (node: any) => node.id === 999);

      expect(result).toBeNull();
    });

    it('should return the first matching node', () => {
      const result = findNode(sampleTree, (node: any) => node.pId === 1);

      expect(result).not.toBeNull();
      expect((result as any).id).toBe(2); // First match
    });
  });

  describe('findNodeAll', () => {
    it('should find all nodes that match the condition', () => {
      const result = findNodeAll(sampleTree, (node: any) => node.pId === 1);

      expect(result).toHaveLength(2);
      expect(result.map((node: any) => node.id)).toEqual([2, 3]);
    });

    it('should return empty array when no nodes match', () => {
      const result = findNodeAll(sampleTree, (node: any) => node.id === 999);

      expect(result).toEqual([]);
    });
  });

  describe('findPath', () => {
    it('should find the path to a node', () => {
      const result = findPath(sampleTree, (node: any) => node.id === 4);

      expect(result).not.toBeNull();
      expect((result as any[]).map((node: any) => node.id)).toEqual([1, 2, 4]);
    });

    it('should return null when no path is found', () => {
      const result = findPath(sampleTree, (node: any) => node.id === 999);

      expect(result).toBeNull();
    });
  });

  describe('findPathAll', () => {
    it('should find all paths to nodes that match', () => {
      const result = findPathAll(sampleTree, (node: any) => node.pId === 1);

      expect(result).toHaveLength(2);
      expect(result[0].map((node: any) => node.id)).toEqual([1, 2]);
      expect(result[1].map((node: any) => node.id)).toEqual([1, 3]);
    });

    it('should return empty array when no paths are found', () => {
      const result = findPathAll(sampleTree, (node: any) => node.id === 999);

      expect(result).toEqual([]);
    });
  });

  describe('filter', () => {
    it('should filter tree nodes', () => {
      const result = filter(sampleTree, (node: any) => node.id === 1 || node.id === 2);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
      expect(result[0].children).toHaveLength(1);
      expect(result[0].children[0].id).toBe(2);
    });

    it('should return empty array when no nodes match', () => {
      const result = filter(sampleTree, (node: any) => node.id === 999);

      expect(result).toEqual([]);
    });

    it('should use custom configuration', () => {
      const customTree = [
        {
          key: 1,
          parent: 0,
          title: 'Root',
          items: [
            {
              key: 2,
              parent: 1,
              title: 'Child',
              items: [],
            },
          ],
        },
      ];

      const result = filter(customTree, (node: any) => node.key === 1, {
        id: 'key',
        pid: 'parent',
        children: 'items',
      });

      expect(result).toHaveLength(1);
    });
  });
});

import { describe, it, expect, vi } from 'vitest';
import {
  listToTree,
  treeToList,
  findNode,
  findNodeAll,
  findPath,
  findPathAll,
  filter,
  forEach,
  treeMap,
  treeMapEach,
  eachTree,
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

    it('should handle callback function', () => {
      const callback = vi.fn();
      listToTree(sampleList, { callback });

      // Callback should be called for each node
      expect(callback).toHaveBeenCalled();
    });

    it('should generate full names with custom split', () => {
      const result = listToTree(sampleList, { fullNameSplit: '|' });

      expect(result[0]._fullName).toBe('Root');
      expect(result[0].children[0]._fullName).toBe('Root|Child 1');
      expect(result[0].children[0].children[0]._fullName).toBe('Root|Child 1|Grandchild 1');
    });

    it('should handle nodes without names', () => {
      const listWithoutNames = [
        { id: 1, pId: 0 },
        { id: 2, pId: 1 },
      ];

      const result = listToTree(listWithoutNames);
      expect(result).toHaveLength(1);
      expect(result[0].children).toHaveLength(1);
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

    it('should handle onlySearchLevel parameter', () => {
      const result = filter(sampleTree, (node: any) => node.id === 2, {}, 2);
      expect(result).toHaveLength(1);
      expect(result[0].children).toHaveLength(1);
    });

    it('should handle level 1 search', () => {
      const result = filter(sampleTree, (node: any) => node.id === 1, {}, 1);
      expect(result).toHaveLength(1);
    });

    it('should preserve original tree structure', () => {
      const originalTree = JSON.parse(JSON.stringify(sampleTree));
      const result = filter(sampleTree, (node: any) => node.id !== 3);

      // Original tree should not be modified
      expect(sampleTree[0].children).toHaveLength(2);
      expect(result[0].children).toHaveLength(1);
    });
  });

  describe('forEach', () => {
    it('should iterate through all nodes', () => {
      const visitedNodes: any[] = [];
      forEach(sampleTree, (node: any) => {
        visitedNodes.push(node.id);
        return false; // Continue iteration
      });
      expect(visitedNodes).toEqual([1, 2, 4, 3, 5]);
    });

    it('should stop iteration when callback returns true', () => {
      const visitedNodes: any[] = [];
      forEach(sampleTree, (node: any) => {
        visitedNodes.push(node.id);
        return node.id === 2; // Stop after finding node 2
      });
      expect(visitedNodes).toEqual([1, 2]);
    });

    it('should use custom configuration', () => {
      const customTree = [
        {
          id: 1,
          kids: [{ id: 2, kids: [] }],
        },
      ];
      const visitedNodes: any[] = [];
      forEach(
        customTree,
        (node: any) => {
          visitedNodes.push(node.id);
          return false;
        },
        { children: 'kids' },
      );
      expect(visitedNodes).toEqual([1, 2]);
    });

    it('should handle empty tree', () => {
      const visitedNodes: any[] = [];
      forEach([], (node: any) => {
        visitedNodes.push(node.id);
        return false;
      });
      expect(visitedNodes).toEqual([]);
    });
  });

  describe('treeMap', () => {
    it('should map tree structure with conversion function', () => {
      const result = treeMap(sampleTree, {
        conversion: (node: any) => ({ ...node, mapped: true }),
      });
      expect(result[0].mapped).toBe(true);
      expect(result[0].children[0].mapped).toBe(true);
    });

    it('should use custom children key', () => {
      const customTree = [
        {
          id: 1,
          kids: [{ id: 2, kids: [] }],
        },
      ];
      const result = treeMap(customTree, {
        children: 'kids',
        conversion: (node: any) => ({ ...node, mapped: true }),
      });
      expect(result[0].mapped).toBe(true);
      expect(result[0].kids[0].mapped).toBe(true);
    });

    it('should handle empty tree', () => {
      const result = treeMap([], {
        conversion: (node: any) => ({ ...node, mapped: true }),
      });
      expect(result).toEqual([]);
    });
  });

  describe('treeMapEach', () => {
    it('should map each node with conversion function', () => {
      const node = { id: 1, name: 'Test', children: [{ id: 2, name: 'Child' }] };
      const result = treeMapEach(node, {
        conversion: (n: any) => ({ ...n, mapped: true }),
      });
      expect(result.mapped).toBe(true);
      expect(result.children[0].mapped).toBe(true);
    });

    it('should handle node without children', () => {
      const node = { id: 1, name: 'Test' };
      const result = treeMapEach(node, {
        conversion: (n: any) => ({ ...n, mapped: true }),
      });
      expect(result.mapped).toBe(true);
      expect(result.children).toBeUndefined();
    });

    it('should handle empty children array', () => {
      const node = { id: 1, name: 'Test', children: [] };
      const result = treeMapEach(node, {
        conversion: (n: any) => ({ ...n, mapped: true }),
      });
      expect(result.mapped).toBe(true);
      expect(result.children).toEqual([]);
    });

    it('should handle conversion function returning null', () => {
      const node = { id: 1, name: 'Test', children: [{ id: 2, name: 'Child' }] };
      const result = treeMapEach(node, {
        conversion: (n: any) => (n.id === 1 ? null : { ...n, mapped: true }),
      });
      expect(result.children[0].mapped).toBe(true);
    });
  });

  describe('eachTree', () => {
    it('should recursively traverse tree with callback', () => {
      const visitedNodes: any[] = [];
      eachTree(sampleTree, (node: any, parent: any) => {
        visitedNodes.push({ id: node.id, parentId: parent?.id });
        return node;
      });
      expect(visitedNodes).toHaveLength(5);
      expect(visitedNodes[0].parentId).toBeUndefined();
      expect(visitedNodes[1].parentId).toBe(1);
    });

    it('should handle custom callback return value', () => {
      const visitedNodes: any[] = [];
      eachTree(sampleTree, (node: any, parent: any) => {
        const newNode = { ...node, processed: true };
        visitedNodes.push(newNode);
        return newNode;
      });
      expect(visitedNodes).toHaveLength(5);
      expect(visitedNodes[0].processed).toBe(true);
    });

    it('should handle empty tree', () => {
      const visitedNodes: any[] = [];
      eachTree([], (node: any, parent: any) => {
        visitedNodes.push(node);
        return node;
      });
      expect(visitedNodes).toEqual([]);
    });

    it('should handle tree without children', () => {
      const flatTree = [
        { id: 1, name: 'Node 1' },
        { id: 2, name: 'Node 2' },
      ];
      const visitedNodes: any[] = [];
      eachTree(flatTree, (node: any, parent: any) => {
        visitedNodes.push(node);
        return node;
      });
      expect(visitedNodes).toHaveLength(2);
    });

    it('should pass parent node to callback', () => {
      const parentNodes: any[] = [];
      eachTree(sampleTree, (node: any, parent: any) => {
        if (parent && parent.id) {
          parentNodes.push(parent.id);
        }
        return node;
      });
      expect(parentNodes).toEqual([1, 2, 1]);
    });

    it('should handle callback returning null', () => {
      const visitedNodes: any[] = [];
      eachTree(sampleTree, (node: any, parent: any) => {
        visitedNodes.push(node);
        return node.id === 1 ? null : node;
      });
      expect(visitedNodes).toHaveLength(5);
    });
  });
});

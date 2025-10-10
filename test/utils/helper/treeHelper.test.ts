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
  const mockList = [
    { id: 1, pId: 0, name: 'Node 1' },
    { id: 2, pId: 1, name: 'Node 2' },
    { id: 3, pId: 1, name: 'Node 3' },
    { id: 4, pId: 2, name: 'Node 4' },
    { id: 5, pId: 0, name: 'Node 5' },
  ];

  const mockTree = [
    {
      id: 1,
      pId: 0,
      name: 'Node 1',
      children: [
        {
          id: 2,
          pId: 1,
          name: 'Node 2',
          children: [{ id: 4, pId: 2, name: 'Node 4', children: [] }],
        },
        { id: 3, pId: 1, name: 'Node 3', children: [] },
      ],
    },
    { id: 5, pId: 0, name: 'Node 5', children: [] },
  ];

  describe('listToTree', () => {
    it('should convert list to tree structure', () => {
      const result = listToTree(mockList);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[0].children).toHaveLength(2);
      expect(result[1].id).toBe(5);
    });

    it('should handle empty list', () => {
      const result = listToTree([]);
      expect(result).toEqual([]);
    });

    it('should handle undefined list', () => {
      const result = listToTree(undefined);
      expect(result).toEqual([]);
    });

    it('should set _name and _fullName properties', () => {
      const result = listToTree(mockList);
      expect(result[0]._name).toBe('Node 1');
      expect(result[0]._fullName).toBe('Node 1');
      expect(result[0].children[0]._name).toBe('Node 2');
      expect(result[0].children[0]._fullName).toBe('Node 1/Node 2');
    });

    it('should call callback for each node', () => {
      const callback = vi.fn();
      listToTree(mockList, { callback });
      expect(callback).toHaveBeenCalledTimes(5);
    });

    it('should use custom config', () => {
      const customList = [
        { nodeId: 1, parentId: 0, title: 'Node 1' },
        { nodeId: 2, parentId: 1, title: 'Node 2' },
      ];
      const result = listToTree(customList, {
        id: 'nodeId',
        pid: 'parentId',
        children: 'subNodes',
      });
      expect(result).toHaveLength(1);
      expect(result[0].subNodes).toHaveLength(1);
    });
  });

  describe('treeToList', () => {
    it('should convert tree to flat list', () => {
      const result = treeToList(mockTree);
      expect(result).toHaveLength(5);
      expect(result.map((node) => node.id)).toEqual([1, 2, 4, 3, 5]);
    });

    it('should handle empty tree', () => {
      const result = treeToList([]);
      expect(result).toEqual([]);
    });

    it('should use custom children property', () => {
      const customTree = [
        {
          id: 1,
          subNodes: [{ id: 2, subNodes: [] }],
        },
      ];
      const result = treeToList(customTree, { children: 'subNodes' });
      expect(result).toHaveLength(2);
    });
  });

  describe('findNode', () => {
    it('should find first matching node', () => {
      const result = findNode(mockTree, (node) => node.id === 3);
      expect(result).toBeTruthy();
      expect(result.id).toBe(3);
    });

    it('should return null if no match found', () => {
      const result = findNode(mockTree, (node) => node.id === 999);
      expect(result).toBeNull();
    });

    it('should use custom children property', () => {
      const customTree = [
        {
          id: 1,
          subNodes: [{ id: 2, subNodes: [] }],
        },
      ];
      const result = findNode(customTree, (node) => node.id === 2, { children: 'subNodes' });
      expect(result).toBeTruthy();
      expect(result.id).toBe(2);
    });
  });

  describe('findNodeAll', () => {
    it('should find all matching nodes', () => {
      const result = findNodeAll(mockTree, (node) => node.pId === 1);
      expect(result).toHaveLength(2);
      expect(result.map((node) => node.id)).toEqual([2, 3]);
    });

    it('should return empty array if no matches found', () => {
      const result = findNodeAll(mockTree, (node) => node.id === 999);
      expect(result).toEqual([]);
    });
  });

  describe('findPath', () => {
    it('should find path to matching node', () => {
      const result = findPath(mockTree, (node) => node.id === 4);
      expect(result).toHaveLength(3);
      expect(result.map((node) => node.id)).toEqual([1, 2, 4]);
    });

    it('should return null if no match found', () => {
      const result = findPath(mockTree, (node) => node.id === 999);
      expect(result).toBeNull();
    });
  });

  describe('findPathAll', () => {
    it('should find all paths to matching nodes', () => {
      const result = findPathAll(mockTree, (node) => node.pId === 1);
      expect(result).toHaveLength(2);
      expect(result[0].map((node) => node.id)).toEqual([1, 2]);
      expect(result[1].map((node) => node.id)).toEqual([1, 3]);
    });

    it('should return empty array if no matches found', () => {
      const result = findPathAll(mockTree, (node) => node.id === 999);
      expect(result).toEqual([]);
    });
  });

  describe('filter', () => {
    it('should filter tree nodes', () => {
      const result = filter(mockTree, (node) => node.id === 1 || node.id === 2);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
      expect(result[0].children).toHaveLength(1);
    });

    it('should handle onlySearchLevel parameter', () => {
      const result = filter(mockTree, (node) => node.id === 1, {}, 1);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });

    it('should return empty array for no matches', () => {
      const result = filter(mockTree, (node) => node.id === 999);
      expect(result).toEqual([]);
    });
  });

  describe('forEach', () => {
    it('should iterate through all nodes', () => {
      const visited = [];
      forEach(mockTree, (node) => {
        visited.push(node.id);
        return false;
      });
      expect(visited).toHaveLength(5);
    });

    it('should stop iteration when callback returns true', () => {
      const visited = [];
      forEach(mockTree, (node) => {
        visited.push(node.id);
        return node.id === 2;
      });
      expect(visited).toHaveLength(2);
    });

    it('should use custom children property', () => {
      const customTree = [
        {
          id: 1,
          subNodes: [{ id: 2, subNodes: [] }],
        },
      ];
      const visited = [];
      forEach(customTree, (node) => {
        visited.push(node.id);
        return false;
      }, { children: 'subNodes' });
      expect(visited).toHaveLength(2);
    });
  });

  describe('treeMap', () => {
    it('should map tree structure', () => {
      const result = treeMap(mockTree, {
        conversion: (node) => ({ label: node.name, value: node.id }),
      });
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('label', 'Node 1');
      expect(result[0]).toHaveProperty('value', 1);
      expect(result[0].children).toHaveLength(2);
    });

    it('should handle empty tree', () => {
      const result = treeMap([], {
        conversion: (node) => ({ label: node.name }),
      });
      expect(result).toEqual([]);
    });
  });

  describe('treeMapEach', () => {
    it('should map individual tree node', () => {
      const node = { id: 1, name: 'Node 1', children: [] };
      const result = treeMapEach(node, {
        conversion: (node) => ({ label: node.name, value: node.id }),
      });
      expect(result).toEqual({ label: 'Node 1', value: 1 });
    });

    it('should handle node with children', () => {
      const node = {
        id: 1,
        name: 'Node 1',
        children: [{ id: 2, name: 'Node 2', children: [] }],
      };
      const result = treeMapEach(node, {
        conversion: (node) => ({ label: node.name, value: node.id }),
      });
      expect(result.label).toBe('Node 1');
      expect(result.value).toBe(1);
      expect(result.children).toHaveLength(1);
      expect(result.children[0].label).toBe('Node 2');
    });
  });

  describe('eachTree', () => {
    it('should recursively traverse tree', () => {
      const visited = [];
      eachTree(mockTree, (node, parent) => {
        visited.push({ id: node.id, parentId: parent.id || null });
        return node;
      });
      expect(visited).toHaveLength(5);
      expect(visited[0].parentId).toBeNull();
      expect(visited[1].parentId).toBe(1);
    });

    it('should handle callback return value', () => {
      const result = [];
      eachTree(mockTree, (node) => {
        result.push(node.id);
        return { ...node, processed: true };
      });
      expect(result).toHaveLength(5);
    });

    it('should handle empty tree', () => {
      const visited = [];
      eachTree([], (node) => {
        visited.push(node.id);
      });
      expect(visited).toHaveLength(0);
    });
  });
});

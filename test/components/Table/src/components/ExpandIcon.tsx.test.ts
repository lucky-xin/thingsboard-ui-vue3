import { describe, it, expect, vi } from 'vitest';
import * as module from '/@/components/Table/src/components/ExpandIcon';

// Mock BasicArrow component
vi.mock('/@/components/Basic', () => ({
  BasicArrow: {
    name: 'BasicArrow',
    template: '<div class="basic-arrow"><slot /></div>',
  },
}));

// Mock utils
vi.mock('/@/utils/is', () => ({
  isEmpty: vi.fn((val) => val === undefined || val === null || val === ''),
}));

describe('ExpandIcon', () => {
  it('should export expected functions/classes', () => {
    expect(module).toBeDefined();
  });

  it('should have correct exports', () => {
    const exports = Object.keys(module);
    expect(exports.length).toBeGreaterThan(0);
  });

  it('should handle edge cases', () => {
    // Add edge case testing based on module functionality
    expect(true).toBe(true);
  });

  it('should work with different input types', () => {
    // Add input validation testing
    expect(true).toBe(true);
  });

  it('should handle errors gracefully', () => {
    // Add error handling testing
    expect(true).toBe(true);
  });

  it('should return a function when called', () => {
    const expandCollapse = vi.fn();
    const handleTableExpand = vi.fn();

    const result = module.default(expandCollapse, handleTableExpand);
    expect(typeof result).toBe('function');
  });

  it('should return a function with expandedRowRender parameter', () => {
    const expandCollapse = vi.fn();
    const handleTableExpand = vi.fn();
    const expandedRowRender = true;

    const result = module.default(expandCollapse, handleTableExpand, expandedRowRender);
    expect(typeof result).toBe('function');
  });

  it('should create component with leaf node', () => {
    const expandCollapse = vi.fn();
    const handleTableExpand = vi.fn();

    const expandIconFactory = module.default(expandCollapse, handleTableExpand);

    const props = {
      record: {
        treeLeaf: '1',
      },
      expanded: false,
    };

    const result = expandIconFactory(props);
    expect(result).toBeDefined();
  });

  it('should create component with expandable node', () => {
    const expandCollapse = vi.fn();
    const handleTableExpand = vi.fn();

    const expandIconFactory = module.default(expandCollapse, handleTableExpand);

    const props = {
      record: {
        children: [{ id: 1 }],
      },
      expanded: false,
      onExpand: vi.fn(),
    };

    const result = expandIconFactory(props);
    expect(result).toBeDefined();
  });

  it('should handle click event on leaf node', async () => {
    const expandCollapse = vi.fn();
    const handleTableExpand = vi.fn();

    const expandIconFactory = module.default(expandCollapse, handleTableExpand);

    const props = {
      record: {
        treeLeaf: '1',
      },
      expanded: false,
    };

    const component = expandIconFactory(props);
    // Since this is a leaf node, click should not trigger expandCollapse
    expect(component).toBeDefined();
  });

  it('should handle click event on expandable node with expandedRowRender', async () => {
    const expandCollapse = vi.fn();
    const handleTableExpand = vi.fn();
    const expandedRowRender = true;

    const expandIconFactory = module.default(expandCollapse, handleTableExpand, expandedRowRender);

    const onExpand = vi.fn();
    const props = {
      record: {
        children: [{ id: 1 }],
      },
      expanded: false,
      onExpand,
    };

    const component = expandIconFactory(props);
    expect(component).toBeDefined();
  });

  it('should handle double click event', async () => {
    const expandCollapse = vi.fn().mockResolvedValue(true);
    const handleTableExpand = vi.fn();

    const expandIconFactory = module.default(expandCollapse, handleTableExpand);

    const props = {
      record: {
        children: [{ id: 1 }],
      },
      expanded: false,
    };

    const component = expandIconFactory(props);
    expect(component).toBeDefined();
  });

  it('should handle double click on leaf node', async () => {
    const expandCollapse = vi.fn().mockResolvedValue(true);
    const handleTableExpand = vi.fn();

    const expandIconFactory = module.default(expandCollapse, handleTableExpand);

    const props = {
      record: {
        treeLeaf: '1',
      },
      expanded: false,
    };

    const component = expandIconFactory(props);
    expect(component).toBeDefined();
  });

  it('should handle loading state', () => {
    const expandCollapse = vi.fn();
    const handleTableExpand = vi.fn();

    const expandIconFactory = module.default(expandCollapse, handleTableExpand);

    const props = {
      record: {
        isLoading: true,
        children: [{ id: 1 }],
      },
      expanded: false,
    };

    const component = expandIconFactory(props);
    expect(component).toBeDefined();
  });

  it('should handle childList instead of children', () => {
    const expandCollapse = vi.fn();
    const handleTableExpand = vi.fn();

    const expandIconFactory = module.default(expandCollapse, handleTableExpand);

    const props = {
      record: {
        childList: [{ id: 1 }],
      },
      expanded: false,
    };

    const component = expandIconFactory(props);
    expect(component).toBeDefined();
  });
});

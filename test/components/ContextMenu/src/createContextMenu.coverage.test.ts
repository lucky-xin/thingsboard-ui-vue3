import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies
vi.mock('vue', () => ({
  createVNode: vi.fn(),
  render: vi.fn(),
}));

vi.mock('/@/utils/is', () => ({
  isClient: vi.fn(),
}));

// Mock ContextMenu.vue
vi.mock('../src/components/ContextMenu/src/ContextMenu.vue', () => ({
  default: 'ContextMenuVue',
}));

import { createContextMenu, destroyContextMenu } from '/@/components/ContextMenu/src/createContextMenu';
import type { CreateContextOptions } from '/@/components/ContextMenu/src/typing';
import { createVNode, render } from 'vue';
import { isClient } from '/@/utils/is';

const mockCreateVNode = vi.mocked(createVNode);
const mockRender = vi.mocked(render);
const mockIsClient = vi.mocked(isClient);

// Mock DOM APIs
const mockDocument = {
  body: {
    appendChild: vi.fn(),
    removeChild: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  },
  createElement: vi.fn(() => ({
    style: {},
  })),
};

Object.defineProperty(global, 'document', {
  value: mockDocument,
  writable: true,
});

describe('createContextMenu coverage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsClient.mockReturnValue(true);
    mockCreateVNode.mockReturnValue('mockVNode');
  });

  it('should return early if not in client environment', () => {
    mockIsClient.mockReturnValue(false);

    const result = createContextMenu({});

    expect(result).toBeUndefined();
    expect(mockCreateVNode).not.toHaveBeenCalled();
    expect(mockRender).not.toHaveBeenCalled();
  });

  it('should create context menu with basic options', () => {
    const options: CreateContextOptions = {
      event: new MouseEvent('click'),
    };

    createContextMenu(options);

    expect(mockCreateVNode).toHaveBeenCalledWith('ContextMenuVue', {
      customEvent: options.event,
      axis: { x: options.event.clientX, y: options.event.clientY },
    });
    expect(mockRender).toHaveBeenCalledWith('mockVNode', expect.any(Object));
    expect(mockDocument.body.appendChild).toHaveBeenCalled();
    expect(mockDocument.body.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    expect(mockDocument.body.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should create context menu with styles', () => {
    const options: CreateContextOptions = {
      styles: { color: 'red' },
    };

    createContextMenu(options);

    expect(mockCreateVNode).toHaveBeenCalledWith('ContextMenuVue', {
      styles: options.styles,
    });
  });

  it('should create context menu with items', () => {
    const options: CreateContextOptions = {
      items: [{ key: '1', label: 'Item 1' }],
    };

    createContextMenu(options);

    expect(mockCreateVNode).toHaveBeenCalledWith('ContextMenuVue', {
      items: options.items,
    });
  });

  it('should create context menu with all options', () => {
    const event = new MouseEvent('click', { clientX: 100, clientY: 200 });
    const options: CreateContextOptions = {
      event,
      styles: { color: 'blue' },
      items: [{ key: '1', label: 'Item 1' }],
    };

    createContextMenu(options);

    expect(mockCreateVNode).toHaveBeenCalledWith('ContextMenuVue', {
      styles: options.styles,
      items: options.items,
      customEvent: event,
      axis: { x: 100, y: 200 },
    });
  });

  it('should prevent default on event if provided', () => {
    const event = new MouseEvent('click');
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    createContextMenu({ event });

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should handle empty options', () => {
    createContextMenu({});

    expect(mockCreateVNode).toHaveBeenCalledWith('ContextMenuVue', {});
    expect(mockRender).toHaveBeenCalled();
  });

  it('should handle options without event', () => {
    const options: CreateContextOptions = {
      styles: { color: 'green' },
      items: [{ key: '2', label: 'Item 2' }],
    };

    createContextMenu(options);

    expect(mockCreateVNode).toHaveBeenCalledWith('ContextMenuVue', {
      styles: options.styles,
      items: options.items,
    });
  });

  it('should handle event without preventDefault', () => {
    const event = {
      clientX: 50,
      clientY: 100,
      preventDefault: vi.fn(),
    } as any;

    createContextMenu({ event });

    expect(mockCreateVNode).toHaveBeenCalledWith('ContextMenuVue', {
      customEvent: event,
      axis: { x: 50, y: 100 },
    });
  });

  it('should handle null options', () => {
    createContextMenu(null as any);

    expect(mockCreateVNode).toHaveBeenCalledWith('ContextMenuVue', {});
    expect(mockRender).toHaveBeenCalled();
  });

  it('should handle undefined options', () => {
    createContextMenu(undefined as any);

    expect(mockCreateVNode).toHaveBeenCalledWith('ContextMenuVue', {});
    expect(mockRender).toHaveBeenCalled();
  });
});

describe('destroyContextMenu coverage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call resolve and clear domList', () => {
    expect(() => {
      destroyContextMenu();
    }).not.toThrow();
  });

  it('should handle multiple calls to destroyContextMenu', () => {
    expect(() => {
      destroyContextMenu();
      destroyContextMenu();
    }).not.toThrow();
  });
});

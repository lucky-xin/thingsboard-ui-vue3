import { describe, it, expect, vi } from 'vitest';
import { createContextMenu, destroyContextMenu } from '/@/components/ContextMenu/src/createContextMenu';

// Mock dependencies
vi.mock('/@/utils/is', () => ({
  isClient: true,
}));

vi.mock('/@/components/ContextMenu/src/ContextMenu.vue', () => ({
  default: {
    name: 'ContextMenu',
    template: '<div class="mock-context-menu"><slot /></div>',
  },
}));

describe('createContextMenu', () => {
  beforeEach(() => {
    // Reset DOM before each test
    document.body.innerHTML = '';
  });

  it('should export expected types', () => {
    expect(createContextMenu).toBeDefined();
    expect(destroyContextMenu).toBeDefined();
  });

  it('should create context menu with valid options', async () => {
    // Mock document APIs
    const mockContainer = document.createElement('div');
    vi.spyOn(document, 'createElement').mockReturnValue(mockContainer);

    const appendChildSpy = vi.spyOn(document.body, 'appendChild').mockImplementation(() => {});
    const addEventListenerSpy = vi.spyOn(document.body, 'addEventListener').mockImplementation(() => {});

    const options = {
      event: {
        clientX: 100,
        clientY: 100,
        preventDefault: vi.fn(),
      },
      items: [{ label: 'Test', handler: vi.fn() }],
    };

    const promise = createContextMenu(options);

    expect(options.event.preventDefault).toHaveBeenCalled();
    expect(appendChildSpy).toHaveBeenCalledWith(mockContainer);
    expect(addEventListenerSpy).toHaveBeenCalled();
    expect(promise).toBeInstanceOf(Promise);

    // Clean up mocks
    appendChildSpy.mockRestore();
    addEventListenerSpy.mockRestore();
  });

  it('should handle null options', () => {
    expect(() => createContextMenu(null as any)).not.toThrow();
  });

  it('should handle undefined options', () => {
    expect(() => createContextMenu(undefined as any)).not.toThrow();
  });

  it('should destroy context menu', () => {
    expect(() => destroyContextMenu()).not.toThrow();
  });

  it('should handle options without event', () => {
    const options = {
      items: [{ label: 'Test', handler: vi.fn() }],
    };

    // Mock document APIs
    const mockContainer = document.createElement('div');
    vi.spyOn(document, 'createElement').mockReturnValue(mockContainer);
    const appendChildSpy = vi.spyOn(document.body, 'appendChild').mockImplementation(() => {});

    const promise = createContextMenu(options);

    expect(appendChildSpy).toHaveBeenCalledWith(mockContainer);
    expect(promise).toBeInstanceOf(Promise);

    // Clean up mocks
    appendChildSpy.mockRestore();
  });

  it('should handle options with styles', () => {
    const options = {
      styles: { color: 'red' },
      event: {
        clientX: 100,
        clientY: 100,
        preventDefault: vi.fn(),
      },
    };

    // Mock document APIs
    const mockContainer = document.createElement('div');
    vi.spyOn(document, 'createElement').mockReturnValue(mockContainer);
    const appendChildSpy = vi.spyOn(document.body, 'appendChild').mockImplementation(() => {});

    const promise = createContextMenu(options);

    expect(options.event.preventDefault).toHaveBeenCalled();
    expect(appendChildSpy).toHaveBeenCalledWith(mockContainer);
    expect(promise).toBeInstanceOf(Promise);

    // Clean up mocks
    appendChildSpy.mockRestore();
  });

  it('should resolve promise when menu is clicked', async () => {
    // Mock document APIs
    const mockContainer = document.createElement('div');
    vi.spyOn(document, 'createElement').mockReturnValue(mockContainer);
    vi.spyOn(document.body, 'appendChild').mockImplementation(() => {});
    const removeEventListenerSpy = vi.spyOn(document.body, 'removeEventListener').mockImplementation(() => {});

    const options = {
      event: {
        clientX: 100,
        clientY: 100,
        preventDefault: vi.fn(),
      },
    };

    const promise = createContextMenu(options);

    // Simulate click event
    const clickEvent = new MouseEvent('click');
    document.body.dispatchEvent(clickEvent);

    const result = await promise;
    expect(result).toBe('');

    // Clean up mocks
    removeEventListenerSpy.mockRestore();
  });
});
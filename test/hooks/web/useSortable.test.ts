import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { nextTick, unref } from 'vue';
import { useSortable } from '/@/hooks/web/useSortable';

// Mock Vue composition API
vi.mock('vue', () => ({
  nextTick: vi.fn((callback) => callback()),
  unref: vi.fn((ref) => ref?.value ?? ref),
}));

// Mock sortablejs
const mockSortableCreate = vi.fn();
const mockSortable = {
  create: mockSortableCreate,
};

// Mock dynamic import
vi.mock('sortablejs', () => ({
  default: mockSortable,
}));

// Mock the dynamic import function
global.import = vi.fn(() => Promise.resolve({ default: mockSortable }));

describe('hooks/web/useSortable', () => {
  let mockElement: HTMLElement;

  beforeEach(() => {
    vi.clearAllMocks();
    
    mockElement = document.createElement('div');
    mockElement.id = 'test-element';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize sortable with default options', async () => {
    const result = useSortable(mockElement);

    expect(result.initSortable).toBeInstanceOf(Function);

    result.initSortable();

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(mockSortableCreate).toHaveBeenCalledWith(mockElement, {
      animation: 500,
      delay: 400,
      delayOnTouchOnly: true,
    });
  });

  it('should initialize sortable with custom options', async () => {
    const customOptions = {
      animation: 300,
      delay: 200,
      disabled: true,
    };

    const result = useSortable(mockElement, customOptions);

    result.initSortable();

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(mockSortableCreate).toHaveBeenCalledWith(mockElement, {
      animation: 300,
      delay: 200,
      delayOnTouchOnly: true,
      disabled: true,
    });
  });

  it('should handle ref element', async () => {
    const elementRef = { value: mockElement };

    const result = useSortable(elementRef);

    result.initSortable();

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(mockSortableCreate).toHaveBeenCalledWith(mockElement, {
      animation: 500,
      delay: 400,
      delayOnTouchOnly: true,
    });
  });

  it('should handle null element', () => {
    const result = useSortable(null as any);

    result.initSortable();

    expect(mockSortableCreate).not.toHaveBeenCalled();
  });

  it('should handle undefined element', () => {
    const result = useSortable(undefined as any);

    result.initSortable();

    expect(mockSortableCreate).not.toHaveBeenCalled();
  });

  it('should merge custom options with default options', async () => {
    const customOptions = {
      delay: 100,
      ghostClass: 'sortable-ghost',
    };

    const result = useSortable(mockElement, customOptions);

    result.initSortable();

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(mockSortableCreate).toHaveBeenCalledWith(mockElement, {
      animation: 500,
      delay: 100,
      delayOnTouchOnly: true,
      ghostClass: 'sortable-ghost',
    });
  });

  it('should override default options with custom options', async () => {
    const customOptions = {
      animation: 1000,
      delay: 600,
      delayOnTouchOnly: false,
    };

    const result = useSortable(mockElement, customOptions);

    result.initSortable();

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(mockSortableCreate).toHaveBeenCalledWith(mockElement, {
      animation: 1000,
      delay: 600,
      delayOnTouchOnly: false,
    });
  });

  it('should handle empty options object', async () => {
    const result = useSortable(mockElement, {});

    result.initSortable();

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(mockSortableCreate).toHaveBeenCalledWith(mockElement, {
      animation: 500,
      delay: 400,
      delayOnTouchOnly: true,
    });
  });

  it('should call nextTick before initializing', () => {
    const result = useSortable(mockElement);

    result.initSortable();

    expect(nextTick).toHaveBeenCalled();
  });

  it('should handle ref with null value', () => {
    const elementRef = { value: null };

    const result = useSortable(elementRef);

    result.initSortable();

    expect(mockSortableCreate).not.toHaveBeenCalled();
  });

  it('should handle ref with undefined value', () => {
    const elementRef = { value: undefined };

    const result = useSortable(elementRef);

    result.initSortable();

    expect(mockSortableCreate).not.toHaveBeenCalled();
  });
});

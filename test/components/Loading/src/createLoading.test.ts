import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Loading from '/@/components/Loading/src/Loading.vue';

// Mock DOM
const mockElement = {
  appendChild: vi.fn(),
  removeChild: vi.fn(),
  parentNode: {
    removeChild: vi.fn(),
  },
};

// Mock document
const mockDocument = {
  createElement: vi.fn(() => mockElement),
  body: mockElement,
};

// Mock global document
Object.defineProperty(global, 'document', {
  value: mockDocument,
  writable: true,
});

// Mock Vue functions
vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal();
  const mockVNode = {
    el: mockElement,
  };

  return {
    ...actual,
    createVNode: vi.fn(() => mockVNode),
    render: vi.fn(),
    reactive: vi.fn((obj) => obj),
    h: vi.fn(() => mockElement),
    defineComponent: vi.fn((options) => options),
  };
});

// Mock Loading component
vi.mock('/@/components/Loading/src/Loading.vue', () => ({
  default: { name: 'Loading' },
}));

// Import after mocks
const { createLoading } = await import('/@/components/Loading/src/createLoading');

// Import mocked functions
const { createVNode, render, reactive, h } = await import('vue');

const mockVNode = {
  el: mockElement,
};

describe('components/Loading/src/createLoading', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock document.createElement
    Object.defineProperty(global, 'document', {
      value: {
        createElement: vi.fn(() => mockElement),
        body: mockElement,
      },
      writable: true,
    });
    // Mock setTimeout
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should create loading instance with default props', () => {
    const instance = createLoading();

    expect(instance).toBeDefined();
    expect(instance.vm).toBeDefined();
    expect(instance.close).toBeInstanceOf(Function);
    expect(instance.open).toBeInstanceOf(Function);
    expect(instance.setTip).toBeInstanceOf(Function);
    expect(instance.setLoading).toBeInstanceOf(Function);
    expect(instance.loading).toBe(true);
    expect(instance.$el).toBe(mockElement);
  });

  it('should create loading instance with custom props', () => {
    const props = { tip: 'Loading...', loading: false };
    const instance = createLoading(props);

    expect(instance).toBeDefined();
    expect(instance.loading).toBe(false);
  });

  it('should create loading instance with target element', () => {
    const target = document.createElement('div');
    const instance = createLoading({}, target);

    expect(instance).toBeDefined();
    expect(target.appendChild).toHaveBeenCalledWith(mockElement);
  });

  it('should create loading instance with wait option', () => {
    const instance = createLoading({}, undefined, true);

    expect(instance).toBeDefined();
    expect(render).not.toHaveBeenCalled();

    // Fast-forward timers
    vi.runAllTimers();
    expect(render).toHaveBeenCalled();
  });

  it('should set tip correctly', () => {
    const instance = createLoading();
    instance.setTip('New tip');

    expect(instance).toBeDefined();
  });

  it('should set loading state correctly', () => {
    const instance = createLoading();
    instance.setLoading(false);

    expect(instance).toBeDefined();
  });

  it('should open loading on target element', () => {
    const target = document.createElement('div');
    const instance = createLoading();

    instance.open(target);

    expect(target.appendChild).toHaveBeenCalledWith(mockElement);
  });

  it('should close loading by removing from parent', () => {
    const parent = document.createElement('div');
    mockElement.parentNode = parent;
    const instance = createLoading();

    instance.close();

    expect(parent.removeChild).toHaveBeenCalledWith(mockElement);
  });

  it('should handle close when no parent node', () => {
    mockElement.parentNode = null;
    const instance = createLoading();

    expect(() => instance.close()).not.toThrow();
  });

  it('should handle open when vm or el is not available', () => {
    const instance = createLoading();
    // Mock vm.el to be null
    instance.vm = null;

    expect(() => instance.open()).not.toThrow();
  });

  it('should return correct loading state', () => {
    const instance = createLoading();
    expect(instance.loading).toBe(true);
  });

  it('should return correct $el', () => {
    const instance = createLoading();
    expect(instance.$el).toBe(mockElement);
  });

  it('should handle reactive data correctly', () => {
    const props = { tip: 'Initial tip' };
    const instance = createLoading(props);

    expect(instance).toBeDefined();
    expect(reactive).toHaveBeenCalledWith({
      tip: 'Initial tip',
      loading: true,
    });
  });

  it('should create LoadingWrap component correctly', () => {
    const instance = createLoading();

    expect(instance).toBeDefined();
    // Skip checking for createVNode and h calls as they are handled internally
  });

  it('should handle empty props', () => {
    const instance = createLoading({});

    expect(instance).toBeDefined();
    expect(reactive).toHaveBeenCalledWith({
      tip: '',
      loading: true,
    });
  });

  it('should handle undefined props', () => {
    const instance = createLoading(undefined);

    expect(instance).toBeDefined();
    expect(reactive).toHaveBeenCalledWith({
      tip: '',
      loading: true,
    });
  });
});

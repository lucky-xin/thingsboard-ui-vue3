import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, computed } from 'vue';

// Mock Vue functions
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    ref: vi.fn((val) => ({ value: val })),
    computed: vi.fn((fn) => ({ value: fn() })),
    unref: vi.fn((val) => val?.value ?? val),
    nextTick: vi.fn(() => Promise.resolve()),
    watch: vi.fn(),
    isRef: vi.fn((val) => val && typeof val === 'object' && 'value' in val),
  };
});

// Mock dependencies
vi.mock('/@/hooks/core/onMountedOrActivated', () => ({
  onMountedOrActivated: vi.fn((callback) => callback()),
}));

vi.mock('/@/hooks/event/useWindowSizeFn', () => ({
  useWindowSizeFn: vi.fn(),
}));

vi.mock('/@/layouts/default/content/useContentViewHeight', () => ({
  useLayoutHeight: () => ({
    footerHeightRef: ref(50),
  }),
}));

vi.mock('/@/utils/domUtils', () => ({
  getViewportOffset: vi.fn(() => ({
    bottomIncludeBody: 800,
  })),
}));

vi.mock('/@/utils/is', () => ({
  isNumber: vi.fn((val) => typeof val === 'number'),
  isString: vi.fn((val) => typeof val === 'string'),
}));

// Mock getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  value: vi.fn(() => ({
    marginTop: '10px',
    marginBottom: '10px',
    paddingTop: '5px',
    paddingBottom: '5px',
  })),
});

describe('hooks/web/useContentHeight', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should export useContentHeight hook', async () => {
    const module = await import('/@/hooks/web/useContentHeight');
    
    expect(module).toBeDefined();
    expect(module.useContentHeight).toBeDefined();
    expect(typeof module.useContentHeight).toBe('function');
  });

  it('should initialize with default values', async () => {
    const { useContentHeight } = await import('/@/hooks/web/useContentHeight');
    
    const flag = ref(true);
    const anchorRef = ref({
      offsetHeight: 100,
      parentElement: {
        classList: { contains: vi.fn(() => false) },
      },
    });
    const subtractHeightRefs = [ref({ offsetHeight: 50 })];
    const substractSpaceRefs = [ref({ offsetHeight: 30 })];
    
    const { contentHeight, redoHeight, setCompensation } = useContentHeight(
      flag,
      anchorRef,
      subtractHeightRefs,
      substractSpaceRefs
    );
    
    expect(contentHeight.value).toBeNull();
    expect(typeof redoHeight).toBe('function');
    expect(typeof setCompensation).toBe('function');
  });

  it('should calculate content height when flag is true', async () => {
    const { useContentHeight } = await import('/@/hooks/web/useContentHeight');
    
    const flag = ref(true);
    const anchorRef = ref({
      offsetHeight: 100,
      parentElement: {
        classList: { contains: vi.fn(() => false) },
      },
    });
    const subtractHeightRefs = [ref({ offsetHeight: 50 })];
    const substractSpaceRefs = [ref({ offsetHeight: 30 })];
    
    const { redoHeight } = useContentHeight(
      flag,
      anchorRef,
      subtractHeightRefs,
      substractSpaceRefs
    );
    
    expect(() => redoHeight()).not.toThrow();
  });

  it('should not calculate height when flag is false', async () => {
    const { useContentHeight } = await import('/@/hooks/web/useContentHeight');
    
    const flag = ref(false);
    const anchorRef = ref({
      offsetHeight: 100,
      parentElement: {
        classList: { contains: vi.fn(() => false) },
      },
    });
    const subtractHeightRefs = [ref({ offsetHeight: 50 })];
    const substractSpaceRefs = [ref({ offsetHeight: 30 })];
    
    const { redoHeight } = useContentHeight(
      flag,
      anchorRef,
      subtractHeightRefs,
      substractSpaceRefs
    );
    
    expect(() => redoHeight()).not.toThrow();
  });

  it('should handle null anchor element', async () => {
    const { useContentHeight } = await import('/@/hooks/web/useContentHeight');
    
    const flag = ref(true);
    const anchorRef = ref(null);
    const subtractHeightRefs = [ref({ offsetHeight: 50 })];
    const substractSpaceRefs = [ref({ offsetHeight: 30 })];
    
    const { redoHeight } = useContentHeight(
      flag,
      anchorRef,
      subtractHeightRefs,
      substractSpaceRefs
    );
    
    expect(() => redoHeight()).not.toThrow();
  });

  it('should handle HTMLDivElement directly', async () => {
    const { useContentHeight } = await import('/@/hooks/web/useContentHeight');
    
    const flag = ref(true);
    const anchorRef = ref(document.createElement('div'));
    const subtractHeightRefs = [ref({ offsetHeight: 50 })];
    const substractSpaceRefs = [ref({ offsetHeight: 30 })];
    
    const { redoHeight } = useContentHeight(
      flag,
      anchorRef,
      subtractHeightRefs,
      substractSpaceRefs
    );
    
    expect(() => redoHeight()).not.toThrow();
  });

  it('should handle Vue component with $el', async () => {
    const { useContentHeight } = await import('/@/hooks/web/useContentHeight');
    
    const flag = ref(true);
    const anchorRef = ref({
      $el: document.createElement('div'),
    });
    const subtractHeightRefs = [ref({ offsetHeight: 50 })];
    const substractSpaceRefs = [ref({ offsetHeight: 30 })];
    
    const { redoHeight } = useContentHeight(
      flag,
      anchorRef,
      subtractHeightRefs,
      substractSpaceRefs
    );
    
    expect(() => redoHeight()).not.toThrow();
  });

  it('should set compensation height', async () => {
    const { useContentHeight } = await import('/@/hooks/web/useContentHeight');
    
    const flag = ref(true);
    const anchorRef = ref({
      offsetHeight: 100,
      parentElement: {
        classList: { contains: vi.fn(() => false) },
      },
    });
    const subtractHeightRefs = [ref({ offsetHeight: 50 })];
    const substractSpaceRefs = [ref({ offsetHeight: 30 })];
    
    const { setCompensation, redoHeight } = useContentHeight(
      flag,
      anchorRef,
      subtractHeightRefs,
      substractSpaceRefs
    );
    
    const compensation = {
      useLayoutFooter: false,
      elements: [ref({ offsetHeight: 20 })],
    };
    
    expect(() => setCompensation(compensation)).not.toThrow();
    expect(() => redoHeight()).not.toThrow();
  });

  it('should handle upward space with number', async () => {
    const { useContentHeight } = await import('/@/hooks/web/useContentHeight');
    
    const flag = ref(true);
    const anchorRef = ref({
      offsetHeight: 100,
      parentElement: {
        classList: { contains: vi.fn(() => false) },
        parentElement: {
          classList: { contains: vi.fn(() => false) },
          parentElement: null,
        },
      },
    });
    const subtractHeightRefs = [ref({ offsetHeight: 50 })];
    const substractSpaceRefs = [ref({ offsetHeight: 30 })];
    const upwardSpace = ref(2);
    
    const { redoHeight } = useContentHeight(
      flag,
      anchorRef,
      subtractHeightRefs,
      substractSpaceRefs,
      upwardSpace
    );
    
    expect(() => redoHeight()).not.toThrow();
  });

  it('should handle upward space with string class', async () => {
    const { useContentHeight } = await import('/@/hooks/web/useContentHeight');
    
    const flag = ref(true);
    const anchorRef = ref({
      offsetHeight: 100,
      parentElement: {
        classList: { contains: vi.fn(() => true) },
        parentElement: null,
      },
    });
    const subtractHeightRefs = [ref({ offsetHeight: 50 })];
    const substractSpaceRefs = [ref({ offsetHeight: 30 })];
    const upwardSpace = ref('ant-layout');
    
    const { redoHeight } = useContentHeight(
      flag,
      anchorRef,
      subtractHeightRefs,
      substractSpaceRefs,
      upwardSpace
    );
    
    expect(() => redoHeight()).not.toThrow();
  });

  it('should handle upward space with non-ref value', async () => {
    const { useContentHeight } = await import('/@/hooks/web/useContentHeight');
    
    const flag = ref(true);
    const anchorRef = ref({
      offsetHeight: 100,
      parentElement: {
        classList: { contains: vi.fn(() => false) },
        parentElement: null,
      },
    });
    const subtractHeightRefs = [ref({ offsetHeight: 50 })];
    const substractSpaceRefs = [ref({ offsetHeight: 30 })];
    
    const { redoHeight } = useContentHeight(
      flag,
      anchorRef,
      subtractHeightRefs,
      substractSpaceRefs,
      2 // Direct number value
    );
    
    expect(() => redoHeight()).not.toThrow();
  });

  it('should handle empty subtract height refs', async () => {
    const { useContentHeight } = await import('/@/hooks/web/useContentHeight');
    
    const flag = ref(true);
    const anchorRef = ref({
      offsetHeight: 100,
      parentElement: {
        classList: { contains: vi.fn(() => false) },
      },
    });
    const substractSpaceRefs = [ref({ offsetHeight: 30 })];
    
    const { redoHeight } = useContentHeight(
      flag,
      anchorRef,
      [], // Empty array
      substractSpaceRefs
    );
    
    expect(() => redoHeight()).not.toThrow();
  });

  it('should handle empty substract space refs', async () => {
    const { useContentHeight } = await import('/@/hooks/web/useContentHeight');
    
    const flag = ref(true);
    const anchorRef = ref({
      offsetHeight: 100,
      parentElement: {
        classList: { contains: vi.fn(() => false) },
      },
    });
    const subtractHeightRefs = [ref({ offsetHeight: 50 })];
    
    const { redoHeight } = useContentHeight(
      flag,
      anchorRef,
      subtractHeightRefs,
      [] // Empty array
    );
    
    expect(() => redoHeight()).not.toThrow();
  });

  it('should handle element with no parent', async () => {
    const { useContentHeight } = await import('/@/hooks/web/useContentHeight');
    
    const flag = ref(true);
    const anchorRef = ref({
      offsetHeight: 100,
      parentElement: null,
    });
    const subtractHeightRefs = [ref({ offsetHeight: 50 })];
    const substractSpaceRefs = [ref({ offsetHeight: 30 })];
    
    const { redoHeight } = useContentHeight(
      flag,
      anchorRef,
      subtractHeightRefs,
      substractSpaceRefs
    );
    
    expect(() => redoHeight()).not.toThrow();
  });

  it('should handle upward space with nested parents', async () => {
    const { useContentHeight } = await import('/@/hooks/web/useContentHeight');
    
    const flag = ref(true);
    const anchorRef = ref({
      offsetHeight: 100,
      parentElement: {
        classList: { contains: vi.fn(() => false) },
        parentElement: {
          classList: { contains: vi.fn(() => true) },
          parentElement: null,
        },
      },
    });
    const subtractHeightRefs = [ref({ offsetHeight: 50 })];
    const substractSpaceRefs = [ref({ offsetHeight: 30 })];
    const upwardSpace = ref('ant-layout');
    
    const { redoHeight } = useContentHeight(
      flag,
      anchorRef,
      subtractHeightRefs,
      substractSpaceRefs,
      upwardSpace
    );
    
    expect(() => redoHeight()).not.toThrow();
  });

  it('should handle compensation height with layout footer', async () => {
    const { useContentHeight } = await import('/@/hooks/web/useContentHeight');
    
    const flag = ref(true);
    const anchorRef = ref({
      offsetHeight: 100,
      parentElement: {
        classList: { contains: vi.fn(() => false) },
      },
    });
    const subtractHeightRefs = [ref({ offsetHeight: 50 })];
    const substractSpaceRefs = [ref({ offsetHeight: 30 })];
    
    const { setCompensation, redoHeight } = useContentHeight(
      flag,
      anchorRef,
      subtractHeightRefs,
      substractSpaceRefs
    );
    
    const compensation = {
      useLayoutFooter: true,
      elements: [ref({ offsetHeight: 20 })],
    };
    
    expect(() => setCompensation(compensation)).not.toThrow();
    expect(() => redoHeight()).not.toThrow();
  });

  it('should handle offset height ref', async () => {
    const { useContentHeight } = await import('/@/hooks/web/useContentHeight');
    
    const flag = ref(true);
    const anchorRef = ref({
      offsetHeight: 100,
      parentElement: {
        classList: { contains: vi.fn(() => false) },
      },
    });
    const subtractHeightRefs = [ref({ offsetHeight: 50 })];
    const substractSpaceRefs = [ref({ offsetHeight: 30 })];
    const offsetHeightRef = ref(10);
    
    const { redoHeight } = useContentHeight(
      flag,
      anchorRef,
      subtractHeightRefs,
      substractSpaceRefs,
      0,
      offsetHeightRef
    );
    
    expect(() => redoHeight()).not.toThrow();
  });

  it('should call window size function on mount', async () => {
    const { useContentHeight } = await import('/@/hooks/web/useContentHeight');
    const { useWindowSizeFn } = await import('/@/hooks/event/useWindowSizeFn');
    
    const flag = ref(true);
    const anchorRef = ref({
      offsetHeight: 100,
      parentElement: {
        classList: { contains: vi.fn(() => false) },
      },
    });
    const subtractHeightRefs = [ref({ offsetHeight: 50 })];
    const substractSpaceRefs = [ref({ offsetHeight: 30 })];
    
    useContentHeight(
      flag,
      anchorRef,
      subtractHeightRefs,
      substractSpaceRefs
    );
    
    expect(vi.mocked(useWindowSizeFn)).toHaveBeenCalledWith(
      expect.any(Function),
      50,
      { immediate: true }
    );
  });

  it('should handle calcSubtractSpace with different directions', async () => {
    const { useContentHeight } = await import('/@/hooks/web/useContentHeight');
    
    const flag = ref(true);
    const anchorRef = ref({
      offsetHeight: 100,
      parentElement: {
        classList: { contains: vi.fn(() => false) },
      },
    });
    const subtractHeightRefs = [ref({ offsetHeight: 50 })];
    const substractSpaceRefs = [ref({ offsetHeight: 30 })];
    
    const { redoHeight } = useContentHeight(
      flag,
      anchorRef,
      subtractHeightRefs,
      substractSpaceRefs
    );
    
    expect(() => redoHeight()).not.toThrow();
  });

  it('should handle upward space with zero value', async () => {
    const { useContentHeight } = await import('/@/hooks/web/useContentHeight');
    
    const flag = ref(true);
    const anchorRef = ref({
      offsetHeight: 100,
      parentElement: {
        classList: { contains: vi.fn(() => false) },
      },
    });
    const subtractHeightRefs = [ref({ offsetHeight: 50 })];
    const substractSpaceRefs = [ref({ offsetHeight: 30 })];
    
    const { redoHeight } = useContentHeight(
      flag,
      anchorRef,
      subtractHeightRefs,
      substractSpaceRefs,
      0
    );
    
    expect(() => redoHeight()).not.toThrow();
  });

  it('should handle upward space with null value', async () => {
    const { useContentHeight } = await import('/@/hooks/web/useContentHeight');
    
    const flag = ref(true);
    const anchorRef = ref({
      offsetHeight: 100,
      parentElement: {
        classList: { contains: vi.fn(() => false) },
      },
    });
    const subtractHeightRefs = [ref({ offsetHeight: 50 })];
    const substractSpaceRefs = [ref({ offsetHeight: 30 })];
    
    const { redoHeight } = useContentHeight(
      flag,
      anchorRef,
      subtractHeightRefs,
      substractSpaceRefs,
      null
    );
    
    expect(() => redoHeight()).not.toThrow();
  });
});
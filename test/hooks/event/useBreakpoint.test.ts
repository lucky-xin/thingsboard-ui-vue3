import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { CreateCallbackParams } from '/@/hooks/event/useBreakpoint';

// Mock Vue composition functions
vi.mock('vue', () => ({
  ref: vi.fn((value) => ({ value })),
  computed: vi.fn((fn) => ({ value: fn() })),
  unref: vi.fn((val) => (val && typeof val === 'object' && 'value' in val ? val.value : val)),
}));

// Mock the useEventListener hook
vi.mock('/@/hooks/event/useEventListener', () => ({
  useEventListener: vi.fn(),
}));

// Mock the breakpoint enum
vi.mock('/@/enums/breakpointEnum', () => ({
  screenMap: new Map([
    ['XS', 480],
    ['SM', 576], 
    ['MD', 768],
    ['LG', 992],
    ['XL', 1200],
    ['XXL', 1600],
  ]),
  sizeEnum: {
    XS: 'XS',
    SM: 'SM',
    MD: 'MD', 
    LG: 'LG',
    XL: 'XL',
    XXL: 'XXL',
  },
  screenEnum: {
    XS: 480,
    SM: 576,
    MD: 768,
    LG: 992,
    XL: 1200,
    XXL: 1600,
  },
}));

// Import after mocking
import { useBreakpoint, createBreakpointListen } from '/@/hooks/event/useBreakpoint';
import { ref, computed, unref } from 'vue';
import { useEventListener } from '/@/hooks/event/useEventListener';
import { screenMap, sizeEnum, screenEnum } from '/@/enums/breakpointEnum';

describe('hooks/event/useBreakpoint', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup mock implementations
    (ref as any).mockImplementation((value) => ({ value }));
    (computed as any).mockImplementation((fn) => ({ value: fn() }));
    (unref as any).mockImplementation((val) => 
      val && typeof val === 'object' && 'value' in val ? val.value : val
    );
    (useEventListener as any).mockImplementation(() => ({}));

    // Mock window and document properties
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1024);
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(1024);
  });

  describe('useBreakpoint', () => {
    it('should return breakpoint utilities', () => {
      // First initialize breakpoint listening
      createBreakpointListen();
      
      const result = useBreakpoint();

      expect(result).toHaveProperty('screenRef');
      expect(result).toHaveProperty('widthRef');
      expect(result).toHaveProperty('realWidthRef');
      expect(result).toHaveProperty('screenEnum');
      expect(result.screenEnum).toBe(screenEnum);
    });

    it('should return computed screen reference', () => {
      createBreakpointListen();
      
      const result = useBreakpoint();
      
      expect(computed).toHaveBeenCalled();
      expect(result.screenRef).toBeDefined();
    });
  });

  describe('createBreakpointListen', () => {
    it('should initialize screen and width refs', () => {
      const result = createBreakpointListen();

      expect(result).toHaveProperty('screenRef');
      expect(result).toHaveProperty('widthRef');
      expect(result).toHaveProperty('realWidthRef');
      expect(result).toHaveProperty('screenEnum');
      expect(ref).toHaveBeenCalledWith(sizeEnum.XL);
      expect(ref).toHaveBeenCalledWith(window.innerWidth);
    });

    it('should add resize event listener', () => {
      createBreakpointListen();

      expect(useEventListener).toHaveBeenCalledWith({
        el: window,
        name: 'resize',
        listener: expect.any(Function),
      });
    });

    it('should determine correct screen size for different widths', () => {
      const testCases = [
        { width: 400, expected: sizeEnum.XS },
        { width: 500, expected: sizeEnum.SM },
        { width: 700, expected: sizeEnum.MD },
        { width: 900, expected: sizeEnum.LG },
        { width: 1100, expected: sizeEnum.XL },
        { width: 1700, expected: sizeEnum.XXL },
      ];

      testCases.forEach(({ width, expected }) => {
        vi.clearAllMocks();
        vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(width);

        const mockScreenRef = { value: sizeEnum.XL };
        (ref as any).mockReturnValueOnce(mockScreenRef).mockReturnValue({ value: width });

        createBreakpointListen();

        expect(mockScreenRef.value).toBe(expected);
      });
    });

    it('should call callback function with correct parameters', () => {
      const callback = vi.fn();
      
      createBreakpointListen(callback);

      expect(callback).toHaveBeenCalledWith({
        screen: expect.any(Object),
        width: expect.any(Object),
        realWidth: expect.any(Object),
        screenEnum,
        screenMap,
        sizeEnum,
      });
    });

    it('should handle resize events', () => {
      let resizeListener: any;
      (useEventListener as any).mockImplementation(({ listener }) => {
        resizeListener = listener;
      });

      const callback = vi.fn();
      createBreakpointListen(callback);

      // Clear previous calls
      callback.mockClear();

      // Mock new width and simulate resize
      vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(600);
      if (resizeListener) {
        resizeListener();
      }

      expect(callback).toHaveBeenCalled();
    });

    it('should update real width reference on resize', () => {
      let resizeListener: any;
      (useEventListener as any).mockImplementation(({ listener }) => {
        resizeListener = listener;
      });

      const mockRealWidthRef = { value: 1024 };
      (ref as any).mockReturnValueOnce({ value: sizeEnum.XL }).mockReturnValue(mockRealWidthRef);

      createBreakpointListen();

      // Mock new width and simulate resize
      vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(800);
      if (resizeListener) {
        resizeListener();
      }

      expect(mockRealWidthRef.value).toBe(800);
    });

    it('should work without callback function', () => {
      expect(() => createBreakpointListen()).not.toThrow();
      
      const result = createBreakpointListen();
      expect(result).toHaveProperty('screenRef');
    });

    it('should create computed refs correctly', () => {
      createBreakpointListen();

      // Should call computed for screenRef, widthRef, and realWidthRef
      expect(computed).toHaveBeenCalledTimes(3);
    });

    it('should return all required properties', () => {
      const result = createBreakpointListen();

      expect(result).toEqual({
        screenRef: expect.any(Object),
        screenEnum,
        widthRef: expect.any(Object),
        realWidthRef: expect.any(Object),
      });
    });

    it('should handle callback parameter types correctly', () => {
      const callback = vi.fn((params: CreateCallbackParams) => {
        expect(params).toHaveProperty('screen');
        expect(params).toHaveProperty('width');
        expect(params).toHaveProperty('realWidth');
        expect(params).toHaveProperty('screenEnum');
        expect(params).toHaveProperty('screenMap');
        expect(params).toHaveProperty('sizeEnum');
      });

      createBreakpointListen(callback);
      expect(callback).toHaveBeenCalled();
    });
  });
});
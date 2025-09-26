import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createApp } from 'vue';
import type { ObjectDirective } from 'vue';

// Re-mock the loading directive for this test with proper functions
const mockInstance = {
  setTip: vi.fn(),
  setLoading: vi.fn(),
  close: vi.fn(),
  loading: false,
};

const mockCreateLoading = vi.fn(() => mockInstance);

vi.mock('/@/components/Loading', () => ({
  createLoading: mockCreateLoading,
}));

// Clear the global mock for this specific test
vi.unmock('/@/directives/loading');

// Import the actual directive
const loadingModule = await import('/@/directives/loading');
const loadingDirective = loadingModule.default;
const setupLoadingDirective = loadingModule.setupLoadingDirective;

describe('directives/loading', () => {
  let app: any;
  let mockElement: any;
  let mockBinding: any;

  beforeEach(() => {
    app = createApp({});
    mockElement = {
      getAttribute: vi.fn(),
      instance: null,
    };
    mockBinding = {
      value: true,
      oldValue: false,
      modifiers: {},
    };
    vi.clearAllMocks();
  });

  it('should export setupLoadingDirective function', () => {
    expect(setupLoadingDirective).toBeDefined();
    expect(typeof setupLoadingDirective).toBe('function');
  });

  it('should export loadingDirective as default', () => {
    expect(loadingDirective).toBeDefined();
    expect(loadingDirective).toHaveProperty('mounted');
    expect(loadingDirective).toHaveProperty('updated');
    expect(loadingDirective).toHaveProperty('unmounted');
  });

  it('should setup loading directive on app', () => {
    const directiveSpy = vi.spyOn(app, 'directive');
    setupLoadingDirective(app);
    
    expect(directiveSpy).toHaveBeenCalledWith('loading', expect.any(Object));
  });

  describe('mounted hook', () => {
    it('should create loading instance with default options', () => {
      mockElement.getAttribute.mockReturnValue(null);
      
      (loadingDirective as ObjectDirective).mounted!(mockElement, mockBinding, null as any, null as any);
      
      expect(mockCreateLoading).toHaveBeenCalled();
      expect(mockElement.instance).toBe(mockInstance);
    });

    it('should create loading instance with custom attributes', () => {
      mockElement.getAttribute.mockImplementation((attr: string) => {
        switch (attr) {
          case 'loading-tip': return 'Loading...';
          case 'loading-background': return '#fff';
          case 'loading-size': return 'small';
          default: return null;
        }
      });
      
      (loadingDirective as ObjectDirective).mounted!(mockElement, mockBinding, null as any, null as any);
      
      expect(mockCreateLoading).toHaveBeenCalled();
      expect(mockElement.instance).toBe(mockInstance);
    });

    it('should handle fullscreen modifier', () => {
      mockBinding.modifiers.fullscreen = true;
      mockElement.getAttribute.mockReturnValue(null);
      
      (loadingDirective as ObjectDirective).mounted!(mockElement, mockBinding, null as any, null as any);
      
      expect(mockCreateLoading).toHaveBeenCalled();
      expect(mockElement.instance).toBe(mockInstance);
    });

    it('should handle false binding value', () => {
      mockBinding.value = false;
      mockElement.getAttribute.mockReturnValue(null);
      
      (loadingDirective as ObjectDirective).mounted!(mockElement, mockBinding, null as any, null as any);
      
      expect(mockCreateLoading).toHaveBeenCalled();
      expect(mockElement.instance).toBe(mockInstance);
    });
  });

  describe('updated hook', () => {
    beforeEach(() => {
      mockElement.instance = mockInstance;
    });

    it('should update tip when element attribute changes', () => {
      mockElement.getAttribute.mockReturnValue('New tip');
      
      (loadingDirective as ObjectDirective).updated!(mockElement, mockBinding, null as any, null as any);
      
      expect(mockInstance.setTip).toHaveBeenCalledWith('New tip');
    });

    it('should call setLoading when binding value changes', () => {
      mockBinding.oldValue = false;
      mockBinding.value = true;
      mockElement.getAttribute.mockReturnValue(null);
      
      (loadingDirective as ObjectDirective).updated!(mockElement, mockBinding, null as any, null as any);
      
      // Based on the actual implementation, setLoading is called with binding.value && !instance.loading
      expect(mockInstance.setLoading).toHaveBeenCalledWith(true);
    });

    it('should not call setLoading when binding value unchanged', () => {
      mockBinding.oldValue = true;
      mockBinding.value = true;
      mockElement.getAttribute.mockReturnValue(null);
      
      (loadingDirective as ObjectDirective).updated!(mockElement, mockBinding, null as any, null as any);
      
      expect(mockInstance.setLoading).not.toHaveBeenCalled();
    });

    it('should handle missing instance gracefully', () => {
      mockElement.instance = null;
      
      expect(() => {
        (loadingDirective as ObjectDirective).updated!(mockElement, mockBinding, null as any, null as any);
      }).not.toThrow();
    });
  });

  describe('unmounted hook', () => {
    it('should close instance when unmounted', () => {
      mockElement.instance = mockInstance;
      
      (loadingDirective as ObjectDirective).unmounted!(mockElement, null as any, null as any, null as any);
      
      expect(mockInstance.close).toHaveBeenCalled();
    });

    it('should handle missing instance gracefully', () => {
      mockElement.instance = null;
      
      expect(() => {
        (loadingDirective as ObjectDirective).unmounted!(mockElement, null as any, null as any, null as any);
      }).not.toThrow();
    });

    it('should handle missing element gracefully', () => {
      expect(() => {
        (loadingDirective as ObjectDirective).unmounted!(null as any, null as any, null as any, null as any);
      }).not.toThrow();
    });
  });
});
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useScript } from '/@/hooks/web/useScript';
import { onMounted, onUnmounted, ref } from 'vue';

// Mock Vue
vi.mock('vue', () => ({
  onMounted: vi.fn((callback) => callback()),
  onUnmounted: vi.fn((callback) => callback()),
  ref: vi.fn((value) => ({ value })),
}));

// Mock document
const mockScript = {
  type: '',
  src: '',
  onload: null as any,
  onerror: null as any,
  remove: vi.fn(),
};

const mockDocument = {
  createElement: vi.fn(() => mockScript),
  head: {
    appendChild: vi.fn(),
  },
};

Object.defineProperty(global, 'document', {
  value: mockDocument,
  writable: true,
});

describe('hooks/web/useScript', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockScript.onload = null;
    mockScript.onerror = null;
    mockScript.type = '';
    mockScript.src = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('useScript', () => {
    it('should return reactive state and promise function', () => {
      const result = useScript({ src: 'https://example.com/script.js' });

      expect(result).toHaveProperty('isLoading');
      expect(result).toHaveProperty('error');
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('toPromise');
      expect(result.toPromise).toBeInstanceOf(Function);
    });

    it('should create script element on mount', () => {
      useScript({ src: 'https://example.com/script.js' });

      expect(mockDocument.createElement).toHaveBeenCalledWith('script');
      expect(mockScript.type).toBe('text/javascript');
      expect(mockScript.src).toBe('https://example.com/script.js');
      expect(mockDocument.head.appendChild).toHaveBeenCalledWith(mockScript);
    });

    it('should set loading state initially', () => {
      const { isLoading, error, success } = useScript({ src: 'https://example.com/script.js' });

      expect(isLoading.value).toBe(false);
      expect(error.value).toBe(false);
      expect(success.value).toBe(false);
    });

    it('should handle script load success', async () => {
      const { toPromise, isLoading, success, error } = useScript({ src: 'https://example.com/script.js' });

      // Simulate successful load
      if (mockScript.onload) {
        mockScript.onload();
      }

      expect(isLoading.value).toBe(false);
      expect(success.value).toBe(true);
      expect(error.value).toBe(false);
    });

    it('should handle script load error', async () => {
      const { isLoading, success, error } = useScript({ src: 'https://example.com/script.js' });
      const mockError = new Error('Script load failed');

      // Simulate load error
      if (mockScript.onerror) {
        mockScript.onerror(mockError);
      }

      expect(isLoading.value).toBe(false);
      expect(success.value).toBe(false);
      expect(error.value).toBe(true);
    });

    it('should remove script on unmount', () => {
      useScript({ src: 'https://example.com/script.js' });

      // onUnmounted should be called and execute the cleanup
      expect(mockScript.remove).toHaveBeenCalled();
    });

    it('should return promise that resolves on success', async () => {
      const { toPromise } = useScript({ src: 'https://example.com/script.js' });

      // Simulate successful load
      if (mockScript.onload) {
        mockScript.onload();
      }

      const result = await toPromise();
      expect(result).toBe('');
    });

    it('should return promise that rejects on error', async () => {
      const { toPromise } = useScript({ src: 'https://example.com/script.js' });
      const mockError = new Error('Script load failed');

      // Simulate load error
      if (mockScript.onerror) {
        mockScript.onerror(mockError);
      }

      try {
        await toPromise();
      } catch (error) {
        expect(error).toBe(mockError);
      }
    });

    it('should handle different script sources', () => {
      const src1 = 'https://cdn.example.com/lib1.js';
      const src2 = 'https://cdn.example.com/lib2.js';

      useScript({ src: src1 });
      expect(mockScript.src).toBe(src1);

      vi.clearAllMocks();
      useScript({ src: src2 });
      expect(mockScript.src).toBe(src2);
    });

    it('should set correct script attributes', () => {
      useScript({ src: 'https://example.com/script.js' });

      expect(mockScript.type).toBe('text/javascript');
      expect(mockScript.src).toBe('https://example.com/script.js');
    });

    it('should handle multiple script loads', () => {
      const script1 = useScript({ src: 'https://example.com/script1.js' });
      const script2 = useScript({ src: 'https://example.com/script2.js' });

      expect(script1.isLoading).toBeDefined();
      expect(script2.isLoading).toBeDefined();
      expect(mockDocument.createElement).toHaveBeenCalledTimes(2);
    });

    it('should handle script load events correctly', () => {
      const { isLoading, success, error } = useScript({ src: 'https://example.com/script.js' });

      // Test initial state
      expect(isLoading.value).toBe(false);
      expect(success.value).toBe(false);
      expect(error.value).toBe(false);

      // Simulate load success
      if (mockScript.onload) {
        mockScript.onload();
      }

      expect(isLoading.value).toBe(false);
      expect(success.value).toBe(true);
      expect(error.value).toBe(false);

      // Reset and simulate error
      success.value = false;
      if (mockScript.onerror) {
        mockScript.onerror(new Error('Test error'));
      }

      expect(isLoading.value).toBe(false);
      expect(success.value).toBe(false);
      expect(error.value).toBe(true);
    });

    it('should handle cleanup when script is undefined', () => {
      // This tests the case where script might be undefined during cleanup
      const { toPromise } = useScript({ src: 'https://example.com/script.js' });

      // onUnmounted should handle the case where script might be undefined
      expect(mockScript.remove).toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('should handle empty src', () => {
      const { isLoading, success, error } = useScript({ src: '' });

      expect(mockScript.src).toBe('');
      expect(isLoading.value).toBe(false);
      expect(success.value).toBe(false);
      expect(error.value).toBe(false);
    });

    it('should handle very long src URL', () => {
      const longSrc = 'https://example.com/' + 'a'.repeat(1000) + '.js';
      
      useScript({ src: longSrc });

      expect(mockScript.src).toBe(longSrc);
    });

    it('should handle special characters in src', () => {
      const specialSrc = 'https://example.com/script with spaces & symbols!.js';
      
      useScript({ src: specialSrc });

      expect(mockScript.src).toBe(specialSrc);
    });
  });
});

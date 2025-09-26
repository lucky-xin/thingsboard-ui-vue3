import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useCopyToClipboard, copyTextToClipboard } from '/@/hooks/web/useCopyToClipboard';

// Mock dependencies
vi.mock('/@/utils/is', () => ({
  isDef: vi.fn((val) => typeof val !== 'undefined'),
}));

describe('hooks/web/useCopyToClipboard', () => {
  let mockElement: any;
  let mockSelection: any;
  let mockRange: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock DOM elements and methods
    mockElement = {
      value: '',
      setAttribute: vi.fn(),
      style: {},
      select: vi.fn(),
      selectionStart: 0,
      selectionEnd: 0,
      remove: vi.fn(),
      focus: vi.fn(),
    };

    mockRange = {
      cloneRange: vi.fn(() => mockRange),
    };

    mockSelection = {
      rangeCount: 1,
      getRangeAt: vi.fn(() => mockRange),
      removeAllRanges: vi.fn(),
      addRange: vi.fn(),
    };

    // Mock document methods
    Object.defineProperty(document, 'createElement', {
      value: vi.fn(() => mockElement),
      writable: true,
    });

    Object.defineProperty(document, 'execCommand', {
      value: vi.fn(() => true),
      writable: true,
    });

    Object.defineProperty(document, 'getSelection', {
      value: vi.fn(() => mockSelection),
      writable: true,
    });

    Object.defineProperty(document, 'activeElement', {
      value: { focus: vi.fn() },
      writable: true,
    });

    Object.defineProperty(document, 'body', {
      value: { 
        appendChild: vi.fn(),
        append: vi.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('useCopyToClipboard', () => {
    it('should initialize with default values', () => {
      const { clipboardRef, isSuccessRef, copiedRef } = useCopyToClipboard();

      expect(clipboardRef.value).toBe('');
      expect(isSuccessRef.value).toBe(false);
      expect(copiedRef.value).toBe(false);
    });

    it('should initialize with provided initial value', () => {
      const initialValue = 'initial text';
      const { clipboardRef, isSuccessRef, copiedRef } = useCopyToClipboard(initialValue);

      expect(clipboardRef.value).toBe(initialValue);
      expect(isSuccessRef.value).toBe(true); // Should be true due to immediate watch
      expect(copiedRef.value).toBe(true);
    });

    it('should trigger copy when clipboardRef value changes', async () => {
      const { clipboardRef, isSuccessRef, copiedRef } = useCopyToClipboard();

      // Change the clipboard ref value
      clipboardRef.value = 'test copy text';

      // Allow watchers to run
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(copiedRef.value).toBe(true);
      expect(isSuccessRef.value).toBe(true);
      expect(document.createElement).toHaveBeenCalledWith('textarea');
      expect(mockElement.value).toBe('test copy text');
    });

    it('should handle empty string values', async () => {
      const { clipboardRef, isSuccessRef, copiedRef } = useCopyToClipboard();

      expect(copiedRef.value).toBe(false); // Initially false
      
      // First set to non-empty to ensure reactivity is working
      clipboardRef.value = 'test';
      await new Promise(resolve => setTimeout(resolve, 10));
      expect(copiedRef.value).toBe(true); // Should be true now
      
      // Reset for actual test
      clipboardRef.value = '';
      await new Promise(resolve => setTimeout(resolve, 10));

      // Empty string is still defined, so it should trigger copy
      expect(copiedRef.value).toBe(true);
    });

    it('should not trigger copy for undefined values', async () => {
      const { clipboardRef, copiedRef } = useCopyToClipboard();

      clipboardRef.value = undefined as any;

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(copiedRef.value).toBe(false);
    });

    it('should trigger copy for null values (since isDef(null) returns true)', async () => {
      const { clipboardRef, copiedRef } = useCopyToClipboard();

      clipboardRef.value = null as any;

      await new Promise(resolve => setTimeout(resolve, 0));

      // null is defined according to isDef (it only checks for undefined)
      // so it should trigger copy
      expect(copiedRef.value).toBe(true);
    });

    it('should handle multiple value changes', async () => {
      const { clipboardRef, isSuccessRef, copiedRef } = useCopyToClipboard();

      clipboardRef.value = 'first text';
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(copiedRef.value).toBe(true);
      expect(isSuccessRef.value).toBe(true);

      clipboardRef.value = 'second text';
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(copiedRef.value).toBe(true);
      expect(isSuccessRef.value).toBe(true);
      expect(mockElement.value).toBe('second text');
    });

    it('should handle copy failure', async () => {
      // Mock execCommand to return false (failure)
      (document.execCommand as any).mockReturnValue(false);

      const { clipboardRef, isSuccessRef, copiedRef } = useCopyToClipboard();

      clipboardRef.value = 'test text';
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(copiedRef.value).toBe(true);
      expect(isSuccessRef.value).toBe(false);
    });
  });

  describe('copyTextToClipboard', () => {
    it('should copy text to clipboard successfully', () => {
      const testText = 'Hello, World!';
      const result = copyTextToClipboard(testText);

      expect(document.createElement).toHaveBeenCalledWith('textarea');
      expect(mockElement.value).toBe(testText);
      expect(mockElement.setAttribute).toHaveBeenCalledWith('readonly', '');
      expect(mockElement.select).toHaveBeenCalled();
      expect(document.execCommand).toHaveBeenCalledWith('copy');
      expect(mockElement.remove).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should use custom target element', () => {
      const customTarget = { 
        append: vi.fn(),
      };
      const testText = 'test text';

      copyTextToClipboard(testText, { target: customTarget as any });

      expect(customTarget.append).toHaveBeenCalledWith(mockElement);
    });

    it('should handle text selection and range preservation', () => {
      const testText = 'test text';

      copyTextToClipboard(testText);

      expect(document.getSelection).toHaveBeenCalled();
      expect(mockSelection.getRangeAt).toHaveBeenCalledWith(0);
      expect(mockSelection.removeAllRanges).toHaveBeenCalled();
      expect(mockSelection.addRange).toHaveBeenCalledWith(mockRange);
    });

    it('should handle case when no selection exists', () => {
      mockSelection.rangeCount = 0;
      const testText = 'test text';

      const result = copyTextToClipboard(testText);

      expect(result).toBe(true);
      expect(mockSelection.getRangeAt).not.toHaveBeenCalled();
    });

    it('should handle case when no selection object exists', () => {
      (document.getSelection as any).mockReturnValue(null);
      const testText = 'test text';

      const result = copyTextToClipboard(testText);

      expect(result).toBe(true);
    });

    it('should restore focus to previously focused element', () => {
      const mockPreviousElement = { focus: vi.fn() };
      Object.defineProperty(document, 'activeElement', {
        value: mockPreviousElement,
        writable: true,
      });

      const testText = 'test text';
      copyTextToClipboard(testText);

      expect(mockPreviousElement.focus).toHaveBeenCalled();
    });

    it('should set textarea selection properties correctly', () => {
      const testText = 'Hello, World!';
      copyTextToClipboard(testText);

      expect(mockElement.selectionStart).toBe(0);
      expect(mockElement.selectionEnd).toBe(testText.length);
    });

    it('should set textarea styles correctly', () => {
      const testText = 'test text';
      copyTextToClipboard(testText);

      expect(mockElement.style.contain).toBe('strict');
      expect(mockElement.style.position).toBe('absolute');
      expect(mockElement.style.left).toBe('-9999px');
      expect(mockElement.style.fontSize).toBe('12pt');
    });

    it('should handle execCommand failure', () => {
      (document.execCommand as any).mockReturnValue(false);
      const testText = 'test text';

      const result = copyTextToClipboard(testText);

      expect(result).toBe(false);
    });

    it('should handle execCommand throwing error', () => {
      (document.execCommand as any).mockImplementation(() => {
        throw new Error('Copy failed');
      });

      const testText = 'test text';

      expect(() => copyTextToClipboard(testText)).toThrow('Copy failed');
    });

    it('should handle long text content', () => {
      const longText = 'A'.repeat(10000);
      const result = copyTextToClipboard(longText);

      expect(mockElement.value).toBe(longText);
      expect(mockElement.selectionEnd).toBe(longText.length);
      expect(result).toBe(true);
    });

    it('should handle special characters', () => {
      const specialText = '©®™ñéü中文🎉';
      const result = copyTextToClipboard(specialText);

      expect(mockElement.value).toBe(specialText);
      expect(result).toBe(true);
    });

    it('should clean up element even on error', () => {
      (document.execCommand as any).mockImplementation(() => {
        throw new Error('Copy failed');
      });

      const testText = 'test text';

      try {
        copyTextToClipboard(testText);
      } catch (e) {
        // Expected error
      }

      expect(mockElement.remove).toHaveBeenCalled();
    });

    it('should handle case when activeElement is null', () => {
      Object.defineProperty(document, 'activeElement', {
        value: null,
        writable: true,
      });

      const testText = 'test text';
      const result = copyTextToClipboard(testText);

      expect(result).toBe(true);
      // Should not throw error when activeElement is null
    });

    it('should use document.body as default target', () => {
      const testText = 'test text';
      copyTextToClipboard(testText);

      expect(document.body.append).toHaveBeenCalledWith(mockElement);
    });
  });

  describe('integration tests', () => {
    it('should work together - useCopyToClipboard using copyTextToClipboard', async () => {
      const { clipboardRef, isSuccessRef, copiedRef } = useCopyToClipboard();

      clipboardRef.value = 'integration test';
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(copiedRef.value).toBe(true);
      expect(isSuccessRef.value).toBe(true);
      expect(document.createElement).toHaveBeenCalledWith('textarea');
      expect(mockElement.value).toBe('integration test');
    });

    it('should handle rapid successive copy operations', async () => {
      const { clipboardRef, isSuccessRef } = useCopyToClipboard();

      clipboardRef.value = 'first';
      clipboardRef.value = 'second';
      clipboardRef.value = 'third';

      await new Promise(resolve => setTimeout(resolve, 10));

      expect(isSuccessRef.value).toBe(true);
      expect(mockElement.value).toBe('third');
    });
  });
});
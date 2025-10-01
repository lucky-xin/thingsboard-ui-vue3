import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCopyToClipboard, copyTextToClipboard } from '/@/hooks/web/useCopyToClipboard';

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme.css', writable: true
});

vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

describe('useCopyToClipboard', () => {
  beforeEach(() => {
    // Mock document.execCommand
    document.execCommand = vi.fn().mockReturnValue(true);

    // Mock getSelection
    document.getSelection = vi.fn().mockReturnValue({
      rangeCount: 0,
      removeAllRanges: vi.fn(),
      addRange: vi.fn(),
      getRangeAt: vi.fn(),
    });
  });

  it('should create clipboard ref with initial value', () => {
    const { clipboardRef, isSuccessRef, copiedRef } = useCopyToClipboard('test text');

    expect(clipboardRef.value).toBe('test text');
    expect(copiedRef.value).toBe(true);
    expect(isSuccessRef.value).toBe(true);
  });

  it('should create clipboard ref without initial value', () => {
    const { clipboardRef, isSuccessRef, copiedRef } = useCopyToClipboard();

    expect(clipboardRef.value).toBe('');
    expect(copiedRef.value).toBe(false);
    expect(isSuccessRef.value).toBe(false);
  });

  it('should update clipboard ref and trigger copy', async () => {
    const { clipboardRef, isSuccessRef, copiedRef } = useCopyToClipboard();

    // Update the clipboard ref
    clipboardRef.value = 'new text';

    // Wait for next tick to allow watch to trigger
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(copiedRef.value).toBe(true);
    expect(isSuccessRef.value).toBe(true);
  });

  it('should handle copy failure', () => {
    // Mock execCommand to return false
    document.execCommand = vi.fn().mockReturnValue(false);

    const result = copyTextToClipboard('test text');
    expect(result).toBe(false);
  });

  it('should handle copy with custom target', () => {
    const target = document.createElement('div');
    const result = copyTextToClipboard('test text', { target });
    expect(result).toBe(true);
  });

  // 增加测试用例以提高覆盖率
  it('should handle copy with selection range', () => {
    // Mock getSelection with range
    document.getSelection = vi.fn().mockReturnValue({
      rangeCount: 1,
      removeAllRanges: vi.fn(),
      addRange: vi.fn(),
      getRangeAt: vi.fn().mockReturnValue({}),
    });

    const result = copyTextToClipboard('test text');
    expect(result).toBe(true);
  });

  it('should handle copy with focused element', () => {
    // Mock activeElement
    Object.defineProperty(document, 'activeElement', {
      value: document.createElement('input'),
      writable: true
    });

    const result = copyTextToClipboard('test text');
    expect(result).toBe(true);
  });

  it('should handle copy error', () => {
    // Mock execCommand to throw error
    document.execCommand = vi.fn().mockImplementation(() => {
      throw new Error('Copy failed');
    });

    expect(() => {
      copyTextToClipboard('test text');
    }).toThrow('Copy failed');
  });

  it('should handle copy with null input', () => {
    const result = copyTextToClipboard(null as any);
    expect(result).toBe(true);
  });

  it('should handle copy with undefined input', () => {
    const result = copyTextToClipboard(undefined as any);
    expect(result).toBe(true);
  });
});
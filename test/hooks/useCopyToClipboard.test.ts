import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCopyToClipboard, copyTextToClipboard } from '/@/hooks/web/useCopyToClipboard';

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
});

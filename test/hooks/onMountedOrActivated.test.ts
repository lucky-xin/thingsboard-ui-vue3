import { describe, it, expect, vi } from 'vitest';

// 必须先 mock 再导入被测模块，避免 hoist 冲突
const { onMountedMock, onActivatedMock } = vi.hoisted(() => ({
  onMountedMock: vi.fn(),
  onActivatedMock: vi.fn(),
}));

vi.mock('vue', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    onMounted: onMountedMock,
    onActivated: onActivatedMock,
    nextTick: (fn: () => void) => Promise.resolve().then(fn),
  };
});

import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated';

describe('hooks/onMountedOrActivated', () => {
  describe('onMountedOrActivated', () => {
    it('should register hooks correctly', () => {
      const hook = vi.fn();
      onMountedOrActivated(hook);

      // Check that the Vue lifecycle functions were called
      expect(onMountedMock).toHaveBeenCalled();
      expect(onActivatedMock).toHaveBeenCalled();
    });
  });
});

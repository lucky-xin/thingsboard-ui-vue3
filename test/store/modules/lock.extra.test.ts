import { describe, it, expect, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useLockStore } from '/@/store/modules/lock';

// mock persistent storage to avoid JSON circular from timers
vi.mock('/@/utils/cache/persistent', () => ({
  Persistent: {
    setLocal: vi.fn(),
    getLocal: vi.fn(() => null),
    removeLocal: vi.fn(),
  },
}));

describe('store/modules/lock extra', () => {
  it('should set and reset lock info', () => {
    setActivePinia(createPinia());
    const store = useLockStore();
    store.setLockInfo({ isLock: true, pwd: '123' } as any);
    expect(store.getLockInfo?.isLock).toBe(true);
    store.resetLockInfo();
    // after reset, isLock should not be true (may be undefined/false depending on implementation)
    expect(store.getLockInfo?.isLock).not.toBe(true);
  });
});



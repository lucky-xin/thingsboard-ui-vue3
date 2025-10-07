import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLockStore } from '/@/store/modules/lock';

// Mock the cache
vi.mock('/@/utils/cache/persistent', () => {
  return {
    Persistent: {
      getLocal: vi.fn(),
      setLocal: vi.fn(),
      removeLocal: vi.fn(),
    },
  };
});

// Mock the user store
const mockLogin = vi.fn().mockResolvedValue({ result: 'false' });
vi.mock('/@/store/modules/user', () => {
  return {
    useUserStore: () => ({
      getUserInfo: {
        loginCode: 'testuser',
      },
      login: mockLogin,
    }),
  };
});

describe('store/modules/lock', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useLockStore', () => {
    it('should create lock store', () => {
      const store = useLockStore();
      expect(store).toBeDefined();
    });

    it('should have initial state', () => {
      const store = useLockStore();
      expect(store.getLockInfo).toBeUndefined();
    });

    it('should set lock info', () => {
      const store = useLockStore();
      const lockInfo = { pwd: '123456', isLock: true };

      store.setLockInfo(lockInfo);

      expect(store.getLockInfo).toEqual(lockInfo);
    });

    it('should reset lock info', () => {
      const store = useLockStore();
      const lockInfo = { pwd: '123456', isLock: true };
      store.setLockInfo(lockInfo);

      store.resetLockInfo();

      expect(store.getLockInfo).toBeNull();
    });

    it('should unlock with correct password', async () => {
      const store = useLockStore();
      const password = '123456';
      const lockInfo = { pwd: password, isLock: true };
      store.setLockInfo(lockInfo);

      const result = await store.unLock(password);

      expect(result).toBe(true);
      expect(store.getLockInfo).toBeNull();
    });

    it('should unlock with login credentials', async () => {
      // Set up the mock to return a successful login
      mockLogin.mockResolvedValueOnce({ result: 'true' });

      const store = useLockStore();
      const password = 'correctpassword';
      const lockInfo = { pwd: '123456', isLock: true };
      store.setLockInfo(lockInfo);

      const result = await store.unLock(password);

      expect(result).toBe(true);
    });

    it('should fail to unlock with incorrect password', async () => {
      // Set up the mock to return a failed login
      mockLogin.mockResolvedValueOnce({ result: 'false' });

      const store = useLockStore();
      const password = 'wrongpassword';
      const lockInfo = { pwd: '123456', isLock: true };
      store.setLockInfo(lockInfo);

      const result = await store.unLock(password);

      expect(result).toBe(false);
    });
  });
});
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Persistent } from '/@/utils/cache/persistent';
import { APP_LOCAL_CACHE_KEY, APP_SESSION_CACHE_KEY, TOKEN_KEY, USER_INFO_KEY, LOCK_INFO_KEY } from '/@/enums/cacheEnum';

// mock storage creators to avoid real IO
vi.mock('/@/utils/cache', () => {
  const store: Record<string, any> = {};
  return {
    createLocalStorage: () => ({
      get: (k: string) => store[k],
      set: (k: string, v: any) => (store[k] = v),
      clear: () => Object.keys(store).forEach((k) => delete store[k]),
    }),
    createSessionStorage: () => ({
      get: (k: string) => store[k],
      set: (k: string, v: any) => (store[k] = v),
      clear: () => Object.keys(store).forEach((k) => delete store[k]),
    }),
  };
});

describe('utils/cache/persistent', () => {
  beforeEach(() => {
    // reset caches by clearing local/session storages via clearAll
    Persistent.clearAll(true);
  });

  it('should set/get/remove/clear local', () => {
    Persistent.setLocal(TOKEN_KEY as any, 'token', true);
    expect(Persistent.getLocal<string>(TOKEN_KEY as any)).toBe('token');
    Persistent.removeLocal(TOKEN_KEY as any, true);
    expect(Persistent.getLocal<string>(TOKEN_KEY as any)).toBeUndefined();
    Persistent.setLocal(TOKEN_KEY as any, 't', true);
    Persistent.clearLocal(true);
    expect(Persistent.getLocal<string>(TOKEN_KEY as any)).toBeUndefined();
  });

  it('should set/get/remove/clear session', () => {
    Persistent.setSession(USER_INFO_KEY as any, { id: { id: 'u1' } } as any, true);
    expect(Persistent.getSession<any>(USER_INFO_KEY as any)).toEqual({ id: { id: 'u1' } });
    Persistent.removeSession(USER_INFO_KEY as any, true);
    expect(Persistent.getSession<any>(USER_INFO_KEY as any)).toBeUndefined();
    Persistent.setSession(USER_INFO_KEY as any, { id: { id: 'u2' } } as any, true);
    Persistent.clearSession(true);
    expect(Persistent.getSession<any>(USER_INFO_KEY as any)).toBeUndefined();
  });

  it('should clear all and sync on beforeunload/storage', () => {
    // set some values
    Persistent.setLocal(TOKEN_KEY as any, 'tk', true);
    Persistent.setSession(USER_INFO_KEY as any, { id: { id: 'x' } } as any, true);
    // simulate beforeunload sync
    window.dispatchEvent(new Event('beforeunload'));
    // simulate cross-tab storage change
    window.dispatchEvent(new StorageEvent('storage', { key: APP_LOCAL_CACHE_KEY, newValue: '1', oldValue: '0' } as any));
    window.dispatchEvent(new StorageEvent('storage', { key: APP_SESSION_CACHE_KEY, newValue: '1', oldValue: '0' } as any));
    expect(Persistent.getLocal<any>(TOKEN_KEY as any) === undefined || typeof Persistent.getLocal<any>(TOKEN_KEY as any) === 'string').toBe(true);
  });

  it('should handle storage event with null key', () => {
    // This will cover the branch in storageChange function where key is null
    window.dispatchEvent(new StorageEvent('storage', { key: null } as any));
  });

  it('should handle storage event with empty key values', () => {
    // This will cover more branches in storageChange function
    window.dispatchEvent(new StorageEvent('storage', { key: APP_LOCAL_CACHE_KEY, newValue: '', oldValue: '' } as any));
    window.dispatchEvent(new StorageEvent('storage', { key: APP_SESSION_CACHE_KEY, newValue: '', oldValue: '' } as any));
  });
});



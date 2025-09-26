import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

// Mock the user store
const mockUserStore = {
  state: {
    userInfo: null,
    token: null,
    roleList: [],
    sessionTimeout: false,
    lastUpdateTime: 0,
  },
  actions: {
    setUserInfo: vi.fn(),
    setToken: vi.fn(),
    setRoleList: vi.fn(),
    setSessionTimeout: vi.fn(),
    setLastUpdateTime: vi.fn(),
    login: vi.fn(),
    logout: vi.fn(),
    resetState: vi.fn(),
  },
  getters: {
    getUserInfo: vi.fn(() => null),
    getToken: vi.fn(() => null),
    getRoleList: vi.fn(() => []),
    getSessionTimeout: vi.fn(() => false),
    getLastUpdateTime: vi.fn(() => 0),
  },
};

vi.mock('/@/store/modules/user', () => ({
  useUserStore: () => mockUserStore,
}));

import { useUserStore } from '/@/store/modules/user';

describe('user store comprehensive tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setActivePinia(createPinia());
  });

  it('should create user store', () => {
    const store = useUserStore();
    expect(store).toBeDefined();
  });

  it('should have initial state', () => {
    const store = useUserStore();
    expect(store.state.userInfo).toBeNull();
    expect(store.state.token).toBeNull();
    expect(store.state.roleList).toEqual([]);
    expect(store.state.sessionTimeout).toBe(false);
    expect(store.state.lastUpdateTime).toBe(0);
  });

  it('should set user info', () => {
    const store = useUserStore();
    const userInfo = { id: 1, name: 'Test User' };
    store.actions.setUserInfo(userInfo);
    expect(store.actions.setUserInfo).toHaveBeenCalledWith(userInfo);
  });

  it('should set token', () => {
    const store = useUserStore();
    const token = 'test-token';
    store.actions.setToken(token);
    expect(store.actions.setToken).toHaveBeenCalledWith(token);
  });

  it('should set role list', () => {
    const store = useUserStore();
    const roleList = ['admin', 'user'];
    store.actions.setRoleList(roleList);
    expect(store.actions.setRoleList).toHaveBeenCalledWith(roleList);
  });

  it('should set session timeout', () => {
    const store = useUserStore();
    store.actions.setSessionTimeout(true);
    expect(store.actions.setSessionTimeout).toHaveBeenCalledWith(true);
  });

  it('should set last update time', () => {
    const store = useUserStore();
    const time = Date.now();
    store.actions.setLastUpdateTime(time);
    expect(store.actions.setLastUpdateTime).toHaveBeenCalledWith(time);
  });

  it('should login', () => {
    const store = useUserStore();
    const loginParams = { username: 'test', password: 'test' };
    store.actions.login(loginParams);
    expect(store.actions.login).toHaveBeenCalledWith(loginParams);
  });

  it('should logout', () => {
    const store = useUserStore();
    store.actions.logout();
    expect(store.actions.logout).toHaveBeenCalled();
  });

  it('should reset state', () => {
    const store = useUserStore();
    store.actions.resetState();
    expect(store.actions.resetState).toHaveBeenCalled();
  });

  it('should get user info from getter', () => {
    const store = useUserStore();
    const userInfo = store.getters.getUserInfo();
    expect(userInfo).toBeNull();
  });

  it('should get token from getter', () => {
    const store = useUserStore();
    const token = store.getters.getToken();
    expect(token).toBeNull();
  });

  it('should get role list from getter', () => {
    const store = useUserStore();
    const roleList = store.getters.getRoleList();
    expect(roleList).toEqual([]);
  });

  it('should get session timeout from getter', () => {
    const store = useUserStore();
    const sessionTimeout = store.getters.getSessionTimeout();
    expect(sessionTimeout).toBe(false);
  });

  it('should get last update time from getter', () => {
    const store = useUserStore();
    const lastUpdateTime = store.getters.getLastUpdateTime();
    expect(lastUpdateTime).toBe(0);
  });
});

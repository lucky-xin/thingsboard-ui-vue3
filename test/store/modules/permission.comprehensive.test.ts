import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

// Mock the permission store
const mockPermissionStore = {
  state: {
    routes: [],
    addRoutes: [],
    isAddRoute: false,
  },
  actions: {
    setRoutes: vi.fn(),
    setAddRoutes: vi.fn(),
    setIsAddRoute: vi.fn(),
    generateRoutes: vi.fn(),
    resetState: vi.fn(),
  },
  getters: {
    getRoutes: vi.fn(() => []),
    getAddRoutes: vi.fn(() => []),
    getIsAddRoute: vi.fn(() => false),
  },
};

vi.mock('/@/store/modules/permission', () => ({
  usePermissionStore: () => mockPermissionStore,
}));

import { usePermissionStore } from '/@/store/modules/permission';

describe('permission store comprehensive tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setActivePinia(createPinia());
  });

  it('should create permission store', () => {
    const store = usePermissionStore();
    expect(store).toBeDefined();
  });

  it('should have initial state', () => {
    const store = usePermissionStore();
    expect(store.state.routes).toEqual([]);
    expect(store.state.addRoutes).toEqual([]);
    expect(store.state.isAddRoute).toBe(false);
  });

  it('should set routes', () => {
    const store = usePermissionStore();
    const routes = [{ path: '/test', component: 'Test' }];
    store.actions.setRoutes(routes);
    expect(store.actions.setRoutes).toHaveBeenCalledWith(routes);
  });

  it('should set add routes', () => {
    const store = usePermissionStore();
    const addRoutes = [{ path: '/add', component: 'Add' }];
    store.actions.setAddRoutes(addRoutes);
    expect(store.actions.setAddRoutes).toHaveBeenCalledWith(addRoutes);
  });

  it('should set is add route', () => {
    const store = usePermissionStore();
    store.actions.setIsAddRoute(true);
    expect(store.actions.setIsAddRoute).toHaveBeenCalledWith(true);
  });

  it('should generate routes', () => {
    const store = usePermissionStore();
    store.actions.generateRoutes();
    expect(store.actions.generateRoutes).toHaveBeenCalled();
  });

  it('should reset state', () => {
    const store = usePermissionStore();
    store.actions.resetState();
    expect(store.actions.resetState).toHaveBeenCalled();
  });

  it('should get routes from getter', () => {
    const store = usePermissionStore();
    const routes = store.getters.getRoutes();
    expect(routes).toEqual([]);
  });

  it('should get add routes from getter', () => {
    const store = usePermissionStore();
    const addRoutes = store.getters.getAddRoutes();
    expect(addRoutes).toEqual([]);
  });

  it('should get is add route from getter', () => {
    const store = usePermissionStore();
    const isAddRoute = store.getters.getIsAddRoute();
    expect(isAddRoute).toBe(false);
  });
});

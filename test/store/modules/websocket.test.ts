// Mock state management and global dependencies
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

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useWebsocketStore, useWebsocketStoreWithOut } from '/@/store/modules/websocket';
import { createPinia, setActivePinia } from 'pinia';

// Mock the store with proper Pinia instance
vi.mock('/@/store', () => ({
  store: { 
    // Mock the Pinia instance methods that might be used
    use: vi.fn(),
    _s: new Map(), // Mock the stores map
    _p: [], // Mock the plugins array
    install: vi.fn(),
    state: {
      value: {}
    },
    _e: {
      active: true,
      run: vi.fn((fn) => fn())
    }
  },
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

// Mock the vueuse core
vi.mock('@vueuse/core', () => ({
  useWebSocket: () => ({
    close: vi.fn(),
    open: vi.fn(),
    send: vi.fn(),
    status: 'OPEN',
    ws: {},
  }),
}));

// Mock the global settings
vi.mock('/@/hooks/setting', () => ({
  useGlobSetting: () => ({
    websocketPath: 'ws://localhost:8080/websocket',
  }),
}));

// Mock the sleep function (保留模块其余真实导出，避免破坏 withInstall 等)
vi.mock('/@/utils', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    sleep: vi.fn(),
  };
});

// Mock the isArray function
vi.mock('/@/utils/is', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    isArray: (value: any) => Array.isArray(value),
  };
});

// Mock the auth functions
vi.mock('/@/utils/auth', () => ({
  getToken: () => 'test-token',
}));

describe('store/modules/websocket', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set up Pinia
    setActivePinia(createPinia());
  });

  describe('useWebsocketStore', () => {
    it('should create websocket store', () => {
      const store = useWebsocketStore();
      expect(store).toBeDefined();
    });

    it('should have initial state', () => {
      const store = useWebsocketStore();
      expect(store.getCmdId).toBe(0);
      expect(store.websocket).toBeNull();
      expect(store.callbackMap).toBeInstanceOf(Map);
    });

    it('should close websocket', () => {
      const store = useWebsocketStore();
      const mockWebsocket = {
        close: vi.fn(),
      };
      store.websocket = mockWebsocket as any;

      store.close();

      expect(mockWebsocket.close).toHaveBeenCalled();
      expect(store.websocket).toBeNull();
    });
    
    it('should handle close when websocket is null', () => {
      const store = useWebsocketStore();
      store.websocket = null;
      
      // Should not throw an error
      expect(() => store.close()).not.toThrow();
      expect(store.websocket).toBeNull();
    });

    it('should increment cmd id', () => {
      const store = useWebsocketStore();

      const cmdId1 = store.getAndIncrementCmdId();
      const cmdId2 = store.getAndIncrementCmdId();

      expect(cmdId1).toBe(1);
      expect(cmdId2).toBe(2);
      expect(store.getCmdId).toBe(2);
    });

    it('should send data through websocket', async () => {
      const store = useWebsocketStore();
      const mockWebsocket = {
        status: 'OPEN',
        send: vi.fn().mockReturnValue(true),
      };
      store.websocket = mockWebsocket as any;

      const result = await store.send(1, { test: 'data' });

      expect(result).toBe(true);
      expect(mockWebsocket.send).toHaveBeenCalledWith(JSON.stringify({ test: 'data' }));
    });
    
    it('should initialize and send data when websocket is null', async () => {
      const store = useWebsocketStore();
      const mockWebsocket = {
        status: 'OPEN',
        send: vi.fn().mockReturnValue(true),
      };
      
      // Mock initWebsocket to set the websocket and return undefined
      store.initWebsocket = vi.fn().mockImplementation(() => {
        store.websocket = mockWebsocket as any;
      });
      
      const result = await store.send(1, { test: 'data' });
      
      expect(store.initWebsocket).toHaveBeenCalled();
      expect(result).toBe(true);
      expect(mockWebsocket.send).toHaveBeenCalledWith(JSON.stringify({ test: 'data' }));
    });
    
    it('should handle CLOSED status in send method', async () => {
      const store = useWebsocketStore();
      const mockWebsocket = {
        status: { value: 'CLOSED' },
        open: vi.fn(() => {}),
        send: vi.fn().mockReturnValue(true),
      };
      store.websocket = mockWebsocket as any;
      
      const sleepMock = await import('/@/utils');
      vi.spyOn(sleepMock, 'sleep').mockImplementation(() => Promise.resolve());
      
      const result = await store.send(1, { test: 'data' });
      
      expect(mockWebsocket.open).toHaveBeenCalled();
      expect(sleepMock.sleep).toHaveBeenCalledWith(500);
      expect(result).toBe(true);
      expect(mockWebsocket.send).toHaveBeenCalledWith(JSON.stringify({ test: 'data' }));
    });
    
    it('should handle send failure', async () => {
      const store = useWebsocketStore();
      const mockWebsocket = {
        status: 'OPEN',
        send: vi.fn().mockReturnValue(false),
      };
      store.websocket = mockWebsocket as any;
      
      const result = await store.send(1, { test: 'data' });
      
      expect(result).toBe(false);
      expect(mockWebsocket.send).toHaveBeenCalledWith(JSON.stringify({ test: 'data' }));
    });
    
    it('should handle array cmdId with callback', async () => {
      const store = useWebsocketStore();
      const mockWebsocket = {
        status: 'OPEN',
        send: vi.fn().mockReturnValue(true),
      };
      store.websocket = mockWebsocket as any;
      
      const callback = vi.fn();
      const result = await store.send([1, 2], { test: 'data' }, callback);
      
      expect(result).toBe(true);
      expect(store.callbackMap.has(1)).toBe(true);
      expect(store.callbackMap.has(2)).toBe(true);
      expect(mockWebsocket.send).toHaveBeenCalledWith(JSON.stringify({ test: 'data' }));
    });

    it('should initialize websocket', () => {
      const store = useWebsocketStore();

      const websocket = store.initWebsocket();

      expect(store.websocket).not.toBeNull();
      expect(websocket).toBeDefined();
    });

    it('should handle websocket message', () => {
      const store = useWebsocketStore();
      const callback = vi.fn();
      store.callbackMap.set(1, callback);

      const ws = {} as unknown as WebSocket;
      const messageEvent = new MessageEvent('message', {
        data: JSON.stringify({ cmdId: 1, result: 'success' }),
      });

      store.onMessage(ws, messageEvent);

      expect(callback).toHaveBeenCalledWith({ cmdId: 1, result: 'success' });
    });
    
    it('should handle websocket message with subscriptionId', () => {
      const store = useWebsocketStore();
      const callback = vi.fn();
      store.callbackMap.set(1, callback);

      const ws = {} as unknown as WebSocket;
      const messageEvent = new MessageEvent('message', {
        data: JSON.stringify({ subscriptionId: 1, result: 'success' }),
      });

      store.onMessage(ws, messageEvent);

      expect(callback).toHaveBeenCalledWith({ subscriptionId: 1, result: 'success' });
    });
    
    it('should handle websocket message without cmdId or subscriptionId', () => {
      const store = useWebsocketStore();
      const callback = vi.fn();
      store.callbackMap.set(1, callback);

      const ws = {} as unknown as WebSocket;
      const messageEvent = new MessageEvent('message', {
        data: JSON.stringify({ result: 'success' }),
      });

      // Should not throw an error
      expect(() => store.onMessage(ws, messageEvent)).not.toThrow();
      expect(callback).not.toHaveBeenCalled();
    });

    it('should unsubscribe from websocket', async () => {
      const store = useWebsocketStore();
      const mockWebsocket = {
        status: 'OPEN',
        send: vi.fn(),
      };
      store.websocket = mockWebsocket as any;
      const callback = vi.fn();
      store.callbackMap.set(1, callback);

      await store.unsubscribe(1, { unsubscribe: true });

      expect(mockWebsocket.send).toHaveBeenCalledWith(JSON.stringify({ unsubscribe: true }));
      expect(store.callbackMap.has(1)).toBe(false);
    });
    
    it('should handle CLOSED status in unsubscribe method', async () => {
      const store = useWebsocketStore();
      const mockWebsocket = {
        status: { value: 'CLOSED' },
        open: vi.fn(),
        send: vi.fn(),
      };
      store.websocket = mockWebsocket as any;
      
      const sleepMock = await import('/@/utils');
      vi.spyOn(sleepMock, 'sleep').mockImplementation(() => Promise.resolve());
      
      await store.unsubscribe(1, { unsubscribe: true });
      
      expect(mockWebsocket.open).toHaveBeenCalled();
      expect(sleepMock.sleep).toHaveBeenCalledWith(250);
      expect(mockWebsocket.send).toHaveBeenCalledWith(JSON.stringify({ unsubscribe: true }));
      expect(store.callbackMap.has(1)).toBe(false);
    });
    
    it('should handle array cmdId in unsubscribe method', async () => {
      const store = useWebsocketStore();
      const mockWebsocket = {
        status: 'OPEN',
        send: vi.fn(),
      };
      store.websocket = mockWebsocket as any;
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      store.callbackMap.set(1, callback1);
      store.callbackMap.set(2, callback2);

      await store.unsubscribe([1, 2], { unsubscribe: true });

      expect(mockWebsocket.send).toHaveBeenCalledWith(JSON.stringify({ unsubscribe: true }));
      expect(store.callbackMap.has(1)).toBe(false);
      expect(store.callbackMap.has(2)).toBe(false);
    });
    
    it('should handle unsubscribe when websocket is null', async () => {
      const store = useWebsocketStore();
      store.websocket = null;
      const callback = vi.fn();
      store.callbackMap.set(1, callback);

      // Should not throw an error
      await expect(store.unsubscribe(1, { unsubscribe: true })).resolves.toBeUndefined();
      expect(store.callbackMap.has(1)).toBe(false);
    });
  });

  describe('useWebsocketStoreWithOut', () => {
    it('should return websocket store', () => {
      const store = useWebsocketStoreWithOut();
      expect(store).toBeDefined();
    });
  });
});

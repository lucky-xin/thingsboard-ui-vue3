import { describe, it, expect, vi } from 'vitest';

// minimal mocks for dependencies used inside websocket store
vi.mock('@vueuse/core', () => ({
  useWebSocket: vi.fn(() => ({ status: 'CLOSED', open: vi.fn(), close: vi.fn() })),
}));
vi.mock('/@/hooks/setting', () => ({ useGlobSetting: () => ({ wsUrl: 'ws://localhost' }) }));
vi.mock('/@/utils', () => ({ sleep: async () => {} }));
vi.mock('/@/utils/is', () => ({ isArray: Array.isArray }));
vi.mock('/@/utils/auth', () => ({ getToken: () => 'token' }));

describe('store/modules/websocket simple import', () => {
  it('should import websocket store module', async () => {
    const mod = await import('/@/store/modules/websocket');
    expect(mod).toBeDefined();
  });
});



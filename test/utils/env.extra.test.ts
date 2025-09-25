import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('/@/utils/log', () => ({
  warn: vi.fn(),
  env: {
    DEV: false,
    PROD: true,
    MODE: 'production',
    VITE_PUBLIC_PATH: '/',
    VITE_PROXY: [],
  },
}));

vi.mock('../../build/config/getEnvConfigName', () => ({
  getEnvConfigName: () => 'APP__CONF__',
}));

import { publicPath, getAppEnvConfig } from '/@/utils/env';
import { warn, env } from '/@/utils/log';

describe('utils/env extra', () => {
  beforeEach(() => {
    (warn as any).mockClear?.();
  });

  it('should compute publicPath when VITE_PUBLIC_PATH is \'/\'', () => {
    expect(publicPath).toBe('');
  });

  it('should use window config when not DEV and validate short name', () => {
    (globalThis as any)['APP__CONF__'] = {
      VITE_GLOB_APP_SHORT_NAME: 'Invalid-Name',
      VITE_GLOB_APP_TITLE: 'T',
      VITE_GLOB_API_URL: 'http://x',
      VITE_GLOB_API_URL_WEBSOCKET: '/ws',
    };

    const conf = getAppEnvConfig();
    expect(conf.VITE_GLOB_APP_TITLE).toBe('T');
    expect((warn as any).mock.calls.length >= 1).toBe(true);

    // also returns proxy as [] when DEV is false
    expect(conf.VITE_PROXY).toEqual([]);
  });
});



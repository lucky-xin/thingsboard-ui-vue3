import { describe, it, expect, vi, beforeEach } from 'vitest';

// mock i18n
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({ t: (k: string) => k }),
}));

// mock message（避免 hoist 问题，在工厂内声明并挂到全局便于断言）

let showMessage: any;

let showMessageModal: any;
vi.mock('/@/hooks/web/useMessage', () => {
  showMessage = vi.fn();
  showMessageModal = vi.fn();
  return {
    useMessage: () => ({ showMessage, showMessageModal }),
  };
});

// mock user store
const setToken = vi.fn();
const setSessionTimeout = vi.fn();
const logout = vi.fn();
vi.mock('/@/store/modules/user', () => ({
  useUserStoreWithOut: () => ({ setToken, setSessionTimeout, logout }),
}));

// project setting
vi.mock('/@/settings/projectSetting', () => ({
  default: { sessionTimeoutProcessing: 0 }, // 非覆盖式
}));

describe('utils/http/axios/checkStatus', () => {
  let checkStatus: (s: number, m: string, mode?: 'message' | 'modal') => void;
  beforeEach(() => {
    showMessage?.mockClear();
    showMessageModal?.mockClear();
    setToken.mockClear();
    setSessionTimeout.mockClear();
    logout.mockClear();
  });

  beforeEach(async () => {
    // 在 mocks 就绪后再动态导入被测模块，避免 hoist 问题
    ({ checkStatus } = await import('/@/utils/http/axios/checkStatus'));
  });

  const statusWithKey: Array<[number, string]> = [
    [400, 'sys.api.errMsg400'],
    [403, 'sys.api.errMsg403'],
    [404, 'sys.api.errMsg404'],
    [405, 'sys.api.errMsg405'],
    [408, 'sys.api.errMsg408'],
    [500, 'sys.api.errMsg500'],
    [501, 'sys.api.errMsg501'],
    [502, 'sys.api.errMsg502'],
    [503, 'sys.api.errMsg503'],
    [504, 'sys.api.errMsg504'],
    [505, 'sys.api.errMsg505'],
  ];

  it('should emit message for common error status', () => {
    statusWithKey
      .filter(([code]) => code !== 400)
      .forEach(([code]) => {
        checkStatus(code, '');
        expect(showMessage).toHaveBeenCalled();
      });
  });

  it('should show modal when mode is modal', () => {
    checkStatus(500, '', 'modal');
    expect(showMessageModal).toHaveBeenCalled();
  });

  it('should handle 401 with logout by default', () => {
    checkStatus(401, '');
    expect(setToken).toHaveBeenCalledWith(undefined);
    expect(logout).toHaveBeenCalledWith(true);
  });

  it('should pass through custom message for 400', () => {
    checkStatus(400, 'Bad Request');
    const lastCall = showMessage.mock.calls.at(-1)?.[0];
    expect(lastCall?.content).toBe('Bad Request');
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loginApi, userInfoApi, refreshTokenApi, logoutApi } from '/@/api/tb/login';

// Mock the http client
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    post: vi.fn(),
    postJson: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Login API', () => {
  let defHttp;

  beforeEach(async () => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Get the mocked defHttp
    const axiosModule = await import('/@/utils/http/axios');
    defHttp = axiosModule.defHttp;
  });

  it('should call login API with correct parameters', async () => {
    const params = { username: 'testuser', password: 'testpass' };
    const mockResponse = { token: 'test-token', refreshToken: 'test-refresh-token' };

    defHttp.postJson.mockResolvedValue(mockResponse);

    await loginApi(params);

    expect(defHttp.postJson).toHaveBeenCalledWith(
      {
        url: '/api/auth/login',
        data: params,
        timeout: 20 * 1000,
      },
      { errorMessageMode: 'message' },
    );
  });

  it('should call user info API', async () => {
    const mockResponse = { id: 'user1', name: 'Test User' };

    defHttp.get.mockResolvedValue(mockResponse);

    await userInfoApi();

    expect(defHttp.get).toHaveBeenCalledWith(
      { url: '/api/auth/user', timeout: 10 * 1000 },
      { errorMessageMode: 'message' },
    );
  });

  it('should call refresh token API with correct parameters', async () => {
    const refreshToken = 'test-refresh-token';
    const mockResponse = { token: 'new-token', refreshToken: 'new-refresh-token' };

    defHttp.postJson.mockResolvedValue(mockResponse);

    await refreshTokenApi(refreshToken);

    expect(defHttp.postJson).toHaveBeenCalledWith(
      {
        url: '/api/auth/token',
        data: { refreshToken: refreshToken },
        timeout: 20 * 1000,
      },
      { errorMessageMode: 'none' },
    );
  });

  it('should call logout API', async () => {
    defHttp.post.mockResolvedValue({});

    await logoutApi();

    expect(defHttp.post).toHaveBeenCalledWith({ url: '/api/auth/logout' });
  });
});
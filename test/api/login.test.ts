import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ErrorMessageMode } from '/#/axios';

// Mock the http client - create the mock functions directly in the factory
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    post: vi.fn(),
    postJson: vi.fn(),
    delete: vi.fn(),
  },
}));

// Import after the mock is set up
import { loginApi, userInfoApi, refreshTokenApi, logoutApi } from '/@/api/tb/login';
import { defHttp } from '/@/utils/http/axios';

// Cast defHttp to access the mock functions
const mockDefHttp = defHttp as any;

describe('Login API', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  describe('loginApi function', () => {
    it('should call login API with correct parameters and default mode', async () => {
      const params = { username: 'testuser', password: 'testpass' };
      const mockResponse = { token: 'test-token', refreshToken: 'test-refresh-token' };

      mockDefHttp.postJson.mockResolvedValue(mockResponse);

      const result = await loginApi(params);

      expect(mockDefHttp.postJson).toHaveBeenCalledWith(
        {
          url: '/api/auth/login',
          data: params,
          timeout: 20 * 1000,
        },
        { errorMessageMode: 'message' },
      );
      expect(result).toEqual(mockResponse);
    });

    it('should call login API with custom error mode', async () => {
      const params = { username: 'testuser', password: 'testpass' };
      const customMode: ErrorMessageMode = 'none';
      const mockResponse = { token: 'test-token', refreshToken: 'test-refresh-token' };

      mockDefHttp.postJson.mockResolvedValue(mockResponse);

      const result = await loginApi(params, customMode);

      expect(mockDefHttp.postJson).toHaveBeenCalledWith(
        {
          url: '/api/auth/login',
          data: params,
          timeout: 20 * 1000,
        },
        { errorMessageMode: 'none' },
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('userInfoApi function', () => {
    it('should call user info API with default mode', async () => {
      const mockResponse = { id: 'user1', name: 'Test User' };

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await userInfoApi();

      expect(mockDefHttp.get).toHaveBeenCalledWith(
        { url: '/api/auth/user', timeout: 10 * 1000 },
        { errorMessageMode: 'message' },
      );
      expect(result).toEqual(mockResponse);
    });

    it('should call user info API with custom error mode', async () => {
      const customMode: ErrorMessageMode = 'modal';
      const mockResponse = { id: 'user1', name: 'Test User' };

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await userInfoApi(customMode);

      expect(mockDefHttp.get).toHaveBeenCalledWith(
        { url: '/api/auth/user', timeout: 10 * 1000 },
        { errorMessageMode: 'modal' },
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('refreshTokenApi function', () => {
    it('should call refresh token API with correct parameters and default mode', async () => {
      const refreshToken = 'test-refresh-token';
      const mockResponse = { token: 'new-token', refreshToken: 'new-refresh-token' };

      mockDefHttp.postJson.mockResolvedValue(mockResponse);

      const result = await refreshTokenApi(refreshToken);

      expect(mockDefHttp.postJson).toHaveBeenCalledWith(
        {
          url: '/api/auth/token',
          data: { refreshToken: refreshToken },
          timeout: 20 * 1000,
        },
        { errorMessageMode: 'none' },
      );
      expect(result).toEqual(mockResponse);
    });

    it('should call refresh token API with custom error mode', async () => {
      const refreshToken = 'test-refresh-token';
      const customMode: ErrorMessageMode = 'message';
      const mockResponse = { token: 'new-token', refreshToken: 'new-refresh-token' };

      mockDefHttp.postJson.mockResolvedValue(mockResponse);

      const result = await refreshTokenApi(refreshToken, customMode);

      expect(mockDefHttp.postJson).toHaveBeenCalledWith(
        {
          url: '/api/auth/token',
          data: { refreshToken: refreshToken },
          timeout: 20 * 1000,
        },
        { errorMessageMode: 'message' },
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('logoutApi function', () => {
    it('should call logout API with correct parameters', async () => {
      const mockResponse = { success: true };
      
      mockDefHttp.post.mockResolvedValue(mockResponse);

      const result = await logoutApi();

      expect(mockDefHttp.post).toHaveBeenCalledWith({ url: '/api/auth/logout' });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Error handling', () => {
    it('should handle login API errors properly', async () => {
      const params = { username: 'testuser', password: 'testpass' };
      const error = new Error('Network error');

      mockDefHttp.postJson.mockRejectedValue(error);

      await expect(loginApi(params)).rejects.toThrow('Network error');
    });

    it('should handle userInfo API errors properly', async () => {
      const error = new Error('Unauthorized');

      mockDefHttp.get.mockRejectedValue(error);

      await expect(userInfoApi()).rejects.toThrow('Unauthorized');
    });

    it('should handle refresh token API errors properly', async () => {
      const refreshToken = 'invalid-token';
      const error = new Error('Invalid token');

      mockDefHttp.postJson.mockRejectedValue(error);

      await expect(refreshTokenApi(refreshToken)).rejects.toThrow('Invalid token');
    });

    it('should handle logout API errors properly', async () => {
      const error = new Error('Logout failed');

      mockDefHttp.post.mockRejectedValue(error);

      await expect(logoutApi()).rejects.toThrow('Logout failed');
    });
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    postJson: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    protocol: 'https:',
    hostname: 'localhost',
    port: '3000',
  },
  writable: true,
});

import {
  userInfoApi,
  getUserById,
  saveUser,
  userList,
  getUsersForAssign,
  deleteUser,
  setUserCredentialsEnabled,
  getTenantAdmins,
  getCustomerUsers,
  getActivationLink,
  getProxyActivationLink,
  sendActivationEmail,
  getUserToken,
} from '/@/api/tb/user';
import { defHttp } from '/@/utils/http/axios';

const mockDefHttp = defHttp as any;

describe('api/tb/user', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('userInfoApi', () => {
    it('should call defHttp.get with correct parameters', async () => {
      const mockResponse = { id: '1', name: 'Test User' };
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await userInfoApi();

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/auth/user',
        timeout: 10 * 1000,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getUserById', () => {
    it('should call defHttp.get with correct userId', async () => {
      const userId = 'user123';
      const mockResponse = { id: userId, name: 'Test User' };
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getUserById(userId);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: `/api/user/${userId}`,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveUser', () => {
    it('should call defHttp.postJson with sendActivationMail true', async () => {
      const userData = { name: 'Test User', email: 'test@example.com' };
      const mockResponse = { id: '1', ...userData };
      mockDefHttp.postJson.mockResolvedValue(mockResponse);

      const result = await saveUser(userData, true);

      expect(mockDefHttp.postJson).toHaveBeenCalledWith({
        url: '/api/user',
        params: { sendActivationMail: true },
        data: userData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call defHttp.postJson with sendActivationMail false by default', async () => {
      const userData = { name: 'Test User', email: 'test@example.com' };
      const mockResponse = { id: '1', ...userData };
      mockDefHttp.postJson.mockResolvedValue(mockResponse);

      const result = await saveUser(userData);

      expect(mockDefHttp.postJson).toHaveBeenCalledWith({
        url: '/api/user',
        params: { sendActivationMail: false },
        data: userData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('userList', () => {
    it('should call defHttp.get with correct parameters', async () => {
      const params = { page: 1, size: 10 };
      const mockResponse = { data: [], totalElements: 0 };
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await userList(params);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/users',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getUsersForAssign', () => {
    it('should call defHttp.get with correct parameters', async () => {
      const params = { page: 1, size: 10 };
      const alarmId = 'alarm123';
      const mockResponse = { data: [], totalElements: 0 };
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getUsersForAssign(params, alarmId);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: `/api/users/assign/${alarmId}`,
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteUser', () => {
    it('should call defHttp.delete with correct userId', async () => {
      const userId = 'user123';
      mockDefHttp.delete.mockResolvedValue(undefined);

      const result = await deleteUser(userId);

      expect(mockDefHttp.delete).toHaveBeenCalledWith({
        url: `/api/user/${userId}`,
      });
      expect(result).toBeUndefined();
    });
  });

  describe('setUserCredentialsEnabled', () => {
    it('should call defHttp.post with enabled true', async () => {
      const userId = 'user123';
      mockDefHttp.post.mockResolvedValue(undefined);

      const result = await setUserCredentialsEnabled(userId, true);

      expect(mockDefHttp.post).toHaveBeenCalledWith({
        url: `/api/user/${userId}/userCredentialsEnabled?userCredentialsEnabled=true`,
      });
      expect(result).toBeUndefined();
    });

    it('should call defHttp.post with enabled false', async () => {
      const userId = 'user123';
      mockDefHttp.post.mockResolvedValue(undefined);

      const result = await setUserCredentialsEnabled(userId, false);

      expect(mockDefHttp.post).toHaveBeenCalledWith({
        url: `/api/user/${userId}/userCredentialsEnabled?userCredentialsEnabled=false`,
      });
      expect(result).toBeUndefined();
    });

    it('should call defHttp.post with enabled true by default', async () => {
      const userId = 'user123';
      mockDefHttp.post.mockResolvedValue(undefined);

      const result = await setUserCredentialsEnabled(userId);

      expect(mockDefHttp.post).toHaveBeenCalledWith({
        url: `/api/user/${userId}/userCredentialsEnabled?userCredentialsEnabled=true`,
      });
      expect(result).toBeUndefined();
    });
  });

  describe('getTenantAdmins', () => {
    it('should call defHttp.get with correct parameters', async () => {
      const params = { page: 1, size: 10 };
      const tenantId = 'tenant123';
      const mockResponse = { data: [], totalElements: 0 };
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getTenantAdmins(params, tenantId);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: `/api/tenant/${tenantId}/users`,
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCustomerUsers', () => {
    it('should call defHttp.get with correct parameters', async () => {
      const params = { page: 1, size: 10 };
      const customerId = 'customer123';
      const mockResponse = { data: [], totalElements: 0 };
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getCustomerUsers(params, customerId);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: `/api/customer/${customerId}/users`,
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getActivationLink', () => {
    it('should call defHttp.get with correct userId', async () => {
      const userId = 'user123';
      const mockResponse = 'https://example.com/activate?token=abc123';
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getActivationLink(userId);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: `/api/user/${userId}/activationLink`,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getProxyActivationLink', () => {
    it('should return proxy activation link with port', async () => {
      const userId = 'user123';
      const activationLink = 'https://backend.com/activate?token=abc123';
      mockDefHttp.get.mockResolvedValue(activationLink);

      const result = await getProxyActivationLink(userId);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: `/api/user/${userId}/activationLink`,
      });
      expect(result).toBe('https://localhost:3000/auth/create-password?token=abc123');
    });

    it('should return proxy activation link without port', async () => {
      // Mock window.location without port
      Object.defineProperty(window, 'location', {
        value: {
          protocol: 'https:',
          hostname: 'localhost',
          port: '',
        },
        writable: true,
      });

      const userId = 'user123';
      const activationLink = 'https://backend.com/activate?token=abc123';
      mockDefHttp.get.mockResolvedValue(activationLink);

      const result = await getProxyActivationLink(userId);

      expect(result).toBe('https://localhost/auth/create-password?token=abc123');
    });
  });

  describe('sendActivationEmail', () => {
    it('should call defHttp.postJson with correct email', async () => {
      const email = 'test@example.com';
      mockDefHttp.postJson.mockResolvedValue(undefined);

      const result = await sendActivationEmail(email);

      expect(mockDefHttp.postJson).toHaveBeenCalledWith({
        url: `/api/user/sendActivationMail?email=${email}`,
      });
      expect(result).toBeUndefined();
    });
  });

  describe('getUserToken', () => {
    it('should call defHttp.get with correct userId', async () => {
      const userId = 'user123';
      const mockResponse = { accessToken: 'token123', refreshToken: 'refresh123' };
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getUserToken(userId);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: `/api/user/${userId}/token`,
      });
      expect(result).toEqual(mockResponse);
    });
  });
});

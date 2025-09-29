import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as userApi from '/@/api/tb/user';
import { BasicQuery } from '/@/api/model/baseModel';

// Mock the http client
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    post: vi.fn(),
    postJson: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock window.location for getProxyActivationLink test
Object.defineProperty(window, 'location', {
  value: {
    protocol: 'https:',
    hostname: 'localhost',
    port: '3000',
  },
  writable: true,
});

describe('User API', () => {
  let defHttp;

  beforeEach(async () => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Get the mocked defHttp
    const axiosModule = await import('/@/utils/http/axios');
    defHttp = axiosModule.defHttp;
  });

  describe('userInfoApi', () => {
    it('should call userInfoApi with correct parameters', async () => {
      const mockResponse = {
        id: 'user123',
        name: 'Test User',
        email: 'test@example.com',
      };

      defHttp.get.mockResolvedValue(mockResponse);

      const result = await userApi.userInfoApi();

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/auth/user',
        timeout: 10 * 1000,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getUserById', () => {
    it('should call getUserById with correct parameters', async () => {
      const userId = 'user123';
      const mockResponse = { id: userId, name: 'Test User' };

      defHttp.get.mockResolvedValue(mockResponse);

      const result = await userApi.getUserById(userId);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: `/api/user/${userId}`,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveUser', () => {
    it('should call saveUser with default sendActivationMail', async () => {
      const userData = { name: 'Test User', email: 'test@example.com' };
      const mockResponse = { id: 'user123', ...userData };

      defHttp.postJson.mockResolvedValue(mockResponse);

      const result = await userApi.saveUser(userData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/user',
        params: { sendActivationMail: false },
        data: userData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call saveUser with custom sendActivationMail', async () => {
      const userData = { name: 'Test User', email: 'test@example.com' };
      const sendActivationMail = true;
      const mockResponse = { id: 'user123', ...userData };

      defHttp.postJson.mockResolvedValue(mockResponse);

      const result = await userApi.saveUser(userData, sendActivationMail);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/user',
        params: { sendActivationMail: true },
        data: userData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('userList', () => {
    it('should call userList with correct parameters', async () => {
      const params: BasicQuery = { page: 0, pageSize: 10, sortProperty: 'name', sortOrder: 'ASC' };
      const mockResponse = {
        data: [{ id: 'user1', name: 'User 1' }],
        totalElements: 1,
        totalPages: 1,
      };

      defHttp.get.mockResolvedValue(mockResponse);

      const result = await userApi.userList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/users',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getUsersForAssign', () => {
    it('should call getUsersForAssign with correct parameters', async () => {
      const params: BasicQuery = { page: 0, pageSize: 20 };
      const alarmId = 'alarm123';
      const mockResponse = {
        data: [{ id: 'user1', name: 'Assignable User' }],
        totalElements: 1,
      };

      defHttp.get.mockResolvedValue(mockResponse);

      const result = await userApi.getUsersForAssign(params, alarmId);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: `/api/users/assign/${alarmId}`,
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteUser', () => {
    it('should call deleteUser with correct parameters', async () => {
      const userId = 'user123';

      defHttp.delete.mockResolvedValue(undefined);

      const result = await userApi.deleteUser(userId);

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: `/api/user/${userId}`,
      });
      expect(result).toBeUndefined();
    });
  });

  describe('setUserCredentialsEnabled', () => {
    it('should call setUserCredentialsEnabled with default enabled=true', async () => {
      const userId = 'user123';

      defHttp.post.mockResolvedValue(undefined);

      const result = await userApi.setUserCredentialsEnabled(userId);

      expect(defHttp.post).toHaveBeenCalledWith({
        url: `/api/user/${userId}/userCredentialsEnabled?userCredentialsEnabled=true`,
      });
      expect(result).toBeUndefined();
    });

    it('should call setUserCredentialsEnabled with enabled=false', async () => {
      const userId = 'user123';
      const enabled = false;

      defHttp.post.mockResolvedValue(undefined);

      const result = await userApi.setUserCredentialsEnabled(userId, enabled);

      expect(defHttp.post).toHaveBeenCalledWith({
        url: `/api/user/${userId}/userCredentialsEnabled?userCredentialsEnabled=false`,
      });
      expect(result).toBeUndefined();
    });
  });

  describe('getTenantAdmins', () => {
    it('should call getTenantAdmins with correct parameters', async () => {
      const params: BasicQuery = { page: 0, pageSize: 10 };
      const tenantId = 'tenant123';
      const mockResponse = {
        data: [{ id: 'admin1', name: 'Admin User' }],
        totalElements: 1,
      };

      defHttp.get.mockResolvedValue(mockResponse);

      const result = await userApi.getTenantAdmins(params, tenantId);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: `/api/tenant/${tenantId}/users`,
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCustomerUsers', () => {
    it('should call getCustomerUsers with correct parameters', async () => {
      const params: BasicQuery = { page: 0, pageSize: 10 };
      const customerId = 'customer123';
      const mockResponse = {
        data: [{ id: 'customer1', name: 'Customer User' }],
        totalElements: 1,
      };

      defHttp.get.mockResolvedValue(mockResponse);

      const result = await userApi.getCustomerUsers(params, customerId);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: `/api/customer/${customerId}/users`,
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getActivationLink', () => {
    it('should call getActivationLink with correct parameters', async () => {
      const userId = 'user123';
      const mockResponse = 'https://example.com/activate?token=abc123';

      defHttp.get.mockResolvedValue(mockResponse);

      const result = await userApi.getActivationLink(userId);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: `/api/user/${userId}/activationLink`,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getProxyActivationLink', () => {
    it('should call getProxyActivationLink and return proxy URL', async () => {
      const userId = 'user123';
      const mockActivationLink = 'https://backend.example.com/activate?token=abc123&userId=user123';
      const expectedProxyLink = 'https://localhost:3000/auth/create-password?token=abc123&userId=user123';

      defHttp.get.mockResolvedValue(mockActivationLink);

      const result = await userApi.getProxyActivationLink(userId);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: `/api/user/${userId}/activationLink`,
      });
      expect(result).toEqual(expectedProxyLink);
    });
  });

  describe('sendActivationEmail', () => {
    it('should call sendActivationEmail with correct parameters', async () => {
      const email = 'test@example.com';

      defHttp.postJson.mockResolvedValue(undefined);

      const result = await userApi.sendActivationEmail(email);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: `/api/user/sendActivationMail?email=${email}`,
      });
      expect(result).toBeUndefined();
    });
  });

  describe('getUserToken', () => {
    it('should call getUserToken with correct parameters', async () => {
      const userId = 'user123';
      const mockResponse = {
        token: 'jwt-access-token',
        refreshToken: 'jwt-refresh-token',
      };

      defHttp.get.mockResolvedValue(mockResponse);

      const result = await userApi.getUserToken(userId);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: `/api/user/${userId}/token`,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Error handling', () => {
    it('should handle getUserById errors', async () => {
      const userId = 'invalid-user';
      const error = new Error('User not found');

      defHttp.get.mockRejectedValue(error);

      await expect(userApi.getUserById(userId)).rejects.toThrow('User not found');
    });

    it('should handle saveUser errors', async () => {
      const userData = { invalid: 'data' };
      const error = new Error('Validation failed');

      defHttp.postJson.mockRejectedValue(error);

      await expect(userApi.saveUser(userData)).rejects.toThrow('Validation failed');
    });

    it('should handle deleteUser errors', async () => {
      const userId = 'protected-user';
      const error = new Error('Cannot delete protected user');

      defHttp.delete.mockRejectedValue(error);

      await expect(userApi.deleteUser(userId)).rejects.toThrow('Cannot delete protected user');
    });

    it('should handle getProxyActivationLink URL parsing errors', async () => {
      const userId = 'user123';
      const invalidActivationLink = 'invalid-url';

      defHttp.get.mockResolvedValue(invalidActivationLink);

      await expect(userApi.getProxyActivationLink(userId)).rejects.toThrow();
    });
  });
});

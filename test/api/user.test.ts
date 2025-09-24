import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as userApi from '/@/api/tb/user';

// Mock the http client
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    post: vi.fn(),
    postJson: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('User API', () => {
  let defHttp;

  beforeEach(async () => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Get the mocked defHttp
    const axiosModule = await import('/@/utils/http/axios');
    defHttp = axiosModule.defHttp;
  });

  it('should call getUserById with correct parameters', async () => {
    const userId = 'user123';
    const mockResponse = { id: userId, name: 'Test User' };

    defHttp.get.mockResolvedValue(mockResponse);

    await userApi.getUserById(userId);

    expect(defHttp.get).toHaveBeenCalledWith({
      url: `/api/user/${userId}`,
    });
  });

  it('should call saveUser with correct parameters', async () => {
    const userData = { name: 'Test User', email: 'test@example.com' };
    const mockResponse = { id: 'user123', ...userData };

    defHttp.postJson.mockResolvedValue(mockResponse);

    await userApi.saveUser(userData);

    expect(defHttp.postJson).toHaveBeenCalledWith({
      url: '/api/user',
      params: { sendActivationMail: false },
      data: userData,
    });
  });

  it('should call userList with correct parameters', async () => {
    const params = { page: 0, pageSize: 10 };
    const mockResponse = { data: [], total: 0 };

    defHttp.get.mockResolvedValue(mockResponse);

    await userApi.userList(params);

    expect(defHttp.get).toHaveBeenCalledWith({
      url: '/api/users',
      params,
    });
  });

  it('should call deleteUser with correct parameters', async () => {
    const userId = 'user123';

    defHttp.delete.mockResolvedValue(undefined);

    await userApi.deleteUser(userId);

    expect(defHttp.delete).toHaveBeenCalledWith({
      url: `/api/user/${userId}`,
    });
  });

  it('should call getTenantAdmins with correct parameters', async () => {
    const params = { page: 0, pageSize: 10 };
    const tenantId = 'tenant123';
    const mockResponse = { data: [], total: 0 };

    defHttp.get.mockResolvedValue(mockResponse);

    await userApi.getTenantAdmins(params, tenantId);

    expect(defHttp.get).toHaveBeenCalledWith({
      url: `/api/tenant/${tenantId}/users`,
      params,
    });
  });

  it('should call getCustomerUsers with correct parameters', async () => {
    const params = { page: 0, pageSize: 10 };
    const customerId = 'customer123';
    const mockResponse = { data: [], total: 0 };

    defHttp.get.mockResolvedValue(mockResponse);

    await userApi.getCustomerUsers(params, customerId);

    expect(defHttp.get).toHaveBeenCalledWith({
      url: `/api/customer/${customerId}/users`,
      params,
    });
  });
});

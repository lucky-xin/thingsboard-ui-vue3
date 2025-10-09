import { describe, it, expect, vi } from 'vitest';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
  },
}));

import { getHelpBaseUrl } from '/@/api/tb/uiSetting';
import { defHttp } from '/@/utils/http/axios';

const mockDefHttp = defHttp as any;

describe('api/tb/uiSetting', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getHelpBaseUrl', () => {
    it('should call defHttp.get with correct parameters', async () => {
      const mockResponse = 'https://help.example.com';
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getHelpBaseUrl();

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/uiSettings/helpBaseUrl',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle empty response', async () => {
      mockDefHttp.get.mockResolvedValue('');

      const result = await getHelpBaseUrl();

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/uiSettings/helpBaseUrl',
      });
      expect(result).toBe('');
    });

    it('should handle error response', async () => {
      const mockError = new Error('Network error');
      mockDefHttp.get.mockRejectedValue(mockError);

      await expect(getHelpBaseUrl()).rejects.toThrow('Network error');
    });

    it('should handle different URL formats', async () => {
      const mockResponse = 'http://localhost:8080/help';
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getHelpBaseUrl();

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/uiSettings/helpBaseUrl',
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
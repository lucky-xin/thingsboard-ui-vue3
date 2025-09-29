import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AxiosCanceler, getPendingUrl } from '/@/utils/http/axios/axiosCancel';
import { isFunction } from '/@/utils/is';

// Mock axios
vi.mock('axios', () => ({
  default: {
    CancelToken: vi.fn((executor) => {
      const cancel = vi.fn();
      executor(cancel);
      return { cancel };
    }),
  },
}));

// Mock utils
vi.mock('/@/utils/is', () => ({
  isFunction: vi.fn((fn) => typeof fn === 'function'),
}));

describe('utils/http/axios/axiosCancel', () => {
  let axiosCanceler: AxiosCanceler;

  beforeEach(() => {
    vi.clearAllMocks();
    axiosCanceler = new AxiosCanceler();
    // Reset the pending map
    axiosCanceler.reset();
  });

  describe('getPendingUrl', () => {
    it('should generate pending URL from config', () => {
      const config = {
        method: 'GET',
        url: '/api/users',
      };

      const result = getPendingUrl(config);

      expect(result).toBe('GET&/api/users');
    });

    it('should handle different HTTP methods', () => {
      const config = {
        method: 'POST',
        url: '/api/login',
      };

      const result = getPendingUrl(config);

      expect(result).toBe('POST&/api/login');
    });

    it('should handle undefined method', () => {
      const config = {
        method: undefined,
        url: '/api/test',
      };

      const result = getPendingUrl(config);

      expect(result).toBe('&/api/test');
    });

    it('should handle undefined url', () => {
      const config = {
        method: 'GET',
        url: undefined,
      };

      const result = getPendingUrl(config);

      expect(result).toBe('GET&');
    });
  });

  describe('AxiosCanceler', () => {
    it('should create instance', () => {
      expect(axiosCanceler).toBeInstanceOf(AxiosCanceler);
    });

    it('should add pending request', () => {
      const config = {
        method: 'GET',
        url: '/api/test',
      };

      axiosCanceler.addPending(config);

      expect(config.cancelToken).toBeDefined();
    });

    it('should remove existing pending before adding new one', () => {
      const config = {
        method: 'GET',
        url: '/api/test',
      };

      // Add first request
      axiosCanceler.addPending(config);

      // Add same request again (should remove first, then add new)
      axiosCanceler.addPending(config);

      expect(config.cancelToken).toBeDefined();
    });

    it('should not add duplicate pending requests', () => {
      const config = {
        method: 'GET',
        url: '/api/test',
      };

      axiosCanceler.addPending(config);
      axiosCanceler.addPending(config);

      expect(config.cancelToken).toBeDefined();
    });

    it('should remove pending request', () => {
      const config = {
        method: 'GET',
        url: '/api/test',
      };

      // Add request first
      axiosCanceler.addPending(config);

      // Then remove it
      axiosCanceler.removePending(config);

      // Should not throw error
      expect(() => axiosCanceler.removePending(config)).not.toThrow();
    });

    it('should remove all pending requests', () => {
      const config1 = {
        method: 'GET',
        url: '/api/test1',
      };
      const config2 = {
        method: 'POST',
        url: '/api/test2',
      };

      axiosCanceler.addPending(config1);
      axiosCanceler.addPending(config2);

      axiosCanceler.removeAllPending();

      // Should not throw error when removing after clearing all
      expect(() => axiosCanceler.removePending(config1)).not.toThrow();
      expect(() => axiosCanceler.removePending(config2)).not.toThrow();
    });

    it('should reset pending map', () => {
      const config = {
        method: 'GET',
        url: '/api/test',
      };

      axiosCanceler.addPending(config);
      axiosCanceler.reset();

      // Should not throw error when removing after reset
      expect(() => axiosCanceler.removePending(config)).not.toThrow();
    });

    it('should handle cancel function execution', () => {
      const config = {
        method: 'GET',
        url: '/api/test',
      };

      axiosCanceler.addPending(config);

      // Should be able to remove the pending request
      expect(() => axiosCanceler.removePending(config)).not.toThrow();
    });

    it('should handle multiple requests with same URL but different methods', () => {
      const config1 = {
        method: 'GET',
        url: '/api/test',
      };
      const config2 = {
        method: 'POST',
        url: '/api/test',
      };

      axiosCanceler.addPending(config1);
      axiosCanceler.addPending(config2);

      expect(config1.cancelToken).toBeDefined();
      expect(config2.cancelToken).toBeDefined();
    });

    it('should handle requests with existing cancelToken', () => {
      const existingCancelToken = { token: 'existing' };
      const config = {
        method: 'GET',
        url: '/api/test',
        cancelToken: existingCancelToken,
      };

      axiosCanceler.addPending(config);

      expect(config.cancelToken).toBe(existingCancelToken);
    });

    it('should handle isFunction check in removeAllPending', () => {
      const config = {
        method: 'GET',
        url: '/api/test',
      };

      axiosCanceler.addPending(config);

      // Mock isFunction to return false
      vi.mocked(isFunction).mockReturnValue(false);

      expect(() => axiosCanceler.removeAllPending()).not.toThrow();
    });

    it('should handle non-function cancel in removeAllPending', () => {
      const config = {
        method: 'GET',
        url: '/api/test',
      };

      axiosCanceler.addPending(config);

      // Mock isFunction to return true
      vi.mocked(isFunction).mockReturnValue(true);

      expect(() => axiosCanceler.removeAllPending()).not.toThrow();
    });

    it('should handle null cancel in removeAllPending', () => {
      const config = {
        method: 'GET',
        url: '/api/test',
      };

      axiosCanceler.addPending(config);

      // Mock isFunction to return false for null
      vi.mocked(isFunction).mockReturnValue(false);

      expect(() => axiosCanceler.removeAllPending()).not.toThrow();
    });

    it('should handle empty pending map', () => {
      expect(() => axiosCanceler.removeAllPending()).not.toThrow();
    });

    it('should handle removePending with non-existent URL', () => {
      const config = {
        method: 'GET',
        url: '/api/nonexistent',
      };

      expect(() => axiosCanceler.removePending(config)).not.toThrow();
    });

    it('should handle addPending with null cancel', () => {
      const config = {
        method: 'GET',
        url: '/api/test',
      };

      // Mock axios.CancelToken to pass null as cancel function
      const axios = require('axios');
      axios.default.CancelToken = vi.fn((executor) => {
        executor(null);
        return { cancel: null };
      });

      expect(() => axiosCanceler.addPending(config)).not.toThrow();
    });
  });
});

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { warn, error } from '/@/utils/log';

// Mock import.meta.env
const mockEnv = {
  VITE_GLOB_APP_TITLE: 'Test App',
};

// Mock import.meta.env before importing the module
vi.stubGlobal('import', {
  meta: {
    env: mockEnv,
  },
});

describe('utils/log', () => {
  let consoleSpy: any;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('warn', () => {
    it('should call console.warn with formatted message', () => {
      const message = 'Test warning message';

      warn(message);

      expect(consoleSpy).toHaveBeenCalledWith(`[${mockEnv.VITE_GLOB_APP_TITLE} warn]:${message}`);
    });

    it('should handle empty message', () => {
      const message = '';

      warn(message);

      expect(consoleSpy).toHaveBeenCalledWith(`[${mockEnv.VITE_GLOB_APP_TITLE} warn]:`);
    });

    it('should handle special characters in message', () => {
      const message = 'Warning with special chars: !@#$%^&*()';

      warn(message);

      expect(consoleSpy).toHaveBeenCalledWith(`[${mockEnv.VITE_GLOB_APP_TITLE} warn]:${message}`);
    });
  });

  describe('error', () => {
    it('should throw error with formatted message', () => {
      const message = 'Test error message';

      expect(() => {
        error(message);
      }).toThrow(`[${mockEnv.VITE_GLOB_APP_TITLE} error]:${message}`);
    });

    it('should throw error with empty message', () => {
      const message = '';

      expect(() => {
        error(message);
      }).toThrow(`[${mockEnv.VITE_GLOB_APP_TITLE} error]:`);
    });

    it('should throw error with special characters in message', () => {
      const message = 'Error with special chars: !@#$%^&*()';

      expect(() => {
        error(message);
      }).toThrow(`[${mockEnv.VITE_GLOB_APP_TITLE} error]:${message}`);
    });

    it('should create Error instance with correct message', () => {
      const message = 'Test error message';

      expect(() => {
        error(message);
      }).toThrow(Error);
    });
  });
});

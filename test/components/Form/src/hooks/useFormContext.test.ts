import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createFormContext, useFormContext } from '/@/components/Form/src/hooks/useFormContext';
import { createContext, useContext } from '/@/hooks/core/useContext';

// Mock the context hooks
vi.mock('/@/hooks/core/useContext', () => ({
  createContext: vi.fn(),
  useContext: vi.fn(),
}));

describe('components/Form/src/hooks/useFormContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createFormContext', () => {
    it('should call createContext with correct parameters', () => {
      const context = {
        resetAction: vi.fn(),
        submitAction: vi.fn(),
      };

      createFormContext(context);

      expect(vi.mocked(createContext)).toHaveBeenCalledWith(context, expect.any(Symbol));
    });

    it('should return the result from createContext', () => {
      const mockResult = { provide: vi.fn() };
      vi.mocked(createContext).mockReturnValue(mockResult);

      const context = {
        resetAction: vi.fn(),
        submitAction: vi.fn(),
      };

      const result = createFormContext(context);

      expect(result).toBe(mockResult);
    });

    it('should handle async resetAction', () => {
      const context = {
        resetAction: vi.fn().mockResolvedValue(undefined),
        submitAction: vi.fn(),
      };

      createFormContext(context);

      expect(vi.mocked(createContext)).toHaveBeenCalledWith(context, expect.any(Symbol));
    });

    it('should handle async submitAction', () => {
      const context = {
        resetAction: vi.fn(),
        submitAction: vi.fn().mockResolvedValue(undefined),
      };

      createFormContext(context);

      expect(vi.mocked(createContext)).toHaveBeenCalledWith(context, expect.any(Symbol));
    });

    it('should handle both async actions', () => {
      const context = {
        resetAction: vi.fn().mockResolvedValue(undefined),
        submitAction: vi.fn().mockResolvedValue(undefined),
      };

      createFormContext(context);

      expect(vi.mocked(createContext)).toHaveBeenCalledWith(context, expect.any(Symbol));
    });
  });

  describe('useFormContext', () => {
    it('should call useContext with correct key', () => {
      const mockResult = {
        resetAction: vi.fn(),
        submitAction: vi.fn(),
      };
      vi.mocked(useContext).mockReturnValue(mockResult);

      const result = useFormContext();

      expect(vi.mocked(useContext)).toHaveBeenCalledWith(expect.any(Symbol));
      expect(result).toBe(mockResult);
    });

    it('should return the result from useContext', () => {
      const mockResult = {
        resetAction: vi.fn(),
        submitAction: vi.fn(),
      };
      vi.mocked(useContext).mockReturnValue(mockResult);

      const result = useFormContext();

      expect(result).toBe(mockResult);
    });

    it('should handle undefined context', () => {
      vi.mocked(useContext).mockReturnValue(undefined);

      const result = useFormContext();

      expect(result).toBeUndefined();
    });

    it('should handle null context', () => {
      vi.mocked(useContext).mockReturnValue(null);

      const result = useFormContext();

      expect(result).toBeNull();
    });

    it('should handle context with only resetAction', () => {
      const mockResult = {
        resetAction: vi.fn(),
      };
      vi.mocked(useContext).mockReturnValue(mockResult);

      const result = useFormContext();

      expect(result.resetAction).toBeInstanceOf(Function);
      expect(result.submitAction).toBeUndefined();
    });

    it('should handle context with only submitAction', () => {
      const mockResult = {
        submitAction: vi.fn(),
      };
      vi.mocked(useContext).mockReturnValue(mockResult);

      const result = useFormContext();

      expect(result.resetAction).toBeUndefined();
      expect(result.submitAction).toBeInstanceOf(Function);
    });

    it('should handle context with additional properties', () => {
      const mockResult = {
        resetAction: vi.fn(),
        submitAction: vi.fn(),
        additionalProp: 'test',
      };
      vi.mocked(useContext).mockReturnValue(mockResult);

      const result = useFormContext();

      expect(result.resetAction).toBeInstanceOf(Function);
      expect(result.submitAction).toBeInstanceOf(Function);
      expect(result.additionalProp).toBe('test');
    });
  });

  describe('FormContextProps interface', () => {
    it('should accept valid FormContextProps', () => {
      const context = {
        resetAction: vi.fn(),
        submitAction: vi.fn(),
      };

      createFormContext(context);

      expect(vi.mocked(createContext)).toHaveBeenCalledWith(context, expect.any(Symbol));
    });

    it('should handle async functions', () => {
      const context = {
        resetAction: async () => {},
        submitAction: async () => {},
      };

      createFormContext(context);

      expect(vi.mocked(createContext)).toHaveBeenCalledWith(context, expect.any(Symbol));
    });

    it('should handle functions that return promises', () => {
      const context = {
        resetAction: () => Promise.resolve(),
        submitAction: () => Promise.resolve(),
      };

      createFormContext(context);

      expect(vi.mocked(createContext)).toHaveBeenCalledWith(context, expect.any(Symbol));
    });
  });

  describe('Symbol key', () => {
    it('should use the same Symbol for both functions', () => {
      const context1 = {
        resetAction: vi.fn(),
        submitAction: vi.fn(),
      };
      const context2 = {
        resetAction: vi.fn(),
        submitAction: vi.fn(),
      };

      createFormContext(context1);
      const key1 = vi.mocked(createContext).mock.calls[0][1];

      createFormContext(context2);
      const key2 = vi.mocked(createContext).mock.calls[1][1];

      expect(key1).toBe(key2);
    });

    it('should use the same Symbol for useContext', () => {
      const context = {
        resetAction: vi.fn(),
        submitAction: vi.fn(),
      };

      createFormContext(context);
      const createKey = vi.mocked(createContext).mock.calls[0][1];

      useFormContext();
      const useKey = vi.mocked(useContext).mock.calls[0][0];

      expect(createKey).toBe(useKey);
    });
  });
});

import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { createAppProviderContext, useAppProviderContext } from '/@/components/Application/src/useAppContext';

// Mock useContext
vi.mock('/@/hooks/core/useContext', () => ({
  createContext: vi.fn((context, key) => ({ context, key })),
  useContext: vi.fn((key) => ({ key })),
}));

describe('components/Application/useAppContext', () => {
  it('should create app provider context', () => {
    const mockContext = {
      prefixCls: ref('test-prefix'),
      isMobile: ref(false),
    };

    const result = createAppProviderContext(mockContext);

    expect(result).toBeDefined();
    expect(result.context).toBe(mockContext);
  });

  it('should use app provider context', () => {
    const result = useAppProviderContext();

    expect(result).toBeDefined();
    expect(result.key).toBeDefined();
  });

  it('should handle different context values', () => {
    const mobileContext = {
      prefixCls: ref('mobile-prefix'),
      isMobile: ref(true),
    };

    const result = createAppProviderContext(mobileContext);

    expect(result.context.prefixCls.value).toBe('mobile-prefix');
    expect(result.context.isMobile.value).toBe(true);
  });
});

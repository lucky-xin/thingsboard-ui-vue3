import { describe, it, expect, vi } from 'vitest';
import { computed, ref } from 'vue';

// Mock the useContext hook
vi.mock('/@/hooks/core/useContext', () => ({
  createContext: vi.fn((context) => ({ state: context })),
  useContext: vi.fn(() => ({
    contentHeight: computed(() => 500),
    pageHeight: ref(600),
    setPageHeight: vi.fn().mockResolvedValue(undefined),
  })),
}));

describe('hooks/component/usePageContext', () => {
  describe('module exports', () => {
    it('should export createPageContext function', async () => {
      const module = await import('/@/hooks/component/usePageContext');
      
      expect(module.createPageContext).toBeDefined();
      expect(typeof module.createPageContext).toBe('function');
    });

    it('should export usePageContext function', async () => {
      const module = await import('/@/hooks/component/usePageContext');
      
      expect(module.usePageContext).toBeDefined();
      expect(typeof module.usePageContext).toBe('function');
    });
  });

  describe('createPageContext', () => {
    it('should create page context', async () => {
      const { createPageContext } = await import('/@/hooks/component/usePageContext');
      const { createContext } = await import('/@/hooks/core/useContext');
      
      const mockContentHeight = computed(() => 400);
      const mockPageHeight = ref(500);
      const mockSetPageHeight = vi.fn();

      const context = {
        contentHeight: mockContentHeight,
        pageHeight: mockPageHeight,
        setPageHeight: mockSetPageHeight,
      };

      const result = createPageContext(context);

      expect(result).toBeDefined();
      expect(result.state).toBe(context);
      expect(createContext).toHaveBeenCalledWith(
        context,
        expect.any(Symbol),
        { native: true }
      );
    });
  });

  describe('usePageContext', () => {
    it('should return page context', async () => {
      const { usePageContext } = await import('/@/hooks/component/usePageContext');
      const result = usePageContext();

      expect(result).toBeDefined();
      expect(result.contentHeight).toBeDefined();
      expect(result.pageHeight).toBeDefined();
      expect(result.setPageHeight).toBeDefined();
      expect(typeof result.setPageHeight).toBe('function');
    });

    it('should call useContext with correct key', async () => {
      const { usePageContext } = await import('/@/hooks/component/usePageContext');
      const { useContext } = await import('/@/hooks/core/useContext');

      usePageContext();

      expect(useContext).toHaveBeenCalledWith(expect.any(Symbol));
    });

    it('should return context with correct structure', async () => {
      const { usePageContext } = await import('/@/hooks/component/usePageContext');
      const result = usePageContext();

      expect(result).toHaveProperty('contentHeight');
      expect(result).toHaveProperty('pageHeight');
      expect(result).toHaveProperty('setPageHeight');

      // Test contentHeight is computed
      expect(result.contentHeight.value).toBe(500);
      
      // Test pageHeight is ref
      expect(result.pageHeight.value).toBe(600);

      // Test setPageHeight is function
      expect(typeof result.setPageHeight).toBe('function');
    });

    it('should handle setPageHeight function call', async () => {
      const { usePageContext } = await import('/@/hooks/component/usePageContext');
      const result = usePageContext();
      
      // Call setPageHeight and ensure it doesn't throw
      await expect(result.setPageHeight(800)).resolves.toBeUndefined();
      expect(result.setPageHeight).toHaveBeenCalledWith(800);
    });
  });

  describe('PageContextProps interface', () => {
    it('should have correct TypeScript interface structure', async () => {
      const { usePageContext } = await import('/@/hooks/component/usePageContext');
      const result = usePageContext();
      
      // Verify the structure matches PageContextProps interface
      expect(result).toHaveProperty('contentHeight');
      expect(result).toHaveProperty('pageHeight');
      expect(result).toHaveProperty('setPageHeight');
      
      // Verify types
      expect(result.contentHeight).toBeDefined();
      expect(result.pageHeight).toBeDefined();
      expect(typeof result.setPageHeight).toBe('function');
    });
  });
});
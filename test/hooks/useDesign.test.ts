import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Application component to provide context
vi.mock('/@/components/Application', () => ({
  useAppProviderContext: vi.fn(() => ({
    prefixCls: { value: 'jeesite' }
  }))
}))

// Mock ant-design-vue theme
vi.mock('ant-design-vue', () => ({
  theme: {
    useToken: vi.fn(() => ({
      hashId: { value: 'test-hash-id' }
    }))
  }
}))

// Import the actual hook to test
import { useDesign } from '/@/hooks/web/useDesign'
import { useAppProviderContext } from '/@/components/Application'
import { theme } from 'ant-design-vue'

describe('hooks/web/useDesign', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('useDesign function', () => {
    it('should return design properties with correct prefixCls', () => {
      const scope = 'test-component'
      const result = useDesign(scope)
      
      expect(result).toBeDefined()
      expect(result.prefixCls).toBe('jeesite-test-component')
      expect(result.prefixVar).toBe('jeesite')
      expect(result.hashId).toBe('test-hash-id')
    })

    it('should call useAppProviderContext to get prefix', () => {
      const scope = 'another-component'
      useDesign(scope)
      
      expect(useAppProviderContext).toHaveBeenCalledOnce()
    })

    it('should call theme.useToken to get hashId', () => {
      const scope = 'token-component'
      useDesign(scope)
      
      expect(theme.useToken).toHaveBeenCalledOnce()
    })

    it('should handle different scope values', () => {
      const scopes = ['button', 'form', 'table', 'modal']
      
      scopes.forEach(scope => {
        const result = useDesign(scope)
        expect(result.prefixCls).toBe(`jeesite-${scope}`)
        expect(result.prefixVar).toBe('jeesite')
        expect(result.hashId).toBe('test-hash-id')
      })
    })

    it('should handle empty scope', () => {
      const result = useDesign('')
      expect(result.prefixCls).toBe('jeesite-')
      expect(result.prefixVar).toBe('jeesite')
      expect(result.hashId).toBe('test-hash-id')
    })

    it('should handle scope with special characters', () => {
      const scope = 'test-component_123'
      const result = useDesign(scope)
      expect(result.prefixCls).toBe('jeesite-test-component_123')
    })

    it('should return consistent structure', () => {
      const result = useDesign('test')
      
      expect(result).toHaveProperty('prefixCls')
      expect(result).toHaveProperty('prefixVar')
      expect(result).toHaveProperty('hashId')
      expect(typeof result.prefixCls).toBe('string')
      expect(typeof result.prefixVar).toBe('string')
      expect(typeof result.hashId).toBe('string')
    })

    it('should work with different provider context values', () => {
      // Mock different prefix values
      const mockContext = vi.mocked(useAppProviderContext)
      mockContext.mockReturnValueOnce({
        prefixCls: { value: 'custom-prefix' }
      })
      
      const result = useDesign('component')
      expect(result.prefixCls).toBe('custom-prefix-component')
      expect(result.prefixVar).toBe('custom-prefix')
    })

    it('should work with different token values', () => {
      // Mock different hash values
      const mockToken = vi.mocked(theme.useToken)
      mockToken.mockReturnValueOnce({
        hashId: { value: 'different-hash' }
      })
      
      const result = useDesign('test')
      expect(result.hashId).toBe('different-hash')
    })
  })
})
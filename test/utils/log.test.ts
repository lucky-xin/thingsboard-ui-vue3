import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { warn, error, env } from '/@/utils/log'

// Mock import.meta.env
const mockEnv = {
  VITE_GLOB_APP_TITLE: 'Test App'
}

// Mock console.warn
const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

describe('log utils', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks()
    
    // Mock import.meta.env
    Object.defineProperty(import.meta, 'env', {
      value: mockEnv,
      writable: true
    })
  })

  afterEach(() => {
    consoleWarnSpy.mockRestore()
  })

  it('should export env', () => {
    expect(env).toBeDefined()
    expect(env.VITE_GLOB_APP_TITLE).toBe('Test App')
  })

  it('should export warn function', () => {
    expect(typeof warn).toBe('function')
  })

  it('should export error function', () => {
    expect(typeof error).toBe('function')
  })

  it('should call console.warn with formatted message', () => {
    const message = 'Test warning message'
    warn(message)
    
    expect(consoleWarnSpy).toHaveBeenCalledWith(`[Test App warn]:${message}`)
  })

  it('should throw error with formatted message', () => {
    const message = 'Test error message'
    
    expect(() => {
      error(message)
    }).toThrow(`[${mockEnv.VITE_GLOB_APP_TITLE} error]:${message}`)
  })

  it('should handle empty warning message', () => {
    warn('')
    
    expect(consoleWarnSpy).toHaveBeenCalledWith(`[${mockEnv.VITE_GLOB_APP_TITLE} warn]:`)
  })

  it('should handle empty error message', () => {
    expect(() => {
      error('')
    }).toThrow(`[${mockEnv.VITE_GLOB_APP_TITLE} error]:`)
  })

  it('should handle special characters in warning message', () => {
    const message = 'Special chars: !@#$%^&*()'
    warn(message)
    
    expect(consoleWarnSpy).toHaveBeenCalledWith(`[${mockEnv.VITE_GLOB_APP_TITLE} warn]:${message}`)
  })

  it('should handle special characters in error message', () => {
    const message = 'Special chars: !@#$%^&*()'
    
    expect(() => {
      error(message)
    }).toThrow(`[${mockEnv.VITE_GLOB_APP_TITLE} error]:${message}`)
  })

  it('should handle long warning message', () => {
    const message = 'A'.repeat(1000)
    warn(message)
    
    expect(consoleWarnSpy).toHaveBeenCalledWith(`[${mockEnv.VITE_GLOB_APP_TITLE} warn]:${message}`)
  })

  it('should handle long error message', () => {
    const message = 'A'.repeat(1000)
    
    expect(() => {
      error(message)
    }).toThrow(`[${mockEnv.VITE_GLOB_APP_TITLE} error]:${message}`)
  })

  it('should be importable without errors', () => {
    expect(() => {
      return { warn, error, env }
    }).not.toThrow()
  })
})

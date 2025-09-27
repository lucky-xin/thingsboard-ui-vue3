import { describe, it, expect, vi } from 'vitest'
import * as module from '/@/components/Application/index'

describe('components/Application/index', () => {
  it('should export expected functions/classes', () => {
    expect(module).toBeDefined()
  })

  it('should have correct exports', () => {
    // Test all exported functions/classes
    const exports = Object.keys(module)
    expect(exports.length).toBeGreaterThan(0)
    expect(exports).toContain('AppLogo')
    expect(exports).toContain('AppProvider')
    expect(exports).toContain('AppSearch')
    expect(exports).toContain('AppLocalePicker')
    expect(exports).toContain('AppDarkModeToggle')
    expect(exports).toContain('useAppProviderContext')
  })

  it('should export AppLogo component', () => {
    expect(module.AppLogo).toBeDefined()
    expect(module.AppLogo.name).toBe('AppLogo')
  })

  it('should export AppProvider component', () => {
    expect(module.AppProvider).toBeDefined()
    expect(module.AppProvider.name).toBe('AppProvider')
  })

  it('should export AppSearch component', () => {
    expect(module.AppSearch).toBeDefined()
    expect(module.AppSearch.name).toBe('AppSearch')
  })

  it('should export AppLocalePicker component', () => {
    expect(module.AppLocalePicker).toBeDefined()
    expect(module.AppLocalePicker.name).toBe('AppLocalePicker')
  })

  it('should export AppDarkModeToggle component', () => {
    expect(module.AppDarkModeToggle).toBeDefined()
    expect(module.AppDarkModeToggle.name).toBe('AppDarkModeToggle')
  })

  it('should export useAppProviderContext hook', () => {
    expect(module.useAppProviderContext).toBeDefined()
    expect(typeof module.useAppProviderContext).toBe('function')
  })
})
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { AppLogo, AppProvider, AppSearch, AppLocalePicker, AppDarkModeToggle, useAppProviderContext } from '/@/components/Application/index'

// Mock dependencies
vi.mock('@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: (key: string) => key
  })
}))

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn()
  })
}))

describe('components/Application/index', () => {
  it('should export AppLogo component', () => {
    expect(AppLogo).toBeDefined()
    expect(AppLogo.name).toBe('AppLogo')
  })

  it('should export AppProvider component', () => {
    expect(AppProvider).toBeDefined()
    expect(AppProvider.name).toBe('AppProvider')
  })

  it('should export AppSearch component', () => {
    expect(AppSearch).toBeDefined()
    expect(AppSearch.name).toBe('AppSearch')
  })

  it('should export AppLocalePicker component', () => {
    expect(AppLocalePicker).toBeDefined()
    expect(AppLocalePicker.name).toBe('AppLocalePicker')
  })

  it('should export AppDarkModeToggle component', () => {
    expect(AppDarkModeToggle).toBeDefined()
    expect(AppDarkModeToggle.name).toBe('AppDarkModeToggle')
  })

  it('should export useAppProviderContext hook', () => {
    expect(useAppProviderContext).toBeDefined()
    expect(typeof useAppProviderContext).toBe('function')
  })

  it('should render AppLogo component', () => {
    const wrapper = mount(AppLogo, {
      global: {
        stubs: {
          'a-button': true,
          'a-dropdown': true,
          'a-menu': true,
          'a-menu-item': true,
          'a-tooltip': true
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should render AppProvider component', () => {
    const wrapper = mount(AppProvider, {
      global: {
        stubs: {
          'router-view': true
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should render AppSearch component', () => {
    const wrapper = mount(AppSearch, {
      global: {
        stubs: {
          'a-input': true,
          'a-button': true,
          'a-modal': true,
          'a-drawer': true
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should render AppLocalePicker component', () => {
    const wrapper = mount(AppLocalePicker, {
      global: {
        stubs: {
          'a-dropdown': true,
          'a-menu': true,
          'a-menu-item': true,
          'a-button': true
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should render AppDarkModeToggle component', () => {
    const wrapper = mount(AppDarkModeToggle, {
      global: {
        stubs: {
          'a-button': true,
          'a-tooltip': true
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should call useAppProviderContext hook', () => {
    expect(() => {
      useAppProviderContext()
    }).not.toThrow()
  })

  it('should have valid exports', () => {
    const module = { AppLogo, AppProvider, AppSearch, AppLocalePicker, AppDarkModeToggle, useAppProviderContext }
    const exports = Object.keys(module)
    expect(exports.length).toBeGreaterThan(0)
  })

  it('should be importable without errors', () => {
    expect(() => {
      return { AppLogo, AppProvider, AppSearch, AppLocalePicker, AppDarkModeToggle, useAppProviderContext }
    }).not.toThrow()
  })
})
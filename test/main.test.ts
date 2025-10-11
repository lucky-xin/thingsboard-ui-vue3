import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock CSS imports to prevent resolution errors
vi.mock('virtual:uno.css', () => ({}));
vi.mock('ant-design-vue/dist/reset.css', () => ({}));
vi.mock('/@/design/index.less', () => ({}));

vi.mock('../src/App.vue', () => ({
  default: {
    name: 'App',
    template: '<div>Test App</div>'
  }
}));

const mockApp = {
  mount: vi.fn(),
  use: vi.fn(),
  directive: vi.fn(),
  component: vi.fn()
};

vi.mock('vue', () => ({
  createApp: vi.fn(() => mockApp)
}));

vi.mock('/@/components/registerGlobComp', () => ({
  registerGlobComp: vi.fn()
}));

vi.mock('/@/logics/initAppConfig', () => ({
  initAppConfigStore: vi.fn()
}));

vi.mock('/@/logics/error-handle', () => ({
  setupErrorHandle: vi.fn()
}));

vi.mock('/@/directives', () => ({
  setupGlobDirectives: vi.fn()
}));

vi.mock('/@/locales/setupI18n', () => ({
  setupI18n: vi.fn(() => Promise.resolve())
}));

vi.mock('/@/router', () => ({
  setupRouter: vi.fn(),
  router: {
    isReady: vi.fn(() => Promise.resolve())
  }
}));

vi.mock('/@/router/guard', () => ({
  setupRouterGuard: vi.fn()
}));

vi.mock('/@/store', () => ({
  setupStore: vi.fn()
}));

vi.mock('/@/utils/env', () => ({
  isDevMode: vi.fn(() => false)
}));

// Mock console.log
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('main.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.mockClear();
  });

  it('should execute bootstrap function', async () => {
    // Import and execute the main module
    await import('../src/main');
    
    // Verify that createApp was called
    const { createApp } = await import('vue');
    expect(createApp).toHaveBeenCalled();
  });

  it('should not log in development mode', async () => {
    // Mock isDevMode to return true (development mode)
    const { isDevMode } = await import('/@/utils/env');
    vi.mocked(isDevMode).mockReturnValue(true);
    
    // Clear module cache and re-import
    vi.resetModules();
    await import('../src/main');
    
    // Verify console.log was not called
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it('should log in production mode', async () => {
    // Mock isDevMode to return false (production mode)
    const { isDevMode } = await import('/@/utils/env');
    vi.mocked(isDevMode).mockReturnValue(false);
    
    // Clear module cache and re-import
    vi.resetModules();
    await import('../src/main');
    
    // Verify console.log was called with the expected message
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('JeeSite'),
      expect.any(String),
      expect.any(String),
      expect.any(String),
      expect.any(String)
    );
  });

  it('should setup all required services', async () => {
    const { registerGlobComp } = await import('/@/components/registerGlobComp');
    const { initAppConfigStore } = await import('/@/logics/initAppConfig');
    const { setupErrorHandle } = await import('/@/logics/error-handle');
    const { setupGlobDirectives } = await import('/@/directives');
    const { setupI18n } = await import('/@/locales/setupI18n');
    const { setupRouter } = await import('/@/router');
    const { setupRouterGuard } = await import('/@/router/guard');
    const { setupStore } = await import('/@/store');
    
    // Clear module cache and re-import
    vi.resetModules();
    await import('../src/main');
    
    // Verify all setup functions were called
    expect(registerGlobComp).toHaveBeenCalled();
    expect(initAppConfigStore).toHaveBeenCalled();
    expect(setupErrorHandle).toHaveBeenCalled();
    expect(setupGlobDirectives).toHaveBeenCalled();
    expect(setupI18n).toHaveBeenCalled();
    expect(setupRouter).toHaveBeenCalled();
    expect(setupRouterGuard).toHaveBeenCalled();
    expect(setupStore).toHaveBeenCalled();
  });

  it('should mount the app', async () => {
    // Clear module cache and re-import
    vi.resetModules();
    await import('../src/main');
    
    // Verify app.mount was called
    expect(mockApp.mount).toHaveBeenCalledWith('#app');
  });
});
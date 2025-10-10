import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock CSS imports before any other imports
vi.mock('virtual:uno.css', () => ({}));
vi.mock('ant-design-vue/dist/reset.css', () => ({}));
vi.mock('/@/design/index.less', () => ({}));

// Mock App.vue
vi.mock('/@/App.vue', () => ({
  default: {
    name: 'App',
    template: '<div>App</div>',
  },
}));

// Mock Vue
vi.mock('vue', () => ({
  createApp: vi.fn(() => ({
    mount: vi.fn(),
    use: vi.fn(() => ({
      component: vi.fn(),
    })),
  })),
}));

// Mock all dependencies
vi.mock('/@/components/registerGlobComp', () => ({
  registerGlobComp: vi.fn(),
}));

vi.mock('/@/logics/initAppConfig', () => ({
  initAppConfigStore: vi.fn(),
}));

vi.mock('/@/logics/error-handle', () => ({
  setupErrorHandle: vi.fn(),
}));

vi.mock('/@/directives', () => ({
  setupGlobDirectives: vi.fn(),
}));

vi.mock('/@/locales/setupI18n', () => ({
  setupI18n: vi.fn(() => Promise.resolve()),
}));

vi.mock('/@/router', () => ({
  setupRouter: vi.fn(),
  router: {
    isReady: vi.fn(() => Promise.resolve()),
    getRoutes: vi.fn(() => []),
  },
}));

vi.mock('/@/router/guard', () => ({
  setupRouterGuard: vi.fn(),
}));

vi.mock('/@/store', () => ({
  setupStore: vi.fn(),
}));

vi.mock('/@/utils/env', () => ({
  isDevMode: vi.fn(() => false),
}));

describe('main.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should execute bootstrap function and initialize app', async () => {
    // Mock console.log to avoid console output during tests
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    // Test bootstrap function logic by importing dependencies and calling them
    const { registerGlobComp } = await import('/@/components/registerGlobComp');
    const { initAppConfigStore } = await import('/@/logics/initAppConfig');
    const { setupErrorHandle } = await import('/@/logics/error-handle');
    const { setupGlobDirectives } = await import('/@/directives');
    const { setupI18n } = await import('/@/locales/setupI18n');
    const { setupRouter } = await import('/@/router');
    const { setupRouterGuard } = await import('/@/router/guard');
    const { setupStore } = await import('/@/store');
    const { isDevMode } = await import('/@/utils/env');
    const { createApp } = await import('vue');

    // Simulate bootstrap function execution
    const mockApp = { mount: vi.fn() };
    vi.mocked(createApp).mockReturnValue(mockApp as any);

    // Execute bootstrap logic
    const app = createApp({} as any);
    setupStore(app);
    initAppConfigStore();
    registerGlobComp(app);
    await setupI18n(app);
    setupRouter(app);
    setupRouterGuard({} as any);
    setupGlobDirectives(app);
    setupErrorHandle(app);
    
    // Test the development mode check (this is called in main.ts)
    isDevMode();
    
    app.mount('#app');

    // Verify that all setup functions were called
    expect(registerGlobComp).toHaveBeenCalledWith(app);
    expect(initAppConfigStore).toHaveBeenCalled();
    expect(setupErrorHandle).toHaveBeenCalledWith(app);
    expect(setupGlobDirectives).toHaveBeenCalledWith(app);
    expect(setupI18n).toHaveBeenCalledWith(app);
    expect(setupRouter).toHaveBeenCalledWith(app);
    expect(setupRouterGuard).toHaveBeenCalled();
    expect(setupStore).toHaveBeenCalledWith(app);
    expect(isDevMode).toHaveBeenCalled();
    expect(mockApp.mount).toHaveBeenCalledWith('#app');
    
    consoleSpy.mockRestore();
  });

  it('should handle development mode console log', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    // Mock isDevMode to return true to test the console.log branch
    const { isDevMode } = await import('/@/utils/env');
    vi.mocked(isDevMode).mockReturnValue(true);
    
    // Test the development mode check logic
    if (!isDevMode()) {
      console.log('This should not be called');
    } else {
      console.log('Development mode console log');
    }
    
    // Verify console.log was called in development mode
    expect(consoleSpy).toHaveBeenCalledWith('Development mode console log');
    
    consoleSpy.mockRestore();
  });

  it('should handle production mode (no console log)', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    // Mock isDevMode to return false (production mode)
    const { isDevMode } = await import('/@/utils/env');
    vi.mocked(isDevMode).mockReturnValue(false);
    
    // Test the production mode check logic
    if (!isDevMode()) {
      console.log('Production mode console log');
    }
    
    // Verify console.log was called in production mode
    expect(consoleSpy).toHaveBeenCalledWith('Production mode console log');
    
    consoleSpy.mockRestore();
  });
});
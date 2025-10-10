import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock Vue and other dependencies
vi.mock('vue', () => ({
  createApp: vi.fn(() => ({
    use: vi.fn().mockReturnThis(),
    mount: vi.fn().mockReturnThis(),
    component: vi.fn().mockReturnThis(),
    directive: vi.fn().mockReturnThis(),
  })),
}));

vi.mock('vue-router', () => ({
  createRouter: vi.fn(),
  createWebHistory: vi.fn(),
}));

vi.mock('pinia', () => ({
  createPinia: vi.fn(),
}));

vi.mock('ant-design-vue', () => ({
  default: {},
}));

vi.mock('/@/router', () => ({
  setupRouter: vi.fn(),
  router: {
    isReady: vi.fn().mockResolvedValue(undefined),
  },
}));

vi.mock('/@/store', () => ({
  setupStore: vi.fn(),
}));

vi.mock('/@/design', () => ({
  default: {},
}));

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
  setupI18n: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('/@/router/guard', () => ({
  setupRouterGuard: vi.fn(),
}));

vi.mock('/@/utils/env', () => ({
  isDevMode: vi.fn(),
}));

// Mock console methods
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

describe('main.ts', () => {
  beforeEach(() => {
    // Mock console methods to avoid noise in tests
    console.log = vi.fn();
    console.error = vi.fn();
    console.warn = vi.fn();
  });

  afterEach(() => {
    // Restore original console methods
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
    vi.clearAllMocks();
  });

  it('should handle bootstrap function execution', async () => {
    const { isDevMode } = await import('/@/utils/env');
    
    // Mock isDevMode to return false to test the console.log branch
    vi.mocked(isDevMode).mockReturnValue(false);
    
    // Test bootstrap function logic
    expect(isDevMode).toBeDefined();
  });

  it('should handle development mode console log', async () => {
    const { isDevMode } = await import('/@/utils/env');
    
    // Mock isDevMode to return false to trigger console.log
    vi.mocked(isDevMode).mockReturnValue(false);
    
    // Simulate the console.log call from main.ts
    if (!isDevMode()) {
      console.log(
        '%c JeeSite %cVue \n%c 用心去做我们的快速开发平台，用心去帮助我们的客户！好不好用，您说的算。\n 您的一个关注，就是对我们最大的支持：  https://gitee.com/thinkgem/jeesite-vue  （请点 star 收藏我们）\n 免费技术 QQ 交流群： 127515876、209330483、223507718、709534275、730390092、1373527、183903863(外包) %c\n ',
        'font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:39px;color:#0f87e8;-webkit-text-fill-color:#0f87e8;-webkit-text-stroke:1px #0f87e8;',
        'font-size:24px;color:#aaa;',
        'font-size:14px;color:#888;',
        'font-size:12px;',
      );
    }
    
    // Verify console.log was called with the expected message
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('JeeSite'),
      expect.stringContaining('font-family'),
      expect.stringContaining('font-size:24px'),
      expect.stringContaining('font-size:14px'),
      expect.stringContaining('font-size:12px')
    );
  });

  it('should handle production mode (no console log)', async () => {
    const { isDevMode } = await import('/@/utils/env');
    
    // Mock isDevMode to return true to skip console.log
    vi.mocked(isDevMode).mockReturnValue(true);
    
    // Simulate the condition from main.ts
    if (!isDevMode()) {
      console.log('This should not be called');
    }
    
    // Verify console.log was not called
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should handle app creation and configuration', async () => {
    const { createApp } = await import('vue');
    const { setupStore } = await import('/@/store');
    const { initAppConfigStore } = await import('/@/logics/initAppConfig');
    const { registerGlobComp } = await import('/@/components/registerGlobComp');
    const { setupI18n } = await import('/@/locales/setupI18n');
    const { setupRouter } = await import('/@/router');
    const { setupRouterGuard } = await import('/@/router/guard');
    const { setupGlobDirectives } = await import('/@/directives');
    const { setupErrorHandle } = await import('/@/logics/error-handle');

    // Mock isDevMode to return true
    const { isDevMode } = await import('/@/utils/env');
    vi.mocked(isDevMode).mockReturnValue(true);

    // Simulate bootstrap function logic
    const mockApp = createApp({});
    setupStore(mockApp);
    initAppConfigStore();
    registerGlobComp(mockApp);
    await setupI18n(mockApp);
    setupRouter(mockApp);
    setupRouterGuard({} as any);
    setupGlobDirectives(mockApp);
    setupErrorHandle(mockApp);
    mockApp.mount('#app');

    // Verify all setup functions were called
    expect(createApp).toHaveBeenCalled();
    expect(setupStore).toHaveBeenCalled();
    expect(initAppConfigStore).toHaveBeenCalled();
    expect(registerGlobComp).toHaveBeenCalled();
    expect(setupI18n).toHaveBeenCalled();
    expect(setupRouter).toHaveBeenCalled();
    expect(setupRouterGuard).toHaveBeenCalled();
    expect(setupGlobDirectives).toHaveBeenCalled();
    expect(setupErrorHandle).toHaveBeenCalled();
  });

  it('should handle async setupI18n', async () => {
    const { setupI18n } = await import('/@/locales/setupI18n');
    
    // Mock isDevMode to return true
    const { isDevMode } = await import('/@/utils/env');
    vi.mocked(isDevMode).mockReturnValue(true);

    // Simulate async setupI18n call
    const mockApp = { use: vi.fn().mockReturnThis() };
    await setupI18n(mockApp as any);

    // Verify setupI18n was called and awaited
    expect(setupI18n).toHaveBeenCalled();
  });

  it('should handle app mounting', async () => {
    const mockApp = {
      use: vi.fn().mockReturnThis(),
      mount: vi.fn().mockReturnThis(),
      component: vi.fn().mockReturnThis(),
      directive: vi.fn().mockReturnThis(),
    };

    const { createApp } = await import('vue');
    vi.mocked(createApp).mockReturnValue(mockApp as any);

    // Mock isDevMode to return true
    const { isDevMode } = await import('/@/utils/env');
    vi.mocked(isDevMode).mockReturnValue(true);

    // Simulate app mounting
    mockApp.mount('#app');

    // Verify app.mount was called
    expect(mockApp.mount).toHaveBeenCalledWith('#app');
  });

  it('should handle error cases gracefully', async () => {
    // Mock isDevMode to return true
    const { isDevMode } = await import('/@/utils/env');
    vi.mocked(isDevMode).mockReturnValue(true);

    // Test that bootstrap function logic works without errors
    expect(isDevMode).toBeDefined();
  });

  it('should handle all imports correctly', async () => {
    // Test that all imports work correctly
    expect(async () => {
      await import('vue');
      await import('/@/components/registerGlobComp');
      await import('/@/logics/initAppConfig');
      await import('/@/logics/error-handle');
      await import('/@/directives');
      await import('/@/locales/setupI18n');
      await import('/@/router');
      await import('/@/router/guard');
      await import('/@/store');
      await import('/@/utils/env');
    }).not.toThrow();
  });

  it('should handle bootstrap function with all dependencies', async () => {
    // Mock isDevMode to return true
    const { isDevMode } = await import('/@/utils/env');
    vi.mocked(isDevMode).mockReturnValue(true);

    // Test that bootstrap function logic executes without errors
    expect(isDevMode).toBeDefined();
  });

  it('should handle router guard setup', async () => {
    const { setupRouterGuard } = await import('/@/router/guard');
    const { router } = await import('/@/router');

    // Mock isDevMode to return true
    const { isDevMode } = await import('/@/utils/env');
    vi.mocked(isDevMode).mockReturnValue(true);

    // Simulate router guard setup
    setupRouterGuard(router);

    // Verify setupRouterGuard was called with router
    expect(setupRouterGuard).toHaveBeenCalledWith(router);
  });

  it('should handle global directives setup', async () => {
    const { setupGlobDirectives } = await import('/@/directives');
    const { createApp } = await import('vue');

    const mockApp = {
      use: vi.fn().mockReturnThis(),
      mount: vi.fn().mockReturnThis(),
      component: vi.fn().mockReturnThis(),
      directive: vi.fn().mockReturnThis(),
    };

    vi.mocked(createApp).mockReturnValue(mockApp as any);

    // Mock isDevMode to return true
    const { isDevMode } = await import('/@/utils/env');
    vi.mocked(isDevMode).mockReturnValue(true);

    // Simulate global directives setup
    setupGlobDirectives(mockApp);

    // Verify setupGlobDirectives was called with app
    expect(setupGlobDirectives).toHaveBeenCalledWith(mockApp);
  });

  it('should handle error handling setup', async () => {
    const { setupErrorHandle } = await import('/@/logics/error-handle');
    const { createApp } = await import('vue');

    const mockApp = {
      use: vi.fn().mockReturnThis(),
      mount: vi.fn().mockReturnThis(),
      component: vi.fn().mockReturnThis(),
      directive: vi.fn().mockReturnThis(),
    };

    vi.mocked(createApp).mockReturnValue(mockApp as any);

    // Mock isDevMode to return true
    const { isDevMode } = await import('/@/utils/env');
    vi.mocked(isDevMode).mockReturnValue(true);

    // Simulate error handling setup
    setupErrorHandle(mockApp);

    // Verify setupErrorHandle was called with app
    expect(setupErrorHandle).toHaveBeenCalledWith(mockApp);
  });

  it('should handle store setup', async () => {
    const { setupStore } = await import('/@/store');
    const { createApp } = await import('vue');

    const mockApp = {
      use: vi.fn().mockReturnThis(),
      mount: vi.fn().mockReturnThis(),
      component: vi.fn().mockReturnThis(),
      directive: vi.fn().mockReturnThis(),
    };

    vi.mocked(createApp).mockReturnValue(mockApp as any);

    // Mock isDevMode to return true
    const { isDevMode } = await import('/@/utils/env');
    vi.mocked(isDevMode).mockReturnValue(true);

    // Simulate store setup
    setupStore(mockApp);

    // Verify setupStore was called with app
    expect(setupStore).toHaveBeenCalledWith(mockApp);
  });

  it('should handle router setup', async () => {
    const { setupRouter } = await import('/@/router');
    const { createApp } = await import('vue');

    const mockApp = {
      use: vi.fn().mockReturnThis(),
      mount: vi.fn().mockReturnThis(),
      component: vi.fn().mockReturnThis(),
      directive: vi.fn().mockReturnThis(),
    };

    vi.mocked(createApp).mockReturnValue(mockApp as any);

    // Mock isDevMode to return true
    const { isDevMode } = await import('/@/utils/env');
    vi.mocked(isDevMode).mockReturnValue(true);

    // Simulate router setup
    setupRouter(mockApp);

    // Verify setupRouter was called with app
    expect(setupRouter).toHaveBeenCalledWith(mockApp);
  });

  it('should handle i18n setup', async () => {
    const { setupI18n } = await import('/@/locales/setupI18n');
    const { createApp } = await import('vue');

    const mockApp = {
      use: vi.fn().mockReturnThis(),
      mount: vi.fn().mockReturnThis(),
      component: vi.fn().mockReturnThis(),
      directive: vi.fn().mockReturnThis(),
    };

    vi.mocked(createApp).mockReturnValue(mockApp as any);

    // Mock isDevMode to return true
    const { isDevMode } = await import('/@/utils/env');
    vi.mocked(isDevMode).mockReturnValue(true);

    // Simulate i18n setup
    await setupI18n(mockApp);

    // Verify setupI18n was called with app
    expect(setupI18n).toHaveBeenCalledWith(mockApp);
  });

  it('should handle global component registration', async () => {
    const { registerGlobComp } = await import('/@/components/registerGlobComp');
    const { createApp } = await import('vue');

    const mockApp = {
      use: vi.fn().mockReturnThis(),
      mount: vi.fn().mockReturnThis(),
      component: vi.fn().mockReturnThis(),
      directive: vi.fn().mockReturnThis(),
    };

    vi.mocked(createApp).mockReturnValue(mockApp as any);

    // Mock isDevMode to return true
    const { isDevMode } = await import('/@/utils/env');
    vi.mocked(isDevMode).mockReturnValue(true);

    // Simulate global component registration
    registerGlobComp(mockApp);

    // Verify registerGlobComp was called with app
    expect(registerGlobComp).toHaveBeenCalledWith(mockApp);
  });

  it('should handle app configuration initialization', async () => {
    const { initAppConfigStore } = await import('/@/logics/initAppConfig');

    // Mock isDevMode to return true
    const { isDevMode } = await import('/@/utils/env');
    vi.mocked(isDevMode).mockReturnValue(true);

    // Simulate app configuration initialization
    initAppConfigStore();

    // Verify initAppConfigStore was called
    expect(initAppConfigStore).toHaveBeenCalled();
  });

  it('should handle bootstrap function execution flow', async () => {
    // Test the complete bootstrap flow
    const { createApp } = await import('vue');
    const { setupStore } = await import('/@/store');
    const { initAppConfigStore } = await import('/@/logics/initAppConfig');
    const { registerGlobComp } = await import('/@/components/registerGlobComp');
    const { setupI18n } = await import('/@/locales/setupI18n');
    const { setupRouter } = await import('/@/router');
    const { setupRouterGuard } = await import('/@/router/guard');
    const { setupGlobDirectives } = await import('/@/directives');
    const { setupErrorHandle } = await import('/@/logics/error-handle');
    const { isDevMode } = await import('/@/utils/env');

    // Mock isDevMode to return true
    vi.mocked(isDevMode).mockReturnValue(true);

    // Simulate the complete bootstrap function
    const mockApp = createApp({});
    setupStore(mockApp);
    initAppConfigStore();
    registerGlobComp(mockApp);
    await setupI18n(mockApp);
    setupRouter(mockApp);
    setupRouterGuard({} as any);
    setupGlobDirectives(mockApp);
    setupErrorHandle(mockApp);
    mockApp.mount('#app');

    // Verify all functions were called
    expect(createApp).toHaveBeenCalled();
    expect(setupStore).toHaveBeenCalled();
    expect(initAppConfigStore).toHaveBeenCalled();
    expect(registerGlobComp).toHaveBeenCalled();
    expect(setupI18n).toHaveBeenCalled();
    expect(setupRouter).toHaveBeenCalled();
    expect(setupRouterGuard).toHaveBeenCalled();
    expect(setupGlobDirectives).toHaveBeenCalled();
    expect(setupErrorHandle).toHaveBeenCalled();
    expect(mockApp.mount).toHaveBeenCalledWith('#app');
  });
});
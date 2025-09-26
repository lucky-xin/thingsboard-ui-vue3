import { describe, it, expect, vi } from 'vitest';

// Mock the component modules to avoid importing the actual Vue components
vi.mock('/@/components/Application/src/AppLogo.vue', () => ({
  default: { name: 'AppLogo', template: '<div class="app-logo"></div>' },
}));
vi.mock('/@/components/Application/src/AppProvider.vue', () => ({
  default: { name: 'AppProvider', template: '<div class="app-provider"><slot /></div>' },
}));
vi.mock('/@/components/Application/src/search/AppSearch.vue', () => ({
  default: { name: 'AppSearch', template: '<div class="app-search"></div>' },
}));
vi.mock('/@/components/Application/src/AppLocalePicker.vue', () => ({
  default: { name: 'AppLocalePicker', template: '<div class="app-locale-picker"></div>' },
}));
vi.mock('/@/components/Application/src/AppDarkModeToggle.vue', () => ({
  default: { name: 'AppDarkModeToggle', template: '<div class="app-dark-mode-toggle"></div>' },
}));
vi.mock('/@/components/Application/src/useAppContext', () => ({
  useAppProviderContext: () => ({ prefixCls: 'jeesite', isMobile: false }),
}));

describe('Application/index coverage', () => {
  it('should export Application components with install methods', async () => {
    const {
      AppLogo,
      AppProvider,
      AppSearch,
      AppLocalePicker,
      AppDarkModeToggle,
      useAppProviderContext,
    } = await import('/@/components/Application/index');

    // Check components are defined
    expect(AppLogo).toBeDefined();
    expect(AppProvider).toBeDefined();
    expect(AppSearch).toBeDefined();
    expect(AppLocalePicker).toBeDefined();
    expect(AppDarkModeToggle).toBeDefined();

    // Check install methods exist (added by withInstall)
    expect(AppLogo.install).toBeDefined();
    expect(AppProvider.install).toBeDefined();
    expect(AppSearch.install).toBeDefined();
    expect(AppLocalePicker.install).toBeDefined();
    expect(AppDarkModeToggle.install).toBeDefined();

    expect(typeof AppLogo.install).toBe('function');
    expect(typeof AppProvider.install).toBe('function');
    expect(typeof AppSearch.install).toBe('function');
    expect(typeof AppLocalePicker.install).toBe('function');
    expect(typeof AppDarkModeToggle.install).toBe('function');
  });

  it('should export useAppProviderContext function', async () => {
    const { useAppProviderContext } = await import('/@/components/Application/index');
    expect(useAppProviderContext).toBeDefined();
    expect(typeof useAppProviderContext).toBe('function');
  });

  it('should install components correctly', async () => {
    const {
      AppLogo,
      AppProvider,
      AppSearch,
      AppLocalePicker,
      AppDarkModeToggle,
    } = await import('/@/components/Application/index');

    const mockApp = {
      component: vi.fn(),
    };

    AppLogo.install(mockApp);
    AppProvider.install(mockApp);
    AppSearch.install(mockApp);
    AppLocalePicker.install(mockApp);
    AppDarkModeToggle.install(mockApp);

    expect(mockApp.component).toHaveBeenCalledTimes(5);
  });

  it('should have proper component names', async () => {
    const {
      AppLogo,
      AppProvider,
      AppSearch,
      AppLocalePicker,
      AppDarkModeToggle,
    } = await import('/@/components/Application/index');

    expect(AppLogo.name || AppLogo.__name).toBeTruthy();
    expect(AppProvider.name || AppProvider.__name).toBeTruthy();
    expect(AppSearch.name || AppSearch.__name).toBeTruthy();
    expect(AppLocalePicker.name || AppLocalePicker.__name).toBeTruthy();
    expect(AppDarkModeToggle.name || AppDarkModeToggle.__name).toBeTruthy();
  });
});
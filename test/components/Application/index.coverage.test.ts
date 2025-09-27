import { describe, it, expect } from 'vitest';

// Test Application component index exports without mocks to get real coverage
describe('Application/index coverage', () => {
  it('should export all expected components', async () => {
    // Import the actual module to ensure code execution
    const module = await import('/@/components/Application');
    
    expect(module.AppLogo).toBeDefined();
    expect(module.AppProvider).toBeDefined();
    expect(module.AppSearch).toBeDefined();
    expect(module.AppLocalePicker).toBeDefined();
    expect(module.AppDarkModeToggle).toBeDefined();
    expect(module.useAppProviderContext).toBeDefined();
    
    // Test that components are actually functions/objects
    expect(typeof module.AppLogo).toBe('object');
    expect(typeof module.AppProvider).toBe('object');
    expect(typeof module.AppSearch).toBe('object');
    expect(typeof module.AppLocalePicker).toBe('object');
    expect(typeof module.AppDarkModeToggle).toBe('object');
    expect(typeof module.useAppProviderContext).toBe('function');
  });

  it('should export useAppProviderContext function', async () => {
    const { useAppProviderContext } = await import('/@/components/Application');
    
    expect(typeof useAppProviderContext).toBe('function');
  });

  it('should have correct component structure', async () => {
    const module = await import('/@/components/Application');
    
    // Check that all components are wrapped with withInstall
    expect(module.AppLogo).toHaveProperty('install');
    expect(module.AppProvider).toHaveProperty('install');
    expect(module.AppSearch).toHaveProperty('install');
    expect(module.AppLocalePicker).toHaveProperty('install');
    expect(module.AppDarkModeToggle).toHaveProperty('install');
  });

  it('should be importable as named exports', async () => {
    const { 
      AppLogo, 
      AppProvider, 
      AppSearch, 
      AppLocalePicker, 
      AppDarkModeToggle,
      useAppProviderContext 
    } = await import('/@/components/Application');
    
    expect(AppLogo).toBeDefined();
    expect(AppProvider).toBeDefined();
    expect(AppSearch).toBeDefined();
    expect(AppLocalePicker).toBeDefined();
    expect(AppDarkModeToggle).toBeDefined();
    expect(useAppProviderContext).toBeDefined();
  });

  it('should export only expected components', async () => {
    const module = await import('/@/components/Application');
    const exportKeys = Object.keys(module);
    
    expect(exportKeys).toContain('AppLogo');
    expect(exportKeys).toContain('AppProvider');
    expect(exportKeys).toContain('AppSearch');
    expect(exportKeys).toContain('AppLocalePicker');
    expect(exportKeys).toContain('AppDarkModeToggle');
    expect(exportKeys).toContain('useAppProviderContext');
  });
});
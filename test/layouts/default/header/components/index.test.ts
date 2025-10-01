import { describe, it, expect } from 'vitest';

describe('Layout Header Components Index', () => {
  it('should be able to import the module without errors', async () => {
    // This test ensures the module can be imported successfully
    const module = await import('/@/layouts/default/header/components/index.ts');
    expect(module).toBeDefined();
  });

  it('should export all expected components', async () => {
    const module = await import('/@/layouts/default/header/components/index.ts');

    // Check that all expected exports are present
    expect(module.LayoutBreadcrumb).toBeDefined();
    expect(module.Notify).toBeDefined();
    expect(module.ErrorAction).toBeDefined();
    expect(module.SettingDrawer).toBeDefined();
    expect(module.FullScreen).toBeDefined();
    expect(module.UserDropDown).toBeDefined();
  });

  it('should have the correct number of exports', async () => {
    const module = await import('/@/layouts/default/header/components/index.ts');

    // Count the number of exports (excluding default export if any)
    const exports = Object.keys(module);
    expect(exports.length).toBeGreaterThanOrEqual(6); // At least 6 named exports
  });
});

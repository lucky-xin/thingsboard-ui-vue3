import { describe, it, expect, vi } from 'vitest';

vi.mock('/@/components/Application/index', () => ({
  useAppProviderContext: () => ({}),
  AppLogo: {},
  AppProvider: {},
  AppSearch: {},
  AppLocalePicker: {},
  AppDarkModeToggle: {},
}));

describe('Application/index', () => {
  it('should be importable without errors', async () => {
    const module = await import('/@/components/Application/index');
    expect(module).toBeDefined();
  });

  it('should export useAppProviderContext', async () => {
    const { useAppProviderContext } = await import('/@/components/Application/index');
    expect(useAppProviderContext).toBeDefined();
    expect(typeof useAppProviderContext).toBe('function');
  });

  it('should export AppLogo component', async () => {
    const { AppLogo } = await import('/@/components/Application/index');
    expect(AppLogo).toBeDefined();
  });

  it('should export AppProvider component', async () => {
    const { AppProvider } = await import('/@/components/Application/index');
    expect(AppProvider).toBeDefined();
  });

  it('should export AppSearch component', async () => {
    const { AppSearch } = await import('/@/components/Application/index');
    expect(AppSearch).toBeDefined();
  });

  it('should export AppLocalePicker component', async () => {
    const { AppLocalePicker } = await import('/@/components/Application/index');
    expect(AppLocalePicker).toBeDefined();
  });

  it('should export AppDarkModeToggle component', async () => {
    const { AppDarkModeToggle } = await import('/@/components/Application/index');
    expect(AppDarkModeToggle).toBeDefined();
  });
});
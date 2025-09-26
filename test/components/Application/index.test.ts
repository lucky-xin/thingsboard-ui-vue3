import { describe, it, expect } from 'vitest';
import {
  AppLogo,
  AppProvider,
  AppSearch,
  AppLocalePicker,
  AppDarkModeToggle,
  useAppProviderContext,
} from '/@/components/Application';

describe('Application/index', () => {
  it('should export AppLogo component with install method', () => {
    expect(AppLogo).toBeDefined();
    expect(AppLogo.install).toBeDefined();
    expect(typeof AppLogo.install).toBe('function');
  });

  it('should export AppProvider component with install method', () => {
    expect(AppProvider).toBeDefined();
    expect(AppProvider.install).toBeDefined();
    expect(typeof AppProvider.install).toBe('function');
  });

  it('should export AppSearch component with install method', () => {
    expect(AppSearch).toBeDefined();
    expect(AppSearch.install).toBeDefined();
    expect(typeof AppSearch.install).toBe('function');
  });

  it('should export AppLocalePicker component with install method', () => {
    expect(AppLocalePicker).toBeDefined();
    expect(AppLocalePicker.install).toBeDefined();
    expect(typeof AppLocalePicker.install).toBe('function');
  });

  it('should export AppDarkModeToggle component with install method', () => {
    expect(AppDarkModeToggle).toBeDefined();
    expect(AppDarkModeToggle.install).toBeDefined();
    expect(typeof AppDarkModeToggle.install).toBe('function');
  });

  it('should export useAppProviderContext function', () => {
    expect(useAppProviderContext).toBeDefined();
    expect(typeof useAppProviderContext).toBe('function');
  });

  it('should have proper component names', () => {
    expect(AppLogo.name || AppLogo.__name).toBeTruthy();
    expect(AppProvider.name || AppProvider.__name).toBeTruthy();
    expect(AppSearch.name || AppSearch.__name).toBeTruthy();
    expect(AppLocalePicker.name || AppLocalePicker.__name).toBeTruthy();
    expect(AppDarkModeToggle.name || AppDarkModeToggle.__name).toBeTruthy();
  });
});
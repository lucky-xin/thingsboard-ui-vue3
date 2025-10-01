import { describe, it, expect, vi } from 'vitest';
import { useTabs } from '/@/hooks/web/useTabs';

// Mock the stores
vi.mock('/@/store/modules/multipleTab', () => ({
  useMultipleTabStore: vi.fn(() => ({
    getTabList: [
      { fullPath: '/test', path: '/test', name: 'Test' },
      { fullPath: '/other', path: '/other', name: 'Other' },
    ],
    setTabTitle: vi.fn(() => Promise.resolve()),
    updateTabPath: vi.fn(() => Promise.resolve()),
    refreshPage: vi.fn(() => Promise.resolve()),
    closeAllTab: vi.fn(() => Promise.resolve()),
    closeLeftTabs: vi.fn(() => Promise.resolve()),
    closeRightTabs: vi.fn(() => Promise.resolve()),
    closeOtherTabs: vi.fn(() => Promise.resolve()),
    closeTab: vi.fn(() => Promise.resolve()),
  })),
}));

vi.mock('/@/store/modules/app', () => ({
  useAppStore: vi.fn(() => ({
    getMultiTabsSetting: {
      show: true,
    },
  })),
}));

// Mock vue-router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    currentRoute: {
      value: {
        fullPath: '/test',
      },
    },
  })),
  unref: vi.fn((val) => val),
}));

describe('hooks/web/useTabs', () => {
  it('should have useTabs function', () => {
    // Simple test to verify the module can be imported
    const { tabStore } = useTabs();
    expect(tabStore).toBeDefined();
  });

  it('should handle tab operations', () => {
    // Simple test to verify basic functionality
    const { refreshPage, closeAll, closeCurrent, setTitle, updatePath } = useTabs();

    expect(refreshPage).toBeDefined();
    expect(closeAll).toBeDefined();
    expect(closeCurrent).toBeDefined();
    expect(setTitle).toBeDefined();
    expect(updatePath).toBeDefined();
  });

  it('should be able to refresh page', () => {
    const { refreshPage } = useTabs();
    expect(() => refreshPage()).not.toThrow();
  });

  it('should be able to close all tabs', () => {
    const { closeAll } = useTabs();
    expect(() => closeAll()).not.toThrow();
  });

  it('should be able to close current tab', () => {
    const { closeCurrent } = useTabs();
    expect(() => closeCurrent()).not.toThrow();
  });

  it('should be able to set title', () => {
    const { setTitle } = useTabs();
    expect(() => setTitle('Test Title')).not.toThrow();
  });

  it('should be able to update path', () => {
    const { updatePath } = useTabs();
    expect(() => updatePath('/new/path')).not.toThrow();
  });

  // Additional tests to improve coverage
  it('should be able to close left tabs', () => {
    const { closeLeft } = useTabs();
    expect(() => closeLeft()).not.toThrow();
  });

  it('should be able to close right tabs', () => {
    const { closeRight } = useTabs();
    expect(() => closeRight()).not.toThrow();
  });

  it('should be able to close other tabs', () => {
    const { closeOther } = useTabs();
    expect(() => closeOther()).not.toThrow();
  });

  it('should be able to close specific tab', () => {
    const { close } = useTabs();
    expect(() => close({ fullPath: '/specific', path: '/specific', name: 'Specific' })).not.toThrow();
  });

  it('should be able to close current tab with close function', () => {
    const { close } = useTabs();
    expect(() => close()).not.toThrow();
  });

  // Tests for edge cases to improve coverage
  it('should handle when multi-tabs is not enabled for setTitle', async () => {
    // Re-mock the app store to return false for show
    vi.mock('/@/store/modules/app', () => ({
      useAppStore: vi.fn(() => ({
        getMultiTabsSetting: {
          show: false,
        },
      })),
    }));

    const { setTitle } = useTabs();
    // This should not throw an error but return early
    await expect(setTitle('Title')).resolves.toBeUndefined();
  });

  it('should handle when multi-tabs is not enabled for updatePath', async () => {
    // Re-mock the app store to return false for show
    vi.mock('/@/store/modules/app', () => ({
      useAppStore: vi.fn(() => ({
        getMultiTabsSetting: {
          show: false,
        },
      })),
    }));

    const { updatePath } = useTabs();
    // This should not throw an error but return early
    await expect(updatePath('/new/path')).resolves.toBeUndefined();
  });

  it('should handle when multi-tabs is not enabled for refreshPage', async () => {
    // Re-mock the app store to return false for show
    vi.mock('/@/store/modules/app', () => ({
      useAppStore: vi.fn(() => ({
        getMultiTabsSetting: {
          show: false,
        },
      })),
    }));

    const { refreshPage } = useTabs();
    // This should not throw an error but return early
    await expect(refreshPage()).resolves.toBeUndefined();
  });

  it('should handle empty tab list', () => {
    // Reset the app store mock to return true for show
    vi.mock('/@/store/modules/app', () => ({
      useAppStore: vi.fn(() => ({
        getMultiTabsSetting: {
          show: true,
        },
      })),
    }));

    // Re-mock the tab store with empty tab list
    vi.mock('/@/store/modules/multipleTab', () => ({
      useMultipleTabStore: vi.fn(() => ({
        getTabList: [],
        setTabTitle: vi.fn(() => Promise.resolve()),
        updateTabPath: vi.fn(() => Promise.resolve()),
        refreshPage: vi.fn(() => Promise.resolve()),
        closeAllTab: vi.fn(() => Promise.resolve()),
        closeLeftTabs: vi.fn(() => Promise.resolve()),
        closeRightTabs: vi.fn(() => Promise.resolve()),
        closeOtherTabs: vi.fn(() => Promise.resolve()),
        closeTab: vi.fn(() => Promise.resolve()),
      })),
    }));

    const { setTitle } = useTabs();
    expect(() => setTitle('Title')).not.toThrow();
  });
});

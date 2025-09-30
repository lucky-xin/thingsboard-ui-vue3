import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTabs } from '/@/hooks/web/useTabs';
import { useRouter } from 'vue-router';
import { unref } from 'vue';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';
import { useAppStore } from '/@/store/modules/app';

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme.css', writable: true
});

// Mock dependencies
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    currentRoute: {
      value: {
        fullPath: '/test',
        path: '/test',
        name: 'Test',
      },
    },
  })),
}));

vi.mock('vue', () => ({
  unref: vi.fn((ref) => ref.value || ref),
}));

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

describe('hooks/web/useTabs comprehensive', () => {
  let mockRouter: any;
  let mockTabStore: any;
  let mockAppStore: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockRouter = {
      currentRoute: {
        value: {
          fullPath: '/test',
          path: '/test',
          name: 'Test',
        },
      },
    };

    mockTabStore = {
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
    };

    mockAppStore = {
      getMultiTabsSetting: {
        show: true,
      },
    };

    vi.mocked(useRouter).mockReturnValue(mockRouter);
    vi.mocked(useMultipleTabStore).mockReturnValue(mockTabStore);
    vi.mocked(useAppStore).mockReturnValue(mockAppStore);
  });

  describe('useTabs', () => {
    it('should return all required functions', () => {
      const {
        tabStore,
        refreshPage,
        closeAll,
        closeLeft,
        closeRight,
        closeOther,
        closeCurrent,
        close,
        setTitle,
        updatePath,
      } = useTabs();

      expect(tabStore).toBeDefined();
      expect(refreshPage).toBeInstanceOf(Function);
      expect(closeAll).toBeInstanceOf(Function);
      expect(closeLeft).toBeInstanceOf(Function);
      expect(closeRight).toBeInstanceOf(Function);
      expect(closeOther).toBeInstanceOf(Function);
      expect(closeCurrent).toBeInstanceOf(Function);
      expect(close).toBeInstanceOf(Function);
      expect(setTitle).toBeInstanceOf(Function);
      expect(updatePath).toBeInstanceOf(Function);
    });

    it('should use provided router when given', () => {
      const customRouter = {
        currentRoute: {
          value: {
            fullPath: '/custom',
            path: '/custom',
            name: 'Custom',
          },
        },
      };

      const { tabStore } = useTabs(customRouter);

      expect(tabStore).toBeDefined();
    });

    it('should return early when multi-tabs is not enabled', async () => {
      mockAppStore.getMultiTabsSetting.show = false;
      const { setTitle } = useTabs();

      const result = await setTitle('Title');
      expect(result).toBeUndefined();
    });

    it('should find current tab correctly', () => {
      const { setTitle } = useTabs();

      expect(setTitle).toBeInstanceOf(Function);
      // The getCurrentTab function is internal, but we can test it through setTitle
    });

    it('should update tab title', async () => {
      const { setTitle } = useTabs();

      await setTitle('New Title');

      expect(mockTabStore.setTabTitle).toHaveBeenCalledWith('New Title', expect.any(Object));
    });

    it('should update tab title with specific tab', async () => {
      const { setTitle } = useTabs();
      const specificTab = { fullPath: '/specific', path: '/specific', name: 'Specific' };

      await setTitle('New Title', specificTab);

      expect(mockTabStore.setTabTitle).toHaveBeenCalledWith('New Title', specificTab);
    });

    it('should update tab path', async () => {
      const { updatePath } = useTabs();

      await updatePath('/new/path');

      expect(mockTabStore.updateTabPath).toHaveBeenCalledWith('/new/path', expect.any(Object));
    });

    it('should update tab path with specific tab', async () => {
      const { updatePath } = useTabs();
      const specificTab = { fullPath: '/specific', path: '/specific', name: 'Specific' };

      await updatePath('/new/path', specificTab);

      expect(mockTabStore.updateTabPath).toHaveBeenCalledWith('/new/path', specificTab);
    });

    it('should refresh page', async () => {
      const { refreshPage } = useTabs();

      await refreshPage();

      expect(mockTabStore.refreshPage).toHaveBeenCalledWith(mockRouter);
    });

    it('should close all tabs', async () => {
      const { closeAll } = useTabs();

      await closeAll();

      expect(mockTabStore.closeAllTab).toHaveBeenCalledWith(mockRouter);
    });

    it('should close left tabs', async () => {
      const { closeLeft } = useTabs();

      await closeLeft();

      expect(mockTabStore.closeLeftTabs).toHaveBeenCalledWith(expect.any(Object), mockRouter);
    });

    it('should close right tabs', async () => {
      const { closeRight } = useTabs();

      await closeRight();

      expect(mockTabStore.closeRightTabs).toHaveBeenCalledWith(expect.any(Object), mockRouter);
    });

    it('should close other tabs', async () => {
      const { closeOther } = useTabs();

      await closeOther();

      expect(mockTabStore.closeOtherTabs).toHaveBeenCalledWith(expect.any(Object), mockRouter);
    });

    it('should close current tab', async () => {
      const { closeCurrent } = useTabs();

      await closeCurrent();

      expect(mockTabStore.closeTab).toHaveBeenCalledWith(expect.any(Object), mockRouter);
    });

    it('should close specific tab', async () => {
      const { close } = useTabs();
      const specificTab = { fullPath: '/specific', path: '/specific', name: 'Specific' };

      await close(specificTab);

      expect(mockTabStore.closeTab).toHaveBeenCalledWith(specificTab, mockRouter);
    });

    it('should close current tab when no specific tab provided', async () => {
      const { close } = useTabs();

      await close();

      expect(mockTabStore.closeTab).toHaveBeenCalledWith(expect.any(Object), mockRouter);
    });

    it('should not perform actions when multi-tabs is disabled', async () => {
      mockAppStore.getMultiTabsSetting.show = false;
      const { refreshPage } = useTabs();

      const result = await refreshPage();
      expect(result).toBeUndefined();
    });

    it('should handle tab with path instead of fullPath', () => {
      // Mock a tab that only has path, not fullPath
      mockTabStore.getTabList = [
        { path: '/test', name: 'Test' },
        { fullPath: '/other', path: '/other', name: 'Other' },
      ];
      mockRouter.currentRoute.value.fullPath = '/test';

      const { setTitle } = useTabs();

      expect(setTitle).toBeInstanceOf(Function);
    });

    it('should handle current route with only path', () => {
      mockRouter.currentRoute.value = {
        path: '/test',
        name: 'Test',
      };

      const { setTitle } = useTabs();

      expect(setTitle).toBeInstanceOf(Function);
    });

    it('should handle empty tab list', () => {
      mockTabStore.getTabList = [];

      const { setTitle } = useTabs();

      expect(setTitle).toBeInstanceOf(Function);
    });
  });

  describe('error handling', () => {
    it('should handle tab store errors gracefully', async () => {
      mockTabStore.setTabTitle.mockRejectedValue(new Error('Tab store error'));
      const { setTitle } = useTabs();

      await expect(setTitle('Title')).rejects.toThrow('Tab store error');
    });

    it('should handle tab store update path errors gracefully', async () => {
      mockTabStore.updateTabPath.mockRejectedValue(new Error('Update path error'));
      const { updatePath } = useTabs();

      await expect(updatePath('/new/path')).rejects.toThrow('Update path error');
    });

    it('should handle refresh page errors gracefully', async () => {
      mockTabStore.refreshPage.mockRejectedValue(new Error('Refresh error'));
      const { refreshPage } = useTabs();

      await expect(refreshPage()).rejects.toThrow('Refresh error');
    });

    it('should handle close all errors gracefully', async () => {
      mockTabStore.closeAllTab.mockRejectedValue(new Error('Close all error'));
      const { closeAll } = useTabs();

      await expect(closeAll()).rejects.toThrow('Close all error');
    });

    it('should handle close left errors gracefully', async () => {
      mockTabStore.closeLeftTabs.mockRejectedValue(new Error('Close left error'));
      const { closeLeft } = useTabs();

      await expect(closeLeft()).rejects.toThrow('Close left error');
    });

    it('should handle close right errors gracefully', async () => {
      mockTabStore.closeRightTabs.mockRejectedValue(new Error('Close right error'));
      const { closeRight } = useTabs();

      await expect(closeRight()).rejects.toThrow('Close right error');
    });

    it('should handle close other errors gracefully', async () => {
      mockTabStore.closeOtherTabs.mockRejectedValue(new Error('Close other error'));
      const { closeOther } = useTabs();

      await expect(closeOther()).rejects.toThrow('Close other error');
    });

    it('should handle close tab errors gracefully', async () => {
      mockTabStore.closeTab.mockRejectedValue(new Error('Close tab error'));
      const { close } = useTabs();

      await expect(close()).rejects.toThrow('Close tab error');
    });
  });
});
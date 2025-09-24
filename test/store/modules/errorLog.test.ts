import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useErrorLogStore, useErrorLogStoreWithOut } from '/@/store/modules/errorLog';
import projectSetting from '/@/settings/projectSetting';

// Remove the store mock to use the actual Pinia instance from setup

// Mock the date util
vi.mock('/@/utils/dateUtil', () => ({
  formatToDateTime: () => '2023-01-01 12:00:00',
}));

// Mock project settings
vi.mock('/@/settings/projectSetting', async () => {
  const actual = await vi.importActual('/@/settings/projectSetting');
  return {
    ...actual,
    default: {
      ...actual.default,
      useErrorHandle: true,
    },
  };
});

// Mock the error enum
vi.mock('/@/enums/exceptionEnum', () => ({
  ErrorTypeEnum: {
    AJAX: 'AJAX',
  },
}));

describe('store/modules/errorLog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the store state between tests
    const store = useErrorLogStore();
    store.$reset();
  });

  describe('useErrorLogStore', () => {
    it('should create error log store', () => {
      const store = useErrorLogStore();
      expect(store).toBeDefined();
    });

    it('should have initial state', () => {
      const store = useErrorLogStore();
      expect(store.getErrorLogInfoList).toEqual([]);
      expect(store.getErrorLogListCount).toBe(0);
    });

    it('should add error log info', () => {
      const store = useErrorLogStore();
      const errorInfo = {
        message: 'Test error',
        type: 'AJAX',
        name: 'TestError',
        file: 'test.js',
        stack: 'Error stack',
        detail: 'Error details',
      };

      store.addErrorLogInfo(errorInfo);

      expect(store.getErrorLogInfoList).toHaveLength(1);
      expect(store.getErrorLogListCount).toBe(1);
      expect(store.getErrorLogInfoList[0]).toMatchObject(errorInfo);
    });

    it('should set error log list count', () => {
      const store = useErrorLogStore();

      store.setErrorLogListCount(5);

      expect(store.getErrorLogListCount).toBe(5);
    });

    it('should add ajax error info', () => {
      const store = useErrorLogStore();
      const error = {
        message: 'Ajax error',
        response: {
          config: {
            url: '/api/test',
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
          },
          data: { error: 'Not found' },
        },
      };

      store.addAjaxErrorInfo(error);

      expect(store.getErrorLogInfoList).toHaveLength(1);
      expect(store.getErrorLogListCount).toBe(1);
    });

    it('should not add ajax error info when error handling is disabled', () => {
      // Spy on projectSetting to temporarily change useErrorHandle to false
      const projectSettingMock = vi.spyOn(projectSetting, 'useErrorHandle', 'get');
      projectSettingMock.mockReturnValue(false);

      const store = useErrorLogStore();
      const error = {
        message: 'Ajax error',
      };

      store.addAjaxErrorInfo(error);

      expect(store.getErrorLogInfoList).toHaveLength(0);
      expect(store.getErrorLogListCount).toBe(0);

      // Restore the mock
      projectSettingMock.mockRestore();
    });
  });

  describe('useErrorLogStoreWithOut', () => {
    it('should return error log store', () => {
      const store = useErrorLogStoreWithOut();
      expect(store).toBeDefined();
    });
  });
});

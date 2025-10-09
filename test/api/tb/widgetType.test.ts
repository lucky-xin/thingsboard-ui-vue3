import { describe, it, expect, vi } from 'vitest';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    postJson: vi.fn(),
    delete: vi.fn(),
  },
}));

import {
  getWidgetTypeById,
  getWidgetTypeInfoById,
  saveWidgetType,
  deleteWidgetType,
  getWidgetTypeList,
  getBundleWidgetTypeListByBundleAlias,
  getBundleWidgetTypesDetailListByBundleAlias,
  getBundleWidgetTypes,
  getBundleWidgetTypesDetails,
  getBundleWidgetTypeFqns,
  getBundleWidgetTypesInfosByBundleAlias,
  getBundleWidgetTypesInfos,
  getWidgetTypeByBundleAliasAndTypeAlias,
  getWidgetType,
} from '/@/api/tb/widgetType';
import { defHttp } from '/@/utils/http/axios';

const mockDefHttp = defHttp as any;

describe('api/tb/widgetType', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getWidgetTypeById', () => {
    it('should call defHttp.get with inlineImages true', async () => {
      const widgetTypeId = 'widget123';
      const mockResponse = { id: widgetTypeId, name: 'Test Widget' };
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getWidgetTypeById(widgetTypeId, true);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: `/api/widgetType/${widgetTypeId}`,
        params: { inlineImages: true },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call defHttp.get with inlineImages false', async () => {
      const widgetTypeId = 'widget123';
      const mockResponse = { id: widgetTypeId, name: 'Test Widget' };
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getWidgetTypeById(widgetTypeId, false);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: `/api/widgetType/${widgetTypeId}`,
        params: { inlineImages: false },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call defHttp.get without inlineImages parameter', async () => {
      const widgetTypeId = 'widget123';
      const mockResponse = { id: widgetTypeId, name: 'Test Widget' };
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getWidgetTypeById(widgetTypeId);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: `/api/widgetType/${widgetTypeId}`,
        params: { inlineImages: undefined },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getWidgetTypeInfoById', () => {
    it('should call defHttp.get with correct parameters', async () => {
      const widgetTypeId = 'widget123';
      const mockResponse = { id: widgetTypeId, name: 'Test Widget Info' };
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getWidgetTypeInfoById(widgetTypeId);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: `/api/widgetTypeInfo/${widgetTypeId}`,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveWidgetType', () => {
    it('should call defHttp.postJson with updateExistingByFqn true', async () => {
      const widgetData = { name: 'Test Widget', widgetType: 'chart' };
      const mockResponse = { id: '1', ...widgetData };
      mockDefHttp.postJson.mockResolvedValue(mockResponse);

      const result = await saveWidgetType(widgetData, true);

      expect(mockDefHttp.postJson).toHaveBeenCalledWith({
        url: '/api/widgetType/',
        data: widgetData,
        params: { updateExistingByFqn: true },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call defHttp.postJson with updateExistingByFqn false', async () => {
      const widgetData = { name: 'Test Widget', widgetType: 'chart' };
      const mockResponse = { id: '1', ...widgetData };
      mockDefHttp.postJson.mockResolvedValue(mockResponse);

      const result = await saveWidgetType(widgetData, false);

      expect(mockDefHttp.postJson).toHaveBeenCalledWith({
        url: '/api/widgetType/',
        data: widgetData,
        params: { updateExistingByFqn: false },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call defHttp.postJson without updateExistingByFqn parameter', async () => {
      const widgetData = { name: 'Test Widget', widgetType: 'chart' };
      const mockResponse = { id: '1', ...widgetData };
      mockDefHttp.postJson.mockResolvedValue(mockResponse);

      const result = await saveWidgetType(widgetData);

      expect(mockDefHttp.postJson).toHaveBeenCalledWith({
        url: '/api/widgetType/',
        data: widgetData,
        params: { updateExistingByFqn: undefined },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteWidgetType', () => {
    it('should call defHttp.delete with correct widgetTypeId', async () => {
      const widgetTypeId = 'widget123';
      mockDefHttp.delete.mockResolvedValue(undefined);

      const result = await deleteWidgetType(widgetTypeId);

      expect(mockDefHttp.delete).toHaveBeenCalledWith({
        url: `/api/widgetType/${widgetTypeId}`,
      });
      expect(result).toBeUndefined();
    });
  });

  describe('getWidgetTypeList', () => {
    it('should call defHttp.get with correct parameters', async () => {
      const params = { page: 1, size: 10 };
      const mockResponse = { data: [], totalElements: 0 };
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getWidgetTypeList(params);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/widgetTypes',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getBundleWidgetTypeListByBundleAlias', () => {
    it('should call defHttp.get with correct parameters', async () => {
      const params = { isSystem: true, bundleAlias: 'charts' };
      const mockResponse = [{ id: '1', name: 'Chart Widget' }];
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getBundleWidgetTypeListByBundleAlias(params);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/widgetTypes',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getBundleWidgetTypesDetailListByBundleAlias', () => {
    it('should call defHttp.get with correct parameters', async () => {
      const params = { isSystem: false, bundleAlias: 'custom' };
      const mockResponse = [{ id: '1', name: 'Custom Widget', description: 'Custom widget' }];
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getBundleWidgetTypesDetailListByBundleAlias(params);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/widgetTypesDetails',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getBundleWidgetTypes', () => {
    it('should call defHttp.get with correct widgetsBundleId', async () => {
      const widgetsBundleId = 'bundle123';
      const mockResponse = [{ id: '1', name: 'Widget 1' }];
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getBundleWidgetTypes(widgetsBundleId);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/widgetTypes',
        params: { widgetsBundleId: widgetsBundleId },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getBundleWidgetTypesDetails', () => {
    it('should call defHttp.get with inlineImages true', async () => {
      const widgetsBundleId = 'bundle123';
      const mockResponse = [{ id: '1', name: 'Widget Detail' }];
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getBundleWidgetTypesDetails(widgetsBundleId, true);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/widgetTypesDetails',
        params: { widgetsBundleId: widgetsBundleId, inlineImages: true },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call defHttp.get with inlineImages false', async () => {
      const widgetsBundleId = 'bundle123';
      const mockResponse = [{ id: '1', name: 'Widget Detail' }];
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getBundleWidgetTypesDetails(widgetsBundleId, false);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/widgetTypesDetails',
        params: { widgetsBundleId: widgetsBundleId, inlineImages: false },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call defHttp.get without inlineImages parameter', async () => {
      const widgetsBundleId = 'bundle123';
      const mockResponse = [{ id: '1', name: 'Widget Detail' }];
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getBundleWidgetTypesDetails(widgetsBundleId);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/widgetTypesDetails',
        params: { widgetsBundleId: widgetsBundleId, inlineImages: undefined },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getBundleWidgetTypeFqns', () => {
    it('should call defHttp.get with correct widgetsBundleId', async () => {
      const widgetsBundleId = 'bundle123';
      const mockResponse = ['widget1.fqn', 'widget2.fqn'];
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getBundleWidgetTypeFqns(widgetsBundleId);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/widgetTypeFqns',
        params: { widgetsBundleId: widgetsBundleId },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getBundleWidgetTypesInfosByBundleAlias', () => {
    it('should call defHttp.get with correct parameters', async () => {
      const params = { isSystem: true, bundleAlias: 'system' };
      const mockResponse = [{ id: '1', name: 'System Widget' }];
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getBundleWidgetTypesInfosByBundleAlias(params);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/widgetTypesInfos',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getBundleWidgetTypesInfos', () => {
    it('should call defHttp.get with correct parameters', async () => {
      const params = { page: 1, size: 10 };
      const mockResponse = { data: [], totalElements: 0 };
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getBundleWidgetTypesInfos(params);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/widgetTypesInfos',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getWidgetTypeByBundleAliasAndTypeAlias', () => {
    it('should call defHttp.get with correct parameters', async () => {
      const params = { isSystem: false, bundleAlias: 'custom', alias: 'chart' };
      const mockResponse = { id: '1', name: 'Custom Chart' };
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getWidgetTypeByBundleAliasAndTypeAlias(params);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/widgetType',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getWidgetType', () => {
    it('should call defHttp.get with correct fqn', async () => {
      const fqn = 'com.example.widget';
      const mockResponse = { id: '1', fqn: fqn, name: 'Example Widget' };
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getWidgetType(fqn);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/widgetType',
        params: { fqn: fqn },
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
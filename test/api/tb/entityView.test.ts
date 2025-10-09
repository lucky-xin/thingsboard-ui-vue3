import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getEntityViewById,
  getEntityViewInfoById,
  geTenantEntityView,
  assignEntityViewToCustomer,
  assignEntityViewToPublicCustomer,
  unAssignEntityViewFromCustomer,
  assignEntityViewToEdge,
  unAssignEntityViewFromEdge,
  getEdgeEntityViews,
  getCustomerEntityViews,
  getCustomerEntityViewInfos,
  getTenantEntityViews,
  getTenantEntityViewInfos,
  findEntityViewByQuery,
  getEntityViewTypes,
  saveEntityView,
  deleteEntityView,
} from '/@/api/tb/entityView';
import type {
  EntityView,
  EntityViewInfo,
  EntityViewSearchQuery,
  AttributesEntityView,
  TelemetryEntityView,
} from '/@/api/tb/entityView';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    postJson: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('api/tb/entityView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getEntityViewById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: EntityView = {
        id: 'entity-view-1',
        createdTime: 1234567890,
        entityId: 'device-1',
        tenantId: 'tenant-1',
        customerId: 'customer-1',
        name: 'Test Entity View',
        type: 'device-view',
        keys: {
          timeseries: ['temperature', 'humidity'],
          attributes: {
            cs: ['status', 'mode'],
            ss: ['location'],
            sh: ['settings'],
          },
        },
        startTimeMs: 1234567890,
        endTimeMs: 1234567899,
        externalId: 'ext-1',
        additionalInfo: { description: 'Test entity view' },
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getEntityViewById('entity-view-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/entityView/entity-view-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getEntityViewInfoById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: EntityViewInfo = {
        id: 'entity-view-1',
        createdTime: 1234567890,
        entityId: 'device-1',
        tenantId: 'tenant-1',
        customerId: 'customer-1',
        name: 'Test Entity View',
        type: 'device-view',
        keys: {
          timeseries: ['temperature'],
          attributes: {
            cs: ['status'],
            ss: ['location'],
            sh: ['settings'],
          },
        },
        customerTitle: 'Customer A',
        customerIsPublic: false,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getEntityViewInfoById('entity-view-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/entityView/info/entity-view-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('geTenantEntityView', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: EntityView = {
        id: 'entity-view-1',
        createdTime: 1234567890,
        entityId: 'device-1',
        name: 'Tenant Entity View',
        type: 'device-view',
        keys: {
          timeseries: ['temperature'],
          attributes: {
            cs: ['status'],
            ss: ['location'],
            sh: ['settings'],
          },
        },
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await geTenantEntityView('Tenant Entity View');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/tenant/entityViews',
        params: { entityViewName: 'Tenant Entity View' },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('assignEntityViewToCustomer', () => {
    it('should call defHttp.post with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: EntityView = {
        id: 'entity-view-1',
        createdTime: 1234567890,
        entityId: 'device-1',
        customerId: 'customer-1',
        name: 'Assigned Entity View',
        type: 'device-view',
        keys: {
          timeseries: ['temperature'],
          attributes: {
            cs: ['status'],
            ss: ['location'],
            sh: ['settings'],
          },
        },
      };
      vi.mocked(defHttp.post).mockResolvedValue(mockResponse);

      const result = await assignEntityViewToCustomer('customer-1', 'entity-view-1');

      expect(defHttp.post).toHaveBeenCalledWith({
        url: '/api/customer/customer-1/entityView/entity-view-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('assignEntityViewToPublicCustomer', () => {
    it('should call defHttp.post with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: EntityView = {
        id: 'entity-view-1',
        createdTime: 1234567890,
        entityId: 'device-1',
        customerId: 'public',
        name: 'Public Entity View',
        type: 'device-view',
        keys: {
          timeseries: ['temperature'],
          attributes: {
            cs: ['status'],
            ss: ['location'],
            sh: ['settings'],
          },
        },
      };
      vi.mocked(defHttp.post).mockResolvedValue(mockResponse);

      const result = await assignEntityViewToPublicCustomer('entity-view-1');

      expect(defHttp.post).toHaveBeenCalledWith({
        url: '/api/customer/public/entityView/entity-view-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('unAssignEntityViewFromCustomer', () => {
    it('should call defHttp.delete with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await unAssignEntityViewFromCustomer('entity-view-1');

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/customer/entityView/entity-view-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('assignEntityViewToEdge', () => {
    it('should call defHttp.post with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: EntityView = {
        id: 'entity-view-1',
        createdTime: 1234567890,
        entityId: 'device-1',
        name: 'Edge Entity View',
        type: 'device-view',
        keys: {
          timeseries: ['temperature'],
          attributes: {
            cs: ['status'],
            ss: ['location'],
            sh: ['settings'],
          },
        },
      };
      vi.mocked(defHttp.post).mockResolvedValue(mockResponse);

      const result = await assignEntityViewToEdge('edge-1', 'entity-view-1');

      expect(defHttp.post).toHaveBeenCalledWith({
        url: '/api/edge/edge-1/entityView/entity-view-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('unAssignEntityViewFromEdge', () => {
    it('should call defHttp.delete with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await unAssignEntityViewFromEdge('edge-1', 'entity-view-1');

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/edge/edge-1/entityView/entity-view-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getEdgeEntityViews', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'entity-view-1',
            createdTime: 1234567890,
            entityId: 'device-1',
            name: 'Edge Entity View 1',
            type: 'device-view',
            keys: {
              timeseries: ['temperature'],
              attributes: {
                cs: ['status'],
                ss: ['location'],
                sh: ['settings'],
              },
            },
          },
        ],
        hasNext: false,
        totalElements: 1,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'edge',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getEdgeEntityViews(params, 'edge-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/edge/edge-1/entityViews',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCustomerEntityViews', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'entity-view-1',
            createdTime: 1234567890,
            entityId: 'device-1',
            name: 'Customer Entity View 1',
            type: 'device-view',
            keys: {
              timeseries: ['temperature'],
              attributes: {
                cs: ['status'],
                ss: ['location'],
                sh: ['settings'],
              },
            },
          },
        ],
        hasNext: false,
        totalElements: 1,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'customer',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getCustomerEntityViews(params, 'customer-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/customer/customer-1/entityViews',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCustomerEntityViewInfos', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'entity-view-1',
            createdTime: 1234567890,
            entityId: 'device-1',
            name: 'Customer Entity View Info 1',
            type: 'device-view',
            keys: {
              timeseries: ['temperature'],
              attributes: {
                cs: ['status'],
                ss: ['location'],
                sh: ['settings'],
              },
            },
            customerTitle: 'Customer A',
            customerIsPublic: false,
          },
        ],
        hasNext: false,
        totalElements: 1,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'customer',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getCustomerEntityViewInfos(params, 'customer-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/customer/customer-1/entityViewInfos',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTenantEntityViews', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'entity-view-1',
            createdTime: 1234567890,
            entityId: 'device-1',
            name: 'Tenant Entity View 1',
            type: 'device-view',
            keys: {
              timeseries: ['temperature'],
              attributes: {
                cs: ['status'],
                ss: ['location'],
                sh: ['settings'],
              },
            },
          },
        ],
        hasNext: false,
        totalElements: 1,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'tenant',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getTenantEntityViews(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/tenant/entityViews',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTenantEntityViewInfos', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'entity-view-1',
            createdTime: 1234567890,
            entityId: 'device-1',
            name: 'Tenant Entity View Info 1',
            type: 'device-view',
            keys: {
              timeseries: ['temperature'],
              attributes: {
                cs: ['status'],
                ss: ['location'],
                sh: ['settings'],
              },
            },
            customerTitle: 'Customer A',
            customerIsPublic: false,
          },
        ],
        hasNext: false,
        totalElements: 1,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'tenant',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getTenantEntityViewInfos(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/tenant/entityViewInfos',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findEntityViewByQuery', () => {
    it('should call defHttp.postJson with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = [
        {
          id: 'entity-view-1',
          createdTime: 1234567890,
          entityId: 'device-1',
          name: 'Query Entity View 1',
          type: 'device-view',
          keys: {
            timeseries: ['temperature'],
            attributes: {
              cs: ['status'],
              ss: ['location'],
              sh: ['settings'],
            },
          },
          customerTitle: 'Customer A',
          customerIsPublic: false,
        },
      ];
      const testData: EntityViewSearchQuery = {
        parameters: {
          rootId: 'root-1',
          rootType: 'DEVICE' as any,
          direction: 'FROM',
          relationTypeGroup: 'COMMON' as any,
          maxLevel: 2,
          fetchLastLevelOnly: false,
        },
        relationType: 'CONTAINS',
        entityViewTypes: ['device-view', 'asset-view'],
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await findEntityViewByQuery(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/entityViews',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = [{ id: 'entity-view-1', name: 'Test Entity View' }];
      const testData = { search: 'test', types: ['device-view'] };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await findEntityViewByQuery(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/entityViews',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getEntityViewTypes', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = [
        {
          tenantId: 'tenant-1',
          entityType: 'ENTITY_VIEW' as any,
          type: 'device-view',
        },
        {
          tenantId: 'tenant-1',
          entityType: 'ENTITY_VIEW' as any,
          type: 'asset-view',
        },
      ];
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getEntityViewTypes();

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/entityView/types',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveEntityView', () => {
    it('should call defHttp.postJson with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: EntityView = {
        id: 'entity-view-1',
        createdTime: 1234567890,
        entityId: 'device-1',
        tenantId: 'tenant-1',
        customerId: 'customer-1',
        name: 'Test Entity View',
        type: 'device-view',
        keys: {
          timeseries: ['temperature', 'humidity'],
          attributes: {
            cs: ['status', 'mode'],
            ss: ['location'],
            sh: ['settings'],
          },
        },
        startTimeMs: 1234567890,
        endTimeMs: 1234567899,
        externalId: 'ext-1',
        additionalInfo: { description: 'Test entity view' },
      };
      const testData: EntityView = {
        id: 'entity-view-1',
        createdTime: 1234567890,
        entityId: 'device-1',
        tenantId: 'tenant-1',
        customerId: 'customer-1',
        name: 'Test Entity View',
        type: 'device-view',
        keys: {
          timeseries: ['temperature', 'humidity'],
          attributes: {
            cs: ['status', 'mode'],
            ss: ['location'],
            sh: ['settings'],
          },
        },
        startTimeMs: 1234567890,
        endTimeMs: 1234567899,
        externalId: 'ext-1',
        additionalInfo: { description: 'Test entity view' },
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveEntityView(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/entityView',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { name: 'New Entity View', type: 'device-view' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveEntityView(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/entityView',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteEntityView', () => {
    it('should call defHttp.delete with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await deleteEntityView('entity-view-1');

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/entityView/entity-view-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Type definitions', () => {
    it('should create AttributesEntityView object', () => {
      const attributesEntityView: AttributesEntityView = {
        cs: ['status', 'mode', 'settings'],
        ss: ['location', 'region'],
        sh: ['config', 'preferences'],
      };

      expect(attributesEntityView.cs).toEqual(['status', 'mode', 'settings']);
      expect(attributesEntityView.ss).toEqual(['location', 'region']);
      expect(attributesEntityView.sh).toEqual(['config', 'preferences']);
    });

    it('should create TelemetryEntityView object', () => {
      const telemetryEntityView: TelemetryEntityView = {
        timeseries: ['temperature', 'humidity', 'pressure'],
        attributes: {
          cs: ['status', 'mode'],
          ss: ['location'],
          sh: ['settings'],
        },
      };

      expect(telemetryEntityView.timeseries).toEqual(['temperature', 'humidity', 'pressure']);
      expect(telemetryEntityView.attributes.cs).toEqual(['status', 'mode']);
      expect(telemetryEntityView.attributes.ss).toEqual(['location']);
      expect(telemetryEntityView.attributes.sh).toEqual(['settings']);
    });

    it('should create EntityView object with all fields', () => {
      const entityView: EntityView = {
        id: 'entity-view-1',
        createdTime: 1234567890,
        entityId: 'device-1',
        tenantId: 'tenant-1',
        customerId: 'customer-1',
        name: 'Test Entity View',
        type: 'device-view',
        keys: {
          timeseries: ['temperature', 'humidity'],
          attributes: {
            cs: ['status', 'mode'],
            ss: ['location'],
            sh: ['settings'],
          },
        },
        startTimeMs: 1234567890,
        endTimeMs: 1234567899,
        externalId: 'ext-1',
        additionalInfo: { description: 'Test entity view' },
      };

      expect(entityView.id).toBe('entity-view-1');
      expect(entityView.createdTime).toBe(1234567890);
      expect(entityView.entityId).toBe('device-1');
      expect(entityView.tenantId).toBe('tenant-1');
      expect(entityView.customerId).toBe('customer-1');
      expect(entityView.name).toBe('Test Entity View');
      expect(entityView.type).toBe('device-view');
      expect(entityView.keys.timeseries).toEqual(['temperature', 'humidity']);
      expect(entityView.keys.attributes.cs).toEqual(['status', 'mode']);
      expect(entityView.keys.attributes.ss).toEqual(['location']);
      expect(entityView.keys.attributes.sh).toEqual(['settings']);
      expect(entityView.startTimeMs).toBe(1234567890);
      expect(entityView.endTimeMs).toBe(1234567899);
      expect(entityView.externalId).toBe('ext-1');
      expect(entityView.additionalInfo).toEqual({ description: 'Test entity view' });
    });

    it('should create EntityViewInfo object', () => {
      const entityViewInfo: EntityViewInfo = {
        id: 'entity-view-1',
        createdTime: 1234567890,
        entityId: 'device-1',
        tenantId: 'tenant-1',
        customerId: 'customer-1',
        name: 'Test Entity View Info',
        type: 'device-view',
        keys: {
          timeseries: ['temperature'],
          attributes: {
            cs: ['status'],
            ss: ['location'],
            sh: ['settings'],
          },
        },
        customerTitle: 'Customer A',
        customerIsPublic: false,
      };

      expect(entityViewInfo.id).toBe('entity-view-1');
      expect(entityViewInfo.createdTime).toBe(1234567890);
      expect(entityViewInfo.entityId).toBe('device-1');
      expect(entityViewInfo.tenantId).toBe('tenant-1');
      expect(entityViewInfo.customerId).toBe('customer-1');
      expect(entityViewInfo.name).toBe('Test Entity View Info');
      expect(entityViewInfo.type).toBe('device-view');
      expect(entityViewInfo.keys.timeseries).toEqual(['temperature']);
      expect(entityViewInfo.keys.attributes.cs).toEqual(['status']);
      expect(entityViewInfo.keys.attributes.ss).toEqual(['location']);
      expect(entityViewInfo.keys.attributes.sh).toEqual(['settings']);
      expect(entityViewInfo.customerTitle).toBe('Customer A');
      expect(entityViewInfo.customerIsPublic).toBe(false);
    });

    it('should create EntityViewSearchQuery object', () => {
      const entityViewSearchQuery: EntityViewSearchQuery = {
        parameters: {
          rootId: 'root-1',
          rootType: 'DEVICE' as any,
          direction: 'FROM',
          relationTypeGroup: 'COMMON' as any,
          maxLevel: 3,
          fetchLastLevelOnly: true,
        },
        relationType: 'CONTAINS',
        entityViewTypes: ['device-view', 'asset-view', 'customer-view'],
      };

      expect(entityViewSearchQuery.parameters?.rootId).toBe('root-1');
      expect(entityViewSearchQuery.parameters?.rootType).toBe('DEVICE');
      expect(entityViewSearchQuery.parameters?.direction).toBe('FROM');
      expect(entityViewSearchQuery.parameters?.relationTypeGroup).toBe('COMMON');
      expect(entityViewSearchQuery.parameters?.maxLevel).toBe(3);
      expect(entityViewSearchQuery.parameters?.fetchLastLevelOnly).toBe(true);
      expect(entityViewSearchQuery.relationType).toBe('CONTAINS');
      expect(entityViewSearchQuery.entityViewTypes).toEqual(['device-view', 'asset-view', 'customer-view']);
    });
  });
});
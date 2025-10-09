import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  saveRelation,
  deleteRelation,
  deleteRelations,
  getRelation,
  findRelationListByFrom,
  findRelationListByFromAndType,
  findRelationInfoListByFrom,
  findRelationListByTo,
  findRelationListByToAndType,
  findRelationInfoListByTo,
  findRelationByQuery,
  findRelationInfoByQuery,
} from '/@/api/tb/relation';
import type {
  EntityRelation,
  EntityRelationInfo,
  RelationParams,
  EntityRelationsQuery,
} from '/@/api/tb/relation';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    postJson: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock RelationTypeGroup enum
vi.mock('/@/enums/relationEnum', () => ({
  RelationTypeGroup: {
    COMMON: 'COMMON',
    ALARM: 'ALARM',
    DASHBOARD: 'DASHBOARD',
    RULE_CHAIN: 'RULE_CHAIN',
    RULE_NODE: 'RULE_NODE',
    USER: 'USER',
    TENANT: 'TENANT',
    CUSTOMER: 'CUSTOMER',
    ASSET: 'ASSET',
    DEVICE: 'DEVICE',
    ENTITY_VIEW: 'ENTITY_VIEW',
    WIDGETS_BUNDLE: 'WIDGETS_BUNDLE',
    WIDGET_TYPE: 'WIDGET_TYPE',
    TENANT_PROFILE: 'TENANT_PROFILE',
    API_USAGE_STATE: 'API_USAGE_STATE',
    TB_RESOURCE: 'TB_RESOURCE',
    OTA_PACKAGE: 'OTA_PACKAGE',
    EDGE: 'EDGE',
    USER_SETTINGS: 'USER_SETTINGS',
    MOBILE_APP: 'MOBILE_APP',
    QUEUE: 'QUEUE',
    NOTIFICATION_TARGET: 'NOTIFICATION_TARGET',
    NOTIFICATION_TEMPLATE: 'NOTIFICATION_TEMPLATE',
    NOTIFICATION_REQUEST: 'NOTIFICATION_REQUEST',
    NOTIFICATION_RULE: 'NOTIFICATION_RULE',
  },
}));

describe('api/tb/relation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('saveRelation', () => {
    it('should call defHttp.postJson with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: EntityRelation = {
        from: 'device-1',
        to: 'asset-1',
        type: 'Contains',
        typeGroup: 'COMMON' as any,
        additionalInfo: {
          description: 'Device is contained in asset',
          createdBy: 'user-1',
        },
      };
      const testData: EntityRelation = {
        from: 'device-1',
        to: 'asset-1',
        type: 'Contains',
        typeGroup: 'COMMON' as any,
        additionalInfo: {
          description: 'Device is contained in asset',
          createdBy: 'user-1',
        },
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveRelation(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/relation',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { from: 'device-1', to: 'asset-1', type: 'Contains' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveRelation(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/relation',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteRelation', () => {
    it('should call defHttp.delete with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      const params: RelationParams = {
        fromId: 'device-1',
        fromType: 'DEVICE' as any,
        toId: 'asset-1',
        toType: 'ASSET' as any,
        relationType: 'Contains',
        relationTypeGroup: 'COMMON',
      };
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await deleteRelation(params);

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/relation',
        params,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle params without relationTypeGroup', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      const params: RelationParams = {
        fromId: 'device-1',
        fromType: 'DEVICE' as any,
        toId: 'asset-1',
        toType: 'ASSET' as any,
        relationType: 'Contains',
      };
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await deleteRelation(params);

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/relation',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteRelations', () => {
    it('should call defHttp.delete with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      const params = {
        entityId: 'device-1',
        entityType: 'DEVICE' as any,
      };
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await deleteRelations(params);

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/relations',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getRelation', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: EntityRelation = {
        from: 'device-1',
        to: 'asset-1',
        type: 'Contains',
        typeGroup: 'COMMON' as any,
        additionalInfo: {
          description: 'Device is contained in asset',
        },
      };
      const params: RelationParams = {
        fromId: 'device-1',
        fromType: 'DEVICE' as any,
        toId: 'asset-1',
        toType: 'ASSET' as any,
        relationType: 'Contains',
        relationTypeGroup: 'COMMON',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getRelation(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/relation',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findRelationListByFrom', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: EntityRelation[] = [
        {
          from: 'device-1',
          to: 'asset-1',
          type: 'Contains',
          typeGroup: 'COMMON' as any,
          additionalInfo: {
            description: 'Device is contained in asset',
          },
        },
        {
          from: 'device-1',
          to: 'customer-1',
          type: 'Owns',
          typeGroup: 'COMMON' as any,
          additionalInfo: {
            description: 'Customer owns device',
          },
        },
      ];
      const params = {
        fromId: 'device-1',
        fromType: 'DEVICE' as any,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await findRelationListByFrom(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/relations',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findRelationListByFromAndType', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: EntityRelation[] = [
        {
          from: 'device-1',
          to: 'asset-1',
          type: 'Contains',
          typeGroup: 'COMMON' as any,
          additionalInfo: {
            description: 'Device is contained in asset',
          },
        },
      ];
      const params = {
        fromId: 'device-1',
        fromType: 'DEVICE' as any,
        relationType: 'Contains',
        relationTypeGroup: 'COMMON',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await findRelationListByFromAndType(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/relations',
        params,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle params without relationTypeGroup', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: EntityRelation[] = [];
      const params = {
        fromId: 'device-1',
        fromType: 'DEVICE' as any,
        relationType: 'Contains',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await findRelationListByFromAndType(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/relations',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findRelationInfoListByFrom', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: EntityRelationInfo[] = [
        {
          from: 'device-1',
          to: 'asset-1',
          type: 'Contains',
          typeGroup: 'COMMON' as any,
          fromName: 'Device 1',
          toName: 'Asset 1',
          additionalInfo: {
            description: 'Device is contained in asset',
          },
        },
      ];
      const params = {
        fromId: 'device-1',
        fromType: 'DEVICE' as any,
        relationTypeGroup: 'COMMON',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await findRelationInfoListByFrom(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/relations/info',
        params,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle params without relationTypeGroup', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: EntityRelationInfo[] = [];
      const params = {
        fromId: 'device-1',
        fromType: 'DEVICE' as any,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await findRelationInfoListByFrom(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/relations/info',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findRelationListByTo', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: EntityRelation[] = [
        {
          from: 'device-1',
          to: 'asset-1',
          type: 'Contains',
          typeGroup: 'COMMON' as any,
          additionalInfo: {
            description: 'Device is contained in asset',
          },
        },
      ];
      const params = {
        toId: 'asset-1',
        toType: 'ASSET' as any,
        relationTypeGroup: 'COMMON',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await findRelationListByTo(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/relations',
        params,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle params without relationTypeGroup', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: EntityRelation[] = [];
      const params = {
        toId: 'asset-1',
        toType: 'ASSET' as any,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await findRelationListByTo(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/relations',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findRelationListByToAndType', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: EntityRelation[] = [
        {
          from: 'device-1',
          to: 'asset-1',
          type: 'Contains',
          typeGroup: 'COMMON' as any,
          additionalInfo: {
            description: 'Device is contained in asset',
          },
        },
      ];
      const params = {
        toId: 'asset-1',
        toType: 'ASSET' as any,
        relationType: 'Contains',
        relationTypeGroup: 'COMMON',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await findRelationListByToAndType(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/relations',
        params,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle params without relationTypeGroup', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: EntityRelation[] = [];
      const params = {
        toId: 'asset-1',
        toType: 'ASSET' as any,
        relationType: 'Contains',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await findRelationListByToAndType(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/relations',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findRelationInfoListByTo', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: EntityRelationInfo[] = [
        {
          from: 'device-1',
          to: 'asset-1',
          type: 'Contains',
          typeGroup: 'COMMON' as any,
          fromName: 'Device 1',
          toName: 'Asset 1',
          additionalInfo: {
            description: 'Device is contained in asset',
          },
        },
      ];
      const params = {
        toId: 'asset-1',
        toType: 'ASSET' as any,
        relationTypeGroup: 'COMMON',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await findRelationInfoListByTo(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/relations/info',
        params,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle params without relationTypeGroup', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: EntityRelationInfo[] = [];
      const params = {
        toId: 'asset-1',
        toType: 'ASSET' as any,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await findRelationInfoListByTo(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/relations/info',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findRelationByQuery', () => {
    it('should call defHttp.postJson with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: EntityRelation = {
        from: 'device-1',
        to: 'asset-1',
        type: 'Contains',
        typeGroup: 'COMMON' as any,
        additionalInfo: {
          description: 'Device is contained in asset',
        },
      };
      const testData: EntityRelationsQuery = {
        parameters: {
          rootId: 'device-1',
          rootType: 'DEVICE' as any,
          direction: 'FROM' as any,
          maxLevel: 1,
          fetchLastLevelOnly: false,
        },
        filters: [
          {
            relationTyp: 'Contains',
            entityTypes: ['ASSET' as any],
          },
        ],
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await findRelationByQuery(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/relations',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { rootId: 'device-1', rootType: 'DEVICE' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await findRelationByQuery(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/relations',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findRelationInfoByQuery', () => {
    it('should call defHttp.postJson with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: EntityRelation = {
        from: 'device-1',
        to: 'asset-1',
        type: 'Contains',
        typeGroup: 'COMMON' as any,
        additionalInfo: {
          description: 'Device is contained in asset',
        },
      };
      const testData: EntityRelationsQuery = {
        parameters: {
          rootId: 'device-1',
          rootType: 'DEVICE' as any,
          direction: 'FROM' as any,
          maxLevel: 1,
          fetchLastLevelOnly: false,
        },
        filters: [
          {
            relationTyp: 'Contains',
            entityTypes: ['ASSET' as any],
          },
        ],
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await findRelationInfoByQuery(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/relations/info',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { rootId: 'device-1', rootType: 'DEVICE' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await findRelationInfoByQuery(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/relations/info',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Type definitions', () => {
    it('should create EntityRelation object with all fields', () => {
      const entityRelation: EntityRelation = {
        from: 'device-1',
        to: 'asset-1',
        type: 'Contains',
        typeGroup: 'COMMON' as any,
        additionalInfo: {
          description: 'Device is contained in asset',
          createdBy: 'user-1',
          createdAt: '2023-01-01T00:00:00Z',
          metadata: {
            priority: 'high',
            tags: ['important', 'monitored'],
          },
        },
      };

      expect(entityRelation.from).toBe('device-1');
      expect(entityRelation.to).toBe('asset-1');
      expect(entityRelation.type).toBe('Contains');
      expect(entityRelation.typeGroup).toBe('COMMON');
      expect(entityRelation.additionalInfo?.description).toBe('Device is contained in asset');
      expect(entityRelation.additionalInfo?.createdBy).toBe('user-1');
      expect(entityRelation.additionalInfo?.createdAt).toBe('2023-01-01T00:00:00Z');
      expect(entityRelation.additionalInfo?.metadata?.priority).toBe('high');
      expect(entityRelation.additionalInfo?.metadata?.tags).toEqual(['important', 'monitored']);
    });

    it('should create EntityRelation object with minimal fields', () => {
      const entityRelation: EntityRelation = {
        from: 'device-1',
        to: 'asset-1',
        type: 'Contains',
      };

      expect(entityRelation.from).toBe('device-1');
      expect(entityRelation.to).toBe('asset-1');
      expect(entityRelation.type).toBe('Contains');
      expect(entityRelation.typeGroup).toBeUndefined();
      expect(entityRelation.additionalInfo).toBeUndefined();
    });

    it('should create EntityRelationInfo object', () => {
      const entityRelationInfo: EntityRelationInfo = {
        from: 'device-1',
        to: 'asset-1',
        type: 'Contains',
        typeGroup: 'COMMON' as any,
        fromName: 'Device 1',
        toName: 'Asset 1',
        additionalInfo: {
          description: 'Device is contained in asset',
          createdBy: 'user-1',
        },
      };

      expect(entityRelationInfo.from).toBe('device-1');
      expect(entityRelationInfo.to).toBe('asset-1');
      expect(entityRelationInfo.type).toBe('Contains');
      expect(entityRelationInfo.typeGroup).toBe('COMMON');
      expect(entityRelationInfo.fromName).toBe('Device 1');
      expect(entityRelationInfo.toName).toBe('Asset 1');
      expect(entityRelationInfo.additionalInfo?.description).toBe('Device is contained in asset');
      expect(entityRelationInfo.additionalInfo?.createdBy).toBe('user-1');
    });

    it('should create RelationParams object', () => {
      const relationParams: RelationParams = {
        fromId: 'device-1',
        fromType: 'DEVICE' as any,
        toId: 'asset-1',
        toType: 'ASSET' as any,
        relationType: 'Contains',
        relationTypeGroup: 'COMMON',
      };

      expect(relationParams.fromId).toBe('device-1');
      expect(relationParams.fromType).toBe('DEVICE');
      expect(relationParams.toId).toBe('asset-1');
      expect(relationParams.toType).toBe('ASSET');
      expect(relationParams.relationType).toBe('Contains');
      expect(relationParams.relationTypeGroup).toBe('COMMON');
    });

    it('should create RelationParams object without relationTypeGroup', () => {
      const relationParams: RelationParams = {
        fromId: 'device-1',
        fromType: 'DEVICE' as any,
        toId: 'asset-1',
        toType: 'ASSET' as any,
        relationType: 'Contains',
      };

      expect(relationParams.fromId).toBe('device-1');
      expect(relationParams.fromType).toBe('DEVICE');
      expect(relationParams.toId).toBe('asset-1');
      expect(relationParams.toType).toBe('ASSET');
      expect(relationParams.relationType).toBe('Contains');
      expect(relationParams.relationTypeGroup).toBeUndefined();
    });

    it('should create EntityRelationsQuery object', () => {
      const entityRelationsQuery: EntityRelationsQuery = {
        parameters: {
          rootId: 'device-1',
          rootType: 'DEVICE' as any,
          direction: 'FROM' as any,
          maxLevel: 2,
          fetchLastLevelOnly: true,
        },
        filters: [
          {
            relationTyp: 'Contains',
            entityTypes: ['ASSET' as any, 'CUSTOMER' as any],
          },
          {
            relationTyp: 'Owns',
            entityTypes: ['USER' as any],
          },
        ],
      };

      expect(entityRelationsQuery.parameters?.rootId).toBe('device-1');
      expect(entityRelationsQuery.parameters?.rootType).toBe('DEVICE');
      expect(entityRelationsQuery.parameters?.direction).toBe('FROM');
      expect(entityRelationsQuery.parameters?.maxLevel).toBe(2);
      expect(entityRelationsQuery.parameters?.fetchLastLevelOnly).toBe(true);
      expect(entityRelationsQuery.filters).toHaveLength(2);
      expect(entityRelationsQuery.filters?.[0]?.relationTyp).toBe('Contains');
      expect(entityRelationsQuery.filters?.[0]?.entityTypes).toEqual(['ASSET', 'CUSTOMER']);
      expect(entityRelationsQuery.filters?.[1]?.relationTyp).toBe('Owns');
      expect(entityRelationsQuery.filters?.[1]?.entityTypes).toEqual(['USER']);
    });

    it('should handle different relation type groups', () => {
      const typeGroups = [
        'COMMON',
        'ALARM',
        'DASHBOARD',
        'RULE_CHAIN',
        'RULE_NODE',
        'USER',
        'TENANT',
        'CUSTOMER',
        'ASSET',
        'DEVICE',
        'ENTITY_VIEW',
        'WIDGETS_BUNDLE',
        'WIDGET_TYPE',
        'TENANT_PROFILE',
        'API_USAGE_STATE',
        'TB_RESOURCE',
        'OTA_PACKAGE',
        'EDGE',
        'USER_SETTINGS',
        'MOBILE_APP',
        'QUEUE',
        'NOTIFICATION_TARGET',
        'NOTIFICATION_TEMPLATE',
        'NOTIFICATION_REQUEST',
        'NOTIFICATION_RULE',
      ] as const;

      typeGroups.forEach((typeGroup, index) => {
        const entityRelation: EntityRelation = {
          from: `entity-${index}`,
          to: `target-${index}`,
          type: 'TestRelation',
          typeGroup: typeGroup as any,
          additionalInfo: {
            typeGroup,
            description: `Test relation with ${typeGroup} type group`,
          },
        };

        expect(entityRelation.typeGroup).toBe(typeGroup);
        expect(entityRelation.additionalInfo?.typeGroup).toBe(typeGroup);
        expect(entityRelation.additionalInfo?.description).toBe(`Test relation with ${typeGroup} type group`);
      });
    });

    it('should handle complex relation hierarchies', () => {
      const complexRelation: EntityRelation = {
        from: 'tenant-1',
        to: 'customer-1',
        type: 'Owns',
        typeGroup: 'TENANT' as any,
        additionalInfo: {
          description: 'Tenant owns customer',
          hierarchy: {
            level: 1,
            path: ['tenant-1', 'customer-1'],
            children: [
              {
                from: 'customer-1',
                to: 'asset-1',
                type: 'Contains',
                typeGroup: 'CUSTOMER' as any,
                additionalInfo: {
                  description: 'Customer contains asset',
                  hierarchy: {
                    level: 2,
                    path: ['tenant-1', 'customer-1', 'asset-1'],
                    children: [
                      {
                        from: 'asset-1',
                        to: 'device-1',
                        type: 'Contains',
                        typeGroup: 'ASSET' as any,
                        additionalInfo: {
                          description: 'Asset contains device',
                          hierarchy: {
                            level: 3,
                            path: ['tenant-1', 'customer-1', 'asset-1', 'device-1'],
                          },
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      };

      expect(complexRelation.from).toBe('tenant-1');
      expect(complexRelation.to).toBe('customer-1');
      expect(complexRelation.type).toBe('Owns');
      expect(complexRelation.typeGroup).toBe('TENANT');
      expect(complexRelation.additionalInfo?.description).toBe('Tenant owns customer');
      expect(complexRelation.additionalInfo?.hierarchy?.level).toBe(1);
      expect(complexRelation.additionalInfo?.hierarchy?.path).toEqual(['tenant-1', 'customer-1']);
      expect(complexRelation.additionalInfo?.hierarchy?.children).toHaveLength(1);
      expect(complexRelation.additionalInfo?.hierarchy?.children?.[0]?.from).toBe('customer-1');
      expect(complexRelation.additionalInfo?.hierarchy?.children?.[0]?.to).toBe('asset-1');
      expect(complexRelation.additionalInfo?.hierarchy?.children?.[0]?.type).toBe('Contains');
      expect(complexRelation.additionalInfo?.hierarchy?.children?.[0]?.typeGroup).toBe('CUSTOMER');
      expect(complexRelation.additionalInfo?.hierarchy?.children?.[0]?.additionalInfo?.hierarchy?.level).toBe(2);
      expect(complexRelation.additionalInfo?.hierarchy?.children?.[0]?.additionalInfo?.hierarchy?.path).toEqual(['tenant-1', 'customer-1', 'asset-1']);
      expect(complexRelation.additionalInfo?.hierarchy?.children?.[0]?.additionalInfo?.hierarchy?.children).toHaveLength(1);
      expect(complexRelation.additionalInfo?.hierarchy?.children?.[0]?.additionalInfo?.hierarchy?.children?.[0]?.from).toBe('asset-1');
      expect(complexRelation.additionalInfo?.hierarchy?.children?.[0]?.additionalInfo?.hierarchy?.children?.[0]?.to).toBe('device-1');
      expect(complexRelation.additionalInfo?.hierarchy?.children?.[0]?.additionalInfo?.hierarchy?.children?.[0]?.type).toBe('Contains');
      expect(complexRelation.additionalInfo?.hierarchy?.children?.[0]?.additionalInfo?.hierarchy?.children?.[0]?.typeGroup).toBe('ASSET');
      expect(complexRelation.additionalInfo?.hierarchy?.children?.[0]?.additionalInfo?.hierarchy?.children?.[0]?.additionalInfo?.hierarchy?.level).toBe(3);
      expect(complexRelation.additionalInfo?.hierarchy?.children?.[0]?.additionalInfo?.hierarchy?.children?.[0]?.additionalInfo?.hierarchy?.path).toEqual(['tenant-1', 'customer-1', 'asset-1', 'device-1']);
    });
  });
});
import { describe, it, expect } from 'vitest';
import type {
  Page,
  BasicModel,
  EntityInfo,
  BasicQuery,
  WidgetTypeQueryParam,
  DeviceQueryParam,
  EventQueryParam,
  AuditLogQueryParam,
  AlarmQueryParam,
  RelationsSearchParameters,
  EntitySubtype,
} from '/@/api/model/baseModel';

describe('api/model/baseModel', () => {
  describe('Page interface', () => {
    it('should create Page object with correct structure', () => {
      const page: Page<string> = {
        data: ['item1', 'item2'],
        hasNext: true,
        totalElements: 100,
        totalPages: '10',
      };

      expect(page.data).toEqual(['item1', 'item2']);
      expect(page.hasNext).toBe(true);
      expect(page.totalElements).toBe(100);
      expect(page.totalPages).toBe('10');
    });

    it('should handle empty Page object', () => {
      const page: Page<number> = {
        data: [],
        hasNext: false,
        totalElements: 0,
        totalPages: '0',
      };

      expect(page.data).toEqual([]);
      expect(page.hasNext).toBe(false);
      expect(page.totalElements).toBe(0);
      expect(page.totalPages).toBe('0');
    });
  });

  describe('BasicModel interface', () => {
    it('should create BasicModel object with required fields', () => {
      const basicModel: BasicModel<string> = {
        id: 'test-id',
        createdTime: 1234567890,
        version: 1,
      };

      expect(basicModel.id).toBe('test-id');
      expect(basicModel.createdTime).toBe(1234567890);
      expect(basicModel.version).toBe(1);
    });

    it('should create BasicModel object without optional version', () => {
      const basicModel: BasicModel<number> = {
        id: 'test-id',
        createdTime: 1234567890,
      };

      expect(basicModel.id).toBe('test-id');
      expect(basicModel.createdTime).toBe(1234567890);
      expect(basicModel.version).toBeUndefined();
    });
  });

  describe('EntityInfo interface', () => {
    it('should create EntityInfo object with correct structure', () => {
      const entityInfo: EntityInfo<boolean> = {
        id: 'entity-id',
        name: 'Entity Name',
      };

      expect(entityInfo.id).toBe('entity-id');
      expect(entityInfo.name).toBe('Entity Name');
    });
  });

  describe('BasicQuery interface', () => {
    it('should create BasicQuery object with required fields', () => {
      const basicQuery: BasicQuery = {
        pageSize: 10,
        page: 1,
      };

      expect(basicQuery.pageSize).toBe(10);
      expect(basicQuery.page).toBe(1);
    });

    it('should create BasicQuery object with optional fields', () => {
      const basicQuery: BasicQuery = {
        pageSize: 20,
        page: 2,
        textSearch: 'search term',
        sortProperty: 'name',
        sortOrder: 'ASC',
      };

      expect(basicQuery.pageSize).toBe(20);
      expect(basicQuery.page).toBe(2);
      expect(basicQuery.textSearch).toBe('search term');
      expect(basicQuery.sortProperty).toBe('name');
      expect(basicQuery.sortOrder).toBe('ASC');
    });
  });

  describe('WidgetTypeQueryParam interface', () => {
    it('should create WidgetTypeQueryParam object with all fields', () => {
      const widgetQuery: WidgetTypeQueryParam = {
        pageSize: 10,
        page: 1,
        tenantOnly: true,
        fullSearch: false,
        deprecatedFilter: 'active',
        widgetTypeList: ['type1', 'type2'],
        textSearch: 'widget',
        sortProperty: 'name',
        sortOrder: 'DESC',
      };

      expect(widgetQuery.pageSize).toBe(10);
      expect(widgetQuery.page).toBe(1);
      expect(widgetQuery.tenantOnly).toBe(true);
      expect(widgetQuery.fullSearch).toBe(false);
      expect(widgetQuery.deprecatedFilter).toBe('active');
      expect(widgetQuery.widgetTypeList).toEqual(['type1', 'type2']);
      expect(widgetQuery.textSearch).toBe('widget');
      expect(widgetQuery.sortProperty).toBe('name');
      expect(widgetQuery.sortOrder).toBe('DESC');
    });
  });

  describe('DeviceQueryParam interface', () => {
    it('should create DeviceQueryParam object with all fields', () => {
      const deviceQuery: DeviceQueryParam = {
        pageSize: 15,
        page: 1,
        type: 'device',
        deviceProfileId: 'profile-123',
        active: true,
        textSearch: 'device name',
        sortProperty: 'createdTime',
        sortOrder: 'ASC',
      };

      expect(deviceQuery.pageSize).toBe(15);
      expect(deviceQuery.page).toBe(1);
      expect(deviceQuery.type).toBe('device');
      expect(deviceQuery.deviceProfileId).toBe('profile-123');
      expect(deviceQuery.active).toBe(true);
      expect(deviceQuery.textSearch).toBe('device name');
      expect(deviceQuery.sortProperty).toBe('createdTime');
      expect(deviceQuery.sortOrder).toBe('ASC');
    });
  });

  describe('EventQueryParam interface', () => {
    it('should create EventQueryParam object with all fields', () => {
      const eventQuery: EventQueryParam = {
        pageSize: 25,
        page: 1,
        textSearch: 'event',
        sortProperty: 'timestamp',
        sortOrder: 'DESC',
        startTime: 1234567890,
        endTime: 1234567899,
        tenantId: 'tenant-123',
      };

      expect(eventQuery.pageSize).toBe(25);
      expect(eventQuery.page).toBe(1);
      expect(eventQuery.textSearch).toBe('event');
      expect(eventQuery.sortProperty).toBe('timestamp');
      expect(eventQuery.sortOrder).toBe('DESC');
      expect(eventQuery.startTime).toBe(1234567890);
      expect(eventQuery.endTime).toBe(1234567899);
      expect(eventQuery.tenantId).toBe('tenant-123');
    });
  });

  describe('AuditLogQueryParam interface', () => {
    it('should create AuditLogQueryParam object with all fields', () => {
      const auditQuery: AuditLogQueryParam = {
        pageSize: 50,
        page: 1,
        textSearch: 'audit',
        sortProperty: 'actionTime',
        sortOrder: 'DESC',
        startTime: 1234567890,
        endTime: 1234567899,
        actionTypes: 'CREATE,UPDATE,DELETE',
      };

      expect(auditQuery.pageSize).toBe(50);
      expect(auditQuery.page).toBe(1);
      expect(auditQuery.textSearch).toBe('audit');
      expect(auditQuery.sortProperty).toBe('actionTime');
      expect(auditQuery.sortOrder).toBe('DESC');
      expect(auditQuery.startTime).toBe(1234567890);
      expect(auditQuery.endTime).toBe(1234567899);
      expect(auditQuery.actionTypes).toBe('CREATE,UPDATE,DELETE');
    });
  });

  describe('AlarmQueryParam interface', () => {
    it('should create AlarmQueryParam object with all fields', () => {
      const alarmQuery: AlarmQueryParam = {
        pageSize: 30,
        page: 1,
        textSearch: 'alarm',
        sortProperty: 'createdTime',
        sortOrder: 'DESC',
        startTime: 1234567890,
        endTime: 1234567899,
        assigneeId: 'user-123',
        statusList: ['ACTIVE', 'CLEARED'],
        severityList: ['CRITICAL', 'MAJOR'],
        typeList: ['temperature', 'humidity'],
      };

      expect(alarmQuery.pageSize).toBe(30);
      expect(alarmQuery.page).toBe(1);
      expect(alarmQuery.textSearch).toBe('alarm');
      expect(alarmQuery.sortProperty).toBe('createdTime');
      expect(alarmQuery.sortOrder).toBe('DESC');
      expect(alarmQuery.startTime).toBe(1234567890);
      expect(alarmQuery.endTime).toBe(1234567899);
      expect(alarmQuery.assigneeId).toBe('user-123');
      expect(alarmQuery.statusList).toEqual(['ACTIVE', 'CLEARED']);
      expect(alarmQuery.severityList).toEqual(['CRITICAL', 'MAJOR']);
      expect(alarmQuery.typeList).toEqual(['temperature', 'humidity']);
    });
  });

  describe('RelationsSearchParameters interface', () => {
    it('should create RelationsSearchParameters object with all fields', () => {
      const relationsSearch: RelationsSearchParameters = {
        rootId: 'root-123',
        rootType: 'DEVICE' as any,
        direction: 'FROM',
        relationTypeGroup: 'COMMON' as any,
        maxLevel: 3,
        fetchLastLevelOnly: true,
      };

      expect(relationsSearch.rootId).toBe('root-123');
      expect(relationsSearch.rootType).toBe('DEVICE');
      expect(relationsSearch.direction).toBe('FROM');
      expect(relationsSearch.relationTypeGroup).toBe('COMMON');
      expect(relationsSearch.maxLevel).toBe(3);
      expect(relationsSearch.fetchLastLevelOnly).toBe(true);
    });

    it('should create RelationsSearchParameters object with minimal fields', () => {
      const relationsSearch: RelationsSearchParameters = {
        rootId: 'root-456',
      };

      expect(relationsSearch.rootId).toBe('root-456');
      expect(relationsSearch.rootType).toBeUndefined();
      expect(relationsSearch.direction).toBeUndefined();
      expect(relationsSearch.relationTypeGroup).toBeUndefined();
      expect(relationsSearch.maxLevel).toBeUndefined();
      expect(relationsSearch.fetchLastLevelOnly).toBeUndefined();
    });
  });

  describe('EntitySubtype interface', () => {
    it('should create EntitySubtype object with all fields', () => {
      const entitySubtype: EntitySubtype = {
        tenantId: 'tenant-123',
        entityType: 'DEVICE' as any,
        type: 'subtype-name',
      };

      expect(entitySubtype.tenantId).toBe('tenant-123');
      expect(entitySubtype.entityType).toBe('DEVICE');
      expect(entitySubtype.type).toBe('subtype-name');
    });

    it('should create EntitySubtype object with minimal fields', () => {
      const entitySubtype: EntitySubtype = {
        type: 'minimal-subtype',
      };

      expect(entitySubtype.tenantId).toBeUndefined();
      expect(entitySubtype.entityType).toBeUndefined();
      expect(entitySubtype.type).toBe('minimal-subtype');
    });
  });

  describe('Type compatibility tests', () => {
    it('should handle generic types correctly', () => {
      const stringPage: Page<string> = {
        data: ['a', 'b', 'c'],
        hasNext: false,
        totalElements: 3,
        totalPages: '1',
      };

      const numberPage: Page<number> = {
        data: [1, 2, 3],
        hasNext: false,
        totalElements: 3,
        totalPages: '1',
      };

      expect(stringPage.data).toEqual(['a', 'b', 'c']);
      expect(numberPage.data).toEqual([1, 2, 3]);
    });

    it('should handle complex nested types', () => {
      interface ComplexType {
        id: string;
        name: string;
        metadata: Record<string, any>;
      }

      const complexPage: Page<ComplexType> = {
        data: [
          {
            id: '1',
            name: 'Item 1',
            metadata: { key: 'value' },
          },
        ],
        hasNext: false,
        totalElements: 1,
        totalPages: '1',
      };

      expect(complexPage.data[0].id).toBe('1');
      expect(complexPage.data[0].name).toBe('Item 1');
      expect(complexPage.data[0].metadata).toEqual({ key: 'value' });
    });
  });
});
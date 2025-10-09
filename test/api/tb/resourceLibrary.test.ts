import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  saveResource,
  getResourceById,
  getResourceInfoById,
  resourceDownload,
  deleteResource,
  resourceList,
  getLwm2mByObjects,
  lwm2mObjectList,
} from '/@/api/tb/resourceLibrary';
import type {
  ResourceInfo,
  Resource,
  LwM2mResourceObserve,
  LwM2mInstance,
  LwM2mObject,
} from '/@/api/tb/resourceLibrary';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('api/tb/resourceLibrary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('saveResource', () => {
    it('should call defHttp.post with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: Resource = {
        id: 'resource-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        title: 'LwM2M Model Resource',
        resourceType: 'LWM2M_MODEL',
        resourceKey: 'lwm2m-model-1',
        public: false,
        publicResourceKey: 'public-lwm2m-model-1',
        searchText: 'LwM2M Model Resource',
        etag: 'etag-123',
        fileName: 'model.xml',
        descriptor: {
          version: '1.0',
          description: 'LwM2M model resource',
        },
        externalId: 'external-resource-1',
        data: 'base64encodeddata',
      };
      const testData: Resource = {
        id: 'resource-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        title: 'LwM2M Model Resource',
        resourceType: 'LWM2M_MODEL',
        resourceKey: 'lwm2m-model-1',
        public: false,
        publicResourceKey: 'public-lwm2m-model-1',
        searchText: 'LwM2M Model Resource',
        etag: 'etag-123',
        fileName: 'model.xml',
        descriptor: {
          version: '1.0',
          description: 'LwM2M model resource',
        },
        externalId: 'external-resource-1',
        data: 'base64encodeddata',
      };
      vi.mocked(defHttp.post).mockResolvedValue(mockResponse);

      const result = await saveResource(testData);

      expect(defHttp.post).toHaveBeenCalledWith({
        url: '/api/resource',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { title: 'New Resource', resourceType: 'JKS' };
      vi.mocked(defHttp.post).mockResolvedValue(mockResponse);

      const result = await saveResource(testData);

      expect(defHttp.post).toHaveBeenCalledWith({
        url: '/api/resource',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle undefined data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      vi.mocked(defHttp.post).mockResolvedValue(mockResponse);

      const result = await saveResource();

      expect(defHttp.post).toHaveBeenCalledWith({
        url: '/api/resource',
        data: undefined,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getResourceById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: Resource = {
        id: 'resource-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        title: 'LwM2M Model Resource',
        resourceType: 'LWM2M_MODEL',
        resourceKey: 'lwm2m-model-1',
        public: false,
        publicResourceKey: 'public-lwm2m-model-1',
        searchText: 'LwM2M Model Resource',
        etag: 'etag-123',
        fileName: 'model.xml',
        descriptor: {
          version: '1.0',
          description: 'LwM2M model resource',
        },
        externalId: 'external-resource-1',
        data: 'base64encodeddata',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getResourceById('resource-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/resource/resource-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getResourceInfoById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: Resource = {
        id: 'resource-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        title: 'LwM2M Model Resource',
        resourceType: 'LWM2M_MODEL',
        resourceKey: 'lwm2m-model-1',
        public: false,
        publicResourceKey: 'public-lwm2m-model-1',
        searchText: 'LwM2M Model Resource',
        etag: 'etag-123',
        fileName: 'model.xml',
        descriptor: {
          version: '1.0',
          description: 'LwM2M model resource',
        },
        externalId: 'external-resource-1',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getResourceInfoById('resource-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/resource/info/resource-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('resourceDownload', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = new Blob(['resource data'], { type: 'application/octet-stream' });
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await resourceDownload('resource-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/resource/resource-1/download',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteResource', () => {
    it('should call defHttp.delete with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await deleteResource('resource-1');

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/resource/resource-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('resourceList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'resource-1',
            createdTime: 1234567890,
            tenantId: 'tenant-1',
            title: 'LwM2M Model Resource',
            resourceType: 'LWM2M_MODEL',
            resourceKey: 'lwm2m-model-1',
            public: false,
            publicResourceKey: 'public-lwm2m-model-1',
            searchText: 'LwM2M Model Resource',
            etag: 'etag-123',
            fileName: 'model.xml',
            descriptor: {
              version: '1.0',
              description: 'LwM2M model resource',
            },
            externalId: 'external-resource-1',
          },
          {
            id: 'resource-2',
            createdTime: 1234567891,
            tenantId: 'tenant-1',
            title: 'JKS Certificate',
            resourceType: 'JKS',
            resourceKey: 'jks-cert-1',
            public: true,
            publicResourceKey: 'public-jks-cert-1',
            searchText: 'JKS Certificate',
            etag: 'etag-456',
            fileName: 'certificate.jks',
            descriptor: {
              version: '2.0',
              description: 'JKS certificate resource',
            },
            externalId: 'external-resource-2',
          },
        ],
        hasNext: false,
        totalElements: 2,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'resource',
        sortProperty: 'title',
        sortOrder: 'ASC' as const,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await resourceList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/resource',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getLwm2mByObjects', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: LwM2mObject[] = [
        {
          id: 1,
          keyId: 'object-1',
          name: 'Device Object',
          multiple: true,
          mandatory: false,
          instances: [
            {
              resources: [
                {
                  id: 1,
                  name: 'Resource 1',
                  observe: true,
                  attribute: false,
                  telemetry: true,
                  keyName: 'resource-1',
                },
                {
                  id: 2,
                  name: 'Resource 2',
                  observe: false,
                  attribute: true,
                  telemetry: false,
                  keyName: 'resource-2',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          keyId: 'object-2',
          name: 'Server Object',
          multiple: false,
          mandatory: true,
          instances: [
            {
              resources: [
                {
                  id: 3,
                  name: 'Resource 3',
                  observe: true,
                  attribute: true,
                  telemetry: true,
                  keyName: 'resource-3',
                },
              ],
            },
          ],
        },
      ];
      const params = {
        sortProperty: 'name',
        sortOrder: 'ASC' as const,
        objectIds: ['object-1', 'object-2'],
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getLwm2mByObjects(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/resource/lwm2m',
        params,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle params without objectIds', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: LwM2mObject[] = [];
      const params = {
        sortProperty: 'name',
        sortOrder: 'DESC' as const,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getLwm2mByObjects(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/resource/lwm2m',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('lwm2mObjectList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: LwM2mObject[] = [
        {
          id: 1,
          keyId: 'object-1',
          name: 'Device Object',
          multiple: true,
          mandatory: false,
          instances: [
            {
              resources: [
                {
                  id: 1,
                  name: 'Resource 1',
                  observe: true,
                  attribute: false,
                  telemetry: true,
                  keyName: 'resource-1',
                },
              ],
            },
          ],
        },
      ];
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'device',
        sortProperty: 'name',
        sortOrder: 'ASC' as const,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await lwm2mObjectList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/resource/lwm2m/page',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Type definitions', () => {
    it('should create ResourceInfo object with all fields', () => {
      const resourceInfo: ResourceInfo = {
        id: 'resource-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        title: 'LwM2M Model Resource',
        resourceType: 'LWM2M_MODEL',
        resourceKey: 'lwm2m-model-1',
        public: false,
        publicResourceKey: 'public-lwm2m-model-1',
        searchText: 'LwM2M Model Resource',
        etag: 'etag-123',
        fileName: 'model.xml',
        descriptor: {
          version: '1.0',
          description: 'LwM2M model resource',
          author: 'Development Team',
          license: 'MIT',
          tags: ['lwm2m', 'model', 'iot'],
        },
        externalId: 'external-resource-1',
      };

      expect(resourceInfo.id).toBe('resource-1');
      expect(resourceInfo.createdTime).toBe(1234567890);
      expect(resourceInfo.tenantId).toBe('tenant-1');
      expect(resourceInfo.title).toBe('LwM2M Model Resource');
      expect(resourceInfo.resourceType).toBe('LWM2M_MODEL');
      expect(resourceInfo.resourceKey).toBe('lwm2m-model-1');
      expect(resourceInfo.public).toBe(false);
      expect(resourceInfo.publicResourceKey).toBe('public-lwm2m-model-1');
      expect(resourceInfo.searchText).toBe('LwM2M Model Resource');
      expect(resourceInfo.etag).toBe('etag-123');
      expect(resourceInfo.fileName).toBe('model.xml');
      expect(resourceInfo.descriptor?.version).toBe('1.0');
      expect(resourceInfo.descriptor?.description).toBe('LwM2M model resource');
      expect(resourceInfo.descriptor?.author).toBe('Development Team');
      expect(resourceInfo.descriptor?.license).toBe('MIT');
      expect(resourceInfo.descriptor?.tags).toEqual(['lwm2m', 'model', 'iot']);
      expect(resourceInfo.externalId).toBe('external-resource-1');
    });

    it('should create ResourceInfo object with minimal fields', () => {
      const resourceInfo: ResourceInfo = {
        id: 'resource-minimal',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        title: 'Minimal Resource',
        resourceType: 'JKS',
      };

      expect(resourceInfo.id).toBe('resource-minimal');
      expect(resourceInfo.createdTime).toBe(1234567890);
      expect(resourceInfo.tenantId).toBe('tenant-1');
      expect(resourceInfo.title).toBe('Minimal Resource');
      expect(resourceInfo.resourceType).toBe('JKS');
      expect(resourceInfo.resourceKey).toBeUndefined();
      expect(resourceInfo.public).toBeUndefined();
      expect(resourceInfo.publicResourceKey).toBeUndefined();
      expect(resourceInfo.searchText).toBeUndefined();
      expect(resourceInfo.etag).toBeUndefined();
      expect(resourceInfo.fileName).toBeUndefined();
      expect(resourceInfo.descriptor).toBeUndefined();
      expect(resourceInfo.externalId).toBeUndefined();
    });

    it('should create Resource object with data field', () => {
      const resource: Resource = {
        id: 'resource-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        title: 'LwM2M Model Resource',
        resourceType: 'LWM2M_MODEL',
        resourceKey: 'lwm2m-model-1',
        public: false,
        publicResourceKey: 'public-lwm2m-model-1',
        searchText: 'LwM2M Model Resource',
        etag: 'etag-123',
        fileName: 'model.xml',
        descriptor: {
          version: '1.0',
          description: 'LwM2M model resource',
        },
        externalId: 'external-resource-1',
        data: 'base64encodeddata',
      };

      expect(resource.id).toBe('resource-1');
      expect(resource.createdTime).toBe(1234567890);
      expect(resource.tenantId).toBe('tenant-1');
      expect(resource.title).toBe('LwM2M Model Resource');
      expect(resource.resourceType).toBe('LWM2M_MODEL');
      expect(resource.resourceKey).toBe('lwm2m-model-1');
      expect(resource.public).toBe(false);
      expect(resource.publicResourceKey).toBe('public-lwm2m-model-1');
      expect(resource.searchText).toBe('LwM2M Model Resource');
      expect(resource.etag).toBe('etag-123');
      expect(resource.fileName).toBe('model.xml');
      expect(resource.descriptor?.version).toBe('1.0');
      expect(resource.descriptor?.description).toBe('LwM2M model resource');
      expect(resource.externalId).toBe('external-resource-1');
      expect(resource.data).toBe('base64encodeddata');
    });

    it('should handle different resource types', () => {
      const lwm2mResource: ResourceInfo = {
        id: 'lwm2m-resource',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        title: 'LwM2M Model',
        resourceType: 'LWM2M_MODEL',
        fileName: 'model.xml',
      };

      const jksResource: ResourceInfo = {
        id: 'jks-resource',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        title: 'JKS Certificate',
        resourceType: 'JKS',
        fileName: 'certificate.jks',
      };

      const pkcs12Resource: ResourceInfo = {
        id: 'pkcs12-resource',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        title: 'PKCS12 Certificate',
        resourceType: 'PKCS_12',
        fileName: 'certificate.p12',
      };

      expect(lwm2mResource.resourceType).toBe('LWM2M_MODEL');
      expect(lwm2mResource.fileName).toBe('model.xml');

      expect(jksResource.resourceType).toBe('JKS');
      expect(jksResource.fileName).toBe('certificate.jks');

      expect(pkcs12Resource.resourceType).toBe('PKCS_12');
      expect(pkcs12Resource.fileName).toBe('certificate.p12');
    });

    it('should create LwM2mResourceObserve object', () => {
      const lwM2mResourceObserve: LwM2mResourceObserve = {
        id: 1,
        name: 'Resource 1',
        observe: true,
        attribute: false,
        telemetry: true,
        keyName: 'resource-1',
      };

      expect(lwM2mResourceObserve.id).toBe(1);
      expect(lwM2mResourceObserve.name).toBe('Resource 1');
      expect(lwM2mResourceObserve.observe).toBe(true);
      expect(lwM2mResourceObserve.attribute).toBe(false);
      expect(lwM2mResourceObserve.telemetry).toBe(true);
      expect(lwM2mResourceObserve.keyName).toBe('resource-1');
    });

    it('should create LwM2mInstance object', () => {
      const lwM2mInstance: LwM2mInstance = {
        resources: [
          {
            id: 1,
            name: 'Resource 1',
            observe: true,
            attribute: false,
            telemetry: true,
            keyName: 'resource-1',
          },
          {
            id: 2,
            name: 'Resource 2',
            observe: false,
            attribute: true,
            telemetry: false,
            keyName: 'resource-2',
          },
        ],
      };

      expect(lwM2mInstance.resources).toHaveLength(2);
      expect(lwM2mInstance.resources?.[0]?.id).toBe(1);
      expect(lwM2mInstance.resources?.[0]?.name).toBe('Resource 1');
      expect(lwM2mInstance.resources?.[0]?.observe).toBe(true);
      expect(lwM2mInstance.resources?.[0]?.attribute).toBe(false);
      expect(lwM2mInstance.resources?.[0]?.telemetry).toBe(true);
      expect(lwM2mInstance.resources?.[0]?.keyName).toBe('resource-1');
      expect(lwM2mInstance.resources?.[1]?.id).toBe(2);
      expect(lwM2mInstance.resources?.[1]?.name).toBe('Resource 2');
      expect(lwM2mInstance.resources?.[1]?.observe).toBe(false);
      expect(lwM2mInstance.resources?.[1]?.attribute).toBe(true);
      expect(lwM2mInstance.resources?.[1]?.telemetry).toBe(false);
      expect(lwM2mInstance.resources?.[1]?.keyName).toBe('resource-2');
    });

    it('should create LwM2mObject object', () => {
      const lwM2mObject: LwM2mObject = {
        id: 1,
        keyId: 'object-1',
        name: 'Device Object',
        multiple: true,
        mandatory: false,
        instances: [
          {
            resources: [
              {
                id: 1,
                name: 'Resource 1',
                observe: true,
                attribute: false,
                telemetry: true,
                keyName: 'resource-1',
              },
              {
                id: 2,
                name: 'Resource 2',
                observe: false,
                attribute: true,
                telemetry: false,
                keyName: 'resource-2',
              },
            ],
          },
          {
            resources: [
              {
                id: 3,
                name: 'Resource 3',
                observe: true,
                attribute: true,
                telemetry: true,
                keyName: 'resource-3',
              },
            ],
          },
        ],
      };

      expect(lwM2mObject.id).toBe(1);
      expect(lwM2mObject.keyId).toBe('object-1');
      expect(lwM2mObject.name).toBe('Device Object');
      expect(lwM2mObject.multiple).toBe(true);
      expect(lwM2mObject.mandatory).toBe(false);
      expect(lwM2mObject.instances).toHaveLength(2);
      expect(lwM2mObject.instances?.[0]?.resources).toHaveLength(2);
      expect(lwM2mObject.instances?.[0]?.resources?.[0]?.id).toBe(1);
      expect(lwM2mObject.instances?.[0]?.resources?.[0]?.name).toBe('Resource 1');
      expect(lwM2mObject.instances?.[0]?.resources?.[0]?.observe).toBe(true);
      expect(lwM2mObject.instances?.[0]?.resources?.[0]?.attribute).toBe(false);
      expect(lwM2mObject.instances?.[0]?.resources?.[0]?.telemetry).toBe(true);
      expect(lwM2mObject.instances?.[0]?.resources?.[0]?.keyName).toBe('resource-1');
      expect(lwM2mObject.instances?.[0]?.resources?.[1]?.id).toBe(2);
      expect(lwM2mObject.instances?.[0]?.resources?.[1]?.name).toBe('Resource 2');
      expect(lwM2mObject.instances?.[0]?.resources?.[1]?.observe).toBe(false);
      expect(lwM2mObject.instances?.[0]?.resources?.[1]?.attribute).toBe(true);
      expect(lwM2mObject.instances?.[0]?.resources?.[1]?.telemetry).toBe(false);
      expect(lwM2mObject.instances?.[0]?.resources?.[1]?.keyName).toBe('resource-2');
      expect(lwM2mObject.instances?.[1]?.resources).toHaveLength(1);
      expect(lwM2mObject.instances?.[1]?.resources?.[0]?.id).toBe(3);
      expect(lwM2mObject.instances?.[1]?.resources?.[0]?.name).toBe('Resource 3');
      expect(lwM2mObject.instances?.[1]?.resources?.[0]?.observe).toBe(true);
      expect(lwM2mObject.instances?.[1]?.resources?.[0]?.attribute).toBe(true);
      expect(lwM2mObject.instances?.[1]?.resources?.[0]?.telemetry).toBe(true);
      expect(lwM2mObject.instances?.[1]?.resources?.[0]?.keyName).toBe('resource-3');
    });

    it('should handle complex LwM2M object hierarchies', () => {
      const complexLwM2mObject: LwM2mObject = {
        id: 3,
        keyId: 'object-3',
        name: 'Complex Device Object',
        multiple: true,
        mandatory: true,
        instances: [
          {
            resources: [
              {
                id: 10,
                name: 'Temperature Sensor',
                observe: true,
                attribute: true,
                telemetry: true,
                keyName: 'temperature',
              },
              {
                id: 11,
                name: 'Humidity Sensor',
                observe: true,
                attribute: true,
                telemetry: true,
                keyName: 'humidity',
              },
              {
                id: 12,
                name: 'Pressure Sensor',
                observe: true,
                attribute: true,
                telemetry: true,
                keyName: 'pressure',
              },
            ],
          },
          {
            resources: [
              {
                id: 20,
                name: 'LED Control',
                observe: false,
                attribute: true,
                telemetry: false,
                keyName: 'led-control',
              },
              {
                id: 21,
                name: 'Motor Control',
                observe: false,
                attribute: true,
                telemetry: false,
                keyName: 'motor-control',
              },
            ],
          },
          {
            resources: [
              {
                id: 30,
                name: 'Battery Level',
                observe: true,
                attribute: false,
                telemetry: true,
                keyName: 'battery-level',
              },
              {
                id: 31,
                name: 'Signal Strength',
                observe: true,
                attribute: false,
                telemetry: true,
                keyName: 'signal-strength',
              },
            ],
          },
        ],
      };

      expect(complexLwM2mObject.id).toBe(3);
      expect(complexLwM2mObject.keyId).toBe('object-3');
      expect(complexLwM2mObject.name).toBe('Complex Device Object');
      expect(complexLwM2mObject.multiple).toBe(true);
      expect(complexLwM2mObject.mandatory).toBe(true);
      expect(complexLwM2mObject.instances).toHaveLength(3);
      
      // First instance - sensors
      expect(complexLwM2mObject.instances?.[0]?.resources).toHaveLength(3);
      expect(complexLwM2mObject.instances?.[0]?.resources?.[0]?.id).toBe(10);
      expect(complexLwM2mObject.instances?.[0]?.resources?.[0]?.name).toBe('Temperature Sensor');
      expect(complexLwM2mObject.instances?.[0]?.resources?.[0]?.observe).toBe(true);
      expect(complexLwM2mObject.instances?.[0]?.resources?.[0]?.attribute).toBe(true);
      expect(complexLwM2mObject.instances?.[0]?.resources?.[0]?.telemetry).toBe(true);
      expect(complexLwM2mObject.instances?.[0]?.resources?.[0]?.keyName).toBe('temperature');
      
      // Second instance - controls
      expect(complexLwM2mObject.instances?.[1]?.resources).toHaveLength(2);
      expect(complexLwM2mObject.instances?.[1]?.resources?.[0]?.id).toBe(20);
      expect(complexLwM2mObject.instances?.[1]?.resources?.[0]?.name).toBe('LED Control');
      expect(complexLwM2mObject.instances?.[1]?.resources?.[0]?.observe).toBe(false);
      expect(complexLwM2mObject.instances?.[1]?.resources?.[0]?.attribute).toBe(true);
      expect(complexLwM2mObject.instances?.[1]?.resources?.[0]?.telemetry).toBe(false);
      expect(complexLwM2mObject.instances?.[1]?.resources?.[0]?.keyName).toBe('led-control');
      
      // Third instance - status
      expect(complexLwM2mObject.instances?.[2]?.resources).toHaveLength(2);
      expect(complexLwM2mObject.instances?.[2]?.resources?.[0]?.id).toBe(30);
      expect(complexLwM2mObject.instances?.[2]?.resources?.[0]?.name).toBe('Battery Level');
      expect(complexLwM2mObject.instances?.[2]?.resources?.[0]?.observe).toBe(true);
      expect(complexLwM2mObject.instances?.[2]?.resources?.[0]?.attribute).toBe(false);
      expect(complexLwM2mObject.instances?.[2]?.resources?.[0]?.telemetry).toBe(true);
      expect(complexLwM2mObject.instances?.[2]?.resources?.[0]?.keyName).toBe('battery-level');
    });
  });
});
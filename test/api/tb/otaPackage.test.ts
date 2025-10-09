import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  downloadOtaPackage,
  getOtaPackageInfoById,
  getOtaPackageById,
  saveOtaPackageInfo,
  saveOtaPackageData,
  getOtaPackageList,
  getOtaPackageListByDeviceProfile,
  deleteOtaPackage,
} from '/@/api/tb/otaPackage';
import type {
  OtaPackageInfo,
  otaPackage,
  OtaPackageUploadParam,
} from '/@/api/tb/otaPackage';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    postJson: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock ContentTypeEnum
vi.mock('/@/enums/httpEnum', () => ({
  ContentTypeEnum: {
    FORM_DATA: 'multipart/form-data',
    JSON: 'application/json',
    URL_ENCODED: 'application/x-www-form-urlencoded',
  },
}));

describe('api/tb/otaPackage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('downloadOtaPackage', () => {
    it('should call defHttp.get with correct URL and options', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = new Blob(['test data'], { type: 'application/octet-stream' });
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await downloadOtaPackage('ota-package-1');

      expect(defHttp.get).toHaveBeenCalledWith(
        { url: '/otaPackage/ota-package-1/download', responseType: 'blob' },
        { isReturnNativeResponse: true, joinPrefix: false },
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getOtaPackageInfoById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: OtaPackageInfo = {
        id: 'ota-package-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        deviceProfileId: 'device-profile-1',
        title: 'Firmware Update v1.0',
        type: 'FIRMWARE',
        tag: 'v1.0',
        url: 'https://example.com/firmware.bin',
        hasData: true,
        fileName: 'firmware.bin',
        contentType: 'application/octet-stream',
        checksum: 'abc123def456',
        dataSize: 1024000,
        checksumAlgorithm: 'SHA256',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getOtaPackageInfoById('ota-package-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/otaPackage/info/ota-package-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getOtaPackageById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: otaPackage = {
        id: 'ota-package-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        deviceProfileId: 'device-profile-1',
        title: 'Firmware Update v1.0',
        type: 'FIRMWARE',
        tag: 'v1.0',
        url: 'https://example.com/firmware.bin',
        hasData: true,
        fileName: 'firmware.bin',
        contentType: 'application/octet-stream',
        checksum: 'abc123def456',
        dataSize: 1024000,
        checksumAlgorithm: 'SHA256',
        data: {
          binaryData: 'base64encodeddata',
          metadata: {
            version: '1.0',
            buildDate: '2023-01-01',
          },
        },
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getOtaPackageById('ota-package-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/otaPackage/ota-package-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveOtaPackageInfo', () => {
    it('should call defHttp.postJson with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: OtaPackageInfo = {
        id: 'ota-package-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        deviceProfileId: 'device-profile-1',
        title: 'Firmware Update v1.0',
        type: 'FIRMWARE',
        tag: 'v1.0',
        url: 'https://example.com/firmware.bin',
        hasData: false,
        fileName: 'firmware.bin',
        contentType: 'application/octet-stream',
        checksum: 'abc123def456',
        dataSize: 1024000,
        checksumAlgorithm: 'SHA256',
      };
      const testData = {
        otaPackageInfo: {
          id: 'ota-package-1',
          createdTime: 1234567890,
          tenantId: 'tenant-1',
          deviceProfileId: 'device-profile-1',
          title: 'Firmware Update v1.0',
          type: 'FIRMWARE',
          tag: 'v1.0',
          url: 'https://example.com/firmware.bin',
          hasData: false,
          fileName: 'firmware.bin',
          contentType: 'application/octet-stream',
          checksum: 'abc123def456',
          dataSize: 1024000,
          checksumAlgorithm: 'SHA256',
        },
        usesUrl: true,
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveOtaPackageInfo(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/otaPackage',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { title: 'New OTA Package', type: 'SOFTWARE' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveOtaPackageInfo(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/otaPackage',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveOtaPackageData', () => {
    it('should call defHttp.post with correct URL, params, data and headers', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: OtaPackageInfo = {
        id: 'ota-package-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        deviceProfileId: 'device-profile-1',
        title: 'Firmware Update v1.0',
        type: 'FIRMWARE',
        tag: 'v1.0',
        url: 'https://example.com/firmware.bin',
        hasData: true,
        fileName: 'firmware.bin',
        contentType: 'application/octet-stream',
        checksum: 'abc123def456',
        dataSize: 1024000,
        checksumAlgorithm: 'SHA256',
      };
      const testFile = new File(['test data'], 'firmware.bin', { type: 'application/octet-stream' });
      const params: OtaPackageUploadParam = {
        otaPackageId: 'ota-package-1',
        file: testFile,
        checksumAlgorithm: 'SHA256',
        checksum: 'abc123def456',
      };
      const onUploadProgress = vi.fn();
      vi.mocked(defHttp.post).mockResolvedValue(mockResponse);

      const result = await saveOtaPackageData(params, onUploadProgress);

      expect(defHttp.post).toHaveBeenCalledWith({
        url: '/api/otaPackage/ota-package-1',
        params: { checksum: 'abc123def456', checksumAlgorithm: 'SHA256' },
        data: { file: testFile },
        headers: { 'Content-type': 'multipart/form-data' },
        onUploadProgress,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle upload without progress callback', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: OtaPackageInfo = {
        id: 'ota-package-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        deviceProfileId: 'device-profile-1',
        title: 'Firmware Update v1.0',
        type: 'FIRMWARE',
        tag: 'v1.0',
        url: 'https://example.com/firmware.bin',
        hasData: true,
        fileName: 'firmware.bin',
        contentType: 'application/octet-stream',
        checksum: 'abc123def456',
        dataSize: 1024000,
        checksumAlgorithm: 'SHA256',
      };
      const testFile = new File(['test data'], 'firmware.bin', { type: 'application/octet-stream' });
      const params: OtaPackageUploadParam = {
        otaPackageId: 'ota-package-1',
        file: testFile,
        checksumAlgorithm: 'SHA256',
        checksum: 'abc123def456',
      };
      vi.mocked(defHttp.post).mockResolvedValue(mockResponse);

      const result = await saveOtaPackageData(params);

      expect(defHttp.post).toHaveBeenCalledWith({
        url: '/api/otaPackage/ota-package-1',
        params: { checksum: 'abc123def456', checksumAlgorithm: 'SHA256' },
        data: { file: testFile },
        headers: { 'Content-type': 'multipart/form-data' },
        onUploadProgress: undefined,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle upload without checksum parameters', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: OtaPackageInfo = {
        id: 'ota-package-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        deviceProfileId: 'device-profile-1',
        title: 'Firmware Update v1.0',
        type: 'FIRMWARE',
        tag: 'v1.0',
        url: 'https://example.com/firmware.bin',
        hasData: true,
        fileName: 'firmware.bin',
        contentType: 'application/octet-stream',
        checksum: 'abc123def456',
        dataSize: 1024000,
        checksumAlgorithm: 'SHA256',
      };
      const testFile = new File(['test data'], 'firmware.bin', { type: 'application/octet-stream' });
      const params: OtaPackageUploadParam = {
        otaPackageId: 'ota-package-1',
        file: testFile,
      };
      vi.mocked(defHttp.post).mockResolvedValue(mockResponse);

      const result = await saveOtaPackageData(params);

      expect(defHttp.post).toHaveBeenCalledWith({
        url: '/api/otaPackage/ota-package-1',
        params: { checksum: undefined, checksumAlgorithm: undefined },
        data: { file: testFile },
        headers: { 'Content-type': 'multipart/form-data' },
        onUploadProgress: undefined,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getOtaPackageList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'ota-package-1',
            createdTime: 1234567890,
            tenantId: 'tenant-1',
            deviceProfileId: 'device-profile-1',
            title: 'Firmware Update v1.0',
            type: 'FIRMWARE',
            tag: 'v1.0',
            url: 'https://example.com/firmware.bin',
            hasData: true,
            fileName: 'firmware.bin',
            contentType: 'application/octet-stream',
            checksum: 'abc123def456',
            dataSize: 1024000,
            checksumAlgorithm: 'SHA256',
          },
          {
            id: 'ota-package-2',
            createdTime: 1234567891,
            tenantId: 'tenant-1',
            deviceProfileId: 'device-profile-1',
            title: 'Software Update v2.0',
            type: 'SOFTWARE',
            tag: 'v2.0',
            url: 'https://example.com/software.bin',
            hasData: false,
            fileName: 'software.bin',
            contentType: 'application/octet-stream',
            checksum: 'def456ghi789',
            dataSize: 2048000,
            checksumAlgorithm: 'MD5',
          },
        ],
        hasNext: false,
        totalElements: 2,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'ota',
        sortProperty: 'title',
        sortOrder: 'ASC' as const,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getOtaPackageList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/otaPackages',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getOtaPackageListByDeviceProfile', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'ota-package-1',
            createdTime: 1234567890,
            tenantId: 'tenant-1',
            deviceProfileId: 'device-profile-1',
            title: 'Firmware Update v1.0',
            type: 'FIRMWARE',
            tag: 'v1.0',
            url: 'https://example.com/firmware.bin',
            hasData: true,
            fileName: 'firmware.bin',
            contentType: 'application/octet-stream',
            checksum: 'abc123def456',
            dataSize: 1024000,
            checksumAlgorithm: 'SHA256',
          },
        ],
        hasNext: false,
        totalElements: 1,
        totalPages: '1',
      };
      const deviceProfileId = 'device-profile-1';
      const type = 'FIRMWARE';
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'firmware',
        sortProperty: 'title',
        sortOrder: 'ASC' as const,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getOtaPackageListByDeviceProfile(deviceProfileId, type, params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/otaPackages/device-profile-1/FIRMWARE',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteOtaPackage', () => {
    it('should call defHttp.delete with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await deleteOtaPackage('ota-package-1');

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/otaPackage/ota-package-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Type definitions', () => {
    it('should create OtaPackageInfo object with all fields', () => {
      const otaPackageInfo: OtaPackageInfo = {
        id: 'ota-package-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        deviceProfileId: 'device-profile-1',
        title: 'Firmware Update v1.0',
        type: 'FIRMWARE',
        tag: 'v1.0',
        url: 'https://example.com/firmware.bin',
        hasData: true,
        fileName: 'firmware.bin',
        contentType: 'application/octet-stream',
        checksum: 'abc123def456',
        dataSize: 1024000,
        checksumAlgorithm: 'SHA256',
      };

      expect(otaPackageInfo.id).toBe('ota-package-1');
      expect(otaPackageInfo.createdTime).toBe(1234567890);
      expect(otaPackageInfo.tenantId).toBe('tenant-1');
      expect(otaPackageInfo.deviceProfileId).toBe('device-profile-1');
      expect(otaPackageInfo.title).toBe('Firmware Update v1.0');
      expect(otaPackageInfo.type).toBe('FIRMWARE');
      expect(otaPackageInfo.tag).toBe('v1.0');
      expect(otaPackageInfo.url).toBe('https://example.com/firmware.bin');
      expect(otaPackageInfo.hasData).toBe(true);
      expect(otaPackageInfo.fileName).toBe('firmware.bin');
      expect(otaPackageInfo.contentType).toBe('application/octet-stream');
      expect(otaPackageInfo.checksum).toBe('abc123def456');
      expect(otaPackageInfo.dataSize).toBe(1024000);
      expect(otaPackageInfo.checksumAlgorithm).toBe('SHA256');
    });

    it('should create OtaPackageInfo object with SOFTWARE type', () => {
      const otaPackageInfo: OtaPackageInfo = {
        id: 'ota-package-2',
        createdTime: 1234567891,
        tenantId: 'tenant-1',
        deviceProfileId: 'device-profile-1',
        title: 'Software Update v2.0',
        type: 'SOFTWARE',
        tag: 'v2.0',
        url: 'https://example.com/software.bin',
        hasData: false,
        fileName: 'software.bin',
        contentType: 'application/octet-stream',
        checksum: 'def456ghi789',
        dataSize: 2048000,
        checksumAlgorithm: 'MD5',
      };

      expect(otaPackageInfo.id).toBe('ota-package-2');
      expect(otaPackageInfo.createdTime).toBe(1234567891);
      expect(otaPackageInfo.tenantId).toBe('tenant-1');
      expect(otaPackageInfo.deviceProfileId).toBe('device-profile-1');
      expect(otaPackageInfo.title).toBe('Software Update v2.0');
      expect(otaPackageInfo.type).toBe('SOFTWARE');
      expect(otaPackageInfo.tag).toBe('v2.0');
      expect(otaPackageInfo.url).toBe('https://example.com/software.bin');
      expect(otaPackageInfo.hasData).toBe(false);
      expect(otaPackageInfo.fileName).toBe('software.bin');
      expect(otaPackageInfo.contentType).toBe('application/octet-stream');
      expect(otaPackageInfo.checksum).toBe('def456ghi789');
      expect(otaPackageInfo.dataSize).toBe(2048000);
      expect(otaPackageInfo.checksumAlgorithm).toBe('MD5');
    });

    it('should create OtaPackageInfo object with minimal fields', () => {
      const otaPackageInfo: OtaPackageInfo = {
        id: 'ota-package-minimal',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        deviceProfileId: 'device-profile-1',
        title: 'Minimal OTA Package',
        type: 'FIRMWARE',
      };

      expect(otaPackageInfo.id).toBe('ota-package-minimal');
      expect(otaPackageInfo.createdTime).toBe(1234567890);
      expect(otaPackageInfo.tenantId).toBe('tenant-1');
      expect(otaPackageInfo.deviceProfileId).toBe('device-profile-1');
      expect(otaPackageInfo.title).toBe('Minimal OTA Package');
      expect(otaPackageInfo.type).toBe('FIRMWARE');
      expect(otaPackageInfo.tag).toBeUndefined();
      expect(otaPackageInfo.url).toBeUndefined();
      expect(otaPackageInfo.hasData).toBeUndefined();
      expect(otaPackageInfo.fileName).toBeUndefined();
      expect(otaPackageInfo.contentType).toBeUndefined();
      expect(otaPackageInfo.checksum).toBeUndefined();
      expect(otaPackageInfo.dataSize).toBeUndefined();
      expect(otaPackageInfo.checksumAlgorithm).toBeUndefined();
    });

    it('should create otaPackage object with data field', () => {
      const otaPackage: otaPackage = {
        id: 'ota-package-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        deviceProfileId: 'device-profile-1',
        title: 'Firmware Update v1.0',
        type: 'FIRMWARE',
        tag: 'v1.0',
        url: 'https://example.com/firmware.bin',
        hasData: true,
        fileName: 'firmware.bin',
        contentType: 'application/octet-stream',
        checksum: 'abc123def456',
        dataSize: 1024000,
        checksumAlgorithm: 'SHA256',
        data: {
          binaryData: 'base64encodeddata',
          metadata: {
            version: '1.0',
            buildDate: '2023-01-01',
            author: 'Development Team',
            description: 'Firmware update with bug fixes',
            changelog: [
              'Fixed memory leak issue',
              'Improved performance',
              'Added new features',
            ],
          },
          dependencies: {
            minVersion: '0.9.0',
            maxVersion: '1.1.0',
            requiredHardware: ['sensor-v2', 'actuator-v1'],
          },
        },
      };

      expect(otaPackage.id).toBe('ota-package-1');
      expect(otaPackage.createdTime).toBe(1234567890);
      expect(otaPackage.tenantId).toBe('tenant-1');
      expect(otaPackage.deviceProfileId).toBe('device-profile-1');
      expect(otaPackage.title).toBe('Firmware Update v1.0');
      expect(otaPackage.type).toBe('FIRMWARE');
      expect(otaPackage.tag).toBe('v1.0');
      expect(otaPackage.url).toBe('https://example.com/firmware.bin');
      expect(otaPackage.hasData).toBe(true);
      expect(otaPackage.fileName).toBe('firmware.bin');
      expect(otaPackage.contentType).toBe('application/octet-stream');
      expect(otaPackage.checksum).toBe('abc123def456');
      expect(otaPackage.dataSize).toBe(1024000);
      expect(otaPackage.checksumAlgorithm).toBe('SHA256');
      expect(otaPackage.data?.binaryData).toBe('base64encodeddata');
      expect(otaPackage.data?.metadata?.version).toBe('1.0');
      expect(otaPackage.data?.metadata?.buildDate).toBe('2023-01-01');
      expect(otaPackage.data?.metadata?.author).toBe('Development Team');
      expect(otaPackage.data?.metadata?.description).toBe('Firmware update with bug fixes');
      expect(otaPackage.data?.metadata?.changelog).toEqual([
        'Fixed memory leak issue',
        'Improved performance',
        'Added new features',
      ]);
      expect(otaPackage.data?.dependencies?.minVersion).toBe('0.9.0');
      expect(otaPackage.data?.dependencies?.maxVersion).toBe('1.1.0');
      expect(otaPackage.data?.dependencies?.requiredHardware).toEqual(['sensor-v2', 'actuator-v1']);
    });

    it('should create OtaPackageUploadParam object', () => {
      const testFile = new File(['test data'], 'firmware.bin', { type: 'application/octet-stream' });
      const uploadParam: OtaPackageUploadParam = {
        otaPackageId: 'ota-package-1',
        file: testFile,
        checksumAlgorithm: 'SHA256',
        checksum: 'abc123def456',
      };

      expect(uploadParam.otaPackageId).toBe('ota-package-1');
      expect(uploadParam.file).toBe(testFile);
      expect(uploadParam.checksumAlgorithm).toBe('SHA256');
      expect(uploadParam.checksum).toBe('abc123def456');
    });

    it('should create OtaPackageUploadParam object with minimal fields', () => {
      const testFile = new File(['test data'], 'firmware.bin', { type: 'application/octet-stream' });
      const uploadParam: OtaPackageUploadParam = {
        otaPackageId: 'ota-package-1',
        file: testFile,
      };

      expect(uploadParam.otaPackageId).toBe('ota-package-1');
      expect(uploadParam.file).toBe(testFile);
      expect(uploadParam.checksumAlgorithm).toBeUndefined();
      expect(uploadParam.checksum).toBeUndefined();
    });

    it('should handle different checksum algorithms', () => {
      const algorithms: Array<OtaPackageInfo['checksumAlgorithm']> = [
        'MD5',
        'SHA256',
        'SHA384',
        'SHA512',
        'CRC32',
        'MURMUR3_32',
        'MURMUR3_128',
      ];

      algorithms.forEach((algorithm, index) => {
        const otaPackageInfo: OtaPackageInfo = {
          id: `ota-package-${index}`,
          createdTime: 1234567890,
          tenantId: 'tenant-1',
          deviceProfileId: 'device-profile-1',
          title: `OTA Package with ${algorithm}`,
          type: 'FIRMWARE',
          checksumAlgorithm: algorithm,
          checksum: `checksum-${algorithm.toLowerCase()}`,
        };

        expect(otaPackageInfo.checksumAlgorithm).toBe(algorithm);
        expect(otaPackageInfo.checksum).toBe(`checksum-${algorithm.toLowerCase()}`);
      });
    });

    it('should handle different content types', () => {
      const contentTypes = [
        'application/octet-stream',
        'application/zip',
        'application/x-tar',
        'application/gzip',
        'text/plain',
        'application/json',
      ];

      contentTypes.forEach((contentType, index) => {
        const otaPackageInfo: OtaPackageInfo = {
          id: `ota-package-${index}`,
          createdTime: 1234567890,
          tenantId: 'tenant-1',
          deviceProfileId: 'device-profile-1',
          title: `OTA Package with ${contentType}`,
          type: 'SOFTWARE',
          contentType,
          fileName: `package-${index}.bin`,
        };

        expect(otaPackageInfo.contentType).toBe(contentType);
        expect(otaPackageInfo.fileName).toBe(`package-${index}.bin`);
      });
    });
  });
});
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  tbImagePrefix,
  imageList,
  getImageInfo,
  getImageInfo2,
  updateImageInfo,
  deleteImage,
  imagePreview,
  downloadImage,
  getSvg,
  downloadPublicImage,
  exportImage,
  importImage,
  updateImagePublicStatus,
  uploadImage,
} from '/@/api/tb/images';
import type { ResourceInfo } from '/@/api/tb/resourceLibrary';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    put: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock ContentTypeEnum
vi.mock('/@/enums/httpEnum', () => ({
  ContentTypeEnum: {
    FORM_DATA: 'multipart/form-data',
  },
}));

// Mock AxiosProgressEvent
vi.mock('axios', () => ({
  AxiosProgressEvent: vi.fn(),
}));

describe('api/tb/images', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('tbImagePrefix', () => {
    it('should have correct value', () => {
      expect(tbImagePrefix).toBe('tb-image;');
    });
  });

  describe('imageList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'image-1',
            title: 'Image 1',
            contentType: 'image/jpeg',
            link: '/api/images/tenant/image-1',
            publicResourceKey: 'public-key-1',
            publicResource: false,
            etag: 'etag-1',
            descriptor: 'descriptor-1',
            preview: '/api/images/tenant/image-1/preview',
          },
          {
            id: 'image-2',
            title: 'Image 2',
            contentType: 'image/png',
            link: '/api/images/tenant/image-2',
            publicResourceKey: 'public-key-2',
            publicResource: true,
            etag: 'etag-2',
            descriptor: 'descriptor-2',
            preview: '/api/images/tenant/image-2/preview',
          },
        ],
        hasNext: false,
        totalElements: 2,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'test',
        sortProperty: 'title',
        sortOrder: 'ASC' as const,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await imageList(params, true);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/images',
        params: { ...params, includeSystemImages: true },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle includeSystemImages default value', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [],
        hasNext: false,
        totalElements: 0,
        totalPages: '0',
      };
      const params = {
        pageSize: 10,
        page: 1,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await imageList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/images',
        params: { ...params, includeSystemImages: false },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getImageInfo', () => {
    it('should call defHttp.get with correct URL for system image', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: ResourceInfo = {
        id: 'system-image-1',
        title: 'System Image 1',
        contentType: 'image/svg+xml',
        link: '/api/images/system/system-image-1',
        publicResourceKey: 'system-public-key-1',
        publicResource: true,
        etag: 'system-etag-1',
        descriptor: 'system-descriptor-1',
        preview: '/api/images/system/system-image-1/preview',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getImageInfo('system', 'system-image-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/images/system/system-image-1/info',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call defHttp.get with correct URL for tenant image', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: ResourceInfo = {
        id: 'tenant-image-1',
        title: 'Tenant Image 1',
        contentType: 'image/jpeg',
        link: '/api/images/tenant/tenant-image-1',
        publicResourceKey: 'tenant-public-key-1',
        publicResource: false,
        etag: 'tenant-etag-1',
        descriptor: 'tenant-descriptor-1',
        preview: '/api/images/tenant/tenant-image-1/preview',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getImageInfo('tenant', 'tenant-image-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/images/tenant/tenant-image-1/info',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getImageInfo2', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: ResourceInfo = {
        id: 'image-1',
        title: 'Image 1',
        contentType: 'image/png',
        link: '/api/images/tenant/image-1',
        publicResourceKey: 'public-key-1',
        publicResource: false,
        etag: 'etag-1',
        descriptor: 'descriptor-1',
        preview: '/api/images/tenant/image-1/preview',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getImageInfo2('/api/images/tenant/image-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/images/tenant/image-1/info',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateImageInfo', () => {
    it('should call defHttp.put with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: ResourceInfo = {
        id: 'image-1',
        title: 'Updated Image 1',
        contentType: 'image/jpeg',
        link: '/api/images/tenant/image-1',
        publicResourceKey: 'public-key-1',
        publicResource: false,
        etag: 'etag-1',
        descriptor: 'descriptor-1',
        preview: '/api/images/tenant/image-1/preview',
      };
      const testData: ResourceInfo = {
        id: 'image-1',
        title: 'Updated Image 1',
        contentType: 'image/jpeg',
        link: '/api/images/tenant/image-1',
        publicResourceKey: 'public-key-1',
        publicResource: false,
        etag: 'etag-1',
        descriptor: 'descriptor-1',
        preview: '/api/images/tenant/image-1/preview',
      };
      vi.mocked(defHttp.put).mockResolvedValue(mockResponse);

      const result = await updateImageInfo(testData);

      expect(defHttp.put).toHaveBeenCalledWith({
        url: '/api/images/tenant/image-1/info',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { title: 'New Title', link: '/api/images/tenant/image-1' };
      vi.mocked(defHttp.put).mockResolvedValue(mockResponse);

      const result = await updateImageInfo(testData);

      expect(defHttp.put).toHaveBeenCalledWith({
        url: '/api/images/tenant/image-1/info',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteImage', () => {
    it('should call defHttp.delete with correct URL and options', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        success: true,
        references: { count: 0, entities: [] },
      };
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await deleteImage('/api/images/tenant/image-1', true);

      expect(defHttp.delete).toHaveBeenCalledWith(
        {
          url: '/api/images/tenant/image-1?force=true',
        },
        { errorMessageMode: 'none' }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle force default value', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        success: true,
        references: { count: 0, entities: [] },
      };
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await deleteImage('/api/images/tenant/image-1');

      expect(defHttp.delete).toHaveBeenCalledWith(
        {
          url: '/api/images/tenant/image-1?force=false',
        },
        { errorMessageMode: 'none' }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('imagePreview', () => {
    it('should call defHttp.get with correct URL and headers', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = new Blob(['image data'], { type: 'image/jpeg' });
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await imagePreview('/api/images/tenant/image-1', 'etag-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/images/tenant/image-1/preview',
        headers: { 'If-None-Match': 'etag-1' },
        responseType: 'blob',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle etag undefined', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = new Blob(['image data'], { type: 'image/jpeg' });
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await imagePreview('/api/images/tenant/image-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/images/tenant/image-1/preview',
        headers: { 'If-None-Match': undefined },
        responseType: 'blob',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('downloadImage', () => {
    it('should call defHttp.get with correct URL and options', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = new Blob(['image data'], { type: 'image/jpeg' });
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await downloadImage('/api/images/tenant/image-1', 'etag-1');

      expect(defHttp.get).toHaveBeenCalledWith(
        {
          url: '/api/images/tenant/image-1',
          headers: { 'If-None-Match': 'etag-1' },
          responseType: 'blob',
        },
        { isReturnNativeResponse: true, joinPrefix: false }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle etag undefined', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = new Blob(['image data'], { type: 'image/jpeg' });
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await downloadImage('/api/images/tenant/image-1');

      expect(defHttp.get).toHaveBeenCalledWith(
        {
          url: '/api/images/tenant/image-1',
          headers: { 'If-None-Match': undefined },
          responseType: 'blob',
        },
        { isReturnNativeResponse: true, joinPrefix: false }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getSvg', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = '<svg>...</svg>';
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getSvg('system', 'icon-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/images/system/icon-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('downloadPublicImage', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = new Blob(['image data'], { type: 'image/jpeg' });
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await downloadPublicImage('public-key-1', 'etag-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/images/public/public-key-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('exportImage', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = new Blob(['image data'], { type: 'image/jpeg' });
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await exportImage('tenant', 'image-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/images/tenant/image-1/export',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('importImage', () => {
    it('should call defHttp.put with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      vi.mocked(defHttp.put).mockResolvedValue(mockResponse);

      const result = await importImage();

      expect(defHttp.put).toHaveBeenCalledWith({
        url: '/api/image/import',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateImagePublicStatus', () => {
    it('should call defHttp.put with correct URL for public status', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: ResourceInfo = {
        id: 'image-1',
        title: 'Image 1',
        contentType: 'image/jpeg',
        link: '/api/images/tenant/image-1',
        publicResourceKey: 'public-key-1',
        publicResource: true,
        etag: 'etag-1',
        descriptor: 'descriptor-1',
        preview: '/api/images/tenant/image-1/preview',
      };
      vi.mocked(defHttp.put).mockResolvedValue(mockResponse);

      const result = await updateImagePublicStatus('/api/images/tenant/image-1', true);

      expect(defHttp.put).toHaveBeenCalledWith({
        url: '/api/images/tenant/image-1/public/true',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call defHttp.put with correct URL for private status', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: ResourceInfo = {
        id: 'image-1',
        title: 'Image 1',
        contentType: 'image/jpeg',
        link: '/api/images/tenant/image-1',
        publicResourceKey: 'public-key-1',
        publicResource: false,
        etag: 'etag-1',
        descriptor: 'descriptor-1',
        preview: '/api/images/tenant/image-1/preview',
      };
      vi.mocked(defHttp.put).mockResolvedValue(mockResponse);

      const result = await updateImagePublicStatus('/api/images/tenant/image-1', false);

      expect(defHttp.put).toHaveBeenCalledWith({
        url: '/api/images/tenant/image-1/public/false',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('uploadImage', () => {
    it('should call defHttp.post with correct URL, data, headers, and progress callback', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: ResourceInfo = {
        id: 'image-1',
        title: 'Uploaded Image',
        contentType: 'image/jpeg',
        link: '/api/images/tenant/image-1',
        publicResourceKey: 'public-key-1',
        publicResource: false,
        etag: 'etag-1',
        descriptor: 'descriptor-1',
        preview: '/api/images/tenant/image-1/preview',
      };
      const file = new File(['image data'], 'image.jpg', { type: 'image/jpeg' });
      const title = 'Uploaded Image';
      const onUploadProgress = vi.fn();
      vi.mocked(defHttp.post).mockResolvedValue(mockResponse);

      const result = await uploadImage(file, title, onUploadProgress);

      expect(defHttp.post).toHaveBeenCalledWith({
        url: '/api/image',
        data: { file: file, title: title },
        headers: { 'Content-type': 'multipart/form-data' },
        onUploadProgress,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle Blob file', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: ResourceInfo = {
        id: 'image-1',
        title: 'Blob Image',
        contentType: 'image/png',
        link: '/api/images/tenant/image-1',
        publicResourceKey: 'public-key-1',
        publicResource: false,
        etag: 'etag-1',
        descriptor: 'descriptor-1',
        preview: '/api/images/tenant/image-1/preview',
      };
      const blob = new Blob(['image data'], { type: 'image/png' });
      const title = 'Blob Image';
      vi.mocked(defHttp.post).mockResolvedValue(mockResponse);

      const result = await uploadImage(blob, title);

      expect(defHttp.post).toHaveBeenCalledWith({
        url: '/api/image',
        data: { file: blob, title: title },
        headers: { 'Content-type': 'multipart/form-data' },
        onUploadProgress: undefined,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle upload without progress callback', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: ResourceInfo = {
        id: 'image-1',
        title: 'Simple Upload',
        contentType: 'image/gif',
        link: '/api/images/tenant/image-1',
        publicResourceKey: 'public-key-1',
        publicResource: false,
        etag: 'etag-1',
        descriptor: 'descriptor-1',
        preview: '/api/images/tenant/image-1/preview',
      };
      const file = new File(['image data'], 'image.gif', { type: 'image/gif' });
      const title = 'Simple Upload';
      vi.mocked(defHttp.post).mockResolvedValue(mockResponse);

      const result = await uploadImage(file, title);

      expect(defHttp.post).toHaveBeenCalledWith({
        url: '/api/image',
        data: { file: file, title: title },
        headers: { 'Content-type': 'multipart/form-data' },
        onUploadProgress: undefined,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Type definitions and edge cases', () => {
    it('should handle complex ResourceInfo object', () => {
      const resourceInfo: ResourceInfo = {
        id: 'complex-image',
        title: 'Complex Image',
        contentType: 'image/svg+xml',
        link: '/api/images/tenant/complex-image',
        publicResourceKey: 'complex-public-key',
        publicResource: true,
        etag: 'complex-etag',
        descriptor: 'complex-descriptor',
        preview: '/api/images/tenant/complex-image/preview',
      };

      expect(resourceInfo.id).toBe('complex-image');
      expect(resourceInfo.title).toBe('Complex Image');
      expect(resourceInfo.contentType).toBe('image/svg+xml');
      expect(resourceInfo.link).toBe('/api/images/tenant/complex-image');
      expect(resourceInfo.publicResourceKey).toBe('complex-public-key');
      expect(resourceInfo.publicResource).toBe(true);
      expect(resourceInfo.etag).toBe('complex-etag');
      expect(resourceInfo.descriptor).toBe('complex-descriptor');
      expect(resourceInfo.preview).toBe('/api/images/tenant/complex-image/preview');
    });

    it('should handle different image types', () => {
      const jpegImage: ResourceInfo = {
        id: 'jpeg-image',
        title: 'JPEG Image',
        contentType: 'image/jpeg',
        link: '/api/images/tenant/jpeg-image',
        publicResourceKey: 'jpeg-public-key',
        publicResource: false,
        etag: 'jpeg-etag',
        descriptor: 'jpeg-descriptor',
        preview: '/api/images/tenant/jpeg-image/preview',
      };

      const pngImage: ResourceInfo = {
        id: 'png-image',
        title: 'PNG Image',
        contentType: 'image/png',
        link: '/api/images/tenant/png-image',
        publicResourceKey: 'png-public-key',
        publicResource: true,
        etag: 'png-etag',
        descriptor: 'png-descriptor',
        preview: '/api/images/tenant/png-image/preview',
      };

      const svgImage: ResourceInfo = {
        id: 'svg-image',
        title: 'SVG Image',
        contentType: 'image/svg+xml',
        link: '/api/images/tenant/svg-image',
        publicResourceKey: 'svg-public-key',
        publicResource: false,
        etag: 'svg-etag',
        descriptor: 'svg-descriptor',
        preview: '/api/images/tenant/svg-image/preview',
      };

      expect(jpegImage.contentType).toBe('image/jpeg');
      expect(pngImage.contentType).toBe('image/png');
      expect(svgImage.contentType).toBe('image/svg+xml');
    });
  });
});
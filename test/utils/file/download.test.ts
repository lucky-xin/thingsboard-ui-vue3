import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { downloadByOnlineUrl, downloadByBase64, downloadByData, downloadByUrl } from '/@/utils/file/download';
import { dataURLtoBlob, urlToBase64 } from '/@/utils/file/base64Conver';

// Mock dependencies
vi.mock('/@/utils/file/base64Conver', () => ({
  dataURLtoBlob: vi.fn(),
  urlToBase64: vi.fn(),
}));

vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    post: vi.fn(),
  },
}));

describe('utils/file/download', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock DOM methods
    global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
    global.URL.revokeObjectURL = vi.fn();
    global.Blob = vi.fn().mockImplementation((data, options) => ({ data, options }));
    global.document.createElement = vi.fn(() => ({
      style: {},
      href: '',
      setAttribute: vi.fn(),
      click: vi.fn(),
    }));
    const mockBody = {
      appendChild: vi.fn(),
      removeChild: vi.fn(),
    };
    Object.defineProperty(global.document, 'body', {
      value: mockBody,
      writable: true,
    });
    global.window.navigator = {} as any;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('downloadByOnlineUrl', () => {
    it('should download file from online URL', async () => {
      const mockBase64 = 'data:image/png;base64,test';
      (urlToBase64 as any).mockResolvedValue(mockBase64);
      (dataURLtoBlob as any).mockReturnValue(new Blob(['test']));

      downloadByOnlineUrl('https://example.com/image.png', 'test.png');

      expect(urlToBase64).toHaveBeenCalledWith('https://example.com/image.png');
      // Wait for promise to resolve
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(dataURLtoBlob).toHaveBeenCalledWith(mockBase64);
    });
  });

  describe('downloadByBase64', () => {
    it('should download file from base64 string', () => {
      const mockBlob = new Blob(['test']);
      (dataURLtoBlob as any).mockReturnValue(mockBlob);

      downloadByBase64('data:image/png;base64,test', 'test.png');

      expect(dataURLtoBlob).toHaveBeenCalledWith('data:image/png;base64,test');
    });

    it('should download file with mime type and bom', () => {
      const mockBlob = new Blob(['test']);
      (dataURLtoBlob as any).mockReturnValue(mockBlob);

      downloadByBase64('data:image/png;base64,test', 'test.png', 'image/png', 'bom');

      expect(dataURLtoBlob).toHaveBeenCalledWith('data:image/png;base64,test');
    });
  });

  describe('downloadByData', () => {
    it('should download file with IE support', () => {
      const mockBlob = new Blob(['test']);
      const mockNav = { msSaveBlob: vi.fn() };
      (global.window.navigator as any) = mockNav;

      downloadByData(mockBlob, 'test.png');

      expect(mockNav.msSaveBlob).toHaveBeenCalledWith(mockBlob, 'test.png');
    });

    it('should download file with modern browser', () => {
      const mockBlob = new Blob(['test']);
      const mockLink = {
        style: {},
        href: '',
        setAttribute: vi.fn(),
        click: vi.fn(),
        download: 'test.png',
      };
      (global.document.createElement as any).mockReturnValue(mockLink);

      downloadByData(mockBlob, 'test.png');

      expect(global.URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
      expect(mockLink.href).toBe('blob:mock-url');
      expect(mockLink.setAttribute).toHaveBeenCalledWith('download', 'test.png');
      expect(mockLink.click).toHaveBeenCalled();
      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
    });

    it('should download file with bom data', () => {
      const mockBlob = new Blob(['test']);
      const mockLink = {
        style: {},
        href: '',
        setAttribute: vi.fn(),
        click: vi.fn(),
        download: 'test.png',
      };
      (global.document.createElement as any).mockReturnValue(mockLink);

      downloadByData(mockBlob, 'test.png', 'image/png', 'bom');

      expect(global.Blob).toHaveBeenCalledWith(['bom', mockBlob], { type: 'image/png' });
    });

    it('should handle download attribute not supported', () => {
      const mockBlob = new Blob(['test']);
      const mockLink = {
        style: {},
        href: '',
        setAttribute: vi.fn(),
        click: vi.fn(),
        download: undefined, // Simulate unsupported download
      };
      (global.document.createElement as any).mockReturnValue(mockLink);

      downloadByData(mockBlob, 'test.png');

      expect(mockLink.setAttribute).toHaveBeenCalledWith('target', '_blank');
    });
  });

  describe('downloadByUrl', () => {
    it('should download file from URL with response', async () => {
      const mockResponse = {
        data: new Blob(['test']),
        headers: {
          'content-disposition': 'attachment; filename="test.png"',
        },
      };
      const { defHttp } = await import('/@/utils/http/axios');
      (defHttp.post as any).mockResolvedValue(mockResponse);

      const result = await downloadByUrl({
        url: 'https://example.com/download',
        fileName: 'test.png',
      });

      expect(defHttp.post).toHaveBeenCalledWith(
        { url: 'https://example.com/download', params: undefined, data: undefined, responseType: 'blob' },
        { isReturnNativeResponse: true, joinPrefix: false }
      );
      expect(result).toBe(true);
    });

    it('should download file with params and data', async () => {
      const mockResponse = {
        data: new Blob(['test']),
        headers: {},
      };
      const { defHttp } = await import('/@/utils/http/axios');
      (defHttp.post as any).mockResolvedValue(mockResponse);

      const result = await downloadByUrl({
        url: 'https://example.com/download',
        params: { id: 1 },
        data: { name: 'test' },
        fileName: 'test.png',
      });

      expect(defHttp.post).toHaveBeenCalledWith(
        { url: 'https://example.com/download', params: { id: 1 }, data: { name: 'test' }, responseType: 'blob' },
        { isReturnNativeResponse: true, joinPrefix: false }
      );
      expect(result).toBe(true);
    });

    it('should handle filename from content-disposition header', async () => {
      const mockResponse = {
        data: new Blob(['test']),
        headers: {
          'content-disposition': 'attachment; filename="encoded%20file.png"',
        },
      };
      const { defHttp } = await import('/@/utils/http/axios');
      (defHttp.post as any).mockResolvedValue(mockResponse);

      await downloadByUrl({
        url: 'https://example.com/download',
      });

      expect(defHttp.post).toHaveBeenCalled();
    });

    it('should handle utf-8 encoded filename', async () => {
      const mockResponse = {
        data: new Blob(['test']),
        headers: {
          'content-disposition': 'attachment; filename="utf-8\'zh_cn\'encoded%20file.png"',
        },
      };
      const { defHttp } = await import('/@/utils/http/axios');
      (defHttp.post as any).mockResolvedValue(mockResponse);

      await downloadByUrl({
        url: 'https://example.com/download',
      });

      expect(defHttp.post).toHaveBeenCalled();
    });

    it('should use default filename when no content-disposition', async () => {
      const mockResponse = {
        data: new Blob(['test']),
        headers: {},
      };
      const { defHttp } = await import('/@/utils/http/axios');
      (defHttp.post as any).mockResolvedValue(mockResponse);

      await downloadByUrl({
        url: 'https://example.com/download',
        fileName: 'custom.png',
      });

      expect(defHttp.post).toHaveBeenCalled();
    });
  });
});

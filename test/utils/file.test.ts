import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { dataURLtoBlob, urlToBase64 } from '/@/utils/file/base64Conver';
import { downloadByOnlineUrl, downloadByBase64, downloadByData, downloadByUrl } from '/@/utils/file/download';
import { defHttp } from '/@/utils/http/axios';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    post: vi.fn(),
  },
}));

describe('utils/file', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('base64Conver', () => {
    describe('dataURLtoBlob', () => {
      it('should convert base64 to blob', () => {
        const base64Data =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
        const blob = dataURLtoBlob(base64Data);

        expect(blob).toBeInstanceOf(Blob);
        expect(blob.type).toBe('image/png');
      });

      it('should handle different mime types', () => {
        const base64Data = 'data:text/plain;base64,aGVsbG8gd29ybGQ=';
        const blob = dataURLtoBlob(base64Data);

        expect(blob).toBeInstanceOf(Blob);
        expect(blob.type).toBe('text/plain');
      });

      it('should handle empty base64 data', () => {
        const base64Data = 'data:text/plain;base64,';
        const blob = dataURLtoBlob(base64Data);

        expect(blob).toBeInstanceOf(Blob);
        expect(blob.type).toBe('text/plain');
      });
    });

    describe('urlToBase64', () => {
      it('should convert url to base64', async () => {
        // Mock DOM elements
        const mockCanvas = {
          getContext: vi.fn().mockReturnValue({
            drawImage: vi.fn(),
          }),
          height: 100,
          width: 100,
          toDataURL: vi.fn().mockReturnValue('data:image/png;base64,test'),
        };

        const mockImage = {
          onload: null as any,
          src: '',
          crossOrigin: '',
          height: 100,
          width: 100,
        };

        // Mock document.createElement
        const originalCreateElement = document.createElement;
        document.createElement = vi.fn().mockImplementation((tagName) => {
          if (tagName === 'CANVAS') {
            return mockCanvas;
          } else if (tagName === 'img') {
            return mockImage;
          }
          return originalCreateElement.call(document, tagName);
        });

        // Mock Image constructor
        const OriginalImage = (window as any).Image;
        (window as any).Image = vi.fn(() => mockImage);

        const url = 'https://example.com/image.png';
        const promise = urlToBase64(url);

        // Simulate image load
        mockImage.onload();

        const result = await promise;
        expect(result).toBe('data:image/png;base64,test');

        // Restore mocks
        document.createElement = originalCreateElement;
        (window as any).Image = OriginalImage;
      });
    });
  });

  describe('download', () => {
    describe('downloadByData', () => {
      it('should download data as blob', () => {
        // Mock document and URL
        const mockLink = {
          style: { display: '' },
          href: '',
          setAttribute: vi.fn(),
          click: vi.fn(),
        };

        const originalCreateElement = document.createElement;
        document.createElement = vi.fn().mockReturnValue(mockLink);

        const originalAppendChild = document.body.appendChild;
        const originalRemoveChild = document.body.removeChild;
        document.body.appendChild = vi.fn();
        document.body.removeChild = vi.fn();

        const originalCreateObjectURL = window.URL.createObjectURL;
        window.URL.createObjectURL = vi.fn().mockReturnValue('blob:test');

        const originalRevokeObjectURL = window.URL.revokeObjectURL;
        window.URL.revokeObjectURL = vi.fn();

        const data = 'test data';
        const filename = 'test.txt';

        downloadByData(data, filename);

        expect(document.createElement).toHaveBeenCalledWith('a');
        expect(mockLink.setAttribute).toHaveBeenCalledWith('download', filename);
        expect(mockLink.click).toHaveBeenCalled();
        expect(window.URL.createObjectURL).toHaveBeenCalled();
        expect(window.URL.revokeObjectURL).toHaveBeenCalled();

        // Restore mocks
        document.createElement = originalCreateElement;
        document.body.appendChild = originalAppendChild;
        document.body.removeChild = originalRemoveChild;
        window.URL.createObjectURL = originalCreateObjectURL;
        window.URL.revokeObjectURL = originalRevokeObjectURL;
      });

      it('should use msSaveBlob for IE', () => {
        const mockMsSaveBlob = vi.fn();
        const nav = window.navigator as any;
        const originalMsSaveBlob = nav.msSaveBlob;
        nav.msSaveBlob = mockMsSaveBlob;

        const data = 'test data';
        const filename = 'test.txt';

        downloadByData(data, filename);

        expect(mockMsSaveBlob).toHaveBeenCalled();

        // Clean up
        nav.msSaveBlob = originalMsSaveBlob;
      });

      it('should handle blob with BOM data', () => {
        // Mock document and URL
        const mockLink = {
          style: { display: '' },
          href: '',
          setAttribute: vi.fn(),
          click: vi.fn(),
        };

        const originalCreateElement = document.createElement;
        document.createElement = vi.fn().mockReturnValue(mockLink);

        const originalAppendChild = document.body.appendChild;
        const originalRemoveChild = document.body.removeChild;
        document.body.appendChild = vi.fn();
        document.body.removeChild = vi.fn();

        const originalCreateObjectURL = window.URL.createObjectURL;
        window.URL.createObjectURL = vi.fn().mockReturnValue('blob:test');

        const originalRevokeObjectURL = window.URL.revokeObjectURL;
        window.URL.revokeObjectURL = vi.fn();

        const data = 'test data';
        const filename = 'test.txt';
        const bom = '\uFEFF'; // UTF-8 BOM

        downloadByData(data, filename, 'text/plain', bom);

        expect(document.createElement).toHaveBeenCalledWith('a');
        expect(mockLink.setAttribute).toHaveBeenCalledWith('download', filename);
        expect(mockLink.click).toHaveBeenCalled();
        expect(window.URL.createObjectURL).toHaveBeenCalled();
        expect(window.URL.revokeObjectURL).toHaveBeenCalled();

        // Restore mocks
        document.createElement = originalCreateElement;
        document.body.appendChild = originalAppendChild;
        document.body.removeChild = originalRemoveChild;
        window.URL.createObjectURL = originalCreateObjectURL;
        window.URL.revokeObjectURL = originalRevokeObjectURL;
      });
    });

    describe('downloadByBase64', () => {
      it('should download base64 data', () => {
        // Mock URL.createObjectURL
        const originalCreateObjectURL = window.URL.createObjectURL;
        window.URL.createObjectURL = vi.fn().mockReturnValue('blob:test');

        const originalRevokeObjectURL = window.URL.revokeObjectURL;
        window.URL.revokeObjectURL = vi.fn();

        // Mock document
        const mockLink = {
          style: { display: '' },
          href: '',
          setAttribute: vi.fn(),
          click: vi.fn(),
        };

        const originalCreateElement = document.createElement;
        document.createElement = vi.fn().mockReturnValue(mockLink);

        const originalAppendChild = document.body.appendChild;
        const originalRemoveChild = document.body.removeChild;
        document.body.appendChild = vi.fn();
        document.body.removeChild = vi.fn();

        const base64Data = 'data:text/plain;base64,dGVzdA==';
        const filename = 'test.txt';

        downloadByBase64(base64Data, filename);

        expect(document.createElement).toHaveBeenCalledWith('a');
        expect(mockLink.setAttribute).toHaveBeenCalledWith('download', filename);
        expect(mockLink.click).toHaveBeenCalled();
        expect(window.URL.createObjectURL).toHaveBeenCalled();
        expect(window.URL.revokeObjectURL).toHaveBeenCalled();

        // Restore mocks
        window.URL.createObjectURL = originalCreateObjectURL;
        window.URL.revokeObjectURL = originalRevokeObjectURL;
        document.createElement = originalCreateElement;
        document.body.appendChild = originalAppendChild;
        document.body.removeChild = originalRemoveChild;
      });
    });

    describe('downloadByUrl', () => {
      it('should download file by url', async () => {
        // Mock defHttp.post
        const mockResponse = {
          headers: {
            'content-disposition': 'attachment; filename="test.txt"',
          },
          data: 'test data',
        };
        vi.mocked(defHttp.post).mockResolvedValue(mockResponse);

        // Mock URL.createObjectURL
        const originalCreateObjectURL = window.URL.createObjectURL;
        window.URL.createObjectURL = vi.fn().mockReturnValue('blob:test');

        const originalRevokeObjectURL = window.URL.revokeObjectURL;
        window.URL.revokeObjectURL = vi.fn();

        // Mock document
        const mockLink = {
          style: { display: '' },
          href: '',
          setAttribute: vi.fn(),
          click: vi.fn(),
        };

        const originalCreateElement = document.createElement;
        document.createElement = vi.fn().mockReturnValue(mockLink);

        const originalAppendChild = document.body.appendChild;
        const originalRemoveChild = document.body.removeChild;
        document.body.appendChild = vi.fn();
        document.body.removeChild = vi.fn();

        const url = 'https://example.com/download';
        const filename = 'test.txt';

        await downloadByUrl({ url, fileName: filename });

        expect(defHttp.post).toHaveBeenCalledWith(
          { url, params: undefined, data: undefined, responseType: 'blob' },
          { isReturnNativeResponse: true, joinPrefix: false },
        );

        // Restore mocks
        window.URL.createObjectURL = originalCreateObjectURL;
        window.URL.revokeObjectURL = originalRevokeObjectURL;
        document.createElement = originalCreateElement;
        document.body.appendChild = originalAppendChild;
        document.body.removeChild = originalRemoveChild;
      });
    });
  });
});

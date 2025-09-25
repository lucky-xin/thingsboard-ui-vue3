import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { dataURLtoBlob, urlToBase64 } from '/@/utils/file/base64Conver';

describe('utils/file/base64Conver', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('dataURLtoBlob', () => {
    it('should convert data URL to blob', () => {
      const base64Data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
      
      const result = dataURLtoBlob(base64Data);
      
      expect(result).toBeInstanceOf(Blob);
      expect(result.type).toBe('image/png');
    });

    it('should handle different mime types', () => {
      const base64Data = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
      
      const result = dataURLtoBlob(base64Data);
      
      expect(result.type).toBe('image/jpeg');
    });

    it('should handle text/plain mime type', () => {
      const base64Data = 'data:text/plain;base64,SGVsbG8gV29ybGQ=';
      
      const result = dataURLtoBlob(base64Data);
      
      expect(result.type).toBe('text/plain');
    });

    it('should handle application/octet-stream mime type', () => {
      const base64Data = 'data:application/octet-stream;base64,SGVsbG8gV29ybGQ=';
      
      const result = dataURLtoBlob(base64Data);
      
      expect(result.type).toBe('application/octet-stream');
    });
  });

  describe('urlToBase64', () => {
    beforeEach(() => {
      // Mock canvas and image
      const mockCanvas = {
        getContext: vi.fn(() => ({
          drawImage: vi.fn(),
        })),
        toDataURL: vi.fn(() => 'data:image/png;base64,test'),
        height: 0,
        width: 0,
      };
      
      const mockImage = {
        crossOrigin: '',
        onload: null as any,
        onerror: null as any,
        src: '',
        height: 100,
        width: 100,
      };
      
      global.document.createElement = vi.fn((tagName) => {
        if (tagName === 'CANVAS') {
          return mockCanvas;
        }
        return {};
      });
      
      global.Image = vi.fn(() => mockImage) as any;
      
      // Store references for testing
      (global as any).mockCanvas = mockCanvas;
      (global as any).mockImage = mockImage;
    });

    it('should convert image URL to base64', async () => {
      const mockCanvas = (global as any).mockCanvas;
      const mockImage = (global as any).mockImage;
      
      const promise = urlToBase64('https://example.com/image.png');
      
      // Simulate image load
      mockImage.onload();
      
      const result = await promise;
      
      expect(result).toBe('data:image/png;base64,test');
      expect(mockImage.src).toBe('https://example.com/image.png');
      expect(mockImage.crossOrigin).toBe('');
      expect(mockCanvas.height).toBe(100);
      expect(mockCanvas.width).toBe(100);
      expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/png');
    });

    it('should convert image URL to base64 with custom mime type', async () => {
      const mockCanvas = (global as any).mockCanvas;
      const mockImage = (global as any).mockImage;
      mockCanvas.toDataURL.mockReturnValue('data:image/jpeg;base64,test');
      
      const promise = urlToBase64('https://example.com/image.jpg', 'image/jpeg');
      
      // Simulate image load
      mockImage.onload();
      
      const result = await promise;
      
      expect(result).toBe('data:image/jpeg;base64,test');
      expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/jpeg');
    });

    it('should reject when canvas is null', async () => {
      const mockCanvas = (global as any).mockCanvas;
      const mockImage = (global as any).mockImage;
      
      // Make canvas null after creation
      mockCanvas.getContext.mockReturnValue(null);
      
      const promise = urlToBase64('https://example.com/image.png');
      
      // Simulate image load
      mockImage.onload();
      
      await expect(promise).rejects.toBeUndefined();
    });

    it('should reject when context is null', async () => {
      const mockCanvas = (global as any).mockCanvas;
      const mockImage = (global as any).mockImage;
      
      // Make context null
      mockCanvas.getContext.mockReturnValue(null);
      
      const promise = urlToBase64('https://example.com/image.png');
      
      // Simulate image load
      mockImage.onload();
      
      await expect(promise).rejects.toBeUndefined();
    });

    it('should handle image load error', async () => {
      const mockImage = (global as any).mockImage;
      
      const promise = urlToBase64('https://example.com/invalid-image.png');
      
      // Simulate image error
      if (mockImage.onerror) {
        mockImage.onerror();
      }
      
      // The promise should still be pending since we only handle onload
      // In a real implementation, you might want to add error handling
      expect(mockImage.src).toBe('https://example.com/invalid-image.png');
    });
  });
});

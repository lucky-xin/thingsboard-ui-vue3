import { describe, it, expect } from 'vitest';
import { ContentType, LogoType, RenderQrCodeParams, ToCanvasFn, QrCodeActionType, QrcodeDoneEventParams } from '/@/components/Qrcode/src/typing';

describe('components/Qrcode/src/typing', () => {
  describe('ContentType', () => {
    it('should support string content', () => {
      const content: ContentType = 'https://example.com';
      expect(typeof content).toBe('string');
      expect(content).toBe('https://example.com');
    });

    it('should support QRCodeSegment array', () => {
      const content: ContentType = [
        { data: 'https://example.com', mode: 'byte' },
        { data: 'Hello World', mode: 'byte' },
      ];
      expect(Array.isArray(content)).toBe(true);
      expect(content[0].data).toBe('https://example.com');
      expect(content[1].data).toBe('Hello World');
    });

    it('should support empty string', () => {
      const content: ContentType = '';
      expect(content).toBe('');
    });

    it('should support empty array', () => {
      const content: ContentType = [];
      expect(Array.isArray(content)).toBe(true);
      expect(content).toHaveLength(0);
    });
  });

  describe('LogoType', () => {
    it('should have correct interface structure', () => {
      const logo: LogoType = {
        src: 'logo.png',
        logoSize: 50,
        borderColor: '#000000',
        bgColor: '#ffffff',
        borderSize: 2,
        crossOrigin: 'anonymous',
        borderRadius: 5,
        logoRadius: 3,
      };

      expect(logo.src).toBe('logo.png');
      expect(logo.logoSize).toBe(50);
      expect(logo.borderColor).toBe('#000000');
      expect(logo.bgColor).toBe('#ffffff');
      expect(logo.borderSize).toBe(2);
      expect(logo.crossOrigin).toBe('anonymous');
      expect(logo.borderRadius).toBe(5);
      expect(logo.logoRadius).toBe(3);
    });

    it('should support different logo sizes', () => {
      const logo: LogoType = {
        src: 'small-logo.png',
        logoSize: 20,
        borderColor: '#333333',
        bgColor: '#f0f0f0',
        borderSize: 1,
        crossOrigin: 'use-credentials',
        borderRadius: 10,
        logoRadius: 5,
      };

      expect(logo.logoSize).toBe(20);
      expect(logo.borderSize).toBe(1);
      expect(logo.borderRadius).toBe(10);
      expect(logo.logoRadius).toBe(5);
    });

    it('should support zero values', () => {
      const logo: LogoType = {
        src: 'transparent-logo.png',
        logoSize: 0,
        borderColor: 'transparent',
        bgColor: 'transparent',
        borderSize: 0,
        crossOrigin: '',
        borderRadius: 0,
        logoRadius: 0,
      };

      expect(logo.logoSize).toBe(0);
      expect(logo.borderSize).toBe(0);
      expect(logo.borderRadius).toBe(0);
      expect(logo.logoRadius).toBe(0);
    });
  });

  describe('RenderQrCodeParams', () => {
    it('should have correct interface structure', () => {
      const canvas = document.createElement('canvas');
      const image = new Image();
      const logo: LogoType = {
        src: 'logo.png',
        logoSize: 50,
        borderColor: '#000000',
        bgColor: '#ffffff',
        borderSize: 2,
        crossOrigin: 'anonymous',
        borderRadius: 5,
        logoRadius: 3,
      };

      const params: RenderQrCodeParams = {
        canvas,
        content: 'https://example.com',
        width: 200,
        options: { margin: 2 },
        logo,
        image,
        downloadName: 'qrcode.png',
        download: true,
      };

      expect(params.canvas).toBe(canvas);
      expect(params.content).toBe('https://example.com');
      expect(params.width).toBe(200);
      expect(params.options).toEqual({ margin: 2 });
      expect(params.logo).toBe(logo);
      expect(params.image).toBe(image);
      expect(params.downloadName).toBe('qrcode.png');
      expect(params.download).toBe(true);
    });

    it('should support optional properties', () => {
      const canvas = document.createElement('canvas');
      const params: RenderQrCodeParams = {
        canvas,
        content: 'https://example.com',
      };

      expect(params.canvas).toBe(canvas);
      expect(params.content).toBe('https://example.com');
      expect(params.width).toBeUndefined();
      expect(params.options).toBeUndefined();
      expect(params.logo).toBeUndefined();
      expect(params.image).toBeUndefined();
      expect(params.downloadName).toBeUndefined();
      expect(params.download).toBeUndefined();
    });

    it('should support logo as string', () => {
      const canvas = document.createElement('canvas');
      const params: RenderQrCodeParams = {
        canvas,
        content: 'https://example.com',
        logo: 'logo.png',
      };

      expect(params.logo).toBe('logo.png');
    });

    it('should support download as function', () => {
      const canvas = document.createElement('canvas');
      const downloadFn = vi.fn();
      const params: RenderQrCodeParams = {
        canvas,
        content: 'https://example.com',
        download: downloadFn,
      };

      expect(params.download).toBe(downloadFn);
    });

    it('should support QRCodeSegment array content', () => {
      const canvas = document.createElement('canvas');
      const params: RenderQrCodeParams = {
        canvas,
        content: [
          { data: 'https://example.com', mode: 'byte' },
          { data: 'Hello World', mode: 'byte' },
        ],
      };

      expect(Array.isArray(params.content)).toBe(true);
      expect((params.content as any)[0].data).toBe('https://example.com');
    });
  });

  describe('ToCanvasFn', () => {
    it('should be a function type that returns Promise', () => {
      const toCanvasFn: ToCanvasFn = vi.fn().mockResolvedValue({});
      expect(toCanvasFn).toBeInstanceOf(Function);
    });

    it('should accept RenderQrCodeParams', async () => {
      const toCanvasFn: ToCanvasFn = vi.fn().mockResolvedValue({});
      const params: RenderQrCodeParams = {
        canvas: document.createElement('canvas'),
        content: 'https://example.com',
      };

      const result = await toCanvasFn(params);
      expect(toCanvasFn).toHaveBeenCalledWith(params);
      expect(result).toEqual({});
    });
  });

  describe('QrCodeActionType', () => {
    it('should have correct interface structure', () => {
      const action: QrCodeActionType = {
        download: vi.fn(),
      };

      expect(action.download).toBeInstanceOf(Function);
    });

    it('should support download with filename', () => {
      const downloadFn = vi.fn();
      const action: QrCodeActionType = {
        download: downloadFn,
      };

      action.download('my-qrcode.png');
      expect(downloadFn).toHaveBeenCalledWith('my-qrcode.png');
    });

    it('should support download without filename', () => {
      const downloadFn = vi.fn();
      const action: QrCodeActionType = {
        download: downloadFn,
      };

      action.download();
      expect(downloadFn).toHaveBeenCalled();
    });
  });

  describe('QrcodeDoneEventParams', () => {
    it('should have correct interface structure', () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const params: QrcodeDoneEventParams = {
        url: 'data:image/png;base64,test',
        ctx,
      };

      expect(params.url).toBe('data:image/png;base64,test');
      expect(params.ctx).toBe(ctx);
    });

    it('should support optional ctx', () => {
      const params: QrcodeDoneEventParams = {
        url: 'data:image/jpeg;base64,test',
      };

      expect(params.url).toBe('data:image/jpeg;base64,test');
      expect(params.ctx).toBeUndefined();
    });

    it('should support null ctx', () => {
      const params: QrcodeDoneEventParams = {
        url: 'data:image/png;base64,test',
        ctx: null,
      };

      expect(params.url).toBe('data:image/png;base64,test');
      expect(params.ctx).toBeNull();
    });

    it('should support different URL formats', () => {
      const params: QrcodeDoneEventParams = {
        url: 'blob:http://localhost:3000/12345678-1234-1234-1234-123456789abc',
      };

      expect(params.url).toBe('blob:http://localhost:3000/12345678-1234-1234-1234-123456789abc');
    });
  });
});

import { describe, it, expect } from 'vitest';
import { CropendResult } from '/@/components/Cropper/src/typing';

// Mock Cropper types
interface MockCropperData {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
  scaleX: number;
  scaleY: number;
}

describe('components/Cropper/src/typing', () => {
  describe('CropendResult', () => {
    it('should have correct interface structure', () => {
      const mockData: MockCropperData = {
        x: 100,
        y: 200,
        width: 300,
        height: 400,
        rotate: 0,
        scaleX: 1,
        scaleY: 1,
      };

      const result: CropendResult = {
        imgBase64: 'data:image/png;base64,test',
        imgInfo: mockData as any,
      };

      expect(result.imgBase64).toBe('data:image/png;base64,test');
      expect(result.imgInfo).toBe(mockData);
    });

    it('should support different base64 formats', () => {
      const mockData: MockCropperData = {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        rotate: 90,
        scaleX: 1,
        scaleY: 1,
      };

      const result: CropendResult = {
        imgBase64: 'data:image/jpeg;base64,test',
        imgInfo: mockData as any,
      };

      expect(result.imgBase64).toBe('data:image/jpeg;base64,test');
      expect(result.imgInfo).toBe(mockData);
    });

    it('should support empty base64 string', () => {
      const mockData: MockCropperData = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        rotate: 0,
        scaleX: 1,
        scaleY: 1,
      };

      const result: CropendResult = {
        imgBase64: '',
        imgInfo: mockData as any,
      };

      expect(result.imgBase64).toBe('');
      expect(result.imgInfo).toBe(mockData);
    });

    it('should support different image info properties', () => {
      const mockData: MockCropperData = {
        x: 50,
        y: 75,
        width: 250,
        height: 350,
        rotate: 45,
        scaleX: 2,
        scaleY: 0.5,
      };

      const result: CropendResult = {
        imgBase64: 'data:image/gif;base64,test',
        imgInfo: mockData as any,
      };

      expect(result.imgInfo.x).toBe(50);
      expect(result.imgInfo.y).toBe(75);
      expect(result.imgInfo.width).toBe(250);
      expect(result.imgInfo.height).toBe(350);
      expect(result.imgInfo.rotate).toBe(45);
      expect(result.imgInfo.scaleX).toBe(2);
      expect(result.imgInfo.scaleY).toBe(0.5);
    });

    it('should support negative coordinates', () => {
      const mockData: MockCropperData = {
        x: -10,
        y: -20,
        width: 100,
        height: 100,
        rotate: 0,
        scaleX: 1,
        scaleY: 1,
      };

      const result: CropendResult = {
        imgBase64: 'data:image/png;base64,test',
        imgInfo: mockData as any,
      };

      expect(result.imgInfo.x).toBe(-10);
      expect(result.imgInfo.y).toBe(-20);
    });

    it('should support zero dimensions', () => {
      const mockData: MockCropperData = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        rotate: 0,
        scaleX: 1,
        scaleY: 1,
      };

      const result: CropendResult = {
        imgBase64: 'data:image/png;base64,test',
        imgInfo: mockData as any,
      };

      expect(result.imgInfo.width).toBe(0);
      expect(result.imgInfo.height).toBe(0);
    });
  });
});

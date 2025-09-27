import { describe, it, expect } from 'vitest';
import { MarkDownActionType } from '/@/components/Markdown/src/typing';

// Mock Vditor
const mockVditor = {
  getValue: vi.fn(),
  setValue: vi.fn(),
  insertValue: vi.fn(),
  focus: vi.fn(),
  blur: vi.fn(),
  disabled: vi.fn(),
  enable: vi.fn(),
  destroy: vi.fn(),
};

describe('components/Markdown/src/typing', () => {
  describe('MarkDownActionType', () => {
    it('should have correct interface structure', () => {
      const action: MarkDownActionType = {
        getVditor: vi.fn(() => mockVditor),
      };

      expect(action.getVditor).toBeInstanceOf(Function);
    });

    it('should return Vditor instance', () => {
      const action: MarkDownActionType = {
        getVditor: vi.fn(() => mockVditor),
      };

      const vditor = action.getVditor();
      expect(vditor).toBe(mockVditor);
    });

    it('should support different Vditor instances', () => {
      const mockVditor1 = { ...mockVditor, id: 'vditor1' };
      const mockVditor2 = { ...mockVditor, id: 'vditor2' };

      const action1: MarkDownActionType = {
        getVditor: vi.fn(() => mockVditor1),
      };

      const action2: MarkDownActionType = {
        getVditor: vi.fn(() => mockVditor2),
      };

      expect(action1.getVditor()).toBe(mockVditor1);
      expect(action2.getVditor()).toBe(mockVditor2);
    });

    it('should support async getVditor', () => {
      const action: MarkDownActionType = {
        getVditor: vi.fn(() => Promise.resolve(mockVditor)),
      };

      expect(action.getVditor).toBeInstanceOf(Function);
    });

    it('should support getVditor with parameters', () => {
      const action: MarkDownActionType = {
        getVditor: vi.fn((id: string) => ({ ...mockVditor, id })),
      };

      const vditor = action.getVditor('test-id');
      expect(vditor.id).toBe('test-id');
    });

    it('should support getVditor returning null', () => {
      const action: MarkDownActionType = {
        getVditor: vi.fn(() => null),
      };

      const vditor = action.getVditor();
      expect(vditor).toBeNull();
    });

    it('should support getVditor returning undefined', () => {
      const action: MarkDownActionType = {
        getVditor: vi.fn(() => undefined),
      };

      const vditor = action.getVditor();
      expect(vditor).toBeUndefined();
    });
  });
});

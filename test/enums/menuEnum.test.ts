import { describe, it, expect } from 'vitest';
import {
  MenuTypeEnum,
  TriggerEnum,
  MenuModeEnum,
  MenuSplitTyeEnum,
  TopMenuAlignEnum,
  MixSidebarTriggerEnum,
} from '/@/enums/menuEnum';

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme.css',
  writable: true
});
Object.defineProperty(globalThis, '__VITE_PLUGIN_THEME__', {
  value: true,
  writable: true
});

describe('menuEnum', () => {
  describe('MenuTypeEnum', () => {
    it('should have correct values', () => {
      expect(MenuTypeEnum.SIDEBAR).toBe('sidebar');
      expect(MenuTypeEnum.MIX_SIDEBAR).toBe('mix-sidebar');
      expect(MenuTypeEnum.MIX).toBe('mix');
      expect(MenuTypeEnum.TOP_MENU).toBe('top-menu');
    });
  });

  describe('TriggerEnum', () => {
    it('should have correct values', () => {
      expect(TriggerEnum.NONE).toBe('NONE');
      expect(TriggerEnum.FOOTER).toBe('FOOTER');
      expect(TriggerEnum.HEADER).toBe('HEADER');
    });
  });

  describe('MenuModeEnum', () => {
    it('should have correct values', () => {
      expect(MenuModeEnum.VERTICAL).toBe('vertical');
      expect(MenuModeEnum.HORIZONTAL).toBe('horizontal');
      expect(MenuModeEnum.VERTICAL_RIGHT).toBe('vertical-right');
      expect(MenuModeEnum.INLINE).toBe('inline');
    });
  });

  describe('MenuSplitTyeEnum', () => {
    it('should have correct values', () => {
      expect(MenuSplitTyeEnum.NONE).toBe(0);
      expect(MenuSplitTyeEnum.TOP).toBe(1);
      expect(MenuSplitTyeEnum.LEFT).toBe(2);
    });
  });

  describe('TopMenuAlignEnum', () => {
    it('should have correct values', () => {
      expect(TopMenuAlignEnum.CENTER).toBe('center');
      expect(TopMenuAlignEnum.START).toBe('start');
      expect(TopMenuAlignEnum.END).toBe('end');
    });
  });

  describe('MixSidebarTriggerEnum', () => {
    it('should have correct values', () => {
      expect(MixSidebarTriggerEnum.HOVER).toBe('hover');
      expect(MixSidebarTriggerEnum.CLICK).toBe('click');
    });
  });
});

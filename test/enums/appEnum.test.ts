import { describe, it, expect } from 'vitest';
import {
  SIDE_BAR_MINI_WIDTH,
  SIDE_BAR_SHOW_TIT_MINI_WIDTH,
  ContentEnum,
  ThemeEnum,
  SettingButtonPositionEnum,
  SessionTimeoutProcessingEnum,
  PermissionModeEnum,
  RouterTransitionEnum,
} from '/@/enums/appEnum';

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme.css',
  writable: true
});
Object.defineProperty(globalThis, '__VITE_PLUGIN_THEME__', {
  value: true,
  writable: true
});

describe('appEnum', () => {
  describe('Constants', () => {
    it('should have correct constant values', () => {
      expect(SIDE_BAR_MINI_WIDTH).toBe(48);
      expect(SIDE_BAR_SHOW_TIT_MINI_WIDTH).toBe(80);
    });
  });

  describe('ContentEnum', () => {
    it('should have correct values', () => {
      expect(ContentEnum.FULL).toBe('full');
      expect(ContentEnum.FIXED).toBe('fixed');
    });
  });

  describe('ThemeEnum', () => {
    it('should have correct values', () => {
      expect(ThemeEnum.DARK).toBe('dark');
      expect(ThemeEnum.LIGHT).toBe('light');
    });
  });

  describe('SettingButtonPositionEnum', () => {
    it('should have correct values', () => {
      expect(SettingButtonPositionEnum.AUTO).toBe('auto');
      expect(SettingButtonPositionEnum.HEADER).toBe('header');
      expect(SettingButtonPositionEnum.FIXED).toBe('fixed');
    });
  });

  describe('SessionTimeoutProcessingEnum', () => {
    it('should have correct values', () => {
      expect(SessionTimeoutProcessingEnum.ROUTE_JUMP).toBe(0);
      expect(SessionTimeoutProcessingEnum.PAGE_COVERAGE).toBe(1);
    });
  });

  describe('PermissionModeEnum', () => {
    it('should have correct values', () => {
      expect(PermissionModeEnum.ROLE).toBe('ROLE');
      expect(PermissionModeEnum.BACK).toBe('BACK');
      expect(PermissionModeEnum.ROUTE_MAPPING).toBe('ROUTE_MAPPING');
    });
  });

  describe('RouterTransitionEnum', () => {
    it('should have correct values', () => {
      expect(RouterTransitionEnum.ZOOM_FADE).toBe('zoom-fade');
      expect(RouterTransitionEnum.ZOOM_OUT).toBe('zoom-out');
      expect(RouterTransitionEnum.FADE_SIDE).toBe('fade-slide');
      expect(RouterTransitionEnum.FADE).toBe('fade');
      expect(RouterTransitionEnum.FADE_BOTTOM).toBe('fade-bottom');
      expect(RouterTransitionEnum.FADE_SCALE).toBe('fade-scale');
    });
  });
});

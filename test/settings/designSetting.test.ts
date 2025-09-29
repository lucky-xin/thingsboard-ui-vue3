import { describe, it, expect } from 'vitest';
import {
  darkMode,
  HEADER_PRESET_BG_COLOR_LIST,
  APP_PRESET_COLOR_LIST,
  SIDE_BAR_BG_COLOR_LIST,
} from '/@/settings/designSetting';
import { ThemeEnum } from '/@/enums/appEnum';

describe('settings/designSetting', () => {
  it('should export correct darkMode', () => {
    expect(darkMode).toBe(ThemeEnum.LIGHT);
  });

  it('should export HEADER_PRESET_BG_COLOR_LIST with correct values', () => {
    expect(HEADER_PRESET_BG_COLOR_LIST).toEqual([
      '#1951be',
      '#1890ff',
      '#001529',
      '#ffffff',
      '#009688',
      '#5172DC',
      '#e74c3c',
      '#151515',
      '#24292e',
      '#394664',
      '#383f45',
    ]);
    expect(HEADER_PRESET_BG_COLOR_LIST).toHaveLength(11);
  });

  it('should export APP_PRESET_COLOR_LIST with correct values', () => {
    expect(APP_PRESET_COLOR_LIST).toEqual([
      '#2a50ec',
      '#1890ff',
      '#009688',
      '#536dfe',
      '#ff5c93',
      '#ee4f12',
      '#0096c7',
      '#9c27b0',
      '#ff9800',
    ]);
    expect(APP_PRESET_COLOR_LIST).toHaveLength(9);
  });

  it('should export SIDE_BAR_BG_COLOR_LIST with correct values', () => {
    expect(SIDE_BAR_BG_COLOR_LIST).toEqual([
      '#ffffff',
      '#001529',
      '#273352',
      '#151515',
      '#191b24',
      '#191a23',
      '#304156',
      '#001628',
      '#28333E',
      '#344058',
      '#383f45',
    ]);
    expect(SIDE_BAR_BG_COLOR_LIST).toHaveLength(11);
  });
});

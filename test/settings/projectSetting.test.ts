import { describe, it, expect } from 'vitest';
import setting from '/@/settings/projectSetting';
import {
  MenuTypeEnum,
  MenuModeEnum,
  TriggerEnum,
  MixSidebarTriggerEnum,
} from '/@/enums/menuEnum';
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  SessionTimeoutProcessingEnum,
} from '/@/enums/appEnum';
import { CacheTypeEnum } from '/@/enums/cacheEnum';

describe('settings/projectSetting', () => {
  it('should have correct basic configuration', () => {
    expect(setting.showSettingButton).toBe(true);
    expect(setting.showDarkModeToggle).toBe(true);
    expect(setting.settingButtonPosition).toBe(SettingButtonPositionEnum.AUTO);
    expect(setting.permissionMode).toBe(PermissionModeEnum.ROUTE_MAPPING);
    expect(setting.permissionCacheType).toBe(CacheTypeEnum.SESSION);
    expect(setting.sessionTimeoutProcessing).toBe(SessionTimeoutProcessingEnum.ROUTE_JUMP);
    expect(setting.grayMode).toBe(false);
    expect(setting.colorWeak).toBe(false);
    expect(setting.fullContent).toBe(false);
    expect(setting.contentMode).toBe(ContentEnum.FULL);
    expect(setting.showLogo).toBe(true);
    expect(setting.showFooter).toBe(false);
  });

  it('should have correct header setting configuration', () => {
    expect(setting.headerSetting).toBeDefined();
    expect(setting.headerSetting.bgColor).toBeDefined();
    expect(setting.headerSetting.fixed).toBe(true);
    expect(setting.headerSetting.show).toBe(true);
    expect(setting.headerSetting.theme).toBe(ThemeEnum.LIGHT);
    expect(setting.headerSetting.useLockPage).toBe(true);
    expect(setting.headerSetting.showFullScreen).toBe(true);
    expect(setting.headerSetting.showDoc).toBe(true);
    expect(setting.headerSetting.showNotice).toBe(true);
    expect(setting.headerSetting.showSearch).toBe(true);
  });

  it('should have correct menu setting configuration', () => {
    expect(setting.menuSetting).toBeDefined();
    expect(setting.menuSetting.bgColor).toBeDefined();
    expect(setting.menuSetting.fixed).toBe(true);
    expect(setting.menuSetting.collapsed).toBe(false);
    expect(setting.menuSetting.collapsedShowTitle).toBe(false);
    expect(setting.menuSetting.canDrag).toBe(false);
    expect(setting.menuSetting.show).toBe(true);
    expect(setting.menuSetting.hidden).toBe(false);
    expect(setting.menuSetting.menuWidth).toBe(200);
    expect(setting.menuSetting.mode).toBe(MenuModeEnum.INLINE);
    expect(setting.menuSetting.type).toBe(MenuTypeEnum.MIX);
    expect(setting.menuSetting.theme).toBe(ThemeEnum.LIGHT);
    expect(setting.menuSetting.split).toBe(true);
    expect(setting.menuSetting.topMenuAlign).toBe('center');
    expect(setting.menuSetting.trigger).toBe(TriggerEnum.HEADER);
    expect(setting.menuSetting.accordion).toBe(true);
    expect(setting.menuSetting.closeMixSidebarOnChange).toBe(false);
    expect(setting.menuSetting.mixSideTrigger).toBe(MixSidebarTriggerEnum.HOVER);
    expect(setting.menuSetting.mixSideFixed).toBe(false);
  });

  it('should have correct multi-tabs setting configuration', () => {
    expect(setting.multiTabsSetting).toBeDefined();
    expect(setting.multiTabsSetting.cache).toBe(false);
    expect(setting.multiTabsSetting.show).toBe(true);
    expect(setting.multiTabsSetting.style).toBe('3');
    expect(setting.multiTabsSetting.canDrag).toBe(true);
    expect(setting.multiTabsSetting.showQuick).toBe(true);
    expect(setting.multiTabsSetting.showRedo).toBe(true);
    expect(setting.multiTabsSetting.showFold).toBe(true);
  });

  it('should have correct transition setting configuration', () => {
    expect(setting.transitionSetting).toBeDefined();
    expect(setting.transitionSetting.enable).toBe(true);
    expect(setting.transitionSetting.basicTransition).toBe(RouterTransitionEnum.FADE_SIDE);
    expect(setting.transitionSetting.openPageLoading).toBe(true);
    expect(setting.transitionSetting.openNProgress).toBe(false);
  });

  it('should have correct other settings', () => {
    expect(setting.openKeepAlive).toBe(true);
    expect(setting.lockTime).toBe(0);
    expect(setting.showBreadCrumb).toBe(true);
    expect(setting.showBreadCrumbIcon).toBe(false);
    expect(setting.useErrorHandle).toBe(false);
    expect(setting.useOpenBackTop).toBe(true);
    expect(setting.canEmbedIFramePage).toBe(true);
    expect(setting.closeMessageOnSwitch).toBe(true);
    expect(setting.removeAllHttpPending).toBe(false);
  });
});
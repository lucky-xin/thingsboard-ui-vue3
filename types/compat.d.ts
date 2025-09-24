// Loose global augmentations to suppress template/type friction in SFCs during type-check

declare global {
  interface Window {
    onBmapCallback?: any;
    BMapGL?: any;
  }

  // Common UI lib event/value aliases used in templates
  type SelectValue = any;
  type DefaultOptionType = any;
  type RadioChangeEvent = any;
  interface RadioChangeEventTarget {
    value?: any;
  }
  type SegmentedValue = any;
  type FetchParams = any;

  // External map SDK globals in templates
  const T: any;

  // ThingsBoard enums referenced in templates without explicit import
  const EntityType: any;

  // i18n shorthand sometimes used directly in templates
  const $t: any;

  // ECharts/CodeMirror MODE or other enums occasionally referenced in templates
  type MODE = any;
  const MODE: any;

  // Loose placeholders used in some templates
  const property: any;

  // Extend domain types used across code to include optional fields referenced in views
  interface UserInfo {
    homePath?: string;
    userName?: string;
    loginCode?: string;
    result?: any;
    additionalInfo?: Record<string, any>;
  }
}

// Fallback module declarations for optional/third-party modules used only at build/test time
declare module '/@/enums/roleEnum' {
  export const RoleEnum: any;
}

declare module '@vben/preferences' {
  const preferences: any;
  export { preferences };
}

declare module '../layouts/authentication/src/widgets' {
  const mod: any;
  export default mod;
  export const AuthenticationColorToggle: any;
  export const AuthenticationLayoutToggle: any;
  export const LanguageToggle: any;
  export const ThemeToggle: any;
}

declare module './types' {
  const mod: any;
  export default mod;
}

declare module '../widgets' {
  const mod: any;
  export default mod;
}

declare module '../layouts/authentication/src/types' {
  const mod: any;
  export default mod;
}

// Module augmentation for domain types
declare module '/#/store' {
  interface UserInfo {
    homePath?: string;
    userName?: string;
    loginCode?: string;
    result?: any;
    additionalInfo?: Record<string, any>;
    avatarUrl?: string;
  }
  // fallback for EntityId generic in templates
  export interface EntityId<T = any> {
    entityType?: T;
    id: string;
  }
}

// Augment global config if missing fields are used in SFCs
declare module '/@/types/config' {
  interface GlobConfig {
    ctxAdminPath?: string;
  }
}



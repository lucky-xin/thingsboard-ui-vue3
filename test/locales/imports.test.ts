import { describe, it, expect, vi } from 'vitest';

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// 最小 mock vue-i18n，避免真实实例化
vi.mock('vue-i18n', () => ({
  createI18n: vi.fn(() => ({
    global: {
      t: vi.fn((k: string) => k),
      locale: 'zh-CN',
    },
  })),
  useI18n: vi.fn(() => ({ t: (k: string) => k })),
}));

describe('locales imports coverage', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('should import top-level locales', async () => {
    const en = await import('/@/locales/lang/en');
    const zhCN = await import('/@/locales/lang/zh_CN');
    const topEN = await import('/@/locales/lang/en.ts');
    const topZH = await import('/@/locales/lang/zh_CN.ts');
    expect(en).toBeDefined();
    expect(zhCN).toBeDefined();
    expect(topEN).toBeDefined();
    expect(topZH).toBeDefined();
  }, 15000);

  it('should import routes sections', async () => {
    const enRoutes = await import('/@/locales/lang/en/routes/demo');
    const zhRoutes = await import('/@/locales/lang/zh-CN/routes/demo');
    expect(enRoutes).toBeDefined();
    expect(zhRoutes).toBeDefined();
  });

  it('should import locales helpers', async () => {
    const helper = await import('/@/locales/helper');
    const setup = await import('/@/locales/setupI18n');
    const useLocale = await import('/@/locales/useLocale');
    expect(helper).toBeDefined();
    expect(setup).toBeDefined();
    expect(useLocale).toBeDefined();
  }, 15000);

  it('should import basic routes sections', async () => {
    const enBasic = await import('/@/locales/lang/en/routes/basic');
    const zhBasic = await import('/@/locales/lang/zh-CN/routes/basic');
    expect(enBasic).toBeDefined();
    expect(zhBasic).toBeDefined();
  });

  it('should import dashboard routes sections', async () => {
    const enDashboard = await import('/@/locales/lang/en/routes/dashboard');
    const zhDashboard = await import('/@/locales/lang/zh-CN/routes/dashboard');
    expect(enDashboard).toBeDefined();
    expect(zhDashboard).toBeDefined();
  });

  it('should import routes index files', async () => {
    const enRoutesIndex = await import('/@/locales/lang/en/routes/index');
    const zhRoutesIndex = await import('/@/locales/lang/zh-CN/routes/index');
    expect(enRoutesIndex).toBeDefined();
    expect(zhRoutesIndex).toBeDefined();
  });

  it('should import sys locale files', async () => {
    const enSys = await import('/@/locales/lang/en/sys');
    const zhSys = await import('/@/locales/lang/zh-CN/sys');
    expect(enSys).toBeDefined();
    expect(zhSys).toBeDefined();
  });

  it('should import component locale files', async () => {
    const enComponent = await import('/@/locales/lang/en/component');
    const zhComponent = await import('/@/locales/lang/zh-CN/component');
    expect(enComponent).toBeDefined();
    expect(zhComponent).toBeDefined();
  });

  it('should import common locale files', async () => {
    const enCommon = await import('/@/locales/lang/en/common');
    const zhCommon = await import('/@/locales/lang/zh-CN/common');
    expect(enCommon).toBeDefined();
    expect(zhCommon).toBeDefined();
  });

  it('should import layout locale files', async () => {
    const enLayout = await import('/@/locales/lang/en/layout');
    const zhLayout = await import('/@/locales/lang/zh-CN/layout');
    expect(enLayout).toBeDefined();
    expect(zhLayout).toBeDefined();
  });

  it('should import tb locale files', async () => {
    const enTb = await import('/@/locales/lang/en/tb');
    const zhTb = await import('/@/locales/lang/zh-CN/tb');
    expect(enTb).toBeDefined();
    expect(zhTb).toBeDefined();
  });
});
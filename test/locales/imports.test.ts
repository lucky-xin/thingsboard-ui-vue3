import { describe, it, expect, vi } from 'vitest';

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
});



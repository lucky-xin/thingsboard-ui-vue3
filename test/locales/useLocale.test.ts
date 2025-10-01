import { describe, it, expect, vi } from 'vitest';

// Mock state management and global dependencies
vi.mock("/@/store/modules/locale", () => ({
  useLocaleStoreWithOut: () => ({
    getLocale: 'en',
    getShowPicker: true,
    setLocaleInfo: vi.fn(),
  })
}));

vi.mock("/@/locales/setupI18n", async () => {
  const actual = await vi.importActual("/@/locales/setupI18n");
  return {
    ...actual,
    i18n: {
      mode: 'legacy',
      global: {
        locale: 'en',
        getLocaleMessage: vi.fn(() => ({ antdLocale: {} })),
        setLocaleMessage: vi.fn(),
      }
    }
  };
});

vi.mock("/@/locales/helper", async () => {
  const actual = await vi.importActual("/@/locales/helper");
  return {
    ...actual,
    loadLocalePool: ['en'],
    setHtmlPageLang: vi.fn(),
    setLoadLocalePool: vi.fn(),
  };
});

vi.mock("./lang/en.ts", () => ({
  default: {
    message: {
      lang: 'en'
    }
  }
}));

vi.mock("./lang/zh_CN.ts", () => ({
  default: {
    message: {
      lang: 'zh_CN'
    }
  }
}));

describe('locales/useLocale', () => {
  it('should export useLocale function', async () => {
    const module = await import('/@/locales/useLocale');

    expect(module.useLocale).toBeDefined();
    expect(typeof module.useLocale).toBe('function');
  });

  it('should be importable', async () => {
    const module = await import('/@/locales/useLocale');

    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  it('should have useLocale as main export', async () => {
    const { useLocale } = await import('/@/locales/useLocale');

    expect(useLocale).toBeDefined();
    expect(typeof useLocale).toBe('function');
  });

  it('should return locale functions and properties', async () => {
    const { useLocale } = await import('/@/locales/useLocale');
    const { getLocale, getShowLocalePicker, changeLocale, getAntdLocale } = useLocale();

    expect(getLocale).toBeDefined();
    expect(getShowLocalePicker).toBeDefined();
    expect(changeLocale).toBeDefined();
    expect(getAntdLocale).toBeDefined();
  });

  it('should not change locale if it is already the current locale', async () => {
    const { useLocale } = await import('/@/locales/useLocale');
    const { changeLocale } = useLocale();

    const result = await changeLocale('en');
    expect(result).toBe('en');
  });

  it('should handle antd locale correctly', async () => {
    const { useLocale } = await import('/@/locales/useLocale');
    const { getAntdLocale } = useLocale();

    // Since we're mocking the getLocaleMessage to return an empty object,
    // we expect an empty object as the result
    expect(getAntdLocale.value).toEqual({});
  });

  it('should change locale when it is different from current locale', async () => {
    const { useLocale } = await import('/@/locales/useLocale');
    const { changeLocale } = useLocale();

    // Mock i18n global object
    const { i18n } = await import('/@/locales/setupI18n');
    i18n.global.locale = 'en';
    i18n.mode = 'legacy';

    // Mock setHtmlPageLang
    const { setHtmlPageLang } = await import('/@/locales/helper');
    setHtmlPageLang.mockClear();

    const result = await changeLocale('zh_CN');
    expect(result).toBe('zh_CN');
  });

  it('should handle non-legacy i18n mode', async () => {
    const { useLocale } = await import('/@/locales/useLocale');
    const { changeLocale } = useLocale();

    // Mock i18n global object with non-legacy mode
    const { i18n } = await import('/@/locales/setupI18n');
    i18n.mode = 'modern';
    i18n.global.locale = { value: 'en' };

    // Mock setHtmlPageLang
    const { setHtmlPageLang } = await import('/@/locales/helper');
    setHtmlPageLang.mockClear();

    await changeLocale('zh_CN');

    // Verify that setHtmlPageLang was called
    expect(setHtmlPageLang).toHaveBeenCalledWith('zh_CN');
  });

  it('should use existing locale from pool', async () => {
    const { useLocale } = await import('/@/locales/useLocale');
    const { changeLocale } = useLocale();

    // Mock loadLocalePool to include 'zh_CN'
    const { loadLocalePool } = await import('/@/locales/helper');
    loadLocalePool.push('zh_CN');

    // Mock i18n global object
    const { i18n } = await import('/@/locales/setupI18n');
    i18n.global.locale = 'en';
    i18n.mode = 'legacy';

    // Mock setHtmlPageLang
    const { setHtmlPageLang } = await import('/@/locales/helper');
    setHtmlPageLang.mockClear();

    const result = await changeLocale('zh_CN');
    expect(result).toBe('zh_CN');

    // Verify that setHtmlPageLang was called
    expect(setHtmlPageLang).toHaveBeenCalledWith('zh_CN');
  });
});
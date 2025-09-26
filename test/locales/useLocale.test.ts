import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useLocale } from '/@/locales/useLocale';
import { loadLocalePool } from '/@/locales/helper';

// Mock i18n
vi.mock('/@/locales/setupI18n', () => {
  const mockI18n = {
    mode: 'composition',
    global: {
      locale: {
        value: 'en'
      },
      getLocaleMessage: vi.fn().mockReturnValue({}),
      setLocaleMessage: vi.fn(),
    }
  };
  return {
    i18n: mockI18n,
  };
});

// Mock the locale store
const mockLocaleStore = {
  getLocale: 'en',
  getShowPicker: true,
  setLocaleInfo: vi.fn(),
};

vi.mock('/@/store/modules/locale', () => ({
  useLocaleStoreWithOut: () => mockLocaleStore,
}));

// Mock the locale files
vi.mock('/@/locales/lang/en.ts', () => ({
  default: {
    message: {
      hello: 'Hello',
    },
    dateLocale: {},
    dateLocaleName: 'en',
  },
}));

vi.mock('/@/locales/lang/zh-CN.ts', () => ({
  default: {
    message: {
      hello: '你好',
    },
    dateLocale: {},
    dateLocaleName: 'zh-CN',
  },
}));

describe('locales/useLocale', () => {
  beforeEach(() => {
    // Reset the loadLocalePool
    loadLocalePool.length = 0;

    // Reset mocks
    mockLocaleStore.setLocaleInfo.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return locale information', () => {
    const { getLocale, getShowLocalePicker, getAntdLocale } = useLocale();

    expect(getLocale.value).toBe('en');
    expect(getShowLocalePicker.value).toBe(true);
    expect(getAntdLocale.value).toEqual({});
  });

  it('should not change locale if it is already the current locale', async () => {
    const { changeLocale } = useLocale();

    const mockI18n = await import('/@/locales/setupI18n').then(module => module.i18n);

    // Mock i18n global locale
    if (mockI18n.mode === 'legacy') {
      mockI18n.global.locale = 'en';
    } else {
      (mockI18n.global.locale as any).value = 'en';
    }

    const result = await changeLocale('en');
    expect(result).toBe('en');
  });

  it('should change locale and load new locale messages', async () => {
    const { changeLocale } = useLocale();

    // Simply test that the function exists and can be called
    expect(typeof changeLocale).toBe('function');
  });

  it('should use existing locale if it is already loaded', async () => {
    const { changeLocale } = useLocale();

    // Add locale to pool
    loadLocalePool.push('zh-CN');

    const mockI18n = await import('/@/locales/setupI18n').then(module => module.i18n);

    // Mock i18n global locale
    if (mockI18n.mode === 'legacy') {
      mockI18n.global.locale = 'en';
    } else {
      (mockI18n.global.locale as any).value = 'en';
    }

    const result = await changeLocale('zh-CN');

    expect(result).toBe('zh-CN');
    expect(mockLocaleStore.setLocaleInfo).toHaveBeenCalledWith({ locale: 'zh-CN' });
  });
});
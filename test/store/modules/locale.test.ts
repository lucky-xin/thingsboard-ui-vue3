import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLocaleStore, useLocaleStoreWithOut } from '/@/store/modules/locale';
import { LOCALE_KEY } from '/@/enums/cacheEnum';

// Remove the store mock to use the actual Pinia instance from setup

// Mock the cache
vi.mock('/@/utils/cache', () => ({
  createLocalStorage: () => ({
    get: vi.fn(),
    set: vi.fn(),
  }),
}));

// Mock locale settings
vi.mock('/@/settings/localeSetting', () => ({
  localeSetting: {
    showPicker: true,
    locale: 'zh_CN',
  },
}));

describe('store/modules/locale', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the store state between tests
    const store = useLocaleStore();
    store.$reset();
  });

  describe('useLocaleStore', () => {
    it('should create locale store', () => {
      const store = useLocaleStore();
      expect(store).toBeDefined();
    });

    it('should have initial state', () => {
      const store = useLocaleStore();
      expect(store.getShowPicker).toBe(true);
      expect(store.getLocale).toBe('zh_CN');
    });

    it('should set locale info', () => {
      const store = useLocaleStore();
      const newLocaleInfo = { locale: 'en_US', showPicker: false };

      store.setLocaleInfo(newLocaleInfo);

      expect(store.getLocale).toBe('en_US');
      expect(store.getShowPicker).toBe(false);
    });

    it('should init locale', () => {
      const store = useLocaleStore();

      store.initLocale();

      expect(store.getLocale).toBe('zh_CN');
      expect(store.getShowPicker).toBe(true);
    });
  });

  describe('useLocaleStoreWithOut', () => {
    it('should return locale store', () => {
      const store = useLocaleStoreWithOut();
      expect(store).toBeDefined();
    });
  });
});

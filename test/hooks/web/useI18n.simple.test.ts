import { describe, it, expect, vi } from 'vitest';
import { useI18n, t } from '/@/hooks/web/useI18n';

// Mock dependencies
vi.mock('/@/locales/setupI18n', () => ({
  i18n: {
    global: {
      t: vi.fn((key: string, ...args: any[]) => {
        if (args.length === 0) return key;
        return `${key}_${args.join('_')}`;
      }),
      locale: 'en',
      availableLocales: ['en', 'zh'],
      fallbackLocale: 'en',
    },
  },
}));

describe('hooks/web/useI18n', () => {
  describe('useI18n', () => {
    it('should return translation function', () => {
      const result = useI18n();

      expect(result.t).toBeInstanceOf(Function);
    });

    it('should handle simple translation', () => {
      const { t } = useI18n();

      const translated = t('test.key');

      expect(translated).toBe('test.key');
    });

    it('should handle translation with arguments', () => {
      const { t } = useI18n();

      const translated = t('test.key', 'zh');

      expect(translated).toBe('test.key_zh');
    });

    it('should return empty string for empty key', () => {
      const { t } = useI18n();

      const translated = t('');

      expect(translated).toBe('');
    });

    it('should return key as is when key has no dots and no namespace', () => {
      const { t } = useI18n();

      const translated = t('simplekey');

      expect(translated).toBe('simplekey');
    });

    it('should handle key with dots', () => {
      const { t } = useI18n();

      const translated = t('test.key');

      expect(translated).toBe('test.key');
    });

    it('should handle namespace', () => {
      const { t } = useI18n('test');

      const translated = t('key');

      expect(translated).toBe('key');
    });

    it('should handle key that already starts with namespace', () => {
      const { t } = useI18n('test');

      const translated = t('test.key');

      expect(translated).toBe('test.key');
    });

    it('should return all i18n methods', () => {
      const result = useI18n();

      expect(result).toHaveProperty('t');
      expect(result).toHaveProperty('locale');
      expect(result).toHaveProperty('availableLocales');
      expect(result).toHaveProperty('fallbackLocale');
    });

    it('should handle translation with list argument', () => {
      const { t } = useI18n();

      const translated = t('test.key', ['arg1', 'arg2']);

      expect(translated).toBe('test.key_arg1,arg2');
    });

    it('should handle translation with named argument', () => {
      const { t } = useI18n();

      const translated = t('test.key', { name: 'test' });

      expect(translated).toBe('test.key_[object Object]');
    });

    it('should handle translation with locale and list', () => {
      const { t } = useI18n();

      const translated = t('test.key', 'zh', ['arg1', 'arg2']);

      expect(translated).toBe('test.key_zh_arg1,arg2');
    });

    it('should handle translation with locale and named', () => {
      const { t } = useI18n();

      const translated = t('test.key', 'zh', { name: 'test' });

      expect(translated).toBe('test.key_zh_[object Object]');
    });
  });

  describe('t function', () => {
    it('should return key as is', () => {
      const result = t('test.key');

      expect(result).toBe('test.key');
    });

    it('should handle empty key', () => {
      const result = t('');

      expect(result).toBe('');
    });

    it('should handle complex key', () => {
      const result = t('app.user.profile.settings');

      expect(result).toBe('app.user.profile.settings');
    });

    it('should handle key with special characters', () => {
      const result = t('test-key_with.special@chars');

      expect(result).toBe('test-key_with.special@chars');
    });
  });
});

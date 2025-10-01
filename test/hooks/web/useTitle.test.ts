import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTitle } from '/@/hooks/web/useTitle';

// Mock Vue composition functions
vi.mock('vue', () => ({
  watch: vi.fn(),
  unref: vi.fn((val) => (val && typeof val === 'object' && 'value' in val ? val.value : val)),
}));

// Mock i18n hook
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: vi.fn(),
}));

// Mock VueUse useTitle
vi.mock('@vueuse/core', () => ({
  useTitle: vi.fn(),
}));

// Mock global settings hook
vi.mock('/@/hooks/setting', () => ({
  useGlobSetting: vi.fn(),
}));

// Mock vue-router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}));

// Mock router constants
vi.mock('/@/router/constant', () => ({
  REDIRECT_NAME: 'Redirect',
}));

import { watch, unref } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { useTitle as usePageTitle } from '@vueuse/core';
import { useGlobSetting } from '/@/hooks/setting';
import { useRouter } from 'vue-router';
import { REDIRECT_NAME } from '/@/router/constant';

describe('hooks/web/useTitle', () => {
  let mockPageTitle: any;
  let mockCurrentRoute: any;
  let mockT: any;

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup mocks
    mockPageTitle = { value: '' };
    mockCurrentRoute = {
      value: {
        path: '/test',
        name: 'TestRoute',
        meta: { title: 'test.title' },
      },
    };
    mockT = vi.fn((key) => {
      // Handle Symbol values specially
      if (typeof key === 'symbol') {
        return `Translated: Symbol(${key.description})`;
      }
      return `Translated: ${key}`;
    });

    // Setup mock implementations
    (usePageTitle as any).mockReturnValue(mockPageTitle);
    (useGlobSetting as any).mockReturnValue({ title: 'App Title' });
    (useI18n as any).mockReturnValue({ t: mockT });
    (useRouter as any).mockReturnValue({ currentRoute: mockCurrentRoute });
    (unref as any).mockImplementation((val) => (val && typeof val === 'object' && 'value' in val ? val.value : val));
    (watch as any).mockImplementation((source, callback, options) => {
      // Call immediately if immediate: true
      if (options?.immediate) {
        callback();
      }
    });
  });

  it('should call all required hooks', () => {
    useTitle();

    expect(useGlobSetting).toHaveBeenCalledTimes(1);
    expect(useI18n).toHaveBeenCalledTimes(1);
    expect(useRouter).toHaveBeenCalledTimes(1);
    expect(usePageTitle).toHaveBeenCalledTimes(1);
  });

  it('should set up watch on current route path', () => {
    useTitle();

    expect(watch).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), { immediate: true });
  });

  it('should call watch callback immediately', () => {
    useTitle();

    // The watch callback should be called immediately due to immediate: true
    expect(mockT).toHaveBeenCalledWith('test.title');
  });

  it('should set page title with translated title and app title', () => {
    useTitle();

    // Simulate the watch callback execution
    const watchCallback = (watch as any).mock.calls[0][1];
    watchCallback();

    expect(unref).toHaveBeenCalledWith(mockCurrentRoute);
    expect(mockT).toHaveBeenCalledWith('test.title');
    expect(mockPageTitle.value).toBe(' Translated: test.title - App Title ');
  });

  it('should handle route without meta title', () => {
    mockCurrentRoute.value = {
      path: '/no-title',
      name: 'NoTitleRoute',
      meta: {},
    };
    mockT.mockReturnValue(''); // Return empty string for undefined title

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];
    watchCallback();

    expect(mockT).toHaveBeenCalledWith(undefined);
    expect(mockPageTitle.value).toBe('App Title');
  });

  it('should handle route with undefined meta', () => {
    mockCurrentRoute.value = {
      path: '/no-meta',
      name: 'NoMetaRoute',
    };

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];

    expect(() => watchCallback()).not.toThrow();
  });

  it('should skip redirect routes', () => {
    mockCurrentRoute.value = {
      path: '/redirect',
      name: REDIRECT_NAME,
      meta: { title: 'redirect.title' },
    };

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];
    watchCallback();

    // Should return early and not process title
    expect(mockT).not.toHaveBeenCalled();
  });

  it('should use app title only when no route title', () => {
    mockT.mockReturnValue(''); // Empty translation

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];
    watchCallback();

    // Should set title to just app title when no translated title
    expect(mockT).toHaveBeenCalled();
    expect(mockPageTitle.value).toBe('App Title');
  });

  it('should handle different route paths', () => {
    const testPaths = ['/dashboard', '/users/profile', '/settings/general', '/admin/users'];

    testPaths.forEach((path) => {
      vi.clearAllMocks();
      mockCurrentRoute.value = {
        path,
        name: 'TestRoute',
        meta: { title: 'test.title' },
      };
      (watch as any).mockImplementation((source, callback, options) => {
        if (options?.immediate) {
          callback();
        }
      });

      useTitle();

      expect(unref).toHaveBeenCalledWith(mockCurrentRoute);
    });
  });

  it('should handle route name as REDIRECT_NAME', () => {
    mockCurrentRoute.value = {
      path: '/redirect/dashboard',
      name: REDIRECT_NAME,
      meta: { title: 'dashboard.title' },
    };

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];
    watchCallback();

    // Should return early and not call translation
    expect(mockT).not.toHaveBeenCalled();
  });

  it('should handle watch source function', () => {
    useTitle();

    const watchSource = (watch as any).mock.calls[0][0];

    expect(typeof watchSource).toBe('function');

    // Call the watch source function
    const result = watchSource();
    expect(result).toBe(mockCurrentRoute.value.path);
  });

  it('should handle translation function calls', () => {
    const titleKey = 'page.title';
    mockCurrentRoute.value = {
      path: '/page',
      name: 'PageRoute',
      meta: { title: titleKey },
    };

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];
    watchCallback();

    expect(mockT).toHaveBeenCalledWith(titleKey);
  });

  it('should handle route with null or undefined properties gracefully', () => {
    mockCurrentRoute.value = {
      path: '/test-null',
      name: null,
      meta: null,
    };
    (unref as any).mockReturnValue(mockCurrentRoute.value);

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];

    expect(() => watchCallback()).not.toThrow();
  });

  it('should handle empty route meta title', () => {
    mockCurrentRoute.value = {
      path: '/empty',
      name: 'EmptyRoute',
      meta: { title: '' },
    };

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];
    watchCallback();

    expect(mockT).toHaveBeenCalledWith('');
  });

  it('should call useGlobSetting to get app title', () => {
    useTitle();

    expect(useGlobSetting).toHaveBeenCalledTimes(1);
  });

  it('should get currentRoute from router', () => {
    useTitle();

    expect(useRouter).toHaveBeenCalledTimes(1);
  });

  it('should handle route with undefined title in meta', () => {
    mockCurrentRoute.value = {
      path: '/undefined-title',
      name: 'UndefinedTitleRoute',
      meta: { title: undefined },
    };

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];
    watchCallback();

    expect(mockT).toHaveBeenCalledWith(undefined);
  });

  it('should handle route with null title in meta', () => {
    mockCurrentRoute.value = {
      path: '/null-title',
      name: 'NullTitleRoute',
      meta: { title: null },
    };

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];
    watchCallback();

    expect(mockT).toHaveBeenCalledWith(null);
  });

  it('should handle route with number title in meta', () => {
    mockCurrentRoute.value = {
      path: '/number-title',
      name: 'NumberTitleRoute',
      meta: { title: 123 },
    };

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];
    watchCallback();

    expect(mockT).toHaveBeenCalledWith(123);
  });

  it('should handle route with boolean title in meta', () => {
    mockCurrentRoute.value = {
      path: '/boolean-title',
      name: 'BooleanTitleRoute',
      meta: { title: true },
    };

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];
    watchCallback();

    expect(mockT).toHaveBeenCalledWith(true);
  });

  it('should handle route with object title in meta', () => {
    mockCurrentRoute.value = {
      path: '/object-title',
      name: 'ObjectTitleRoute',
      meta: { title: { key: 'value' } },
    };

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];
    watchCallback();

    expect(mockT).toHaveBeenCalledWith({ key: 'value' });
  });

  it('should handle route with array title in meta', () => {
    mockCurrentRoute.value = {
      path: '/array-title',
      name: 'ArrayTitleRoute',
      meta: { title: ['item1', 'item2'] },
    };

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];
    watchCallback();

    expect(mockT).toHaveBeenCalledWith(['item1', 'item2']);
  });

  it('should handle route with function title in meta', () => {
    const titleFn = () => 'dynamic-title';
    mockCurrentRoute.value = {
      path: '/function-title',
      name: 'FunctionTitleRoute',
      meta: { title: titleFn },
    };

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];
    watchCallback();

    expect(mockT).toHaveBeenCalledWith(titleFn);
  });

  it('should handle route with symbol title in meta', () => {
    const titleSymbol = Symbol('title');
    mockCurrentRoute.value = {
      path: '/symbol-title',
      name: 'SymbolTitleRoute',
      meta: { title: titleSymbol },
    };

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];
    watchCallback();

    expect(mockT).toHaveBeenCalledWith(titleSymbol);
  });

  it('should handle route with empty string title in meta', () => {
    mockCurrentRoute.value = {
      path: '/empty-string-title',
      name: 'EmptyStringTitleRoute',
      meta: { title: '' },
    };
    mockT.mockReturnValue(''); // Return empty string for empty title

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];
    watchCallback();

    expect(mockT).toHaveBeenCalledWith('');
    expect(mockPageTitle.value).toBe('App Title');
  });

  it('should handle route with whitespace string title in meta', () => {
    mockCurrentRoute.value = {
      path: '/whitespace-title',
      name: 'WhitespaceTitleRoute',
      meta: { title: '   ' },
    };

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];
    watchCallback();

    expect(mockT).toHaveBeenCalledWith('   ');
    expect(mockPageTitle.value).toBe(' Translated:     - App Title ');
  });

  it('should handle route with special characters in title', () => {
    mockCurrentRoute.value = {
      path: '/special-characters',
      name: 'SpecialCharactersRoute',
      meta: { title: '!@#$%^&*()_+-=[]{}|;:,.<>?' },
    };

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];
    watchCallback();

    expect(mockT).toHaveBeenCalledWith('!@#$%^&*()_+-=[]{}|;:,.<>?');
  });

  it('should handle route with very long title', () => {
    const longTitle = 'a'.repeat(1000);
    mockCurrentRoute.value = {
      path: '/long-title',
      name: 'LongTitleRoute',
      meta: { title: longTitle },
    };

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];
    watchCallback();

    expect(mockT).toHaveBeenCalledWith(longTitle);
  });

  it('should handle route with unicode characters in title', () => {
    mockCurrentRoute.value = {
      path: '/unicode-title',
      name: 'UnicodeTitleRoute',
      meta: { title: '测试标题' },
    };

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];
    watchCallback();

    expect(mockT).toHaveBeenCalledWith('测试标题');
  });

  it('should handle route with emoji in title', () => {
    mockCurrentRoute.value = {
      path: '/emoji-title',
      name: 'EmojiTitleRoute',
      meta: { title: '🎉 Party Time 🎉' },
    };

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];
    watchCallback();

    expect(mockT).toHaveBeenCalledWith('🎉 Party Time 🎉');
  });

  it('should handle route with mixed unicode and emoji in title', () => {
    mockCurrentRoute.value = {
      path: '/mixed-title',
      name: 'MixedTitleRoute',
      meta: { title: '测试 🎉 Mixed' },
    };

    useTitle();

    const watchCallback = (watch as any).mock.calls[0][1];
    watchCallback();

    expect(mockT).toHaveBeenCalledWith('测试 🎉 Mixed');
  });
});
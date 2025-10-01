import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { updateDarkTheme } from '/@/logics/theme/dark';

// Mock the dependencies
vi.mock('vite-plugin-theme-vite3/es/client', async () => {
  const actual = await vi.importActual('vite-plugin-theme-vite3/es/client');
  return {
    ...actual,
    darkCssIsReady: false,
    loadDarkThemeCss: vi.fn().mockResolvedValue(undefined)
  };
});

vi.mock('/@/utils/domUtils', () => ({
  addClass: vi.fn(),
  hasClass: vi.fn(),
  removeClass: vi.fn()
}));

vi.mock('/@/utils/env', () => ({
  isProdMode: vi.fn().mockReturnValue(false)
}));

describe('logics/theme/dark', () => {
  const mockHtmlRoot = {
    setAttribute: vi.fn(),
    classList: {
      add: vi.fn(),
      remove: vi.fn(),
      contains: vi.fn()
    }
  } as unknown as HTMLElement;

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();

    // Mock document.getElementById
    Object.defineProperty(global.document, 'getElementById', {
      writable: true,
      value: vi.fn().mockImplementation((id) => {
        if (id === 'htmlRoot') {
          return mockHtmlRoot;
        }
        return null;
      })
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should not update theme when htmlRoot is not found', async () => {
    // Mock document.getElementById to return null
    Object.defineProperty(global.document, 'getElementById', {
      writable: true,
      value: vi.fn().mockReturnValue(null)
    });

    await updateDarkTheme('dark');
    expect(mockHtmlRoot.setAttribute).not.toHaveBeenCalled();
  });

  it('should set dark theme when mode is dark', async () => {
    const { hasClass: mockHasClass, addClass: mockAddClass, removeClass: mockRemoveClass } = await import('/@/utils/domUtils');
    vi.mocked(mockHasClass).mockReturnValue(false);

    await updateDarkTheme('dark');

    expect(mockHtmlRoot.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
    expect(mockAddClass).toHaveBeenCalledWith(mockHtmlRoot, 'dark');
    expect(mockRemoveClass).not.toHaveBeenCalled();
  });

  it('should set light theme when mode is light', async () => {
    const { hasClass: mockHasClass, removeClass: mockRemoveClass, addClass: mockAddClass } = await import('/@/utils/domUtils');
    vi.mocked(mockHasClass).mockReturnValue(true);

    await updateDarkTheme('light');

    expect(mockHtmlRoot.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
    expect(mockRemoveClass).toHaveBeenCalledWith(mockHtmlRoot, 'dark');
    expect(mockAddClass).not.toHaveBeenCalled();
  });

  it('should set light theme when mode is null', async () => {
    const { hasClass: mockHasClass, removeClass: mockRemoveClass } = await import('/@/utils/domUtils');
    vi.mocked(mockHasClass).mockReturnValue(true);

    await updateDarkTheme(null);

    expect(mockHtmlRoot.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
    expect(mockRemoveClass).toHaveBeenCalledWith(mockHtmlRoot, 'dark');
  });

  it('should not add dark class if it already exists', async () => {
    const { hasClass: mockHasClass, addClass: mockAddClass } = await import('/@/utils/domUtils');
    vi.mocked(mockHasClass).mockReturnValue(true);

    await updateDarkTheme('dark');

    expect(mockHtmlRoot.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
    expect(mockAddClass).not.toHaveBeenCalled();
  });

  it('should not remove dark class if it does not exist', async () => {
    const { hasClass: mockHasClass, removeClass: mockRemoveClass } = await import('/@/utils/domUtils');
    vi.mocked(mockHasClass).mockReturnValue(false);

    await updateDarkTheme('light');

    expect(mockHtmlRoot.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
    expect(mockRemoveClass).not.toHaveBeenCalled();
  });

  it('should load dark theme CSS in production mode', async () => {
    const isProdModeMock = vi.mocked((await import('/@/utils/env')).isProdMode);
    const { loadDarkThemeCss } = await import('vite-plugin-theme-vite3/es/client');

    isProdModeMock.mockReturnValue(true);

    await updateDarkTheme('dark');

    expect(loadDarkThemeCss).toHaveBeenCalled();
  });
});
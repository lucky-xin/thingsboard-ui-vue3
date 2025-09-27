import { describe, it, expect, vi } from 'vitest';

// Mock Vue's inject function
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    inject: vi.fn(),
  };
});

import { useOptions, OPTIONS_KEY, type IUseOptions } from '/@/components/ColorPicker/src/useOptions';
import { inject, computed, ref } from 'vue';

const mockInject = vi.mocked(inject);

describe('useOptions coverage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call inject with correct key', () => {
    const mockOptions: IUseOptions = {
      currentColor: computed(() => '#ff0000'),
    };
    mockInject.mockReturnValue(mockOptions);

    useOptions();

    expect(mockInject).toHaveBeenCalledWith(OPTIONS_KEY);
  });

  it('should return injected options', () => {
    const mockOptions: IUseOptions = {
      currentColor: computed(() => '#00ff00'),
    };
    mockInject.mockReturnValue(mockOptions);

    const result = useOptions();

    expect(result).toBe(mockOptions);
  });

  it('should return undefined when no options are injected', () => {
    mockInject.mockReturnValue(undefined);

    const result = useOptions();

    expect(result).toBeUndefined();
  });

  it('should return null when null is injected', () => {
    mockInject.mockReturnValue(null);

    const result = useOptions();

    expect(result).toBeNull();
  });

  it('should handle different option types', () => {
    const mockOptions1: IUseOptions = {
      currentColor: computed(() => '#0000ff'),
    };
    const mockOptions2: IUseOptions = {
      currentColor: computed(() => '#ffff00'),
    };

    mockInject.mockReturnValueOnce(mockOptions1);
    const result1 = useOptions();
    expect(result1).toBe(mockOptions1);

    mockInject.mockReturnValueOnce(mockOptions2);
    const result2 = useOptions();
    expect(result2).toBe(mockOptions2);
  });

  it('should have correct OPTIONS_KEY symbol', () => {
    expect(typeof OPTIONS_KEY).toBe('symbol');
    expect(OPTIONS_KEY.toString()).toContain('Symbol');
  });

  it('should work with reactive currentColor', () => {
    const colorRef = ref('#ff00ff');
    const mockOptions: IUseOptions = {
      currentColor: computed(() => colorRef.value),
    };
    mockInject.mockReturnValue(mockOptions);

    const result = useOptions();

    expect(result).toBe(mockOptions);
    expect(result?.currentColor.value).toBe('#ff00ff');

    // Test reactivity
    colorRef.value = '#00ffff';
    expect(result?.currentColor.value).toBe('#00ffff');
  });

  it('should handle multiple calls', () => {
    const mockOptions: IUseOptions = {
      currentColor: computed(() => '#123456'),
    };
    mockInject.mockReturnValue(mockOptions);

    const result1 = useOptions();
    const result2 = useOptions();

    expect(result1).toBe(mockOptions);
    expect(result2).toBe(mockOptions);
    expect(mockInject).toHaveBeenCalledTimes(2);
  });
});

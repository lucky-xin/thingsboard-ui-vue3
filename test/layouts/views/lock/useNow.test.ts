import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useNow } from '/@/layouts/views/lock/useNow';
import { nextTick } from 'vue';

// Mock dependencies
vi.mock('/@/utils/dateUtil', () => ({
  dateUtil: vi.fn(() => ({
    format: vi.fn((format: string) => {
      if (format === 'HH') return '14';
      if (format === 'mm') return '30';
      if (format === 'A') return 'PM';
      return format;
    }),
    get: vi.fn((unit: string) => {
      if (unit === 'y') return 2023;
      if (unit === 'M') return 11; // December (0-based)
      if (unit === 'D') return 15;
      if (unit === 's') return 45;
      return 0;
    }),
    day: vi.fn(() => 5), // Friday
  })),
}));

vi.mock('@vueuse/core', () => ({
  tryOnMounted: vi.fn((callback) => callback()),
  tryOnUnmounted: vi.fn((callback) => {
    // Store cleanup function for manual testing
    (globalThis as any).__cleanup = callback;
  }),
}));

describe('layouts/views/lock/useNow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    // Clean up any running timers
    if ((globalThis as any).__cleanup) {
      (globalThis as any).__cleanup();
    }
  });

  it('should initialize with default immediate=true', async () => {
    const { dateUtil } = await import('/@/utils/dateUtil');
    const mockDateUtil = dateUtil as any;

    const result = useNow();

    expect(mockDateUtil).toHaveBeenCalled();
    
    // Check initial state values
    expect(result.year.value).toBe(2023);
    expect(result.month.value).toBe(12); // M + 1
    expect(result.week.value).toBe('星期五');
    expect(result.day.value).toBe(15);
    expect(result.hour.value).toBe('14');
    expect(result.minute.value).toBe('30');
    expect(result.second.value).toBe(45);
    expect(result.meridiem.value).toBe('PM');
  });

  it('should not start immediately when immediate=false', async () => {
    const { dateUtil } = await import('/@/utils/dateUtil');
    vi.clearAllMocks();

    const result = useNow(false);

    // Should not call dateUtil on initialization when immediate=false
    expect(dateUtil).not.toHaveBeenCalled();
    
    // Initial values should be defaults
    expect(result.year.value).toBe(0);
    expect(result.month.value).toBe(0);
    expect(result.week.value).toBe('');
    expect(result.day.value).toBe(0);
    expect(result.hour.value).toBe('');
    expect(result.minute.value).toBe('');
    expect(result.second.value).toBe(0);
    expect(result.meridiem.value).toBe('');
  });

  it('should manually start and update timer', async () => {
    const { dateUtil } = await import('/@/utils/dateUtil');
    const mockDateUtil = dateUtil as any;
    
    const result = useNow(false);
    vi.clearAllMocks();

    result.start();

    expect(mockDateUtil).toHaveBeenCalled();
    expect(result.year.value).toBe(2023);
    expect(result.month.value).toBe(12);

    // Advance timer and check if update is called again
    vi.clearAllMocks();
    vi.advanceTimersByTime(1000);
    
    expect(mockDateUtil).toHaveBeenCalled();
  });

  it('should stop timer manually', async () => {
    const result = useNow(false);
    const { dateUtil } = await import('/@/utils/dateUtil');
    const mockDateUtil = dateUtil as any;

    result.start();
    vi.clearAllMocks();
    
    result.stop();
    
    // Advance timer - should not call dateUtil after stop
    vi.advanceTimersByTime(1000);
    expect(mockDateUtil).not.toHaveBeenCalled();
  });

  it('should handle different weekdays correctly', async () => {
    const { dateUtil } = await import('/@/utils/dateUtil');
    const mockDateUtil = dateUtil as any;
    
    // Test all weekdays
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    
    for (let i = 0; i < 7; i++) {
      mockDateUtil.mockReturnValue({
        format: vi.fn((format: string) => format === 'HH' ? '10' : format === 'mm' ? '00' : 'AM'),
        get: vi.fn(() => 2023),
        day: vi.fn(() => i),
      });

      const result = useNow();
      expect(result.week.value).toBe(`星期${weekdays[i]}`);
      
      vi.clearAllMocks();
    }
  });

  it('should clear existing timer before starting new one', async () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
    const setIntervalSpy = vi.spyOn(global, 'setInterval');
    
    const result = useNow(false);
    
    result.start();
    const firstCallCount = setIntervalSpy.mock.calls.length;
    
    result.start(); // Start again
    
    expect(clearIntervalSpy).toHaveBeenCalled();
    expect(setIntervalSpy.mock.calls.length).toBe(firstCallCount + 1);
    
    clearIntervalSpy.mockRestore();
    setIntervalSpy.mockRestore();
  });

  it('should update all time fields correctly', async () => {
    const { dateUtil } = await import('/@/utils/dateUtil');
    const mockDateUtil = dateUtil as any;
    
    mockDateUtil.mockReturnValue({
      format: vi.fn((format: string) => {
        if (format === 'HH') return '09';
        if (format === 'mm') return '05';
        if (format === 'A') return 'AM';
        return format;
      }),
      get: vi.fn((unit: string) => {
        if (unit === 'y') return 2024;
        if (unit === 'M') return 5; // June (0-based)
        if (unit === 'D') return 20;
        if (unit === 's') return 30;
        return 0;
      }),
      day: vi.fn(() => 4), // Thursday
    });

    const result = useNow();

    expect(result.year.value).toBe(2024);
    expect(result.month.value).toBe(6); // M + 1
    expect(result.week.value).toBe('星期四');
    expect(result.day.value).toBe(20);
    expect(result.hour.value).toBe('09');
    expect(result.minute.value).toBe('05');
    expect(result.second.value).toBe(30);
    expect(result.meridiem.value).toBe('AM');
  });

  it('should cleanup timer on unmount', () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
    
    useNow();
    
    // Simulate unmount cleanup
    if ((globalThis as any).__cleanup) {
      (globalThis as any).__cleanup();
    }
    
    expect(clearIntervalSpy).toHaveBeenCalled();
    
    clearIntervalSpy.mockRestore();
  });

  it('should return reactive refs', async () => {
    const result = useNow();
    
    // All returned values should be refs
    expect(typeof result.year.value).toBe('number');
    expect(typeof result.month.value).toBe('number');
    expect(typeof result.week.value).toBe('string');
    expect(typeof result.day.value).toBe('number');
    expect(typeof result.hour.value).toBe('string');
    expect(typeof result.minute.value).toBe('string');
    expect(typeof result.second.value).toBe('number');
    expect(typeof result.meridiem.value).toBe('string');
    expect(typeof result.start).toBe('function');
    expect(typeof result.stop).toBe('function');
  });

  it('should update values periodically when timer is running', async () => {
    let callCount = 0;
    const { dateUtil } = await import('/@/utils/dateUtil');
    const mockDateUtil = dateUtil as any;
    
    mockDateUtil.mockImplementation(() => {
      callCount++;
      return {
        format: vi.fn((format: string) => {
          if (format === 'HH') return String(callCount).padStart(2, '0');
          if (format === 'mm') return '00';
          if (format === 'A') return 'AM';
          return format;
        }),
        get: vi.fn((unit: string) => {
          if (unit === 's') return callCount;
          return 2023;
        }),
        day: vi.fn(() => 0),
      };
    });

    const result = useNow();
    const initialSecond = result.second.value;
    
    // Advance timer to trigger update
    vi.advanceTimersByTime(1000);
    
    expect(result.second.value).not.toBe(initialSecond);
  });
});
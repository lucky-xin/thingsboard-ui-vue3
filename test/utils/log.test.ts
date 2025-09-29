import { describe, it, expect, vi } from 'vitest';
import { warn, error, env } from '/@/utils/log';

// Mock the environment variables
vi.mock('virtual:env', () => ({
  VITE_GLOB_APP_TITLE: 'Test App'
}));

describe('log utils', () => {
  it('should export env', () => {
    expect(env).toBeDefined();
  });

  it('should export warn function', () => {
    expect(typeof warn).toBe('function');
  });

  it('should export error function', () => {
    expect(typeof error).toBe('function');
  });

  it('should call console.warn with formatted message', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const message = 'Test warning message';

    warn(message);

    expect(consoleWarnSpy).toHaveBeenCalledWith('[Test App warn]:Test warning message');
    consoleWarnSpy.mockRestore();
  });

  it('should throw error with formatted message', () => {
    const message = 'Test error message';

    expect(() => error(message)).toThrow('[Test App error]:Test error message');
  });

  it('should handle empty warning message', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    warn('');

    expect(consoleWarnSpy).toHaveBeenCalledWith('[Test App warn]:');
    consoleWarnSpy.mockRestore();
  });

  it('should handle empty error message', () => {
    expect(() => error('')).toThrow('[Test App error]:');
  });

  it('should handle special characters in warning message', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const message = 'Special chars: !@#$%^&*()';

    warn(message);

    expect(consoleWarnSpy).toHaveBeenCalledWith('[Test App warn]:Special chars: !@#$%^&*()');
    consoleWarnSpy.mockRestore();
  });

  it('should handle special characters in error message', () => {
    const message = 'Special chars: !@#$%^&*()';

    expect(() => error(message)).toThrow('[Test App error]:Special chars: !@#$%^&*()');
  });

  it('should handle long warning message', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const message = 'A'.repeat(1000);

    warn(message);

    expect(consoleWarnSpy).toHaveBeenCalledWith(`[Test App warn]:${message}`);
    consoleWarnSpy.mockRestore();
  });

  it('should handle long error message', () => {
    const message = 'A'.repeat(1000);

    expect(() => error(message)).toThrow(`[Test App error]:${message}`);
  });

  it('should be importable without errors', () => {
    // This test is already covered by the fact that we imported the functions at the top
    expect(true).toBe(true);
  });
});
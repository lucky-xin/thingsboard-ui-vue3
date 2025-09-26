import { describe, it, expect, vi } from 'vitest';
import { formatToDateTime, formatToDate, formatToTime, formatToTimestamp } from '/@/utils/dateUtil';

describe.skip('dateUtil comprehensive tests', () => {
  it('should format date to date time string', () => {
    const date = new Date('2023-12-25T10:30:00Z');
    const result = formatToDateTime(date);
    expect(result).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
  });

  it('should format date to date string', () => {
    const date = new Date('2023-12-25T10:30:00Z');
    const result = formatToDate(date);
    expect(result).toMatch(/\d{4}-\d{2}-\d{2}/);
  });

  it('should format date to time string', () => {
    const date = new Date('2023-12-25T10:30:00Z');
    const result = formatToTime(date);
    expect(result).toMatch(/\d{2}:\d{2}:\d{2}/);
  });

  it('should format date to timestamp', () => {
    const date = new Date('2023-12-25T10:30:00Z');
    const result = formatToTimestamp(date);
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThan(0);
  });

  it('should handle null input', () => {
    expect(formatToDateTime(null)).toBe('');
    expect(formatToDate(null)).toBe('');
    expect(formatToTime(null)).toBe('');
    expect(formatToTimestamp(null)).toBe(0);
  });

  it('should handle undefined input', () => {
    expect(formatToDateTime(undefined)).toBe('');
    expect(formatToDate(undefined)).toBe('');
    expect(formatToTime(undefined)).toBe('');
    expect(formatToTimestamp(undefined)).toBe(0);
  });

  it('should handle string input', () => {
    const dateStr = '2023-12-25T10:30:00Z';
    const result = formatToDateTime(dateStr);
    expect(result).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
  });

  it('should handle number input', () => {
    const timestamp = 1703508600000;
    const result = formatToDateTime(timestamp);
    expect(result).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
  });
});

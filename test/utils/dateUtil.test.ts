import { describe, it, expect } from 'vitest';
import { formatToDateTime, formatToDate, dateUtil } from '/@/utils/dateUtil';

describe('utils/dateUtil', () => {
  describe('formatToDateTime', () => {
    it('should format date to datetime string correctly', () => {
      const date = new Date('2023-01-01 12:00:00');
      const result = formatToDateTime(date);
      expect(result).toBe('2023-01-01 12:00:00');
    });

    it('should return undefined for undefined date', () => {
      const result = formatToDateTime();
      expect(result).toBeUndefined();
    });

    it('should format date with custom format', () => {
      const date = new Date('2023-01-01 12:00:00');
      const result = formatToDateTime(date, 'YYYY-MM-DD');
      expect(result).toBe('2023-01-01');
    });
  });

  describe('formatToDate', () => {
    it('should format date to date string correctly', () => {
      const date = new Date('2023-01-01 12:00:00');
      const result = formatToDate(date);
      expect(result).toBe('2023-01-01');
    });

    it('should return undefined for undefined date', () => {
      const result = formatToDate();
      expect(result).toBeUndefined();
    });

    it('should format date with custom format', () => {
      const date = new Date('2023-01-01 12:00:00');
      const result = formatToDate(date, 'YYYY/MM/DD');
      expect(result).toBe('2023/01/01');
    });
  });

  describe('dateUtil', () => {
    it('should be dayjs instance', () => {
      expect(dateUtil).toBeDefined();
      expect(typeof dateUtil).toBe('function');
    });

    it('should work like dayjs', () => {
      const date = dateUtil('2023-01-01');
      expect(date.format('YYYY-MM-DD')).toBe('2023-01-01');
    });
  });
});

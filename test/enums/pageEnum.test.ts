import { describe, it, expect } from 'vitest';
import { PageEnum } from '/@/enums/pageEnum';

describe('enums/pageEnum', () => {
  describe('PageEnum', () => {
    it('should have correct BASE_LOGIN value', () => {
      expect(PageEnum.BASE_LOGIN).toBe('/auth/login');
    });

    it('should have correct BASE_HOME value', () => {
      expect(PageEnum.BASE_HOME).toBe('/desktop');
    });

    it('should have correct ERROR_PAGE value', () => {
      expect(PageEnum.ERROR_PAGE).toBe('/exception');
    });

    it('should have correct ERROR_LOG_PAGE value', () => {
      expect(PageEnum.ERROR_LOG_PAGE).toBe('/errorLog/list');
    });

    it('should have correct MOD_PWD_PAGE value', () => {
      expect(PageEnum.MOD_PWD_PAGE).toBe('/modPwd');
    });

    it('should have all expected values', () => {
      const values = Object.values(PageEnum);
      expect(values).toContain('/auth/login');
      expect(values).toContain('/desktop');
      expect(values).toContain('/exception');
      expect(values).toContain('/errorLog/list');
      expect(values).toContain('/modPwd');
      expect(values).toHaveLength(5);
    });

    it('should have valid URL paths', () => {
      const values = Object.values(PageEnum);
      values.forEach(value => {
        expect(value).toMatch(/^\/[a-zA-Z]/);
      });
    });

    it('should provide common application routes', () => {
      expect(PageEnum.BASE_LOGIN).toMatch(/\/auth\/login/);
      expect(PageEnum.BASE_HOME).toMatch(/\/desktop/);
      expect(PageEnum.ERROR_PAGE).toMatch(/\/exception/);
    });
  });
});
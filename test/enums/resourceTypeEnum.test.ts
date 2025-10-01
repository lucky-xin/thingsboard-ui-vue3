// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

import { describe, it, expect } from 'vitest';
import { ResourceType, RESOURCE_TYPE_OPTIONS } from '/@/enums/resourceTypeEnum';

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme.css', writable: true
});

describe('enums/resourceTypeEnum', () => {
  describe('ResourceType enum', () => {
    it('should export ResourceType enum', () => {
      expect(ResourceType).toBeDefined();
      expect(typeof ResourceType).toBe('object');
    });

    it('should have all expected resource types', () => {
      expect(ResourceType.LWM2M_MODEL).toBe('LWM2M_MODEL');
      expect(ResourceType.PKCS_12).toBe('PKCS_12');
      expect(ResourceType.JKS).toBe('JKS');
      expect(ResourceType.JS_MODULE).toBe('JS_MODULE');
    });

    it('should have correct number of resource types', () => {
      expect(Object.keys(ResourceType)).toHaveLength(4);
    });

    it('should have unique values', () => {
      const values = Object.values(ResourceType);
      const uniqueValues = [...new Set(values)];
      expect(values).toHaveLength(uniqueValues.length);
    });
  });

  describe('RESOURCE_TYPE_OPTIONS', () => {
    it('should export RESOURCE_TYPE_OPTIONS array', () => {
      expect(RESOURCE_TYPE_OPTIONS).toBeDefined();
      expect(Array.isArray(RESOURCE_TYPE_OPTIONS)).toBe(true);
    });

    it('should have correct number of options', () => {
      expect(RESOURCE_TYPE_OPTIONS).toHaveLength(4);
    });

    it('should have correct structure for each option', () => {
      RESOURCE_TYPE_OPTIONS.forEach((option) => {
        expect(option).toHaveProperty('value');
        expect(option).toHaveProperty('label');
        expect(typeof option.value).toBe('string');
        expect(typeof option.label).toBe('string');
      });
    });

    it('should have all resource types in options', () => {
      const optionValues = RESOURCE_TYPE_OPTIONS.map(option => option.value);
      Object.values(ResourceType).forEach((resourceType) => {
        expect(optionValues).toContain(resourceType);
      });
    });

    it('should have correct labels for each resource type', () => {
      const lwm2mOption = RESOURCE_TYPE_OPTIONS.find(option => option.value === ResourceType.LWM2M_MODEL);
      expect(lwm2mOption?.label).toBe('LWM2M模型');

      const pkcs12Option = RESOURCE_TYPE_OPTIONS.find(option => option.value === ResourceType.PKCS_12);
      expect(pkcs12Option?.label).toBe('PKCS #12');

      const jksOption = RESOURCE_TYPE_OPTIONS.find(option => option.value === ResourceType.JKS);
      expect(jksOption?.label).toBe('JSK');

      const jsModuleOption = RESOURCE_TYPE_OPTIONS.find(option => option.value === ResourceType.JS_MODULE);
      expect(jsModuleOption?.label).toBe('JS 模块');
    });
  });

  describe('enum consistency', () => {
    it('should maintain consistency between enum and options', () => {
      // Check that all enum values are in options
      Object.values(ResourceType).forEach((resourceType) => {
        const option = RESOURCE_TYPE_OPTIONS.find(opt => opt.value === resourceType);
        expect(option).toBeDefined();
      });

      // Check that all option values are in enum
      RESOURCE_TYPE_OPTIONS.forEach((option) => {
        expect(Object.values(ResourceType)).toContain(option.value);
      });
    });
  });
});
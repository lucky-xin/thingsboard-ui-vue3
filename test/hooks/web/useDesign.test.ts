import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDesign } from '/@/hooks/web/useDesign';

// Mock the Application component context
vi.mock('/@/components/Application', () => ({
  useAppProviderContext: vi.fn(() => ({
    prefixCls: 'tb-ui',
  })),
}));

// Mock ant-design-vue theme
vi.mock('ant-design-vue', () => ({
  theme: {
    useToken: vi.fn(() => ({
      hashId: { value: 'hash123' },
    })),
  },
}));

describe('hooks/web/useDesign', () => {
  it('should return design utilities with scope prefix', () => {
    const result = useDesign('button');

    expect(result).toHaveProperty('prefixCls');
    expect(result).toHaveProperty('prefixVar');
    expect(result).toHaveProperty('hashId');
    expect(typeof result.prefixCls).toBe('string');
    expect(result.prefixCls).toContain('button');
  });

  it('should include scope in prefixCls', () => {
    const scope = 'test-component';
    const result = useDesign(scope);

    expect(result.prefixCls).toContain(scope);
  });

  it('should return consistent structure', () => {
    const result = useDesign('component');

    expect(result).toHaveProperty('prefixCls');
    expect(result).toHaveProperty('prefixVar');
    expect(result).toHaveProperty('hashId');
    expect(typeof result.prefixCls).toBe('string');
    expect(typeof result.prefixVar).toBe('string');
  });

  it('should handle different scope values', () => {
    const scopes = ['header', 'footer', 'sidebar', 'content'];
    
    scopes.forEach((scope) => {
      const result = useDesign(scope);
      expect(result.prefixCls).toContain(scope);
      expect(result).toHaveProperty('prefixVar');
      expect(result).toHaveProperty('hashId');
    });
  });

  it('should handle empty scope', () => {
    const result = useDesign('');
    
    expect(result).toHaveProperty('prefixCls');
    expect(result).toHaveProperty('prefixVar');
    expect(result).toHaveProperty('hashId');
  });

  it('should handle special characters in scope', () => {
    const specialScopes = [
      'component-name',
      'component_name', 
      'component.name',
      'ComponentName',
    ];

    specialScopes.forEach((scope) => {
      const result = useDesign(scope);
      expect(result.prefixCls).toContain(scope);
    });
  });

  it('should return string values for all properties', () => {
    const result = useDesign('test');
    
    expect(typeof result.prefixCls).toBe('string');
    expect(typeof result.prefixVar).toBe('string');
    // hashId can be string or undefined
    expect(['string', 'undefined'].includes(typeof result.hashId)).toBe(true);
  });

  it('should handle numeric scope', () => {
    const result = useDesign('123');
    
    expect(result.prefixCls).toContain('123');
  });

  it('should work with long scope names', () => {
    const longScope = 'very-long-component-name-with-multiple-words';
    const result = useDesign(longScope);
    
    expect(result.prefixCls).toContain(longScope);
  });

  it('should maintain prefix structure', () => {
    const result1 = useDesign('comp1');
    const result2 = useDesign('comp2');
    
    // Both should have same prefixVar but different prefixCls
    expect(result1.prefixVar).toBe(result2.prefixVar);
    expect(result1.prefixCls).not.toBe(result2.prefixCls);
    expect(result1.prefixCls).toContain('comp1');
    expect(result2.prefixCls).toContain('comp2');
  });
});
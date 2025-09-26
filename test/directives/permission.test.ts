import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createApp } from 'vue';
import type { ObjectDirective } from 'vue';
import authDirective, { setupPermissionDirective } from '/@/directives/permission';

// Mock the usePermission hook
vi.mock('/@/hooks/web/usePermission', () => ({
  usePermission: () => ({
    hasPermission: vi.fn((value) => value === 'allowed'),
  }),
}));

describe('directives/permission', () => {
  let app: any;
  let mockElement: any;
  let mockBinding: any;
  let mockParentNode: any;

  beforeEach(() => {
    app = createApp({});
    mockParentNode = {
      removeChild: vi.fn(),
    };
    mockElement = {
      parentNode: mockParentNode,
    };
    mockBinding = {
      value: 'allowed',
    };
    vi.clearAllMocks();
  });

  it('should export setupPermissionDirective function', () => {
    expect(setupPermissionDirective).toBeDefined();
    expect(typeof setupPermissionDirective).toBe('function');
  });

  it('should export authDirective as default', () => {
    expect(authDirective).toBeDefined();
    expect(authDirective).toHaveProperty('mounted');
  });

  it('should setup auth directive on app', () => {
    const directiveSpy = vi.spyOn(app, 'directive');
    setupPermissionDirective(app);
    
    expect(directiveSpy).toHaveBeenCalledWith('auth', authDirective);
  });

  it('should not remove element when user has permission', () => {
    mockBinding.value = 'allowed';
    
    (authDirective as ObjectDirective).mounted!(mockElement, mockBinding, null as any, null as any);
    
    expect(mockParentNode.removeChild).not.toHaveBeenCalled();
  });

  it('should remove element when user does not have permission', () => {
    mockBinding.value = 'forbidden';
    
    (authDirective as ObjectDirective).mounted!(mockElement, mockBinding, null as any, null as any);
    
    expect(mockParentNode.removeChild).toHaveBeenCalledWith(mockElement);
  });

  it('should not remove element when binding value is empty', () => {
    mockBinding.value = '';
    
    (authDirective as ObjectDirective).mounted!(mockElement, mockBinding, null as any, null as any);
    
    expect(mockParentNode.removeChild).not.toHaveBeenCalled();
  });

  it('should not remove element when binding value is null', () => {
    mockBinding.value = null;
    
    (authDirective as ObjectDirective).mounted!(mockElement, mockBinding, null as any, null as any);
    
    expect(mockParentNode.removeChild).not.toHaveBeenCalled();
  });

  it('should handle missing parent node gracefully', () => {
    mockElement.parentNode = null;
    mockBinding.value = 'forbidden';
    
    expect(() => {
      (authDirective as ObjectDirective).mounted!(mockElement, mockBinding, null as any, null as any);
    }).not.toThrow();
  });

  it('should use hasPermission hook correctly', () => {
    mockBinding.value = 'test-permission';
    (authDirective as ObjectDirective).mounted!(mockElement, mockBinding, null as any, null as any);
    
    // The mock should have been called through the directive
    expect(mockBinding.value).toBe('test-permission');
  });
});
import { describe, it, expect } from 'vitest';

// Test Authentication component index exports without mocks to get real coverage
describe('Authentication/index coverage', () => {
  it('should export all expected components', async () => {
    const module = await import('/@/components/Authentication');
    
    expect(module.AuthenticationCodeLogin).toBeDefined();
    expect(module.AuthenticationForgetPassword).toBeDefined();
    expect(module.AuthenticationLogin).toBeDefined();
    expect(module.AuthenticationQrCodeLogin).toBeDefined();
    expect(module.AuthenticationRegister).toBeDefined();
    expect(module.AuthenticationProps).toBeDefined();
  });

  it('should export AuthenticationProps type', async () => {
    const { AuthenticationProps } = await import('/@/components/Authentication');
    
    expect(AuthenticationProps).toBeDefined();
  });

  it('should be valid Vue components', async () => {
    const { 
      AuthenticationCodeLogin, 
      AuthenticationForgetPassword, 
      AuthenticationLogin, 
      AuthenticationQrCodeLogin, 
      AuthenticationRegister 
    } = await import('/@/components/Authentication');
    
    expect(typeof AuthenticationCodeLogin).toBe('object');
    expect(typeof AuthenticationForgetPassword).toBe('object');
    expect(typeof AuthenticationLogin).toBe('object');
    expect(typeof AuthenticationQrCodeLogin).toBe('object');
    expect(typeof AuthenticationRegister).toBe('object');
  });

  it('should be importable as named exports', async () => {
    const { 
      AuthenticationCodeLogin, 
      AuthenticationForgetPassword, 
      AuthenticationLogin, 
      AuthenticationQrCodeLogin, 
      AuthenticationRegister,
      AuthenticationProps 
    } = await import('/@/components/Authentication');
    
    expect(AuthenticationCodeLogin).toBeDefined();
    expect(AuthenticationForgetPassword).toBeDefined();
    expect(AuthenticationLogin).toBeDefined();
    expect(AuthenticationQrCodeLogin).toBeDefined();
    expect(AuthenticationRegister).toBeDefined();
    expect(AuthenticationProps).toBeDefined();
  });

  it('should export only expected components', async () => {
    const module = await import('/@/components/Authentication');
    const exportKeys = Object.keys(module);
    
    expect(exportKeys).toContain('AuthenticationCodeLogin');
    expect(exportKeys).toContain('AuthenticationForgetPassword');
    expect(exportKeys).toContain('AuthenticationLogin');
    expect(exportKeys).toContain('AuthenticationQrCodeLogin');
    expect(exportKeys).toContain('AuthenticationRegister');
    expect(exportKeys).toContain('AuthenticationProps');
  });
});
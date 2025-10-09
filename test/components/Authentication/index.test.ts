import { describe, it, expect, vi } from 'vitest';

// Mock Vue components to prevent import errors
vi.mock('/@/components/Authentication/src/CodeLogin.vue', () => ({
  default: {
    name: 'AuthenticationCodeLogin',
    template: '<div class="mock-code-login"><slot /></div>',
  },
}));

vi.mock('/@/components/Authentication/src/ForgetPassword.vue', () => ({
  default: {
    name: 'AuthenticationForgetPassword',
    template: '<div class="mock-forget-password"><slot /></div>',
  },
}));

vi.mock('/@/components/Authentication/src/Login.vue', () => ({
  default: {
    name: 'AuthenticationLogin',
    template: '<div class="mock-login"><slot /></div>',
  },
}));

vi.mock('/@/components/Authentication/src/QrcodeLogin.vue', () => ({
  default: {
    name: 'AuthenticationQrCodeLogin',
    template: '<div class="mock-qr-code-login"><slot /></div>',
  },
}));

vi.mock('/@/components/Authentication/src/Register.vue', () => ({
  default: {
    name: 'AuthenticationRegister',
    template: '<div class="mock-register"><slot /></div>',
  },
}));

vi.mock('/@/components/Authentication/src/types', () => ({
  AuthenticationProps: {},
}));

describe('components/Authentication/index', () => {
  it('should export AuthenticationCodeLogin component', async () => {
    const { AuthenticationCodeLogin } = await import('/@/components/Authentication/index');
    expect(AuthenticationCodeLogin).toBeDefined();
    expect(AuthenticationCodeLogin.name).toBe('AuthenticationCodeLogin');
  });

  it('should export AuthenticationForgetPassword component', async () => {
    const { AuthenticationForgetPassword } = await import('/@/components/Authentication/index');
    expect(AuthenticationForgetPassword).toBeDefined();
    expect(AuthenticationForgetPassword.name).toBe('AuthenticationForgetPassword');
  });

  it('should export AuthenticationLogin component', async () => {
    const { AuthenticationLogin } = await import('/@/components/Authentication/index');
    expect(AuthenticationLogin).toBeDefined();
    expect(AuthenticationLogin.name).toBe('AuthenticationLogin');
  });

  it('should export AuthenticationQrCodeLogin component', async () => {
    const { AuthenticationQrCodeLogin } = await import('/@/components/Authentication/index');
    expect(AuthenticationQrCodeLogin).toBeDefined();
    expect(AuthenticationQrCodeLogin.name).toBe('AuthenticationQrCodeLogin');
  });

  it('should export AuthenticationRegister component', async () => {
    const { AuthenticationRegister } = await import('/@/components/Authentication/index');
    expect(AuthenticationRegister).toBeDefined();
    expect(AuthenticationRegister.name).toBe('AuthenticationRegister');
  });

  it('should export AuthenticationProps type', async () => {
    const { AuthenticationProps } = await import('/@/components/Authentication/index');
    expect(AuthenticationProps).toBeDefined();
  });

  it('should have all expected exports', async () => {
    const authModule = await import('/@/components/Authentication/index');
    
    expect(authModule.AuthenticationCodeLogin).toBeDefined();
    expect(authModule.AuthenticationForgetPassword).toBeDefined();
    expect(authModule.AuthenticationLogin).toBeDefined();
    expect(authModule.AuthenticationQrCodeLogin).toBeDefined();
    expect(authModule.AuthenticationRegister).toBeDefined();
    expect(authModule.AuthenticationProps).toBeDefined();
  });
});
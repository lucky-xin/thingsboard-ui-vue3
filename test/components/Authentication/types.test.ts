import { describe, it, expect } from 'vitest';
import type { AuthenticationProps } from '/@/components/Authentication/src/types';

describe('components/Authentication/types', () => {
  it('should define AuthenticationProps interface with all properties', () => {
    // Test that the interface can be used
    const props: AuthenticationProps = {
      codeLoginPath: '/code-login',
      forgetPasswordPath: '/forget-password',
      loading: false,
      qrCodeLoginPath: '/qr-login',
      registerPath: '/register',
      showCodeLogin: true,
      showForgetPassword: true,
      showQrcodeLogin: true,
      showRegister: true,
      showRememberMe: true,
      showThirdPartyLogin: true,
      subTitle: 'Welcome',
      title: 'Login',
      submitButtonText: 'Submit',
    };

    expect(props.codeLoginPath).toBe('/code-login');
    expect(props.forgetPasswordPath).toBe('/forget-password');
    expect(props.loading).toBe(false);
    expect(props.qrCodeLoginPath).toBe('/qr-login');
    expect(props.registerPath).toBe('/register');
    expect(props.showCodeLogin).toBe(true);
    expect(props.showForgetPassword).toBe(true);
    expect(props.showQrcodeLogin).toBe(true);
    expect(props.showRegister).toBe(true);
    expect(props.showRememberMe).toBe(true);
    expect(props.showThirdPartyLogin).toBe(true);
    expect(props.subTitle).toBe('Welcome');
    expect(props.title).toBe('Login');
    expect(props.submitButtonText).toBe('Submit');
  });

  it('should allow partial properties', () => {
    const partialProps: Partial<AuthenticationProps> = {
      title: 'Login',
      loading: true,
    };

    expect(partialProps.title).toBe('Login');
    expect(partialProps.loading).toBe(true);
  });

  it('should handle empty props object', () => {
    const emptyProps: AuthenticationProps = {};

    expect(emptyProps).toBeDefined();
    expect(typeof emptyProps).toBe('object');
  });
});

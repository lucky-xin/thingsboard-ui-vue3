import { describe, it, expect } from 'vitest';
import type { AuthenticationProps } from '/@/components/Authentication/src/types';

describe('components/Authentication/src/types', () => {
  describe('AuthenticationProps interface', () => {
    it('should define all optional properties', () => {
      // Test that the interface exists and has the expected structure
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
        subTitle: 'Welcome back',
        title: 'Login',
        submitButtonText: 'Sign In',
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
      expect(props.subTitle).toBe('Welcome back');
      expect(props.title).toBe('Login');
      expect(props.submitButtonText).toBe('Sign In');
    });

    it('should allow partial props', () => {
      const partialProps: AuthenticationProps = {
        title: 'Login',
        loading: true,
      };

      expect(partialProps.title).toBe('Login');
      expect(partialProps.loading).toBe(true);
      expect(partialProps.showCodeLogin).toBeUndefined();
    });

    it('should allow empty object', () => {
      const emptyProps: AuthenticationProps = {};

      expect(Object.keys(emptyProps)).toHaveLength(0);
    });

    it('should handle boolean properties correctly', () => {
      const booleanProps: AuthenticationProps = {
        loading: true,
        showCodeLogin: false,
        showForgetPassword: true,
        showQrcodeLogin: false,
        showRegister: true,
        showRememberMe: false,
        showThirdPartyLogin: true,
      };

      expect(booleanProps.loading).toBe(true);
      expect(booleanProps.showCodeLogin).toBe(false);
      expect(booleanProps.showForgetPassword).toBe(true);
      expect(booleanProps.showQrcodeLogin).toBe(false);
      expect(booleanProps.showRegister).toBe(true);
      expect(booleanProps.showRememberMe).toBe(false);
      expect(booleanProps.showThirdPartyLogin).toBe(true);
    });

    it('should handle string properties correctly', () => {
      const stringProps: AuthenticationProps = {
        codeLoginPath: '/auth/code',
        forgetPasswordPath: '/auth/forget',
        qrCodeLoginPath: '/auth/qr',
        registerPath: '/auth/register',
        subTitle: 'Please sign in',
        title: 'Authentication',
        submitButtonText: 'Login',
      };

      expect(stringProps.codeLoginPath).toBe('/auth/code');
      expect(stringProps.forgetPasswordPath).toBe('/auth/forget');
      expect(stringProps.qrCodeLoginPath).toBe('/auth/qr');
      expect(stringProps.registerPath).toBe('/auth/register');
      expect(stringProps.subTitle).toBe('Please sign in');
      expect(stringProps.title).toBe('Authentication');
      expect(stringProps.submitButtonText).toBe('Login');
    });
  });
});
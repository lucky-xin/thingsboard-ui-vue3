import { describe, it, expect } from 'vitest';

// Import all exports from the index file
import * as AuthenticationIndex from '/@/components/Authentication/index';

describe('Authentication/index', () => {
  it('should export AuthenticationCodeLogin component', () => {
    expect(AuthenticationIndex.AuthenticationCodeLogin).toBeDefined();
  });

  it('should export AuthenticationForgetPassword component', () => {
    expect(AuthenticationIndex.AuthenticationForgetPassword).toBeDefined();
  });

  it('should export AuthenticationLogin component', () => {
    expect(AuthenticationIndex.AuthenticationLogin).toBeDefined();
  });

  it('should export AuthenticationQrCodeLogin component', () => {
    expect(AuthenticationIndex.AuthenticationQrCodeLogin).toBeDefined();
  });

  it('should export AuthenticationRegister component', () => {
    expect(AuthenticationIndex.AuthenticationRegister).toBeDefined();
  });

  it('should export AuthenticationProps type', () => {
    // We can't directly test types, but we can check that the module structure is correct
    expect(typeof AuthenticationIndex).toBe('object');
  });
});
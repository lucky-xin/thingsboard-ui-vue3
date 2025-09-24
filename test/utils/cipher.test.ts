import { describe, it, expect } from 'vitest';
import { AesEncryption, encryptByBase64, decryptByBase64, encryptByMd5 } from '/@/utils/cipher';

describe('utils/cipher', () => {
  describe('AesEncryption', () => {
    it('should create an instance with default options', () => {
      const encryption = new AesEncryption();
      expect(encryption).toBeInstanceOf(AesEncryption);
    });

    it('should create an instance with custom key and iv', () => {
      const encryption = new AesEncryption({
        key: 'test-key',
        iv: 'test-iv',
      });
      expect(encryption).toBeInstanceOf(AesEncryption);
    });

    it('should encrypt and decrypt text correctly', () => {
      const encryption = new AesEncryption({
        key: '1234567890123456', // 16 characters for AES
      });

      const plainText = 'Hello, World!';
      const encrypted = encryption.encryptByAES(plainText);
      const decrypted = encryption.decryptByAES(encrypted);

      expect(typeof encrypted).toBe('string');
      expect(decrypted).toBe(plainText);
    });

    it('should have correct options', () => {
      const encryption = new AesEncryption({
        key: 'test-key',
        iv: 'test-iv',
      });

      const options = encryption.getOptions;
      expect(options).toBeDefined();
      expect(options.mode).toBeDefined();
      expect(options.padding).toBeDefined();
    });
  });

  describe('Base64 functions', () => {
    it('should encrypt and decrypt by Base64 correctly', () => {
      const plainText = 'Hello, World!';
      const encrypted = encryptByBase64(plainText);
      const decrypted = decryptByBase64(encrypted);

      expect(typeof encrypted).toBe('string');
      expect(decrypted).toBe(plainText);
    });
  });

  describe('MD5 function', () => {
    it('should encrypt by MD5 correctly', () => {
      const password = 'test-password';
      const encrypted = encryptByMd5(password);

      expect(typeof encrypted).toBe('string');
      expect(encrypted.length).toBe(32); // MD5 hash is 32 characters
    });

    it('should produce consistent MD5 hashes', () => {
      const password = 'test-password';
      const encrypted1 = encryptByMd5(password);
      const encrypted2 = encryptByMd5(password);

      expect(encrypted1).toBe(encrypted2);
    });
  });
});

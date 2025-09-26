import { describe, it, expect, beforeEach } from 'vitest';
import { 
  AesEncryption, 
  encryptByBase64, 
  decryptByBase64, 
  encryptByMd5,
  type EncryptionParams 
} from '/@/utils/cipher';

describe('utils/cipher', () => {
  describe('AesEncryption', () => {
    let aesEncryption: AesEncryption;
    const testKey = '1234567890123456'; // 16 characters for AES-128
    const testIv = '1234567890123456'; // 16 characters for IV
    const testText = 'Hello, World!';

    beforeEach(() => {
      aesEncryption = new AesEncryption({ key: testKey, iv: testIv });
    });

    it('should create instance with default options', () => {
      const aes = new AesEncryption();
      expect(aes).toBeInstanceOf(AesEncryption);
      expect(aes.getOptions).toBeDefined();
    });

    it('should create instance with key and iv', () => {
      const params: EncryptionParams = { key: testKey, iv: testIv };
      const aes = new AesEncryption(params);
      expect(aes).toBeInstanceOf(AesEncryption);
    });

    it('should create instance with partial options', () => {
      const aes1 = new AesEncryption({ key: testKey });
      expect(aes1).toBeInstanceOf(AesEncryption);

      const aes2 = new AesEncryption({ iv: testIv });
      expect(aes2).toBeInstanceOf(AesEncryption);
    });

    it('should get encryption options', () => {
      const options = aesEncryption.getOptions;
      expect(options).toHaveProperty('mode');
      expect(options).toHaveProperty('padding');
      expect(options).toHaveProperty('iv');
    });

    it('should encrypt text using AES', () => {
      const encrypted = aesEncryption.encryptByAES(testText);
      expect(encrypted).toBeDefined();
      expect(typeof encrypted).toBe('string');
      expect(encrypted).not.toBe(testText);
      expect(encrypted.length).toBeGreaterThan(0);
    });

    it('should decrypt text using AES', () => {
      const encrypted = aesEncryption.encryptByAES(testText);
      const decrypted = aesEncryption.decryptByAES(encrypted);
      expect(decrypted).toBe(testText);
    });

    it('should handle empty string encryption', () => {
      const encrypted = aesEncryption.encryptByAES('');
      expect(encrypted).toBeDefined();
      expect(typeof encrypted).toBe('string');

      const decrypted = aesEncryption.decryptByAES(encrypted);
      expect(decrypted).toBe('');
    });

    it('should handle special characters in encryption', () => {
      const specialText = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const encrypted = aesEncryption.encryptByAES(specialText);
      const decrypted = aesEncryption.decryptByAES(encrypted);
      expect(decrypted).toBe(specialText);
    });

    it('should handle unicode characters in encryption', () => {
      const unicodeText = '你好世界 🌍 مرحبا';
      const encrypted = aesEncryption.encryptByAES(unicodeText);
      const decrypted = aesEncryption.decryptByAES(encrypted);
      expect(decrypted).toBe(unicodeText);
    });

    it('should handle long text encryption', () => {
      const longText = 'A'.repeat(1000);
      const encrypted = aesEncryption.encryptByAES(longText);
      const decrypted = aesEncryption.decryptByAES(encrypted);
      expect(decrypted).toBe(longText);
    });

    it('should produce different results with different keys', () => {
      const aes1 = new AesEncryption({ key: '1234567890123456', iv: testIv });
      const aes2 = new AesEncryption({ key: '6543210987654321', iv: testIv });

      const encrypted1 = aes1.encryptByAES(testText);
      const encrypted2 = aes2.encryptByAES(testText);

      expect(encrypted1).not.toBe(encrypted2);
    });
  });

  describe('encryptByBase64', () => {
    it('should encode text to base64', () => {
      const text = 'Hello, World!';
      const encoded = encryptByBase64(text);
      
      expect(encoded).toBeDefined();
      expect(typeof encoded).toBe('string');
      expect(encoded).not.toBe(text);
      expect(encoded).toBe('SGVsbG8sIFdvcmxkIQ==');
    });

    it('should handle empty string', () => {
      const encoded = encryptByBase64('');
      expect(encoded).toBe('');
    });

    it('should handle special characters', () => {
      const text = '!@#$%^&*()';
      const encoded = encryptByBase64(text);
      expect(encoded).toBeDefined();
      expect(typeof encoded).toBe('string');
    });

    it('should handle unicode characters', () => {
      const text = '你好世界';
      const encoded = encryptByBase64(text);
      expect(encoded).toBeDefined();
      expect(typeof encoded).toBe('string');
    });

    it('should handle long text', () => {
      const text = 'A'.repeat(1000);
      const encoded = encryptByBase64(text);
      expect(encoded).toBeDefined();
      expect(typeof encoded).toBe('string');
      expect(encoded.length).toBeGreaterThan(0);
    });
  });

  describe('decryptByBase64', () => {
    it('should decode base64 to text', () => {
      const base64Text = 'SGVsbG8sIFdvcmxkIQ==';
      const decoded = decryptByBase64(base64Text);
      expect(decoded).toBe('Hello, World!');
    });

    it('should handle empty base64 string', () => {
      const decoded = decryptByBase64('');
      expect(decoded).toBe('');
    });

    it('should work with encryptByBase64', () => {
      const originalText = 'Test message for base64';
      const encoded = encryptByBase64(originalText);
      const decoded = decryptByBase64(encoded);
      expect(decoded).toBe(originalText);
    });

    it('should handle unicode characters roundtrip', () => {
      const originalText = '你好世界 🌍';
      const encoded = encryptByBase64(originalText);
      const decoded = decryptByBase64(encoded);
      expect(decoded).toBe(originalText);
    });

    it('should handle special characters roundtrip', () => {
      const originalText = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const encoded = encryptByBase64(originalText);
      const decoded = decryptByBase64(encoded);
      expect(decoded).toBe(originalText);
    });
  });

  describe('encryptByMd5', () => {
    it('should hash password using MD5', () => {
      const password = 'mypassword';
      const hashed = encryptByMd5(password);
      
      expect(hashed).toBeDefined();
      expect(typeof hashed).toBe('string');
      expect(hashed).not.toBe(password);
      expect(hashed.length).toBe(32); // MD5 hash is always 32 characters
    });

    it('should produce same hash for same input', () => {
      const password = 'testpassword';
      const hash1 = encryptByMd5(password);
      const hash2 = encryptByMd5(password);
      expect(hash1).toBe(hash2);
    });

    it('should produce different hashes for different inputs', () => {
      const hash1 = encryptByMd5('password1');
      const hash2 = encryptByMd5('password2');
      expect(hash1).not.toBe(hash2);
    });

    it('should handle empty string', () => {
      const hashed = encryptByMd5('');
      expect(hashed).toBeDefined();
      expect(typeof hashed).toBe('string');
      expect(hashed.length).toBe(32);
    });

    it('should handle special characters', () => {
      const password = '!@#$%^&*()_+-=';
      const hashed = encryptByMd5(password);
      expect(hashed).toBeDefined();
      expect(typeof hashed).toBe('string');
      expect(hashed.length).toBe(32);
    });

    it('should handle unicode characters', () => {
      const password = '密码123';
      const hashed = encryptByMd5(password);
      expect(hashed).toBeDefined();
      expect(typeof hashed).toBe('string');
      expect(hashed.length).toBe(32);
    });

    it('should produce expected hash for known input', () => {
      const password = 'hello';
      const hashed = encryptByMd5(password);
      expect(hashed).toBe('5d41402abc4b2a76b9719d911017c592');
    });

    it('should handle long passwords', () => {
      const longPassword = 'a'.repeat(1000);
      const hashed = encryptByMd5(longPassword);
      expect(hashed).toBeDefined();
      expect(typeof hashed).toBe('string');
      expect(hashed.length).toBe(32);
    });
  });

  describe('integration tests', () => {
    it('should work with all encryption methods together', () => {
      const originalText = 'Integration test data';
      
      // Base64 encoding
      const base64Encoded = encryptByBase64(originalText);
      const base64Decoded = decryptByBase64(base64Encoded);
      expect(base64Decoded).toBe(originalText);
      
      // AES encryption
      const aes = new AesEncryption({ key: '1234567890123456', iv: '1234567890123456' });
      const aesEncrypted = aes.encryptByAES(originalText);
      const aesDecrypted = aes.decryptByAES(aesEncrypted);
      expect(aesDecrypted).toBe(originalText);
      
      // MD5 hashing (one-way)
      const md5Hash = encryptByMd5(originalText);
      expect(md5Hash).toBeDefined();
      expect(md5Hash.length).toBe(32);
    });

    it('should handle edge cases', () => {
      const edgeCases = ['', 'single', 'normal text', '123456'];
      
      edgeCases.forEach(testCase => {
        // Base64
        const base64Encoded = encryptByBase64(testCase);
        const base64Decoded = decryptByBase64(base64Encoded);
        expect(base64Decoded).toBe(testCase);
        
        // AES - only test with non-empty strings due to encryption padding
        if (testCase.length > 0) {
          const aes = new AesEncryption({ key: '1234567890123456', iv: '1234567890123456' });
          const aesEncrypted = aes.encryptByAES(testCase);
          const aesDecrypted = aes.decryptByAES(aesEncrypted);
          expect(aesDecrypted).toBe(testCase);
        }
        
        // MD5
        const md5Hash = encryptByMd5(testCase);
        expect(md5Hash).toBeDefined();
        expect(md5Hash.length).toBe(32);
      });
    });
  });
});
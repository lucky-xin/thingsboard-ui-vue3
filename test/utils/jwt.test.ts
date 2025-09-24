import { describe, it, expect, vi } from 'vitest';
import { decode, getExpiration, isExpired } from '/@/utils/jwt';
import { jwtDecode } from 'jwt-decode';

// Mock jwt-decode
vi.mock('jwt-decode', () => ({
  jwtDecode: vi.fn(),
}));

describe('utils/jwt', () => {
  const mockToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  describe('decode', () => {
    it('should decode token correctly', () => {
      const mockDecoded = { sub: '1234567890', name: 'John Doe', iat: 1516239022 };
      (jwtDecode as unknown as any).mockReturnValue(mockDecoded);

      const result = decode(mockToken);
      expect(result).toEqual(mockDecoded);
      expect(jwtDecode).toHaveBeenCalledWith(mockToken);
    });

    it('should return undefined for falsy token', () => {
      expect(decode(null)).toBeUndefined();
      expect(decode(undefined)).toBeUndefined();
      expect(decode('')).toBeUndefined();
    });
  });

  describe('getExpiration', () => {
    it('should return expiration date', () => {
      const futureDate = new Date(Date.now() + 3600000); // 1 hour in the future
      const unixTimestamp = Math.floor(futureDate.getTime() / 1000);
      // Create a date that matches the precision of the jwt expiration date
      const expectedDate = new Date(unixTimestamp * 1000);

      (jwtDecode as unknown as any).mockReturnValue({ exp: unixTimestamp });

      const result = getExpiration(mockToken);
      expect(result).toEqual(expectedDate);
    });

    it('should return undefined for token without exp', () => {
      (jwtDecode as unknown as any).mockReturnValue({ sub: '1234567890' });

      const result = getExpiration(mockToken);
      expect(result).toBeUndefined();
    });
  });

  describe('isExpired', () => {
    it('should return true for expired token', () => {
      const pastDate = new Date(Date.now() - 3600000); // 1 hour in the past
      const unixTimestamp = Math.floor(pastDate.getTime() / 1000);

      (jwtDecode as unknown as any).mockReturnValue({ exp: unixTimestamp });

      const result = isExpired(mockToken);
      expect(result).toBe(true);
    });

    it('should return false for valid token', () => {
      const futureDate = new Date(Date.now() + 3600000); // 1 hour in the future
      const unixTimestamp = Math.floor(futureDate.getTime() / 1000);

      (jwtDecode as unknown as any).mockReturnValue({ exp: unixTimestamp });

      const result = isExpired(mockToken);
      expect(result).toBe(false);
    });

    it('should return true for falsy token', () => {
      expect(isExpired(null)).toBe(true);
      expect(isExpired(undefined)).toBe(true);
      expect(isExpired('')).toBe(true);
    });

    it('should return true for token without exp', () => {
      (jwtDecode as unknown as any).mockReturnValue({ sub: '1234567890' });

      const result = isExpired(mockToken);
      expect(result).toBe(true);
    });
  });
});

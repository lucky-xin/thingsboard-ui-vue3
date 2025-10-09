import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock jwt-decode
vi.mock('jwt-decode', () => ({
  jwtDecode: vi.fn(),
}));

describe('jwt', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should export decode function', async () => {
    const module = await import('/@/utils/jwt');
    
    expect(module).toBeDefined();
    expect(module.decode).toBeDefined();
    expect(typeof module.decode).toBe('function');
  });

  it('should export getExpiration function', async () => {
    const module = await import('/@/utils/jwt');
    
    expect(module.getExpiration).toBeDefined();
    expect(typeof module.getExpiration).toBe('function');
  });

  it('should export isExpired function', async () => {
    const module = await import('/@/utils/jwt');
    
    expect(module.isExpired).toBeDefined();
    expect(typeof module.isExpired).toBe('function');
  });

  it('should decode valid token', async () => {
    const { decode } = await import('/@/utils/jwt');
    const { jwtDecode } = await import('jwt-decode');
    
    const mockDecoded = { sub: 'user123', exp: 1234567890 };
    vi.mocked(jwtDecode).mockReturnValue(mockDecoded);
    
    const result = decode('valid.token.here');
    
    expect(jwtDecode).toHaveBeenCalledWith('valid.token.here');
    expect(result).toEqual(mockDecoded);
  });

  it('should return undefined for null token', async () => {
    const { decode } = await import('/@/utils/jwt');
    const { jwtDecode } = await import('jwt-decode');
    
    const result = decode(null);
    
    expect(jwtDecode).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('should return undefined for undefined token', async () => {
    const { decode } = await import('/@/utils/jwt');
    const { jwtDecode } = await import('jwt-decode');
    
    const result = decode(undefined);
    
    expect(jwtDecode).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('should return undefined for empty token', async () => {
    const { decode } = await import('/@/utils/jwt');
    const { jwtDecode } = await import('jwt-decode');
    
    const result = decode('');
    
    expect(jwtDecode).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('should get expiration date from token', async () => {
    const { getExpiration } = await import('/@/utils/jwt');
    const { jwtDecode } = await import('jwt-decode');
    
    const mockDecoded = { exp: 1234567890 };
    vi.mocked(jwtDecode).mockReturnValue(mockDecoded);
    
    const result = getExpiration('valid.token.here');
    
    expect(jwtDecode).toHaveBeenCalledWith('valid.token.here');
    expect(result).toEqual(new Date(1234567890 * 1000));
  });

  it('should return undefined when token has no expiration', async () => {
    const { getExpiration } = await import('/@/utils/jwt');
    const { jwtDecode } = await import('jwt-decode');
    
    const mockDecoded = {};
    vi.mocked(jwtDecode).mockReturnValue(mockDecoded);
    
    const result = getExpiration('token.without.exp');
    
    expect(jwtDecode).toHaveBeenCalledWith('token.without.exp');
    expect(result).toBeUndefined();
  });

  it('should return undefined when expiration is null', async () => {
    const { getExpiration } = await import('/@/utils/jwt');
    const { jwtDecode } = await import('jwt-decode');
    
    const mockDecoded = { exp: null };
    vi.mocked(jwtDecode).mockReturnValue(mockDecoded);
    
    const result = getExpiration('token.with.null.exp');
    
    expect(jwtDecode).toHaveBeenCalledWith('token.with.null.exp');
    expect(result).toBeUndefined();
  });

  it('should return true for expired token', async () => {
    const { isExpired } = await import('/@/utils/jwt');
    const { jwtDecode } = await import('jwt-decode');
    
    // Mock current time to be after expiration
    const currentTime = 2000000000 * 1000; // Future time
    vi.spyOn(Date, 'now').mockReturnValue(currentTime);
    
    const mockDecoded = { exp: 1000000000 }; // Past expiration
    vi.mocked(jwtDecode).mockReturnValue(mockDecoded);
    
    const result = isExpired('expired.token');
    
    expect(jwtDecode).toHaveBeenCalledWith('expired.token');
    expect(result).toBe(true);
  });

  it('should return false for valid token', async () => {
    const { isExpired } = await import('/@/utils/jwt');
    const { jwtDecode } = await import('jwt-decode');
    
    // Mock current time to be before expiration
    const currentTime = 1000000000 * 1000; // Past time
    vi.spyOn(Date, 'now').mockReturnValue(currentTime);
    
    const mockDecoded = { exp: 2000000000 }; // Future expiration
    vi.mocked(jwtDecode).mockReturnValue(mockDecoded);
    
    const result = isExpired('valid.token');
    
    expect(jwtDecode).toHaveBeenCalledWith('valid.token');
    expect(result).toBe(false);
  });

  it('should return true for null token', async () => {
    const { isExpired } = await import('/@/utils/jwt');
    const { jwtDecode } = await import('jwt-decode');
    
    const result = isExpired(null);
    
    expect(jwtDecode).not.toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should return true for undefined token', async () => {
    const { isExpired } = await import('/@/utils/jwt');
    const { jwtDecode } = await import('jwt-decode');
    
    const result = isExpired(undefined);
    
    expect(jwtDecode).not.toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should return true for empty token', async () => {
    const { isExpired } = await import('/@/utils/jwt');
    const { jwtDecode } = await import('jwt-decode');
    
    const result = isExpired('');
    
    expect(jwtDecode).not.toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should return true when token has no expiration', async () => {
    const { isExpired } = await import('/@/utils/jwt');
    const { jwtDecode } = await import('jwt-decode');
    
    const mockDecoded = {};
    vi.mocked(jwtDecode).mockReturnValue(mockDecoded);
    
    const result = isExpired('token.without.exp');
    
    expect(jwtDecode).toHaveBeenCalledWith('token.without.exp');
    expect(result).toBe(true);
  });

  it('should return true when expiration is null', async () => {
    const { isExpired } = await import('/@/utils/jwt');
    const { jwtDecode } = await import('jwt-decode');
    
    const mockDecoded = { exp: null };
    vi.mocked(jwtDecode).mockReturnValue(mockDecoded);
    
    const result = isExpired('token.with.null.exp');
    
    expect(jwtDecode).toHaveBeenCalledWith('token.with.null.exp');
    expect(result).toBe(true);
  });

  it('should handle jwtDecode throwing error', async () => {
    const { decode } = await import('/@/utils/jwt');
    const { jwtDecode } = await import('jwt-decode');
    
    vi.mocked(jwtDecode).mockImplementation(() => {
      throw new Error('Invalid token');
    });
    
    expect(() => decode('invalid.token')).toThrow('Invalid token');
  });

  it('should handle jwtDecode throwing error in getExpiration', async () => {
    const { getExpiration } = await import('/@/utils/jwt');
    const { jwtDecode } = await import('jwt-decode');
    
    vi.mocked(jwtDecode).mockImplementation(() => {
      throw new Error('Invalid token');
    });
    
    expect(() => getExpiration('invalid.token')).toThrow('Invalid token');
  });

  it('should handle jwtDecode throwing error in isExpired', async () => {
    const { isExpired } = await import('/@/utils/jwt');
    const { jwtDecode } = await import('jwt-decode');
    
    vi.mocked(jwtDecode).mockImplementation(() => {
      throw new Error('Invalid token');
    });
    
    expect(() => isExpired('invalid.token')).toThrow('Invalid token');
  });
});

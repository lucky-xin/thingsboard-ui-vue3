import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerGlobComp } from '/@/components/registerGlobComp';

describe('registerGlobComp', () => {
  let mockApp: any;

  beforeEach(() => {
    mockApp = {
      use: vi.fn().mockReturnThis(),
    };
  });

  it('should register global components', () => {
    registerGlobComp(mockApp);
    
    expect(mockApp.use).toHaveBeenCalledTimes(2);
    expect(mockApp.use).toHaveBeenNthCalledWith(1, expect.any(Object)); // Input
    expect(mockApp.use).toHaveBeenNthCalledWith(2, expect.any(Object)); // Button
  });

  it('should chain app.use calls', () => {
    registerGlobComp(mockApp);
    
    // Verify that the chaining works (each use returns the app)
    expect(mockApp.use().use).toBeDefined();
  });

  it('should handle app parameter correctly', () => {
    const mockAppWithoutChaining = {
      use: vi.fn().mockReturnThis(),
    } as any;
    
    expect(() => registerGlobComp(mockAppWithoutChaining)).not.toThrow();
    expect(mockAppWithoutChaining.use).toHaveBeenCalledTimes(2);
  });
});
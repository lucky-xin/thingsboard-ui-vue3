import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Vue App
const mockApp = {
  use: vi.fn(),
};

// Mock Button component
vi.mock('/@/components/Button', () => ({
  Button: {
    install: vi.fn(),
  },
}));

// Mock ant-design-vue Input
vi.mock('ant-design-vue', () => ({
  Input: {
    install: vi.fn(),
  },
}));

describe('registerGlobComp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should register Input and Button components when they have install methods', async () => {
    const { registerGlobComp } = await import('/@/components/registerGlobComp');

    registerGlobComp(mockApp as any);

    expect(mockApp.use).toHaveBeenCalledTimes(2);
  });

  it('should check if components have install methods before registering', async () => {
    const { registerGlobComp } = await import('/@/components/registerGlobComp');
    const { Button } = await import('/@/components/Button');
    const { Input } = await import('ant-design-vue');

    registerGlobComp(mockApp as any);

    // Verify that both components were checked for install methods
    expect(Button).toBeDefined();
    expect(Input).toBeDefined();
    expect(mockApp.use).toHaveBeenCalledWith(Input);
    expect(mockApp.use).toHaveBeenCalledWith(Button);
  });

  it('should handle the function execution without errors', async () => {
    const { registerGlobComp } = await import('/@/components/registerGlobComp');

    // Test that the function can be called without throwing errors
    expect(() => registerGlobComp(mockApp as any)).not.toThrow();
  });

  it('should call app.use for each component with install method', async () => {
    const { registerGlobComp } = await import('/@/components/registerGlobComp');

    registerGlobComp(mockApp as any);

    // Verify that app.use was called for both components
    expect(mockApp.use).toHaveBeenCalledTimes(2);
  });
});

import { describe, it, expect, vi } from 'vitest';

describe('hooks/useFullContent', () => {
  it('should import useFullContent', async () => {
    // Dynamically import to avoid module mocking issues
    const module = await import('/@/hooks/web/useFullContent');
    const { useFullContent } = module;

    expect(typeof useFullContent).toBe('function');
  });
});
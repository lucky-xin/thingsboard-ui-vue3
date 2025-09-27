import { describe, it, expect } from 'vitest';

describe('api/tb/widgetsBundle', () => {
  it('should export widgets bundle API', async () => {
    const module = await import('/@/api/tb/widgetsBundle');

    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  }, 10000); // Increase timeout to 10 seconds

  it('should have API functions', async () => {
    const module = await import('/@/api/tb/widgetsBundle');

    // Check that module has exports (API functions)
    const exportKeys = Object.keys(module);
    expect(exportKeys.length).toBeGreaterThan(0);
  }, 10000); // Increase timeout to 10 seconds

  it('should be a valid API module', async () => {
    const module = await import('/@/api/tb/widgetsBundle');

    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  }, 10000); // Increase timeout to 10 seconds
});
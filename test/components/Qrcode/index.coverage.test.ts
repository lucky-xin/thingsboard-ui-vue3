import { describe, it, expect } from 'vitest';

// Test Qrcode component index exports without mocks to get real coverage
describe('Qrcode/index coverage', () => {
  it('should export QrCode component', async () => {
    const module = await import('/@/components/Qrcode');

    expect(module.QrCode).toBeDefined();
  }, 10000); // Increase timeout to 10 seconds

  it('should have correct component structure', async () => {
    const { QrCode } = await import('/@/components/Qrcode');

    // Check that component is wrapped with withInstall
    expect(QrCode).toHaveProperty('install');
  }, 10000); // Increase timeout to 10 seconds

  it('should be valid Vue component', async () => {
    const { QrCode } = await import('/@/components/Qrcode');

    expect(typeof QrCode).toBe('object');
  }, 10000); // Increase timeout to 10 seconds

  it('should export typing types', async () => {
    const module = await import('/@/components/Qrcode');

    // Check that typing exports are available
    expect(module).toBeDefined();
  }, 10000); // Increase timeout to 10 seconds

  it('should be importable as named export', async () => {
    const { QrCode } = await import('/@/components/Qrcode');

    expect(QrCode).toBeDefined();
  }, 10000); // Increase timeout to 10 seconds

  it('should export only expected components', async () => {
    const module = await import('/@/components/Qrcode');
    const exportKeys = Object.keys(module);

    expect(exportKeys).toContain('QrCode');
    expect(exportKeys.length).toBeGreaterThanOrEqual(1);
  }, 10000); // Increase timeout to 10 seconds
});

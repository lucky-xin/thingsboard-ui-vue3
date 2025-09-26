import { describe, it, expect } from 'vitest';

describe('Qrcode/index', () => {
  it('should export QrCode component', async () => {
    const { QrCode } = await import('/@/components/Qrcode/index');
    expect(QrCode).toBeDefined();
  });
});
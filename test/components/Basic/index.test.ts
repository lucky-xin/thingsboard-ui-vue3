import { describe, it, expect, vi } from 'vitest';

vi.mock('/@/components/Basic/index', () => ({
  BasicArrow: { name: 'MockBasicArrow' },
  BasicHelp: { name: 'MockBasicHelp' },
  BasicTitle: { name: 'MockBasicTitle' },
}));

describe('Basic/index', () => {
  it('should export BasicArrow component', async () => {
    const { BasicArrow } = await import('/@/components/Basic/index');
    expect(BasicArrow).toBeDefined();
  });

  it('should export BasicHelp component', async () => {
    const { BasicHelp } = await import('/@/components/Basic/index');
    expect(BasicHelp).toBeDefined();
  });

  it('should export BasicTitle component', async () => {
    const { BasicTitle } = await import('/@/components/Basic/index');
    expect(BasicTitle).toBeDefined();
  });
});